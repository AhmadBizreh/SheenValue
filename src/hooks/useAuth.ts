import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import { authService } from '@/services/authService';
import { LoginCredentials } from '@/types/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

export const useAuth = () => {
  const { user, isAuthenticated, login: setUser, logout: clearUser } = useAuthStore();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data, variables) => {
      setUser({
        token: data.token,
        email: variables.email,
      });
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard!",
      });
      navigate('/products');
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const login = (credentials: LoginCredentials) => {
    loginMutation.mutate(credentials);
  };

  const logout = () => {
    clearUser();
    navigate('/login');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
    isLoading: loginMutation.isPending,
  };
};