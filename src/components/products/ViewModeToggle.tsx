import { Button } from '@/components/ui/button';
import { Grid, List } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ViewModeToggleProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export const ViewModeToggle = ({ viewMode, onViewModeChange }: ViewModeToggleProps) => {
  return (
    <div className="flex items-center border rounded-lg">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onViewModeChange('grid')}
        className={cn(
          "rounded-r-none border-r",
          viewMode === 'grid' && "bg-primary text-primary-foreground"
        )}
      >
        <Grid className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onViewModeChange('list')}
        className={cn(
          "rounded-l-none",
          viewMode === 'list' && "bg-primary text-primary-foreground"
        )}
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
};