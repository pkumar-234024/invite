import type { ProjectSummary, WeddingProject } from '../types/wedding';
import { createDefaultProject } from '../utils/sampleData';
import { indexedDBService } from './indexedDBService';

const STORAGE_KEYS = {
  ACTIVE_PROJECT_ID: 'shaadimotion_active_project_id',
  PROJECT_LIST: 'shaadimotion_projects_meta',
  PROJECT_PREFIX: 'shaadimotion_project_',
};

export class LocalStorageService {
  /**
   * Get list of project summaries
   */
  static getProjects(): ProjectSummary[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROJECT_LIST);
      if (!data) return [];
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  /**
   * Save project summaries list
   */
  static saveProjectsList(projects: ProjectSummary[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECT_LIST, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to save project summaries:', e);
    }
  }

  /**
   * Get currently active project ID
   */
  static getActiveProjectId(): string | null {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_PROJECT_ID);
  }

  /**
   * Set currently active project ID
   */
  static setActiveProjectId(id: string): void {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_PROJECT_ID, id);
  }

  /**
   * Load a full project by ID, pulling heavy photos from IndexedDB if needed
   */
  static async loadProject(id: string): Promise<WeddingProject | null> {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PROJECT_PREFIX + id);
      if (!raw) return null;
      const project: WeddingProject = JSON.parse(raw);

      // Hydrate photos from IndexedDB if available
      const bridePhoto = await indexedDBService.getPhoto(id, 'bride');
      if (bridePhoto && typeof bridePhoto === 'string') {
        project.photos.bridePhoto = bridePhoto;
      }
      const groomPhoto = await indexedDBService.getPhoto(id, 'groom');
      if (groomPhoto && typeof groomPhoto === 'string') {
        project.photos.groomPhoto = groomPhoto;
      }
      const couplePhoto = await indexedDBService.getPhoto(id, 'couple');
      if (couplePhoto && typeof couplePhoto === 'string') {
        project.photos.couplePhoto = couplePhoto;
      }
      const familyPhoto = await indexedDBService.getPhoto(id, 'family');
      if (familyPhoto && typeof familyPhoto === 'string') {
        project.photos.familyPhoto = familyPhoto;
      }

      return project;
    } catch (err) {
      console.error('Error loading project:', err);
      return null;
    }
  }

  /**
   * Save full project. Stash large photo data in IndexedDB to avoid localStorage quota overflow
   */
  static async saveProject(project: WeddingProject): Promise<void> {
    try {
      project.updatedAt = Date.now();

      // Separate large photo payloads into IndexedDB
      if (project.photos.bridePhoto && project.photos.bridePhoto.length > 50000) {
        await indexedDBService.savePhoto(project.id, 'bride', project.photos.bridePhoto);
      }
      if (project.photos.groomPhoto && project.photos.groomPhoto.length > 50000) {
        await indexedDBService.savePhoto(project.id, 'groom', project.photos.groomPhoto);
      }
      if (project.photos.couplePhoto && project.photos.couplePhoto.length > 50000) {
        await indexedDBService.savePhoto(project.id, 'couple', project.photos.couplePhoto);
      }
      if (project.photos.familyPhoto && project.photos.familyPhoto.length > 50000) {
        await indexedDBService.savePhoto(project.id, 'family', project.photos.familyPhoto);
      }

      // To stay within localStorage limits, create a lean snapshot for localStorage
      const leanProject: WeddingProject = {
        ...project,
        photos: {
          ...project.photos,
          bridePhoto: (project.photos.bridePhoto?.length || 0) > 50000 ? '[STORED_IN_IDB]' : project.photos.bridePhoto,
          groomPhoto: (project.photos.groomPhoto?.length || 0) > 50000 ? '[STORED_IN_IDB]' : project.photos.groomPhoto,
          couplePhoto: (project.photos.couplePhoto?.length || 0) > 50000 ? '[STORED_IN_IDB]' : project.photos.couplePhoto,
          familyPhoto: (project.photos.familyPhoto?.length || 0) > 50000 ? '[STORED_IN_IDB]' : project.photos.familyPhoto,
        },
      };

      localStorage.setItem(STORAGE_KEYS.PROJECT_PREFIX + project.id, JSON.stringify(leanProject));

      // Update summaries
      const summaries = this.getProjects();
      const existingIdx = summaries.findIndex((s) => s.id === project.id);
      const summary: ProjectSummary = {
        id: project.id,
        name: project.name,
        coupleTitle: `${project.couple.groomName} & ${project.couple.brideName}`,
        templateId: project.templateId,
        updatedAt: project.updatedAt,
        ceremoniesCount: project.ceremonies.length,
        hasCouplePhoto: Boolean(project.photos.couplePhoto),
      };

      if (existingIdx >= 0) {
        summaries[existingIdx] = summary;
      } else {
        summaries.unshift(summary);
      }
      this.saveProjectsList(summaries);
      this.setActiveProjectId(project.id);
    } catch (err) {
      console.error('Error saving project:', err);
      throw err;
    }
  }

  /**
   * Delete a project and its assets
   */
  static async deleteProject(id: string): Promise<void> {
    try {
      localStorage.removeItem(STORAGE_KEYS.PROJECT_PREFIX + id);
      await indexedDBService.deleteProjectPhotos(id);

      const summaries = this.getProjects().filter((s) => s.id !== id);
      this.saveProjectsList(summaries);

      if (this.getActiveProjectId() === id) {
        const nextId = summaries.length > 0 ? summaries[0].id : null;
        if (nextId) {
          this.setActiveProjectId(nextId);
        } else {
          localStorage.removeItem(STORAGE_KEYS.ACTIVE_PROJECT_ID);
        }
      }
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  }

  /**
   * Initialize or retrieve initial project
   */
  static async initializeDefaultProject(): Promise<WeddingProject> {
    const activeId = this.getActiveProjectId();
    if (activeId) {
      const existing = await this.loadProject(activeId);
      if (existing) return existing;
    }

    const projects = this.getProjects();
    if (projects.length > 0) {
      const first = await this.loadProject(projects[0].id);
      if (first) {
        this.setActiveProjectId(first.id);
        return first;
      }
    }

    // Otherwise create new default project
    const defaultProj = createDefaultProject('shaadi_default_1');
    await this.saveProject(defaultProj);
    return defaultProj;
  }
}
