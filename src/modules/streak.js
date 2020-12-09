const getAge = (birthTime, string = true) => {
  const currentTime = Date.now();
  const difference = currentTime - birthTime;

  const dayDifference = (difference / 1000) / 86400;

  const minutes = dayDifference * 1440;
  const days = dayDifference % 365;
  const years = (dayDifference - days) / 365;

  return string ? `${years} years, and ${Math.round(days)} days old` : minutes;
}

exports.checkCreatureStreak = (thisDay, streakTimestamp, streakDay) => {
  // checks if streak is broken, constant, or needs to be incremented

  if (streakDay === 6) { // Streak continues if current week day is 0 and less than 24 hours passed

    if (thisDay !== 0 && thisDay !== 6) { // Streak broken
      return 'broken';
    } else if (thisDay === 0) { // Next week day
      // if more than 2 days passed; streak is over
      // else, increment streak count

      const minDifference = getAge(streakTimestamp, false);
      return minDifference > 2880 ? 'broken' : 'increment';
    } else { // Same day

      return 'constant';
    }

  } else { // Streak continues if current week day is streak.timestamp + 1, and if less than 24 hours passed
    
    if (thisDay === streakDay + 1) {
      // if more than 2 days passed; streak is over
      // else, increment streak count

      const minDifference = getAge(streakTimestamp, false);
      return minDifference > 2880 ? 'broken' : 'increment';
    } else if (streakDay === thisDay) { // Same day

      return 'constant';
    } else {
      return 'broken';
    }
  }
}

exports.updateCreatureStreak = (creature, userDispatch, finish) => {
  const newCount = creature.streak_count + 1;
  const newTimestamp = Date.now();
  const newDay = (new Date()).getDay();

  userDispatch({ type: 'UPDATE_STREAK', creature: {
    id: creature.id,
    newCount,
    newTimestamp,
    newDay,
  }});

  finish('creature', creature, 'stats');

  return creature;
}

exports.resetCreatureStreak = (creature, userDispatch, finish) => {
  const newCount = 0;
  const newTimestamp = Date.now();
  const newDay = (new Date()).getDay();

  userDispatch({ type: 'UPDATE_STREAK', creature: {
    id: creature.id,
    newCount,
    newTimestamp,
    newDay,
  }});

  finish('creature', creature, 'stats');
  
  return creature;
};