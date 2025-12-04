/**
 * Validates a WireGuard key (public or private).
 * WireGuard keys are 32 bytes encoded as Base64, resulting in exactly 44 characters.
 */
export function isValidWireGuardKey(key: string): boolean {
  if (!key || typeof key !== 'string') {
    return false;
  }

  // WireGuard keys are exactly 44 characters in Base64 (32 bytes = 44 Base64 chars with padding)
  if (key.length !== 44) {
    return false;
  }

  // Check if it ends with '=' (Base64 padding for 32 bytes)
  if (!key.endsWith('=')) {
    return false;
  }

  // Try to decode and verify it's exactly 32 bytes
  try {
    const decoded = atob(key);
    return decoded.length === 32;
  } catch {
    return false;
  }
}

/**
 * Validates a WireGuard endpoint (IP:port or hostname:port).
 */
export function isValidEndpoint(endpoint: string): boolean {
  if (!endpoint || typeof endpoint !== 'string') {
    return false;
  }

  // Simple validation: should contain IP/hostname and port
  const parts = endpoint.split(':');
  if (parts.length !== 2) {
    return false;
  }

  const port = parseInt(parts[1], 10);
  return !isNaN(port) && port > 0 && port <= 65535;
}

/**
 * Validates a CIDR notation address.
 */
export function isValidCIDR(cidr: string): boolean {
  if (!cidr || typeof cidr !== 'string') {
    return false;
  }

  const parts = cidr.split('/');
  if (parts.length !== 2) {
    return false;
  }

  // Check IP parts
  const ipParts = parts[0].split('.');
  if (ipParts.length !== 4) {
    return false;
  }

  for (const part of ipParts) {
    const num = parseInt(part, 10);
    if (isNaN(num) || num < 0 || num > 255) {
      return false;
    }
  }

  // Check prefix
  const prefix = parseInt(parts[1], 10);
  return !isNaN(prefix) && prefix >= 0 && prefix <= 32;
}
