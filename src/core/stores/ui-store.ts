import { makeAutoObservable } from "mobx";

class UIStore {
  isSidebarOpen = true;

  theme: "light" | "dark" = "light";

  isModalOpen = false;
  modalContent: React.ReactNode | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  toggleSidebar = () => {
    this.isSidebarOpen = !this.isSidebarOpen;
  };

  setSidebarOpen = (isOpen: boolean) => {
    this.isSidebarOpen = isOpen;
  };

  toggleTheme = () => {
    this.theme = this.theme === "light" ? "dark" : "light";
  };

  setTheme = (theme: "light" | "dark") => {
    this.theme = theme;
  };

  openModal = (content: React.ReactNode) => {
    this.modalContent = content;
    this.isModalOpen = true;
  };

  closeModal = () => {
    this.isModalOpen = false;
    this.modalContent = null;
  };
}

export const uiStore = new UIStore();
