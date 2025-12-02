export type Theme = string;
export type Attribute = 'class' | `data-${string}`;

export interface ThemeState {
 theme: string | undefined;
 resolvedTheme: string | undefined;
 systemTheme: 'dark' | 'light' | undefined;
 themes: string[];
 forcedTheme: string | undefined;
 setTheme: (theme: string) => void;
}
