import { createClient, buildClientConfigFile } from "@/lib/wireguard/clientGenerator";
import { isServerConfigured } from "@/lib/storage/serverConfigStorage";

export interface Device {
  id: string;
  name: string;
  config: string;
  internalIp: string;
  createdAt: string;
  publicKey: string;
}

const STORAGE_KEY = 'pixieguard_devices';

export function getDevices(): Device[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return [];
}

function getNextIpIndex(): number {
  const devices = getDevices();
  if (devices.length === 0) return 0;
  
  const maxIp = Math.max(...devices.map((d: Device) => {
    const match = d.internalIp.match(/10\.8\.0\.(\d+)/);
    return match ? parseInt(match[1]) - 2 : 0;
  }));
  return maxIp + 1;
}

export function getDevice(id: string): Device | undefined {
  const devices = getDevices();
  return devices.find(d => d.id === id);
}

export function createDevice(name: string): Device {
  const devices = getDevices();
  const index = getNextIpIndex();
  const id = crypto.randomUUID();
  
  const client = createClient(id, name, index);
  const config = buildClientConfigFile(client);
  
  const device: Device = {
    id,
    name,
    config,
    internalIp: client.address,
    createdAt: new Date().toISOString(),
    publicKey: client.publicKey,
  };
  
  devices.push(device);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(devices));
  
  return device;
}

export function updateDeviceConfig(id: string): Device | undefined {
  const devices = getDevices();
  const deviceIndex = devices.findIndex(d => d.id === id);
  
  if (deviceIndex === -1) return undefined;
  
  const device = devices[deviceIndex];
  const match = device.internalIp.match(/10\.8\.0\.(\d+)/);
  const index = match ? parseInt(match[1]) - 2 : 0;
  
  const client = createClient(id, device.name, index);
  const config = buildClientConfigFile(client);
  
  devices[deviceIndex] = {
    ...device,
    config,
    publicKey: client.publicKey,
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(devices));
  return devices[deviceIndex];
}

export function regenerateAllDeviceConfigs(): void {
  const devices = getDevices();
  
  const updatedDevices = devices.map((device, index) => {
    const client = createClient(device.id, device.name, index);
    const config = buildClientConfigFile(client);
    
    return {
      ...device,
      config,
      publicKey: client.publicKey,
    };
  });
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDevices));
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

export { isServerConfigured };
