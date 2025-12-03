import { useEffect, useState } from "react";
import { loadDevices, removeDevice } from "@/lib/storage/deviceStorage";
import DeviceCard from "@/components/devices/DeviceCard";
import type { Device } from "@/types/Device";

export default function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    setDevices(loadDevices());
  }, []);

  function deleteDevice(id: string) {
    removeDevice(id);
    setDevices(loadDevices());
  }

  return (
    <div className="p-4 flex flex-wrap gap-4">
      {devices.length === 0 && (
        <p className="text-gray-500">Noch keine Geräte vorhanden</p>
      )}
      {devices.map((d) => (
        <DeviceCard
          key={d.id}
          device={d}
          onDelete={deleteDevice}
        />
      ))}
    </div>
  );
}
