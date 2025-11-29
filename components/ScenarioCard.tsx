import React, { useState } from 'react';
import { getIconForScenario } from '../constants';
import { YandexScenario } from '../types';
import { Loader2, CheckCircle2 } from 'lucide-react';

interface ScenarioCardProps {
  scenario: YandexScenario;
  onExecute: (id: string) => Promise<void>;
}

export const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario, onExecute }) => {
  const [loading, setLoading] = useState(false);
  const [justExecuted, setJustExecuted] = useState(false);

  const handleClick = async () => {
    if (loading) return;

    setLoading(true);
    try {
      await onExecute(scenario.id);
      
      // Success animation state
      setJustExecuted(true);
      setTimeout(() => setJustExecuted(false), 2000);
      
    } catch (err) {
      console.error(err);
      // Ideally show a toast here, but simple visual feedback for now
      alert(`Ошибка при запуске сценария "${scenario.name}"`);
    } finally {
      setLoading(false);
    }
  };

  const icon = getIconForScenario(scenario.icon, scenario.name);

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`
        relative overflow-hidden group
        flex flex-col items-center justify-center p-6 gap-4
        bg-surface hover:bg-slate-700/80 active:scale-95
        border border-white/5 rounded-2xl
        transition-all duration-300 ease-out
        shadow-lg hover:shadow-primary/10
        min-h-[160px] w-full
        ${loading ? 'cursor-wait opacity-80' : 'cursor-pointer'}
        ${justExecuted ? 'ring-2 ring-green-500 bg-green-900/10' : ''}
      `}
    >
      {/* Background Gradient on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-transparent transition-all duration-500"></div>

      {/* State Overlay (Loading or Success) */}
      <div className="relative z-10 text-slate-200 group-hover:text-white transition-colors duration-300">
        {loading ? (
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        ) : justExecuted ? (
          <CheckCircle2 className="w-10 h-10 text-green-500 scale-110 duration-300 animate-in fade-in zoom-in" />
        ) : (
          <div className="text-primary group-hover:text-white group-hover:scale-110 transition-all duration-300">
            {icon}
          </div>
        )}
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <span className="font-semibold text-lg text-slate-100 text-center line-clamp-2">
          {scenario.name}
        </span>
        {justExecuted && (
          <span className="text-xs text-green-400 mt-1 animate-pulse">Выполнено</span>
        )}
      </div>
    </button>
  );
};