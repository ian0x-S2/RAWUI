// src/lib/utils/component-loader.ts

/**
 * Represents a source file with its metadata and content
 */
export interface SourceFile {
 name: string;
 path: string;
 code: string;
}

/**
 * Type for the glob import result
 */
type GlobImportResult = Record<string, () => Promise<string>>;

/**
 * Checks if a file should be included based on its extension and name
 */
function shouldIncludeFile(filename: string): boolean {
 const validExtensions = ['.svelte', '.ts', '.js'];
 const hasValidExtension = validExtensions.some((ext) => filename.endsWith(ext));

 // Ignore test files and hidden files
 const isTestFile = /\.(test|spec)\.(ts|js|svelte)$/.test(filename);
 const isHiddenFile = filename.startsWith('.');

 return hasValidExtension && !isTestFile && !isHiddenFile;
}

/**
 * Gets the file icon based on extension
 */
export function getFileIcon(filename: string): string {
 if (filename.endsWith('.svelte')) return '\ue697';
 if (filename.endsWith('.ts')) return '\ue628';
 if (filename.endsWith('.js')) return '\ue74e';
 return '📄';
}

/**
 * Sorts files in a logical order for display
 * 1. index.ts always first
 * 2. Main component (name matching componentId)
 * 3. Other .svelte files
 * 4. Context/state files (containing "ctx", "context", "state")
 * 5. Other .ts files
 * 6. Rest alphabetically
 */
function sortFiles(files: SourceFile[], componentId: string): SourceFile[] {
 return files.sort((a, b) => {
  const aName = a.name.toLowerCase();
  const bName = b.name.toLowerCase();

  // index.ts always first
  if (aName === 'index.ts') return -1;
  if (bName === 'index.ts') return 1;

  // Main component second (matching componentId)
  const aIsMain =
   a.name.toLowerCase().startsWith(componentId.toLowerCase()) &&
   a.name.endsWith('.svelte');
  const bIsMain =
   b.name.toLowerCase().startsWith(componentId.toLowerCase()) &&
   b.name.endsWith('.svelte');

  // Main component matching componentId comes after index.ts
  if (aIsMain && !bIsMain) return -1;
  if (bIsMain && !aIsMain) return 1;

  // .svelte files before .ts files
  const aIsSvelte = a.name.endsWith('.svelte');
  const bIsSvelte = b.name.endsWith('.svelte');
  if (aIsSvelte && !bIsSvelte) return -1;
  if (bIsSvelte && !aIsSvelte) return 1;

  // Context/state files next
  const contextPatterns = ['ctx', 'context', 'state'];
  const aIsContext = contextPatterns.some((p) => aName.includes(p));
  const bIsContext = contextPatterns.some((p) => bName.includes(p));
  if (aIsContext && !bIsContext) return 1; // context files after svelte
  if (bIsContext && !aIsContext) return -1;

  // Alphabetical for the rest
  return a.name.localeCompare(b.name);
 });
}

/**
 * Loads component source files from a glob import result
 *
 * @param componentId - The component directory name (e.g., "dropdown")
 * @param globResult - The result of import.meta.glob with ?raw query
 * @returns Promise<SourceFile[]> - Array of source files with their content
 *
 * @example
 * ```ts
 * const sources = import.meta.glob('/src/lib/components/**\/*.{svelte,ts,js}', {
 *   query: '?raw',
 *   import: 'default'
 * });
 * const files = await loadComponentFiles('dropdown', sources);
 * ```
 */
export async function loadComponentFiles(
 componentId: string,
 globResult: GlobImportResult
): Promise<SourceFile[]> {
 if (!componentId) {
  return [];
 }

 const basePath = `/src/lib/components/${componentId}/`;
 const files: SourceFile[] = [];

 // Filter paths that belong to this component
 const componentPaths = Object.keys(globResult).filter((path) => {
  // Must be in the component directory
  if (!path.startsWith(basePath)) return false;

  // Get the relative path after the base
  const relativePath = path.slice(basePath.length);

  // Get the filename (last part of the path)
  const filename = relativePath.split('/').pop() || '';

  return shouldIncludeFile(filename);
 });

 if (componentPaths.length === 0) {
  console.error(`[component-loader] No files found for component: ${componentId}`);
  return [];
 }

 // Load all files in parallel
 const loadPromises = componentPaths.map(async (fullPath) => {
  try {
   const code = await globResult[fullPath]();
   const name = fullPath.split('/').pop() || '';
   const path = fullPath.replace('/src/', 'src/');

   return { name, path, code };
  } catch (error) {
   console.error(`[component-loader] Failed to load file: ${fullPath}`, error);
   return null;
  }
 });

 const results = await Promise.all(loadPromises);

 // Filter out failed loads
 for (const result of results) {
  if (result) {
   files.push(result);
  }
 }

 // Sort files in logical order
 return sortFiles(files, componentId);
}

/**
 * Lists all available component directories from a glob result
 * Useful for debugging or generating component lists
 */
export function listAvailableComponents(globResult: GlobImportResult): string[] {
 const componentSet = new Set<string>();
 const basePath = '/src/lib/components/';

 for (const path of Object.keys(globResult)) {
  if (path.startsWith(basePath)) {
   const relativePath = path.slice(basePath.length);
   const componentDir = relativePath.split('/')[0];
   if (componentDir) {
    componentSet.add(componentDir);
   }
  }
 }

 return Array.from(componentSet).sort();
}
