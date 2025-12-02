export type Theme = string;
export type Attribute = 'class' | `data-${string}`;

export interface ThemeConfig {
 themes: string[];
 forcedTheme?: string;
 enableSystem?: boolean;
 disableTransitionOnChange?: boolean;
 enableColorScheme?: boolean;
 storageKey?: string;
 defaultTheme?: string;
 attribute?: Attribute | Attribute[];
 value?: { [themeName: string]: string };
 nonce?: string;
}

export interface ThemeState {
 theme: string | undefined;
 resolvedTheme: string | undefined;
 systemTheme: 'dark' | 'light' | undefined;
 themes: string[];
 forcedTheme: string | undefined;
 setTheme: (theme: string) => void;
}
