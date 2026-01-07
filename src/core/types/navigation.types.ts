export type NavigationLink = {
  label: string;
  href: string;
};

export type NavigationColumn = {
  title: string;
  links: NavigationLink[];
};

export type NavigationSection = {
  id: string;
  trigger: string;
  columns: NavigationColumn[];
  gridCols: 2 | 3 | 4;
};
