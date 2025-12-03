export interface ClientConfig {
  id: string;              // UUID oder Kurz-ID
  name: string;            // Anzeigename des Clients
  address: string;         // z. B. "10.8.0.2/32"
  privateKey: string;
  publicKey: string;
  allowedIPs: string;      // z. B. "0.0.0.0/0"
}
