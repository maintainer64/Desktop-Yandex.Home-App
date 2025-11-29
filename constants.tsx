import React from 'react';
import { 
  Sun, 
  Moon, 
  Zap, 
  Play, 
  Home, 
  Coffee, 
  PartyPopper, 
  Thermometer,
  Lightbulb,
  Music,
  Tv,
  Lock,
  Unlock,
  Power,
  Fan,
  ToggleLeft,
  Plug
} from 'lucide-react';

// Mapping Yandex icon strings to Lucide React Components
export const SCENARIO_ICON_MAP: Record<string, React.ReactNode> = {
  'icon_morning': <Sun className="w-8 h-8" />,
  'icon_sun': <Sun className="w-8 h-8" />,
  'icon_night': <Moon className="w-8 h-8" />,
  'icon_moon': <Moon className="w-8 h-8" />,
  'icon_party': <PartyPopper className="w-8 h-8" />,
  'icon_alarm': <Zap className="w-8 h-8" />,
  'icon_cleaning': <Home className="w-8 h-8" />, 
  'icon_coffee': <Coffee className="w-8 h-8" />,
  'icon_temp': <Thermometer className="w-8 h-8" />,
  'default': <Play className="w-8 h-8" />
};

export const getIconForScenario = (iconName?: string, scenarioName?: string): React.ReactNode => {
  if (iconName && SCENARIO_ICON_MAP[iconName]) {
    return SCENARIO_ICON_MAP[iconName];
  }
  
  const lowerName = (scenarioName || '').toLowerCase();
  if (lowerName.includes('свет') || lowerName.includes('light')) return <Lightbulb className="w-8 h-8" />;
  if (lowerName.includes('музык') || lowerName.includes('music')) return <Music className="w-8 h-8" />;
  if (lowerName.includes('тв') || lowerName.includes('tv') || lowerName.includes('кино')) return <Tv className="w-8 h-8" />;
  if (lowerName.includes('утро') || lowerName.includes('morning')) return <Sun className="w-8 h-8" />;
  if (lowerName.includes('ночь') || lowerName.includes('night') || lowerName.includes('спать')) return <Moon className="w-8 h-8" />;
  if (lowerName.includes('выкл') || lowerName.includes('off')) return <Power className="w-8 h-8" />;
  if (lowerName.includes('откр') || lowerName.includes('open')) return <Unlock className="w-8 h-8" />;
  if (lowerName.includes('закр') || lowerName.includes('close')) return <Lock className="w-8 h-8" />;

  return SCENARIO_ICON_MAP['default'];
};

export const getIconForDevice = (type: string): React.ReactNode => {
    const t = type.toLowerCase();
    const className = "w-8 h-8";
    
    if (t.includes('light')) return <Lightbulb className={className} />;
    if (t.includes('socket')) return <Plug className={className} />;
    if (t.includes('switch')) return <ToggleLeft className={className} />;
    if (t.includes('fan') || t.includes('air')) return <Fan className={className} />;
    if (t.includes('tv') || t.includes('media')) return <Tv className={className} />;
    if (t.includes('kettle') || t.includes('coffee')) return <Coffee className={className} />;
    
    return <Zap className={className} />;
}