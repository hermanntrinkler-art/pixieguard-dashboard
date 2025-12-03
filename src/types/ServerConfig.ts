export interface ServerConfig {
  name: string;
  address: string;

  publicIp: string;
  publicPort: number;

  privateKey: string;
  publicKey: string;

  subnet: string;

  postUp: string[];
  postDown: string[];
}
