import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/Navbar";
import { ArrowLeft, Smartphone, Monitor, Apple } from "lucide-react";

const platforms = [
  { id: "android", label: "Android", icon: Smartphone },
  { id: "ios", label: "iOS", icon: Apple },
  { id: "windows", label: "Windows", icon: Monitor },
  { id: "mac", label: "macOS", icon: Apple },
];

export default function Setup() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto max-w-4xl px-4 pt-24 pb-12">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('common.back')}
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('setup.title')}</h1>
          <p className="text-muted-foreground">
            {t('setup.subtitle')}
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xl animate-scale-in">
          <Tabs defaultValue="android" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8 bg-secondary">
              {platforms.map((platform) => (
                <TabsTrigger
                  key={platform.id}
                  value={platform.id}
                  className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <platform.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{t(`setup.platforms.${platform.id}`)}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="android" className="space-y-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                {t('setup.platforms.android')} Setup
              </h2>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">1</span>
                  <div>
                    <p className="font-medium">{t('setup.android.step1Title')}</p>
                    <p className="text-sm text-muted-foreground">{t('setup.android.step1Desc')}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">2</span>
                  <div>
                    <p className="font-medium">{t('setup.android.step2Title')}</p>
                    <p className="text-sm text-muted-foreground">{t('setup.android.step2Desc')}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">3</span>
                  <div>
                    <p className="font-medium">{t('setup.android.step3Title')}</p>
                    <p className="text-sm text-muted-foreground">{t('setup.android.step3Desc')}</p>
                  </div>
                </li>
              </ol>
            </TabsContent>

            <TabsContent value="ios" className="space-y-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Apple className="h-5 w-5 text-primary" />
                {t('setup.platforms.ios')} Setup
              </h2>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">1</span>
                  <div>
                    <p className="font-medium">{t('setup.ios.step1Title')}</p>
                    <p className="text-sm text-muted-foreground">{t('setup.ios.step1Desc')}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">2</span>
                  <div>
                    <p className="font-medium">{t('setup.ios.step2Title')}</p>
                    <p className="text-sm text-muted-foreground">{t('setup.ios.step2Desc')}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">3</span>
                  <div>
                    <p className="font-medium">{t('setup.ios.step3Title')}</p>
                    <p className="text-sm text-muted-foreground">{t('setup.ios.step3Desc')}</p>
                  </div>
                </li>
              </ol>
            </TabsContent>

            <TabsContent value="windows" className="space-y-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Monitor className="h-5 w-5 text-primary" />
                {t('setup.platforms.windows')} Setup
              </h2>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">1</span>
                  <div>
                    <p className="font-medium">{t('setup.windows.step1Title')}</p>
                    <p className="text-sm text-muted-foreground">{t('setup.windows.step1Desc')}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">2</span>
                  <div>
                    <p className="font-medium">{t('setup.windows.step2Title')}</p>
                    <p className="text-sm text-muted-foreground">{t('setup.windows.step2Desc')}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">3</span>
                  <div>
                    <p className="font-medium">{t('setup.windows.step3Title')}</p>
                    <p className="text-sm text-muted-foreground">{t('setup.windows.step3Desc')}</p>
                  </div>
                </li>
              </ol>
            </TabsContent>

            <TabsContent value="mac" className="space-y-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Apple className="h-5 w-5 text-primary" />
                {t('setup.platforms.mac')} Setup
              </h2>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">1</span>
                  <div>
                    <p className="font-medium">{t('setup.mac.step1Title')}</p>
                    <p className="text-sm text-muted-foreground">{t('setup.mac.step1Desc')}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">2</span>
                  <div>
                    <p className="font-medium">{t('setup.mac.step2Title')}</p>
                    <p className="text-sm text-muted-foreground">{t('setup.mac.step2Desc')}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">3</span>
                  <div>
                    <p className="font-medium">{t('setup.mac.step3Title')}</p>
                    <p className="text-sm text-muted-foreground">{t('setup.mac.step3Desc')}</p>
                  </div>
                </li>
              </ol>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
