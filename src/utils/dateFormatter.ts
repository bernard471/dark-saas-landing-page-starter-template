export const formatLastLogin = (lastLoginDate: string) => {
  const now = new Date();
  const loginDate = new Date(lastLoginDate);
  const diffInHours = Math.floor((now.getTime() - loginDate.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    return 'Just now';
  } else if (diffInHours === 1) {
    return '1 hour ago';
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else {
    return loginDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }
}
