/**
 * IndexedDB Service for ShaadiMotion
 * Handles storage of high-resolution couple photos, audio files, and exported video blobs
 * without bloating localStorage or hitting quota limits.
 */

const DB_NAME = 'ShaadiMotionDB';
const DB_VERSION = 2;

const STORES = {
  PHOTOS: 'wedding_photos',
  PROJECT_DATA: 'project_large_data',
  EXPORTED_VIDEOS: 'exported_videos',
};

class IndexedDBService {
  private dbPromise: Promise<IDBDatabase> | null = null;

  private getDB(): Promise<IDBDatabase> {
    if (this.dbPromise) return this.dbPromise;

    this.dbPromise = new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        reject(new Error('IndexedDB is not supported in this environment'));
        return;
      }

      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        if (!db.objectStoreNames.contains(STORES.PHOTOS)) {
          db.createObjectStore(STORES.PHOTOS);
        }
        if (!db.objectStoreNames.contains(STORES.PROJECT_DATA)) {
          db.createObjectStore(STORES.PROJECT_DATA);
        }
        if (!db.objectStoreNames.contains(STORES.EXPORTED_VIDEOS)) {
          db.createObjectStore(STORES.EXPORTED_VIDEOS);
        }
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error || new Error('Failed to open IndexedDB'));
      };
    });

    return this.dbPromise;
  }

  /**
   * Save a photo (dataUrl or Blob) for a specific project and photo slot
   */
  async savePhoto(projectId: string, photoKey: string, dataUrlOrBlob: string | Blob): Promise<void> {
    const db = await this.getDB();
    const key = `${projectId}_${photoKey}`;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORES.PHOTOS, 'readwrite');
      const store = tx.objectStore(STORES.PHOTOS);
      const req = store.put(dataUrlOrBlob, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  /**
   * Retrieve a photo by project ID and slot
   */
  async getPhoto(projectId: string, photoKey: string): Promise<string | Blob | null> {
    try {
      const db = await this.getDB();
      const key = `${projectId}_${photoKey}`;
      return new Promise((resolve) => {
        const tx = db.transaction(STORES.PHOTOS, 'readonly');
        const store = tx.objectStore(STORES.PHOTOS);
        const req = store.get(key);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      });
    } catch {
      return null;
    }
  }

  /**
   * Delete a photo
   */
  async deletePhoto(projectId: string, photoKey: string): Promise<void> {
    try {
      const db = await this.getDB();
      const key = `${projectId}_${photoKey}`;
      return new Promise((resolve) => {
        const tx = db.transaction(STORES.PHOTOS, 'readwrite');
        const store = tx.objectStore(STORES.PHOTOS);
        const req = store.delete(key);
        req.onsuccess = () => resolve();
        req.onerror = () => resolve();
      });
    } catch {
      // ignore
    }
  }

  /**
   * Delete all photos for a project
   */
  async deleteProjectPhotos(projectId: string): Promise<void> {
    try {
      const db = await this.getDB();
      const tx = db.transaction(STORES.PHOTOS, 'readwrite');
      const store = tx.objectStore(STORES.PHOTOS);
      const req = store.openCursor();
      req.onsuccess = (e) => {
        const cursor = (e.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          if (String(cursor.key).startsWith(`${projectId}_`)) {
            cursor.delete();
          }
          cursor.continue();
        }
      };
    } catch {
      // ignore
    }
  }

  /**
   * Save an exported video blob
   */
  async saveExportedVideo(projectId: string, videoBlob: Blob): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORES.EXPORTED_VIDEOS, 'readwrite');
      const store = tx.objectStore(STORES.EXPORTED_VIDEOS);
      const req = store.put(videoBlob, projectId);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  /**
   * Get cached exported video blob
   */
  async getExportedVideo(projectId: string): Promise<Blob | null> {
    try {
      const db = await this.getDB();
      return new Promise((resolve) => {
        const tx = db.transaction(STORES.EXPORTED_VIDEOS, 'readonly');
        const store = tx.objectStore(STORES.EXPORTED_VIDEOS);
        const req = store.get(projectId);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      });
    } catch {
      return null;
    }
  }
}

export const indexedDBService = new IndexedDBService();
