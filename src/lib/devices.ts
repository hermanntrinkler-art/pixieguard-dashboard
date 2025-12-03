export interface Device {
  id: string;
  name: string;
  config: string;
  internalIp: string;
  createdAt: string;
}

const STORAGE_KEY = 'pixieguard_devices';

// Counter for IP assignment
let ipCounter = 2;

export function generateMockConfig(deviceName: string, ipAddress: string): string {
  return `[Interface]
PrivateKey = MOCK_PRIVATE_KEY_${Math.random().toString(36).substring(2, 15)}
Address = ${ipAddress}
DNS = 1.1.1.1, 8.8.8.8

[Peer]
PublicKey = SERVER_PUBLIC_KEY_PLACEHOLDER
Endpoint = vpn.pixie-guard.com:51820
AllowedIPs = 0.0.0.0/0, ::/0
PersistentKeepalive = 25`;
}

export function getDevices(): Device[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const devices = JSON.parse(stored);
    // Update IP counter based on existing devices
    if (devices.length > 0) {
      const maxIp = Math.max(...devices.map((d: Device) => {
        const match = d.internalIp.match(/10\.8\.0\.(\d+)/);
        return match ? parseInt(match[1]) : 0;
      }));
      ipCounter = maxIp + 1;
    }
    return devices;
  }
  return [];
}

export function getDevice(id: string): Device | undefined {
  const devices = getDevices();
  return devices.find(d => d.id === id);
}

export function createDevice(name: string): Device {
  const devices = getDevices();
  const internalIp = `10.8.0.${ipCounter}/32`;
  ipCounter++;
  
  const device: Device = {
    id: crypto.randomUUID(),
    name,
    config: generateMockConfig(name, internalIp),
    internalIp,
    createdAt: new Date().toISOString(),
  };
  
  devices.push(device);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(devices));
  
  return device;
}

export function deleteDevice(id: string): void {
  const devices = getDevices();
  const filtered = devices.filter(d => d.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function downloadConfig(device: Device): void {
  const blob = new Blob([device.config], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${device.name.toLowerCase().replace(/\s+/g, '-')}.conf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
