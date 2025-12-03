import { useNavigate } from "react-router-dom";
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
          Back
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Setup Guides</h1>
          <p className="text-muted-foreground">
            Follow these step-by-step instructions to connect your device to PixieGuard VPN.
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
                  <span className="hidden sm:inline">{platform.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="android" className="space-y-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                Android Setup
              </h2>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">1</span>
                  <div>
                    <p className="font-medium">Install WireGuard</p>
                    <p className="text-sm text-muted-foreground">Download WireGuard from the Google Play Store.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">2</span>
                  <div>
                    <p className="font-medium">Open the App</p>
                    <p className="text-sm text-muted-foreground">Launch WireGuard and tap the blue + button.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">3</span>
                  <div>
                    <p className="font-medium">Import Configuration</p>
                    <p className="text-sm text-muted-foreground">Choose "Scan from QR code" or "Import from file".</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">4</span>
                  <div>
                    <p className="font-medium">Scan or Select</p>
                    <p className="text-sm text-muted-foreground">Point camera at QR code or select downloaded .conf file.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">5</span>
                  <div>
                    <p className="font-medium">Connect</p>
                    <p className="text-sm text-muted-foreground">Toggle the switch next to your tunnel name to connect.</p>
                  </div>
                </li>
              </ol>
            </TabsContent>

            <TabsContent value="ios" className="space-y-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Apple className="h-5 w-5 text-primary" />
                iOS Setup
              </h2>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">1</span>
                  <div>
                    <p className="font-medium">Install WireGuard</p>
                    <p className="text-sm text-muted-foreground">Download WireGuard from the App Store.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">2</span>
                  <div>
                    <p className="font-medium">Open the App</p>
                    <p className="text-sm text-muted-foreground">Launch WireGuard and tap "Add a tunnel".</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">3</span>
                  <div>
                    <p className="font-medium">Choose Import Method</p>
                    <p className="text-sm text-muted-foreground">Select "Create from QR code" or "Create from file or archive".</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">4</span>
                  <div>
                    <p className="font-medium">Allow Camera Access</p>
                    <p className="text-sm text-muted-foreground">Grant camera permission and scan the QR code.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">5</span>
                  <div>
                    <p className="font-medium">Enable VPN</p>
                    <p className="text-sm text-muted-foreground">Toggle the switch to connect. Allow VPN configuration when prompted.</p>
                  </div>
                </li>
              </ol>
            </TabsContent>

            <TabsContent value="windows" className="space-y-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Monitor className="h-5 w-5 text-primary" />
                Windows Setup
              </h2>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">1</span>
                  <div>
                    <p className="font-medium">Download WireGuard</p>
                    <p className="text-sm text-muted-foreground">Visit wireguard.com/install and download the Windows installer.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">2</span>
                  <div>
                    <p className="font-medium">Install Application</p>
                    <p className="text-sm text-muted-foreground">Run the installer and follow the setup wizard.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">3</span>
                  <div>
                    <p className="font-medium">Import Tunnel</p>
                    <p className="text-sm text-muted-foreground">Click "Import tunnel(s) from file" and select your .conf file.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">4</span>
                  <div>
                    <p className="font-medium">Activate Connection</p>
                    <p className="text-sm text-muted-foreground">Select the imported tunnel and click "Activate".</p>
                  </div>
                </li>
              </ol>
            </TabsContent>

            <TabsContent value="mac" className="space-y-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Apple className="h-5 w-5 text-primary" />
                macOS Setup
              </h2>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">1</span>
                  <div>
                    <p className="font-medium">Install WireGuard</p>
                    <p className="text-sm text-muted-foreground">Download WireGuard from the Mac App Store.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">2</span>
                  <div>
                    <p className="font-medium">Open Application</p>
                    <p className="text-sm text-muted-foreground">Launch WireGuard from Applications or the menu bar.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">3</span>
                  <div>
                    <p className="font-medium">Import Configuration</p>
                    <p className="text-sm text-muted-foreground">Click "Import tunnel(s) from file" or drag your .conf file into the app.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">4</span>
                  <div>
                    <p className="font-medium">Allow System Extension</p>
                    <p className="text-sm text-muted-foreground">Grant permission for the system extension in System Preferences if prompted.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">5</span>
                  <div>
                    <p className="font-medium">Connect</p>
                    <p className="text-sm text-muted-foreground">Click "Activate" to establish the VPN connection.</p>
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
