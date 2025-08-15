import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { useUserAvatar } from '@/hooks/useUserAvatar';
import { Bell, Menu } from 'lucide-react';
import { ViewModeToggle } from '@/components/products/ViewModeToggle';
import { useProductCounts } from '@/hooks/useProductCounts';
import { useProducts } from '@/hooks/useProducts';

interface HeaderProps {
  title: string;
  onMenuClick?: () => void;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
  showViewMode?: boolean;
  productFilters?: {
    search?: string;
    category?: string;
    limit?: number;
    skip?: number;
  };
}

export const Header = ({ title, onMenuClick, viewMode = 'list', onViewModeChange, showViewMode = false, productFilters }: HeaderProps) => {
  const { user, logout } = useAuth();
  const { data: productsData } = useProducts(productFilters || {});
  const { formatProductCount } = useProductCounts(productsData);
  const { initials } = useUserAvatar(user);

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6">
      <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="md:hidden flex-shrink-0"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl font-semibold text-foreground truncate">{title}</h1>
          <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
            Manage your {title.toLowerCase()} inventory{title === 'Products' && productsData?.total ? formatProductCount(productsData.total) : ''}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
        {showViewMode && onViewModeChange && (
          <div className="hidden sm:flex">
            <ViewModeToggle viewMode={viewMode} onViewModeChange={onViewModeChange} />
          </div>
        )}

        <Button variant="ghost" size="sm" className="relative hidden sm:flex">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
            3
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full flex-shrink-0">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-popover border-border shadow-lg" align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">John Admin</p>
                <p className="text-xs text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};