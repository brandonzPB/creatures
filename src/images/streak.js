import * as age from './age';

exports.checkCreatureStreak = (creature) => {
  // checks if streak is broken ('broken', 'constant', or 'increment')

  const streakTimestamp = creature.streak_timestamp;
  const streakDay = creature.streak_day;
  const thisDay = (new Date()).getDay();

  if (streakDay === 6) { // Streak continues if current week day is 0 and less than 24 hours passed

    if (thisDay !== 0 && thisDay !== 6) { // Streak broken
      return 'broken';
    } else if (thisDay === 0) { // Next week day
      // if more than 2 days passed; streak is over
      // else, increment streak count

      const minDifference = age.getAge(streakTimestamp, false);
      return minDifference > 2880 ? 'broken' : 'increment';
    } else { // Same day

      return 'constant';
    }

  } else { // Streak continues if current week day is streak.timestamp + 1, and if less than 24 hours passed
    
    if (thisDay === streakDay + 1) {
      // if more than 2 days passed; streak is over
      // else, increment streak count

      const minDifference = age.getAge(streakTimestamp, false);
      return minDifference > 2880 ? 'broken' : 'increment';
    } else if (streakDay === thisDay) { // Same day

      return 'constant';
    } else {
      return 'broken';
    }
  }
}
