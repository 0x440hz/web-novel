// Get all meta files. These are the entry points for each novel.
const metaModules = import.meta.glob('./*/meta.js', { eager: true });

// Get all chapter files.
const chapterModules = import.meta.glob('./*/chapters/*.js', { eager: true });

// Get all character files.
const characterModules = import.meta.glob('./*/characters/*.js', { eager: true });

// A helper to extract the novel's folder name from a path (e.g., './novel1/meta.js' -> 'novel1')
const getNovelFolder = (path) => {
    const parts = path.split('/');
    if(parts.length >= 2) {
        return parts[1];
    }
    return null;
}

export const novels = Object.keys(metaModules).map(metaPath => {
  const novelFolder = getNovelFolder(metaPath);
  const meta = metaModules[metaPath].default;

  const novelChapters = Object.keys(chapterModules)
    .filter(path => getNovelFolder(path) === novelFolder)
    .map(path => chapterModules[path].default)
    .sort((a, b) => a.id - b.id);

  const novelCharacters = Object.keys(characterModules)
    .filter(path => getNovelFolder(path) === novelFolder)
    .map(path => characterModules[path].default);

  return {
    ...meta,
    chapters: novelChapters,
    characters: novelCharacters,
  };
});


export function getNovel(slug) {
  return novels.find((n) => n.slug === slug) ?? null;
}