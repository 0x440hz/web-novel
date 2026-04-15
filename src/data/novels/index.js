// A helper to parse the new character format
function parseCharacter(rawContent, filePath) {
  const lines = rawContent.split('\n').map(l => l.trim());

  const id = filePath.split('/').pop().replace('.md', '');
  
  const character = {
    id: id,
    details: {},
    traits: {}
  };
  
  let currentTrait = null;

  for (const line of lines) {
    if (line === '') {
      currentTrait = null;
      continue;
    }

    const kvMatch = line.match(/^([^:]+):\s*(.*)$/);
    if (kvMatch) {
      let key = kvMatch[1].trim();
      let value = kvMatch[2].trim();

      if (key.toLowerCase() === 'nama') {
        character.name = value;
        // Assuming the image name is the character name with the same case
        character.image = `/character/${value}.jpeg`;
      } else if (key.toLowerCase() === 'description') {
        character.description = value;
      } else if (key.toLowerCase() === 'kebiasaan' || key.toLowerCase() === 'hal yang disukai' || key.toLowerCase() === 'hal yang tidak disukai') {
        // Normalize the key to match the object property name
        const traitKey = key.charAt(0).toUpperCase() + key.slice(1).replace('tidak', 'Tidak');
        currentTrait = traitKey;
        character.traits[currentTrait] = [];
      } else {
        character.details[key] = value;
      }
    } else if (line.startsWith('* ')) {
        const traitValue = line.substring(2).trim();
        if (currentTrait) {
            character.traits[currentTrait].push(traitValue);
        }
    }
  }
  
  return character;
}


// Get all meta files. These are the entry points for each novel.
const metaModules = import.meta.glob('./*/meta.js', { eager: true });

// Get all chapter files.
const chapterModules = import.meta.glob('./*/chapters/*.js', { eager: true });

// Get all character files as raw text
const characterModules = import.meta.glob('./*/characters/*.js', { import: 'default', eager: true });

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
    .map(path => parseCharacter(characterModules[path], path));

  return {
    ...meta,
    chapters: novelChapters,
    characters: novelCharacters,
  };
});


export function getNovel(slug) {
  return novels.find((n) => n.slug === slug) ?? null;
}