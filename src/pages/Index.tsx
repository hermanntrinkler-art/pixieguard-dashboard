import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { PixieLogo } from "@/components/PixieLogo";
import { Shield, Lock, Zap, Globe, ArrowRight, CheckCircle } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const features = [
    {
      icon: Shield,
      title: t('home.features.security'),
      description: t('home.features.securityDesc'),
    },
    {
      icon: Zap,
      title: t('home.features.fast'),
      description: t('home.features.fastDesc'),
    },
    {
      icon: Lock,
      title: t('home.features.privacy'),
      description: t('home.features.privacyDesc'),
    },
    {
      icon: Globe,
      title: t('home.features.global'),
      description: t('home.features.globalDesc'),
    },
  ];

  const benefits = [
    t('home.benefits.items.qr'),
    t('home.benefits.items.config'),
    t('home.benefits.items.multiDevice'),
    t('home.benefits.items.dashboard'),
    t('home.benefits.items.guides'),
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center animate-fade-in">
            <div className="flex justify-center mb-8">
              <PixieLogo size="lg" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="text-foreground">{t('home.hero.private')}</span>{" "}
              <span className="gradient-text">{t('home.hero.simple')}</span>{" "}
              <span className="text-foreground">{t('home.hero.secure')}</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              {t('home.hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="hero"
                size="xl"
                onClick={() => navigate("/login")}
                className="group"
              >
                {t('nav.getStarted')}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="xl"
                onClick={() => navigate("/setup")}
              >
                {t('home.cta.viewGuides')}
              </Button>
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute top-20 left-10 animate-float opacity-20">
            <Shield className="h-16 w-16 text-primary" />
          </div>
          <div className="absolute bottom-20 right-10 animate-float opacity-20" style={{ animationDelay: "2s" }}>
            <Lock className="h-12 w-12 text-accent" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4">
            {t('home.features.title')}
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            {t('home.benefits.subtitle')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                {t('home.benefits.title')}
              </h2>
              <p className="text-muted-foreground mb-8">
                {t('home.benefits.subtitle')}
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-xl bg-card border border-border p-6 shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-secondary rounded w-3/4" />
                  <div className="h-4 bg-secondary rounded w-1/2" />
                  <div className="h-20 bg-secondary rounded" />
                  <div className="flex gap-2">
                    <div className="h-8 bg-primary/20 rounded w-20" />
                    <div className="h-8 bg-primary/20 rounded w-20" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t('home.cta.readyStart')}
          </h2>
          <p className="text-muted-foreground mb-8">
            {t('home.cta.readyDesc')}
          </p>
          <Button variant="hero" size="xl" onClick={() => navigate("/pricing")}>
            {t('home.cta.createAccount')}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <PixieLogo size="sm" />
          <p className="text-sm text-muted-foreground">
            {t('home.footer.copyright')}
          </p>
        </div>
      </footer>
    </div>
  );
}
