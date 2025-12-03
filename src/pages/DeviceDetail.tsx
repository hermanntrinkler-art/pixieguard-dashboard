import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { getDevice, Device, downloadConfig } from "@/lib/devices";
import { ArrowLeft, QrCode, Download, Copy, Check, Monitor } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function DeviceDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [device, setDevice] = useState<Device | null>(null);
  const [copied, setCopied] = useState(false);

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

  const handleCopy = async () => {
    if (device) {
      await navigator.clipboard.writeText(device.config);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Configuration copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!device) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto max-w-4xl px-4 pt-24 pb-12">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/dashboard")}
          className="mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-xl animate-scale-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Monitor className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{device.name}</h1>
                <p className="text-muted-foreground font-mono">
                  {device.internalIp.replace('/32', '')}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => navigate(`/device/${device.id}/qr`)}>
                <QrCode className="h-4 w-4 mr-2" />
                QR Code
              </Button>
              <Button variant="hero" onClick={() => downloadConfig(device)}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Configuration</h2>
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            
            <pre className="bg-background border border-border rounded-lg p-4 overflow-x-auto text-sm font-mono text-foreground">
              {device.config}
            </pre>
          </div>

          <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <h3 className="text-sm font-semibold text-primary mb-2">Next Steps</h3>
            <p className="text-sm text-muted-foreground">
              Download this configuration or scan the QR code with your WireGuard app.{" "}
              <button 
                onClick={() => navigate("/setup")}
                className="text-primary hover:underline"
              >
                View setup guides
              </button>{" "}
              for detailed instructions.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
