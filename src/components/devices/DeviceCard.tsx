import { useState } from "react";
import type { Device } from "@/types/Device";
import { generateClientQr } from "@/lib/wireguard/qrGenerator";

export default function DeviceCard({ device, onDelete }: {
  device: Device;
  onDelete: (id: string) => void;
}) {
  const [qr, setQr] = useState<string | null>(null);

  async function handleShowQr() {
    const img = await generateClientQr(device.configText);
    setQr(img);
  }

  function downloadConfig() {
    const blob = new Blob([device.configText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${device.name}.conf`;
    a.click();
  }

  return (
    <div className="border rounded-xl p-4 shadow-md bg-white flex flex-col gap-3 w-full md:w-80">
      <h3 className="text-xl font-semibold">{device.name}</h3>
      <p className="text-gray-600">IP: {device.address}</p>
      <p className="text-gray-500 text-sm">
        {device.lastConnected ? `Zuletzt verbunden: ${device.lastConnected}` : "Noch nie verbunden"}
      </p>

      <div className="flex gap-2 mt-2">
        <button
          onClick={handleShowQr}
          className="px-3 py-2 bg-blue-600 text-white rounded-md"
        >
          QR anzeigen
        </button>

        <button
          onClick={downloadConfig}
          className="px-3 py-2 bg-green-600 text-white rounded-md"
        >
          Download
        </button>

        <button
          onClick={() => onDelete(device.id)}
          className="px-3 py-2 bg-red-600 text-white rounded-md"
        >
          Löschen
        </button>
      </div>

      {qr && (
        <img src={qr} alt="QR Code" className="mt-3 w-full rounded-lg" />
      )}
    </div>
  );
}
