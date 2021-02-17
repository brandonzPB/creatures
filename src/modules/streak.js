const getAge = (birthTime, userTime, string = true) => {
  console.log('birthTime', birthTime);

  const difference = userTime - birthTime;

  console.log('difference', difference);

  const dayDifference = (difference / 1000) / 86400;

  const minutes = dayDifference * 1440;
  console.log('minutes', minutes);
  
  const days = dayDifference % 365;
  const years = (dayDifference - days) / 365;

  return string ? `${years} years, and ${Math.round(days)} days old` : minutes;
}

exports.checkCreatureStreak = (streakTimestamp, streakCount, userTime) => {
  // checks if streak is broken, constant, or needs to be incremented

  console.log('streakTimestamp', streakTimestamp);
  console.log('userTime', userTime);
  console.log('streakCount', streakCount);

  const timeDifference = getAge(streakTimestamp, userTime, false);

  console.log('timeDifference', timeDifference);

  if (streakTimestamp === 0 || streakCount === 0) return 'increment';

  if (!timeDifference && timeDifference !== 0) return 'increment';

  if (timeDifference > 2500) return 'broken';
  else if (timeDifference < 1440) return 'constant';
  else return 'increment';
}

exports.updateCreatureStreak = (creature, user, userDispatch) => {
  const newCount = creature.streak_count + 1;
  const newTime = user.new_time;
  const newDay = user.new_day;

  userDispatch({ type: 'UPDATE_STREAK', creature: {
    id: creature.id,
    newCount,
    newTime,
    newDay,
  }});

  return creature;
}