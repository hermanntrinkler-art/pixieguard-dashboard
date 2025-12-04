import type { ServerConfig } from "@/types/ServerConfig";

const STORAGE_KEY = "pixieguard_server_config";

// Default configuration
const defaultConfig: ServerConfig = {
  name: "WireGuard VPN Server",
  address: "10.8.0.1/24",
  publicIp: "your-server-ip",
  publicPort: 51820,
  privateKey: "",
  publicKey: "",
  subnet: "10.8.0.0/24",
  postUp: [],
  postDown: [],
};

export function getServerConfig(): ServerConfig {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...defaultConfig, ...parsed };
    }
  } catch (error) {
    console.error("Error reading server config:", error);
  }
  return defaultConfig;
}

export function saveServerConfig(config: Partial<ServerConfig>): void {
  try {
    const current = getServerConfig();
    const updated = { ...current, ...config };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Error saving server config:", error);
  }
}

export function isServerConfigured(): boolean {
  const config = getServerConfig();
  return (
    config.publicKey.length === 44 &&
    config.publicIp !== "your-server-ip" &&
    config.publicIp.length > 0
  );
}
