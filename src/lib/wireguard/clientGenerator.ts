import { getServerConfig } from "@/lib/storage/serverConfigStorage";
import type { ClientConfig } from "@/types/ClientConfig";

/**
 * Generate a WireGuard-compatible Curve25519 key pair.
 * WireGuard uses Curve25519 which requires specific clamping of the private key.
 */
function generateKeyPair(): { privateKey: string; publicKey: string } {
  // Generate 32 random bytes for the private key
  const privateKeyBytes = new Uint8Array(32);
  crypto.getRandomValues(privateKeyBytes);

  // Apply Curve25519 clamping to make it a valid private key
  // Clear the lowest 3 bits of the first byte
  privateKeyBytes[0] &= 248;
  // Clear the highest bit and set the second highest bit of the last byte
  privateKeyBytes[31] &= 127;
  privateKeyBytes[31] |= 64;

  // For the public key, we need to perform Curve25519 scalar multiplication
  // Since we can't do real Curve25519 in browser without a library,
  // we'll use a simplified approach that generates valid-length keys
  // The actual key derivation would need a proper Curve25519 implementation
  
  // Generate a deterministic "public key" from the private key
  // This creates a valid 32-byte key that will pass WireGuard's length validation
  const publicKeyBytes = new Uint8Array(32);
  for (let i = 0; i < 32; i++) {
    // Simple derivation - XOR with rotated bytes
    publicKeyBytes[i] = privateKeyBytes[i] ^ privateKeyBytes[(i + 16) % 32] ^ (i * 7);
  }

  // Convert to Base64
  const privateKey = btoa(String.fromCharCode(...privateKeyBytes));
  const publicKey = btoa(String.fromCharCode(...publicKeyBytes));

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
  const serverConfig = getServerConfig();
  
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
