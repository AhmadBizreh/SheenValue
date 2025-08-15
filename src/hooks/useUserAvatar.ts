export const useUserAvatar = (user: { email?: string; firstName?: string; lastName?: string } | null) => {
  const getInitials = () => {
    if (!user) return 'U';
    
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    
    if (user.firstName) {
      return user.firstName.slice(0, 2).toUpperCase();
    }
    
    if (user.lastName) {
      return user.lastName.slice(0, 2).toUpperCase();
    }
    
    if (user.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    
    return 'U';
  };

  return {
    initials: getInitials(),
  };
};