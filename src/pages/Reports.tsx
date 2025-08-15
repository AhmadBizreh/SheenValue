import { DashboardLayout } from '@/components/layout/DashboardLayout';

const Reports = () => {
  return (
    <DashboardLayout title="Reports">
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Reports Center</h2>
          <p className="text-muted-foreground">
            This page will contain reporting functionality.
            <br />
            Features coming soon: Custom reports, data exports, and scheduled reports.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;