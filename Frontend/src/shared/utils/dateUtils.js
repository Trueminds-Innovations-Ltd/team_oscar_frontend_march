export function formatTimeAgo(date) {
  if (!date) return '';

  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffSeconds < 60) {
    return 'Just now';
  }

  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  }

  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }

  if (diffDays < 7) {
    return `${diffDays}d ago`;
  }

  if (diffWeeks < 4) {
    return `${diffWeeks}w ago`;
  }

  if (diffMonths < 12) {
    return `${diffMonths}mo ago`;
  }

  return formatDate(date);
}

export function formatDate(date) {
  if (!date) return '';
  
  const d = new Date(date);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];
  
  return `${months[d.getMonth()]} ${d.getDate()}${getOrdinalSuffix(d.getDate())} ${d.getFullYear()}`;
}

function getOrdinalSuffix(day) {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

export function formatCourseCountdown(availableDate) {
  if (!availableDate) return '';

  const now = new Date();
  const available = new Date(availableDate);
  const diffMs = available - now;
  
  if (diffMs <= 0) {
    return 'Available now';
  }

  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return 'Tomorrow';
  }

  if (diffDays <= 3) {
    return `${diffDays} days more to go`;
  }

  return formatDate(availableDate);
}

export function isCourseAvailable(availableDate) {
  if (!availableDate) return true;
  return new Date(availableDate) <= new Date();
}
