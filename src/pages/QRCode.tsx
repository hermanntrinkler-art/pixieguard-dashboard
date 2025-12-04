import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { getDevice, Device, downloadConfig, updateDeviceConfig } from "@/lib/devices";
import { isServerConfigured } from "@/lib/storage/serverConfigStorage";
import { ArrowLeft, Download, Monitor, AlertTriangle, RefreshCw } from "lucide-react";

export default function QRCodePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [device, setDevice] = useState<Device | null>(null);
  const [serverConfigured, setServerConfigured] = useState(false);

  useEffect(() => {
    setServerConfigured(isServerConfigured());
    if (id) {
      const d = getDevice(id);
      if (d) {
        setDevice(d);
      } else {
        navigate("/dashboard");
      }
    }
  }, [id, navigate]);

  const handleRegenerateConfig = () => {
    if (id) {
      const updated = updateDeviceConfig(id);
      if (updated) {
        setDevice(updated);
      }
    }
  };

  if (!device) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto max-w-2xl px-4 pt-24 pb-12">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(`/device/${device.id}`)}
          className="mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('common.back')}
        </Button>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-xl text-center animate-scale-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Monitor className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold">{device.name}</h1>
          </div>

          <p className="text-muted-foreground mb-8">
            {t('qr.scanDesc')}
          </p>

          {!serverConfigured && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <p className="text-sm font-medium text-destructive">{t('qr.serverNotConfigured')}</p>
                <p className="text-sm text-muted-foreground mt-1">{t('qr.serverNotConfiguredDesc')}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => navigate('/settings')}
                >
                  {t('qr.goToSettings')}
                </Button>
              </div>
            </div>
          )}

          {serverConfigured && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleRegenerateConfig}
              className="mb-4"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              {t('qr.regenerateConfig')}
            </Button>
          )}

          <div className="inline-block p-6 bg-white rounded-2xl shadow-lg mb-8">
            <QRCodeSVG
              value={device.config}
              size={280}
              level="M"
              includeMargin={false}
              bgColor="#ffffff"
              fgColor="#0D1117"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" onClick={() => navigate(`/device/${device.id}`)}>
              {t('qr.viewConfig')}
            </Button>
            <Button variant="hero" onClick={() => downloadConfig(device)}>
              <Download className="h-4 w-4 mr-2" />
              {t('qr.downloadConfig')}
            </Button>
          </div>

          <div className="mt-8 p-4 bg-secondary/50 rounded-lg text-left">
            <h3 className="text-sm font-semibold mb-2">{t('qr.howToScan')}</h3>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>{t('qr.steps.step1')}</li>
              <li>{t('qr.steps.step2')}</li>
              <li>{t('qr.steps.step3')}</li>
              <li>{t('qr.steps.step4')}</li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}
