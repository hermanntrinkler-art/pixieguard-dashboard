import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Device, downloadConfig, deleteDevice } from "@/lib/devices";
import { Monitor, QrCode, Download, Eye, Trash2 } from "lucide-react";

interface DeviceCardProps {
  device: Device;
  onDelete: () => void;
}

export function DeviceCard({ device, onDelete }: DeviceCardProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleDelete = () => {
    deleteDevice(device.id);
    onDelete();
  };

  return (
    <Card className="p-6 bg-card border-border hover:border-primary/30 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Monitor className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {device.name}
            </h3>
            <p className="text-sm text-muted-foreground font-mono">
              {device.internalIp.replace('/32', '')}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-destructive"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/device/${device.id}`)}
        >
          <Eye className="h-4 w-4 mr-2" />
          {t('common.view')}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/device/${device.id}/qr`)}
        >
          <QrCode className="h-4 w-4 mr-2" />
          QR
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => downloadConfig(device)}
        >
          <Download className="h-4 w-4 mr-2" />
          {t('common.download')}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        {t('common.created')} {new Date(device.createdAt).toLocaleDateString()}
      </p>
    </Card>
  );
}
