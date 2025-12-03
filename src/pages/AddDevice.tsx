import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/Navbar";
import { createDevice } from "@/lib/devices";
import { ArrowLeft, Plus, Monitor } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AddDevice() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a device name.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const device = createDevice(name.trim());
    
    toast({
      title: "Device created!",
      description: `${device.name} has been added to your devices.`,
    });
    
    navigate(`/device/${device.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto max-w-xl px-4 pt-24 pb-12">
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
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <Monitor className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Add New Device</h1>
              <p className="text-muted-foreground">
                Create a VPN configuration for a new device
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Device Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="e.g., MacBook Pro, iPhone 15, Gaming PC"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
              />
              <p className="text-xs text-muted-foreground">
                Choose a name that helps you identify this device later.
              </p>
            </div>

            <div className="bg-secondary/50 rounded-lg p-4 border border-border">
              <h3 className="text-sm font-medium mb-2">What happens next?</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• A unique WireGuard configuration will be generated</li>
                <li>• You can download or scan a QR code</li>
                <li>• Import into any WireGuard client</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="hero"
                className="flex-1"
                disabled={loading}
              >
                {loading ? (
                  "Creating..."
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Device
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
