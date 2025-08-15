import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
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

export const DashboardLayout = ({ 
  children, 
  title, 
  viewMode = 'list', 
  onViewModeChange,
  showViewMode = false,
  productFilters
}: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative flex w-64 flex-col bg-sidebar">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col min-w-0">
        <Header 
          title={title} 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
          showViewMode={showViewMode}
          productFilters={productFilters}
        />
        <main className="flex-1 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
};