import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/Navbar";
import { createDevice } from "@/lib/devices";
import { ArrowLeft, Plus, Monitor } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AddDevice() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: t('toast.error'),
        description: t('toast.deviceNameRequired'),
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const device = createDevice(name.trim());
    
    toast({
      title: t('toast.deviceCreated'),
      description: t('toast.configGenerated'),
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
          {t('device.backToDashboard')}
        </Button>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-xl animate-scale-in">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <Monitor className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{t('device.addNew')}</h1>
              <p className="text-muted-foreground">
                {t('device.createConfig')}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">{t('device.deviceName')}</Label>
              <Input
                id="name"
                type="text"
                placeholder={t('device.namePlaceholder')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
              />
              <p className="text-xs text-muted-foreground">
                {t('device.nameHint')}
              </p>
            </div>

            <div className="bg-secondary/50 rounded-lg p-4 border border-border">
              <h3 className="text-sm font-medium mb-2">{t('device.whatNext')}</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• {t('device.nextSteps.generate')}</li>
                <li>• {t('device.nextSteps.download')}</li>
                <li>• {t('device.nextSteps.import')}</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => navigate("/dashboard")}
              >
                {t('common.cancel')}
              </Button>
              <Button
                type="submit"
                variant="hero"
                className="flex-1"
                disabled={loading}
              >
                {loading ? (
                  t('device.creating')
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    {t('device.createDevice')}
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
