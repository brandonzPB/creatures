const getDifficultyMultiplier = difficulty => {
  if (difficulty === 'Medium-Easy') {
    return 0.25
  } else if (difficulty === 'Medium') {
    return 0.5
  } else if (difficulty === 'Medium-Hard') {
    return 0.75
  } else {
    return 1
  }
}

const getStreakMultiplier = streak => {
  if (streak < 7) {
    return 1;
  } else {
    return 1 + Math.floor(0.015 * 3**((Math.floor(streak / 7))))
  }
}

exports.getDifficultyFactor = difficulty => {
  if (difficulty === 'Medium-Easy') {
    return 1
  } else if (difficulty === 'Medium') {
    return 2
  } else if (difficulty === 'Medium-Hard') {
    return 3
  } else {
    return 4
  }
}

exports.calcExp = (multiplier, streak, difficulty, time) => {
  const difficultyFactor = getDifficultyMultiplier(difficulty);
  const fixedTime = (time === 0) ? 1 : time;
  const streakFactor = getStreakMultiplier(streak);

  return Math.ceil(difficultyFactor * streakFactor * fixedTime * multiplier);
}
