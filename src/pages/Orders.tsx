import { DashboardLayout } from '@/components/layout/DashboardLayout';

const Orders = () => {
  return (
    <DashboardLayout title="Orders">
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Orders Management</h2>
          <p className="text-muted-foreground">
            This page will contain order management functionality.
            <br />
            Features coming soon: Order tracking, status updates, and order history.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Orders;