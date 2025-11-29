import React, { useState } from 'react';
import { YandexDevice } from '../types';
import { getIconForDevice } from '../constants';
import { Loader2, Power } from 'lucide-react';

interface DeviceCardProps {
  device: YandexDevice;
  onToggle: (id: string, currentState: boolean) => Promise<void>;
}

export const DeviceCard: React.FC<DeviceCardProps> = ({ device, onToggle }) => {
  const [loading, setLoading] = useState(false);

  // Find the on_off capability
  const onOffCapability = device.capabilities.find(c => c.type === 'devices.capabilities.on_off');
  
  // If no on_off capability, device might be a sensor or unsupported for simple toggle
  const isToggleable = !!onOffCapability;
  const isOn = onOffCapability?.state?.value === true;

  const handleClick = async () => {
    if (!isToggleable || loading) return;

    setLoading(true);
    try {
      await onToggle(device.id, isOn);
    } catch (err) {
      console.error(err);
      // Parent component handles the global error alert, but we stop loading here
    } finally {
      setLoading(false);
    }
  };

  const icon = getIconForDevice(device.type);

  return (
    <button
      onClick={handleClick}
      disabled={!isToggleable || loading}
      className={`
        relative overflow-hidden group
        flex flex-col p-4 gap-3
        border rounded-xl text-left
        transition-all duration-200 ease-out
        w-full
        ${isToggleable ? 'cursor-pointer hover:scale-[1.02]' : 'cursor-default opacity-80'}
        ${isOn 
            ? 'bg-primary/20 border-primary/50 shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
            : 'bg-surface border-white/5 hover:bg-slate-700/50'
        }
      `}
    >
      <div className="flex items-start justify-between w-full">
        <div className={`
            p-2 rounded-full transition-colors duration-300
            ${isOn ? 'bg-primary text-white' : 'bg-slate-700 text-slate-400'}
        `}>
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: "w-5 h-5" })}
        </div>

        {isToggleable && (
             <div className={`
                w-8 h-4 rounded-full relative transition-colors duration-300
                ${isOn ? 'bg-primary/50' : 'bg-slate-700'}
             `}>
                 <div className={`
                    absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all duration-300
                    ${isOn ? 'left-4.5' : 'left-0.5'}
                 `} style={{ left: isOn ? '1.1rem' : '0.15rem' }}></div>
             </div>
        )}
      </div>

      <div className="mt-2">
        <p className="font-medium text-slate-100 line-clamp-1 text-sm">{device.name}</p>
        <p className="text-xs text-slate-400 mt-0.5">
            {loading ? 'Обновление...' : (isOn ? 'Включено' : 'Выключено')}
        </p>
      </div>
    </button>
  );
};