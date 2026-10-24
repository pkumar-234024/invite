import { useState, useEffect, useCallback } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { HowItWorks } from "./components/HowItWorks";
import { FeaturesSection } from "./components/FeaturesSection";
import { WeddingDetailsForm } from "./components/WeddingDetailsForm";
import { TemplateGallery } from "./components/TemplateGallery";
import { VideoEditor } from "./components/VideoEditor";
import { ProjectDashboard } from "./components/ProjectDashboard";
import { VideoGeneratorModal } from "./components/VideoGeneratorModal";
import type {
  ProjectSummary,
  TemplateId,
  WeddingProject,
} from "./types/wedding";
import { LocalStorageService } from "./services/localStorageService";
import { createDefaultProject } from "./utils/sampleData";
import { Sparkles, Heart, ShieldCheck, Film } from "lucide-react";

export function App() {
  const [currentTab, setCurrentTab] = useState<
    "home" | "create" | "templates" | "editor" | "projects"
  >("home");
  const [project, setProject] = useState<WeddingProject | null>(null);
  const [projectsList, setProjectsList] = useState<ProjectSummary[]>([]);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize projects on first load
  useEffect(() => {
    async function init() {
      try {
        const loaded = await LocalStorageService.initializeDefaultProject();
        setProject(loaded);
        const summaries = LocalStorageService.getProjects();
        setProjectsList(summaries);
      } catch (err) {
        console.error("Initialization error:", err);
        const fallback = createDefaultProject();
        setProject(fallback);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, []);

  // Auto-save changes to localStorage & IndexedDB
  const handleUpdateProject = useCallback(
    (updater: (prev: WeddingProject) => WeddingProject) => {
      setProject((prev) => {
        if (!prev) return prev;
        const updated = updater(prev);
        LocalStorageService.saveProject(updated).catch((err) =>
          console.error("Auto-save error:", err),
        );
        return updated;
      });
    },
    [],
  );

  const refreshProjectsList = useCallback(() => {
    const list = LocalStorageService.getProjects();
    setProjectsList(list);
  }, []);

  const handleOpenProject = async (id: string) => {
    const loaded = await LocalStorageService.loadProject(id);
    if (loaded) {
      setProject(loaded);
      LocalStorageService.setActiveProjectId(id);
      setCurrentTab("editor");
    }
  };

  const handleSelectTemplate = (templateId: TemplateId) => {
    handleUpdateProject((prev) => ({
      ...prev,
      templateId,
    }));
  };

  if (isLoading || !project) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0E0D11",
          gap: 16,
        }}
      >
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: 14,
            background: "var(--grad-royal-maroon)",
            border: "1.5px solid #FFE494",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "pulseGold 2s infinite",
          }}
        >
          <Sparkles size={28} color="#FFE494" />
        </div>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.2rem",
            color: "#FFE494",
            letterSpacing: "1px",
          }}
        >
          ShaadiMotion
        </div>
        <div style={{ fontSize: "0.85rem", color: "#9CA3AF" }}>
          Loading your Indian wedding studio...
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#0E0D11",
      }}
    >
      {/* Universal Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenGenerator={() => setIsGeneratorOpen(true)}
        activeProjectName={project.name}
      />

      {/* Main Tab Views */}
      <main style={{ flex: 1 }}>
        {currentTab === "home" && (
          <>
            <HeroSection
              project={project}
              onNavigateToCreate={() => setCurrentTab("create")}
              onNavigateToTemplates={() => setCurrentTab("templates")}
              onOpenGenerator={() => setIsGeneratorOpen(true)}
            />

            {/* Popular Templates Showcase on Homepage */}
            <div
              style={{
                background:
                  "linear-gradient(180deg, #0E0D11 0%, #15131C 50%, #0E0D11 100%)",
                borderTop: "1px solid rgba(212, 175, 55, 0.2)",
                borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
                padding: "20px 0",
              }}
            >
              <TemplateGallery
                selectedTemplateId={project.templateId}
                onSelectTemplate={handleSelectTemplate}
                onPreviewTemplate={(tid) => {
                  handleSelectTemplate(tid);
                  setCurrentTab("editor");
                }}
              />
            </div>

            <HowItWorks
              onNavigateToCreate={() => setCurrentTab("create")}
              onNavigateToTemplates={() => setCurrentTab("templates")}
            />

            <FeaturesSection />

            {/* Bottom Homepage Banner CTA */}
            <section
              style={{
                maxWidth: 1100,
                margin: "0 auto 60px",
                padding: "40px 24px",
                borderRadius: 20,
                background: "var(--grad-royal-maroon)",
                border: "2px solid var(--gold-primary)",
                boxShadow: "var(--shadow-gold-md)",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "2.2rem",
                  color: "#FFFDF9",
                }}
              >
                Ready to Create Your Dream Wedding Invitation?
              </h2>
              <p
                style={{
                  fontSize: "1.05rem",
                  color: "#FFE494",
                  maxWidth: 680,
                  lineHeight: 1.6,
                }}
              >
                Enter couple details, pick your favorite royal theme, and export
                a 1080p video directly in your browser. No subscription, no
                watermarks, completely free and private.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 14,
                  flexWrap: "wrap",
                  marginTop: 8,
                }}
              >
                <button
                  onClick={() => setCurrentTab("create")}
                  className="btn btn-gold"
                  style={{ padding: "14px 32px", fontSize: "1rem" }}
                >
                  <Heart size={18} fill="#2D050D" />
                  <span>Start Creating Free</span>
                </button>
                <button
                  onClick={() => setCurrentTab("editor")}
                  className="btn btn-outline-gold"
                  style={{
                    padding: "14px 28px",
                    fontSize: "1rem",
                    background: "rgba(0,0,0,0.4)",
                  }}
                >
                  <Film size={18} />
                  <span>Open Video Studio</span>
                </button>
              </div>
            </section>
          </>
        )}

        {currentTab === "create" && (
          <WeddingDetailsForm
            project={project}
            onUpdateProject={handleUpdateProject}
            onNavigateToPreview={() => setCurrentTab("editor")}
          />
        )}

        {currentTab === "templates" && (
          <TemplateGallery
            selectedTemplateId={project.templateId}
            onSelectTemplate={handleSelectTemplate}
            onPreviewTemplate={(tid) => {
              handleSelectTemplate(tid);
              setCurrentTab("editor");
            }}
          />
        )}

        {currentTab === "editor" && (
          <VideoEditor
            project={project}
            onUpdateProject={handleUpdateProject}
            onOpenGenerator={() => setIsGeneratorOpen(true)}
          />
        )}

        {currentTab === "projects" && (
          <ProjectDashboard
            projects={projectsList}
            activeProjectId={project.id}
            onOpenProject={handleOpenProject}
            onRefreshProjects={refreshProjectsList}
            onNavigateToCreate={() => setCurrentTab("create")}
          />
        )}
      </main>

      {/* Video Generator Modal (Real Browser-Based Video Rendering) */}
      <VideoGeneratorModal
        isOpen={isGeneratorOpen}
        onClose={() => setIsGeneratorOpen(false)}
        project={project}
      />

      {/* Royal Footer */}
      <footer
        style={{
          background: "#08080C",
          borderTop: "1px solid rgba(212, 175, 55, 0.25)",
          padding: "36px 20px",
          color: "#9CA3AF",
          fontSize: "0.84rem",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            textAlign: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.2rem",
                fontWeight: 800,
                background: "var(--grad-gold)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ShaadiMotion
            </span>
            <span style={{ color: "#D4AF37" }}>•</span>
            <span style={{ fontFamily: "var(--font-hindi)", color: "#FFE494" }}>
              भारतीय विवाह निमंत्रण वीडियो स्टूडियो
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              flexWrap: "wrap",
              justifyContent: "center",
              color: "#C4B5A5",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <ShieldCheck size={16} color="#4ADE80" /> 100% Client-Side
              Privacy: Your photos stay on your device
            </span>
            <span>•</span>
            <span>Target 1920×1080 30 FPS</span>
            <span>•</span>
            <span>Pure React + Canvas API + Web Audio</span>
          </div>

          <div style={{ color: "#6B7280", fontSize: "0.78rem" }}>
            © {new Date().getFullYear()} ShaadiMotion. Built for memorable
            Indian weddings.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
