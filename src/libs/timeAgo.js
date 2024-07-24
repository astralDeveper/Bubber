export function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const secondsAgo = Math.floor((now - date) / 1000);
  
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);
    const monthsAgo = Math.floor(daysAgo / 30); 
    const yearsAgo = Math.floor(daysAgo / 365); 

    if (secondsAgo < 60) {
      return `${secondsAgo} sec ago`;
    } else if (minutesAgo < 60) {
      return `${minutesAgo} min ago`;
    } else if (hoursAgo < 24) {
      return `${hoursAgo} hrs ago`;
    } else if (daysAgo < 30) {
      return `${daysAgo} days ago`;
    } else if (monthsAgo < 12) {
      return `${monthsAgo} mon ago`;
    } else {
      return `${yearsAgo} years ago`;
    }
  }