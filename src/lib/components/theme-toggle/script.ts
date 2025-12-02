export const script = (
 attribute: any,
 storageKey: string,
 defaultTheme: string,
 forcedTheme: string | undefined,
 themes: string[],
 value: any,
 enableSystem: boolean,
 enableColorScheme: boolean
) => {
 const el = document.documentElement;
 const systemThemes = ['light', 'dark'];

 function updateDOM(theme: string) {
  const attributes = Array.isArray(attribute) ? attribute : [attribute];

  attributes.forEach((attr) => {
   const isClass = attr === 'class';
   const classes = isClass && value ? themes.map((t) => value[t] || t) : themes;

   if (isClass) {
    el.classList.remove(...classes);
    if (value && value[theme]) {
     el.classList.add(value[theme]);
    } else if (theme) {
     el.classList.add(theme);
    }
   } else {
    if (theme) {
     el.setAttribute(attr, theme);
    } else {
     el.removeAttribute(attr);
    }
   }
  });

  if (enableColorScheme) {
   const fallback = systemThemes.includes(defaultTheme) ? defaultTheme : null;
   const colorScheme = systemThemes.includes(theme) ? theme : fallback;
   el.style.colorScheme = colorScheme || 'light';
  }
 }

 function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
 }

 if (forcedTheme) {
  updateDOM(forcedTheme);
 } else {
  try {
   const themeName = localStorage.getItem(storageKey) || defaultTheme;
   const isSystem = enableSystem && themeName === 'system';
   const theme = isSystem ? getSystemTheme() : themeName;
   updateDOM(theme);
  } catch (e) {
   // Fail silent
  }
 }
};
