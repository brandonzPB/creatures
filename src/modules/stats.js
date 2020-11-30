exports.getExpGoal = (level, difficulty) => {
  if (difficulty === 'Medium-Easy') {
    return Math.ceil(1.125 * (level**3));
  } else if (difficulty === 'Medium') {
    return Math.ceil(1.25 * (level**3));
  } else if (difficulty === 'Medium-Hard') {
    return Math.ceil(1.33 * (level**3));
  } else if (difficulty === 'Hard') {
    return Math.ceil(1.5 * (level**3));
  }
}

exports.expDepreciation = (creature, objective) => {
  // creature.level, creature.difficulty
  // objective.difficulty, objective.timeStamp
}

exports.getCreatureDifficulty = (purpose, level) => {
  if (purpose === 'vocation') {
    if (level < 20) {
      return 'Medium';
    } else if (level < 50) {
      return 'Medium-Hard';
    } else {
      return 'Hard';
    }
  } else {
    if (level < 20) {
      return 'Medium-Easy';
    }

    if (purpose === 'self-improvement') {
      if (level < 50) {
        return 'Medium';
      } else {
        return 'Medium-Hard';
      }
    } else {
      if (level < 50) {
        return 'Medium-Hard';
      } else {
        return 'Hard';
      }
    }
  }

  // Hobby: ME -> MH -> H
  // Communication: ME -> MH -> H
  // Self-Improvement: ME -> M -> MH
  // Vocation: M -> MH -> H
  // 1.25, 1.33, 1.5, 1.75
}

exports.getExpMultiplier = (level) => {
  /* if (level < 20) {
    return 1.25 * (level**2);
  } else if (level < 40) {
    return 1.33 * (level**2);
  } else if (level < 75) {
    return 1.5 * (level**2);
  } else if (level >= 75 && level < 100) {
    return 1.75 * (level**2);
  } else if (level === 100) {
    return 2 * (level**2);
  } */

  if (level < 15) {
    return 1.25 * (level**2);
  } else if (level < 25) {
    return 1.33 * (level**2);
  } else if (level < 40) {
    return 1.5 * (level**2);
  } else if (level >= 40 && level < 75) {
    return 1.75 * (level**2);
  } else if (level >= 75) {
    return 2 * (level**2);
  }
}
