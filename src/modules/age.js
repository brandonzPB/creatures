const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

exports.getBirthdate = () => {
  const date = new Date();

  const monthIndex = date.getMonth();
  const month = months[monthIndex];

  return `${date.getDate()} ${month}, ${date.getFullYear()}`;
}

exports.getAge = (birthTime, string = true) => {
  const currentTime = Date.now();
  const difference = currentTime - birthTime;

  const dayDifference = (difference / 1000) / 86400;

  const minutes = dayDifference * 1440;
  const days = dayDifference % 365;
  const years = (dayDifference - days) / 365;

  return string ? `${years} years, and ${Math.round(days)} days old` : minutes;
}
