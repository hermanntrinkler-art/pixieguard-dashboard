import type { ServerConfig } from "../types/ServerConfig";

export const serverConfig: ServerConfig = {
  name: "Hetzner VPN Server",
  address: "10.8.0.1/24",

  publicIp: "46.224.52.24",
  publicPort: 51820,

  privateKey: "EEHA4Lbgd7p0rLm3R2gJw1SdrFvEL80V/+UByzkkZ3k=",
  publicKey: "rPzq8UnYw5IqgBnh13mnuJ9g/+XeunG5ACFqKjqv3mQ=",

  subnet: "10.8.0.0/24",

  postUp: [
    "iptables -A FORWARD -i %i -j ACCEPT",
    "iptables -A FORWARD -o %i -j ACCEPT"
  ],
  postDown: [
    "iptables -D FORWARD -i %i -j ACCEPT",
    "iptables -D FORWARD -o %i -j ACCEPT"
  ]
};
