import QRCode from "qrcode";

export async function generateClientQr(configText: string): Promise<string> {
  return await QRCode.toDataURL(configText);
}
