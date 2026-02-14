import { create } from 'zustand'

export const useStore = create((set) => ({
  // Navigation state
  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),
  
  // Station state
  activeStation: null,
  setActiveStation: (station) => set({ activeStation: station }),
  
  // Modal state
  modalOpen: false,
  modalContent: null,
  openModal: (content) => set({ modalOpen: true, modalContent: content }),
  closeModal: () => set({ modalOpen: false, modalContent: null }),
  
  // Project modal
  selectedProject: null,
  setSelectedProject: (project) => set({ selectedProject: project }),
  
  // Performance settings
  performanceMode: 'high', // 'high', 'medium', 'low'
  setPerformanceMode: (mode) => set({ performanceMode: mode }),
  
  // Mobile detection
  isMobile: false,
  setIsMobile: (value) => set({ isMobile: value }),
  
  // First visit guide
  showGuide: true,
  setShowGuide: (value) => set({ showGuide: value }),
  
  // Camera position for 3D scene
  cameraTarget: [0, 0, 5],
  setCameraTarget: (target) => set({ cameraTarget: target }),
}))
