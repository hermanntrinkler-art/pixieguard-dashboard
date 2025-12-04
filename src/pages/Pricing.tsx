import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useToast } from "@/hooks/use-toast";
import { Check, Crown, Loader2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export default function Pricing() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { subscription, loading, createCheckout, openCustomerPortal, checkSubscription } = useSubscription();
  const { toast } = useToast();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // Handle canceled checkout
  useEffect(() => {
    if (searchParams.get("canceled") === "true") {
      toast({
        title: t('pricing.checkoutCanceled'),
        description: t('pricing.checkoutCanceledDesc'),
      });
    }
  }, [searchParams]);

  const handleSubscribe = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setCheckoutLoading(true);
    const url = await createCheckout();
    setCheckoutLoading(false);

    if (url) {
      window.open(url, "_blank");
    } else {
      toast({
        title: t('pricing.error'),
        description: t('pricing.errorDesc'),
        variant: "destructive",
      });
    }
  };

  const handleManageSubscription = async () => {
    setCheckoutLoading(true);
    const url = await openCustomerPortal();
    setCheckoutLoading(false);

    if (url) {
      window.open(url, "_blank");
    } else {
      toast({
        title: t('pricing.error'),
        description: t('pricing.portalErrorDesc'),
        variant: "destructive",
      });
    }
  };

  const freeFeatures = [
    t('pricing.freeFeature1'),
    t('pricing.freeFeature2'),
    t('pricing.freeFeature3'),
  ];

  const premiumFeatures = [
    t('pricing.premiumFeature1'),
    t('pricing.premiumFeature2'),
    t('pricing.premiumFeature3'),
    t('pricing.premiumFeature4'),
    t('pricing.premiumFeature5'),
  ];

  const isPremium = subscription.subscribed || subscription.trialing;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('pricing.title')}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <Card className="relative">
            <CardHeader>
              <CardTitle className="text-2xl">{t('pricing.freePlan')}</CardTitle>
              <CardDescription>{t('pricing.freeDesc')}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">€0</span>
                <span className="text-muted-foreground">/{t('pricing.month')}</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {freeFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                variant="outline" 
                className="w-full mt-6"
                onClick={() => user ? navigate("/dashboard") : navigate("/register")}
              >
                {user ? t('pricing.currentPlan') : t('pricing.getStarted')}
              </Button>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="relative border-primary shadow-lg">
            {isPremium && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Crown className="h-4 w-4" />
                  {subscription.trialing ? t('pricing.trial') : t('pricing.yourPlan')}
                </span>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                {t('pricing.premiumPlan')}
              </CardTitle>
              <CardDescription>{t('pricing.premiumDesc')}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">€4.99</span>
                <span className="text-muted-foreground">/{t('pricing.month')}</span>
              </div>
              <p className="text-sm text-primary mt-2">
                {t('pricing.trialInfo')}
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {premiumFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              {isPremium ? (
                <Button 
                  variant="outline" 
                  className="w-full mt-6"
                  onClick={handleManageSubscription}
                  disabled={checkoutLoading || loading}
                >
                  {checkoutLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  {t('pricing.manageSubscription')}
                </Button>
              ) : (
                <Button 
                  variant="hero" 
                  className="w-full mt-6"
                  onClick={handleSubscribe}
                  disabled={checkoutLoading || loading}
                >
                  {checkoutLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  {t('pricing.startTrial')}
                </Button>
              )}

              {subscription.trialing && subscription.trialEnd && (
                <p className="text-sm text-muted-foreground text-center mt-4">
                  {t('pricing.trialEnds')}: {new Date(subscription.trialEnd).toLocaleDateString()}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
