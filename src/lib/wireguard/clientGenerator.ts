import nacl from "tweetnacl";
import { serverConfig } from "@/config/pixieguard";
import type { ClientConfig } from "@/types/ClientConfig";

function generateKeyPair(): { privateKey: string; publicKey: string } {
  const keyPair = nacl.box.keyPair();
  // Uint8Array → Base64 (WireGuard-Format)
  const privateKey = btoa(String.fromCharCode(...keyPair.secretKey));
  const publicKey = btoa(String.fromCharCode(...keyPair.publicKey));
  return { privateKey, publicKey };
}

function generateClientAddress(index: number): string {
  return `10.8.0.${index + 2}/32`;
}

export function createClient(id: string, name: string, index: number): ClientConfig {
  const { privateKey, publicKey } = generateKeyPair();

  return {
    id,
    name,
    privateKey,
    publicKey,
    address: generateClientAddress(index),
    allowedIPs: "0.0.0.0/0",
  };
}

export function buildClientConfigFile(client: ClientConfig): string {
  return `[Interface]
Address = ${client.address}
PrivateKey = ${client.privateKey}
DNS = 1.1.1.1

[Peer]
PublicKey = ${serverConfig.publicKey}
Endpoint = ${serverConfig.publicIp}:${serverConfig.publicPort}
AllowedIPs = ${client.allowedIPs}
PersistentKeepalive = 25`.trim();
}
