import { DashboardLayout } from '@/components/layout/DashboardLayout';

const Customers = () => {
  return (
    <DashboardLayout title="Customers">
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Customer Management</h2>
          <p className="text-muted-foreground">
            This page will contain customer management functionality.
            <br />
            Features coming soon: Customer profiles, communication history, and analytics.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Customers;