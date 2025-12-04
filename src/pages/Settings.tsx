import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Globe, Server, Save, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getServerConfig, saveServerConfig, isServerConfigured } from "@/lib/storage/serverConfigStorage";
import { isValidWireGuardKey } from "@/lib/wireguard/keyValidator";

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

export default function Settings() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Server config state
  const [serverPublicKey, setServerPublicKey] = useState("");
  const [serverIp, setServerIp] = useState("");
  const [serverPort, setServerPort] = useState("51820");
  const [keyValid, setKeyValid] = useState<boolean | null>(null);

  useEffect(() => {
    const config = getServerConfig();
    setServerPublicKey(config.publicKey || "");
    setServerIp(config.publicIp || "");
    setServerPort(config.publicPort?.toString() || "51820");
  }, []);

  useEffect(() => {
    if (serverPublicKey.length > 0) {
      setKeyValid(isValidWireGuardKey(serverPublicKey));
    } else {
      setKeyValid(null);
    }
  }, [serverPublicKey]);

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    toast({
      title: t('settings.languageChanged'),
      description: t('settings.languageChangedDesc'),
    });
  };

  const handleSaveServerConfig = () => {
    if (!isValidWireGuardKey(serverPublicKey)) {
      toast({
        title: t('settings.invalidKey'),
        description: t('settings.invalidKeyDesc'),
        variant: "destructive",
      });
      return;
    }

    const port = parseInt(serverPort, 10);
    if (isNaN(port) || port < 1 || port > 65535) {
      toast({
        title: t('settings.invalidPort'),
        description: t('settings.invalidPortDesc'),
        variant: "destructive",
      });
      return;
    }

    saveServerConfig({
      publicKey: serverPublicKey,
      publicIp: serverIp,
      publicPort: port,
    });

    toast({
      title: t('settings.serverSaved'),
      description: t('settings.serverSavedDesc'),
    });
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];
  const isConfigured = isServerConfigured();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('common.back')}
        </Button>

        <div className="max-w-2xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold mb-8">{t('settings.title')}</h1>

          {/* Server Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                {t('settings.serverConfig')}
                {isConfigured ? (
                  <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-amber-500 ml-auto" />
                )}
              </CardTitle>
              <CardDescription>
                {t('settings.serverConfigDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="serverPublicKey">{t('settings.serverPublicKey')}</Label>
                <div className="relative">
                  <Input
                    id="serverPublicKey"
                    value={serverPublicKey}
                    onChange={(e) => setServerPublicKey(e.target.value)}
                    placeholder="rPzq8UnYw5IqgBnh13mnuJ9g/+XeunG5ACFqKjqv3mQ="
                    className={keyValid === false ? "border-destructive" : keyValid === true ? "border-green-500" : ""}
                  />
                  {keyValid !== null && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2">
                      {keyValid ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-destructive" />
                      )}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {t('settings.serverPublicKeyHint')}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="serverIp">{t('settings.serverIp')}</Label>
                  <Input
                    id="serverIp"
                    value={serverIp}
                    onChange={(e) => setServerIp(e.target.value)}
                    placeholder="vpn.example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serverPort">{t('settings.serverPort')}</Label>
                  <Input
                    id="serverPort"
                    type="number"
                    value={serverPort}
                    onChange={(e) => setServerPort(e.target.value)}
                    placeholder="51820"
                  />
                </div>
              </div>

              <Button onClick={handleSaveServerConfig} className="w-full sm:w-auto">
                <Save className="h-4 w-4 mr-2" />
                {t('settings.saveServer')}
              </Button>
            </CardContent>
          </Card>

          {/* Language Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                {t('settings.language')}
              </CardTitle>
              <CardDescription>
                {t('settings.selectLanguage')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select
                value={i18n.language}
                onValueChange={handleLanguageChange}
              >
                <SelectTrigger className="w-full sm:w-[280px]">
                  <SelectValue>
                    <span className="flex items-center gap-2">
                      <span>{currentLanguage.flag}</span>
                      <span>{currentLanguage.name}</span>
                    </span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
