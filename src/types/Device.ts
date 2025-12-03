export interface Device {
  id: string;
  name: string;
  address: string;
  publicKey: string;
  privateKey: string;
  configText: string;
  lastConnected?: string;
}
