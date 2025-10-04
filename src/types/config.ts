export interface UserscriptHeaderConfig {
  name: string;
  namespace?: string;
  author?: string;
  version: string;
  description: string;
  license?: string;

  match: string | string[];

  icon?: string;

  require?: string | string[];
  resource?: string | string[];

  grant?: string[];

  downloadURL?: string;
  updateURL?: string;

  supportURL?: string;
  homepageURL?: string;
}

export interface UserscriptConfig {
  header: UserscriptHeaderConfig;
}
