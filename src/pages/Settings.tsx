import { DashboardLayout } from '@/components/layout/DashboardLayout';

const Settings = () => {
  return (
    <DashboardLayout title="Settings">
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Application Settings</h2>
          <p className="text-muted-foreground">
            This page will contain application settings and configuration.
            <br />
            Features coming soon: User preferences, system settings, and integrations.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;