import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";

interface SubscriptionStatus {
  subscribed: boolean;
  trialing: boolean;
  subscriptionEnd: string | null;
  trialEnd: string | null;
  status: string | null;
}

interface SubscriptionContextType {
  subscription: SubscriptionStatus;
  loading: boolean;
  checkSubscription: () => Promise<void>;
  createCheckout: () => Promise<string | null>;
  openCustomerPortal: () => Promise<string | null>;
}

const defaultSubscription: SubscriptionStatus = {
  subscribed: false,
  trialing: false,
  subscriptionEnd: null,
  trialEnd: null,
  status: null,
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const { session, user } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionStatus>(defaultSubscription);
  const [loading, setLoading] = useState(false);

  const checkSubscription = async () => {
    if (!session) {
      setSubscription(defaultSubscription);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("check-subscription");
      
      if (error) {
        console.error("Error checking subscription:", error);
        setSubscription(defaultSubscription);
        return;
      }

      setSubscription({
        subscribed: data.subscribed || false,
        trialing: data.trialing || false,
        subscriptionEnd: data.subscription_end || null,
        trialEnd: data.trial_end || null,
        status: data.status || null,
      });
    } catch (error) {
      console.error("Error checking subscription:", error);
      setSubscription(defaultSubscription);
    } finally {
      setLoading(false);
    }
  };

  const createCheckout = async (): Promise<string | null> => {
    if (!session) return null;

    try {
      const { data, error } = await supabase.functions.invoke("create-checkout");
      
      if (error) {
        console.error("Error creating checkout:", error);
        return null;
      }

      return data.url;
    } catch (error) {
      console.error("Error creating checkout:", error);
      return null;
    }
  };

  const openCustomerPortal = async (): Promise<string | null> => {
    if (!session) return null;

    try {
      const { data, error } = await supabase.functions.invoke("customer-portal");
      
      if (error) {
        console.error("Error opening customer portal:", error);
        return null;
      }

      return data.url;
    } catch (error) {
      console.error("Error opening customer portal:", error);
      return null;
    }
  };

  // Check subscription when user logs in
  useEffect(() => {
    if (user) {
      checkSubscription();
    } else {
      setSubscription(defaultSubscription);
    }
  }, [user]);

  // Auto-refresh subscription every minute
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      checkSubscription();
    }, 60000);

    return () => clearInterval(interval);
  }, [user]);

  return (
    <SubscriptionContext.Provider value={{ 
      subscription, 
      loading, 
      checkSubscription, 
      createCheckout, 
      openCustomerPortal 
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return context;
}
