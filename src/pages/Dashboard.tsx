import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { DeviceCard } from "@/components/DeviceCard";
import { getDevices, Device } from "@/lib/devices";
import { isAuthenticated } from "@/lib/auth";
import { Plus, Shield, BookOpen } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
    loadDevices();
  }, [navigate]);

  const loadDevices = () => {
    setDevices(getDevices());
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto max-w-6xl px-4 pt-24 pb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t('dashboard.title')}</h1>
            <p className="text-muted-foreground">
              {t('dashboard.subtitle')}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate("/setup")}>
              <BookOpen className="h-4 w-4 mr-2" />
              {t('dashboard.setupGuides')}
            </Button>
            <Button variant="hero" onClick={() => navigate("/add-device")}>
              <Plus className="h-4 w-4 mr-2" />
              {t('dashboard.addDevice')}
            </Button>
          </div>
        </div>

        {devices.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
              <Shield className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">{t('dashboard.noDevices')}</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {t('dashboard.noDevicesDesc')}
            </p>
            <Button variant="hero" onClick={() => navigate("/add-device")}>
              <Plus className="h-4 w-4 mr-2" />
              {t('dashboard.addFirst')}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devices.map((device, index) => (
              <div
                key={device.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <DeviceCard device={device} onDelete={loadDevices} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
