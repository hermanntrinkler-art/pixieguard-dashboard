import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { PixieLogo } from "./PixieLogo";
import { isAuthenticated, logout, getUser } from "@/lib/auth";
import { LogOut, LayoutDashboard, Settings } from "lucide-react";

export function Navbar() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const authenticated = isAuthenticated();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <PixieLogo size="sm" />
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          {authenticated ? (
            <>
              <span className="text-sm text-muted-foreground hidden sm:block">
                {user?.email}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/dashboard")}
              >
                <LayoutDashboard className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">{t('nav.dashboard')}</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/settings")}
                title={t('nav.settings')}
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">{t('nav.logout')}</span>
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/settings")}
                title={t('nav.settings')}
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/login")}
              >
                {t('nav.login')}
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => navigate("/register")}
              >
                {t('nav.getStarted')}
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
