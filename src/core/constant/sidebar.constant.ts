interface SimpleNavItem {
  title: string;
  url: string;
  isActive?: boolean;
}

interface DocumentItem {
  name: string;
  url: string;
}

interface SidebarItems {
  navMain: SimpleNavItem[];
  documents: DocumentItem[];
}

export const SIDEBAR_ITEMS: SidebarItems = {
  navMain: [
    { title: "sidebar.dashboard", url: "/dashboard" },
    {
      title: "sidebar.reservations",
      url: "/reservations",
    },
    { title: "sidebar.resources", url: "/resources" },
    { title: "sidebar.analytics", url: "/analytics" },
  ],
  documents: [
    { name: "sidebar.reports", url: "#" },
    { name: "sidebar.documents", url: "#" },
  ],
};
