export type ProjectDetails = {
  title: string;
  description: string;
  picture: string;
  link: string;
  technologies: string;
};

export type Details = {
  name: string;
  image: string;
};

export type SkillsType = {
  languages: Record<string, Details>;
  libraries: Record<string, Details>;
  tools: Record<string, Details>;
  projects: Record<string, ProjectDetails>;
};
