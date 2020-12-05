import { otherVersions } from './pokemonList';

export const getMegas = creature => {
  let inputs = ['first', 'second', 'third', 'fourth'];
  let selectedVersions = [];

  inputs.map(i => {
    const versionInput = creature[`${i}Mega`].toLowerCase();
    
    if (!creature[`${i}Mega`].trim()) return selectedVersions.push('normal');

    const creatureName = i === 'first' ? creature.firstCreature
        : i === 'second' ? creature.secondCreature
        : i === 'third' ? creature.thirdCreature
        : creature.fourthCreature;

    // get pokemon info from those that have other versions
    const pkmnInfo = otherVersions.filter(pkmn => pkmn.name === creatureName.toLowerCase());

    if (!pkmnInfo[0].name) return selectedVersions.push('normal');
    
    // check if versionInput exists in the pokemon's versions
    const version = pkmnInfo[0].versions.filter(v => v === versionInput);

    // if it does, length of version is greater than 0
    if (version.length > 0) {
      return selectedVersions.push(version);
    }

    return selectedVersions.push('normal');
  });

  return selectedVersions;
}

// PUT MEGAS
export const putMegas = (creature, megas) => {
  const evolutions = [];

  for (let i = 0; i < megas.length; i++) {
    const place = i === 0 ? 'first' :
      i === 1 ? 'second' :
      i === 2 ? 'third' :
      'fourth';

    const selectedVersion = megas[i] === 'normal' ? ''
      : megas[i] === 'none' ? '' 
      : `-${megas[i]}`;

    const creatureInput = place === 'first' ? 'firstCreature'
      : place === 'second' ? 'secondCreature'
      : place === 'third' ? 'thirdCreature'
      : 'fourthCreature';

    const version = `${creature[creatureInput]}${selectedVersion}`;

    evolutions.push(version.toLowerCase());
  }

  return evolutions;
}