import type { Device } from "@/types/Device";

const STORAGE_KEY = "pixieguard_devices_v2";

export function loadDevices(): Device[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveDevices(devices: Device[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(devices));
}

export function addDevice(device: Device) {
  const devices = loadDevices();
  devices.push(device);
  saveDevices(devices);
}

export function removeDevice(id: string) {
  const devices = loadDevices().filter((d) => d.id !== id);
  saveDevices(devices);
}
