import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    toast({
      title: t('settings.languageChanged'),
      description: t('settings.languageChangedDesc'),
    });
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

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

        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">{t('settings.title')}</h1>

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
