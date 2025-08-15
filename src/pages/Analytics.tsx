import { DashboardLayout } from '@/components/layout/DashboardLayout';

const Analytics = () => {
  return (
    <DashboardLayout title="Analytics">
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            This page will contain analytics and reporting functionality.
            <br />
            Features coming soon: Sales reports, performance metrics, and data visualization.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;