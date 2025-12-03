import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { getDevice, Device, downloadConfig } from "@/lib/devices";
import { ArrowLeft, Download, Monitor } from "lucide-react";

export default function QRCodePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [device, setDevice] = useState<Device | null>(null);

  useEffect(() => {
    if (id) {
      const d = getDevice(id);
      if (d) {
        setDevice(d);
      } else {
        navigate("/dashboard");
      }
    }
  }, [id, navigate]);

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
          Back to Device
        </Button>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-xl text-center animate-scale-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Monitor className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold">{device.name}</h1>
          </div>

          <p className="text-muted-foreground mb-8">
            Scan this QR code with the WireGuard app on your device
          </p>

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
              View Configuration
            </Button>
            <Button variant="hero" onClick={() => downloadConfig(device)}>
              <Download className="h-4 w-4 mr-2" />
              Download .conf
            </Button>
          </div>

          <div className="mt-8 p-4 bg-secondary/50 rounded-lg text-left">
            <h3 className="text-sm font-semibold mb-2">How to scan:</h3>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Open the WireGuard app on your device</li>
              <li>Tap "Add a tunnel" or the + button</li>
              <li>Select "Create from QR code"</li>
              <li>Point your camera at this QR code</li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}
