import React from 'react';
import { motion } from 'motion/react';
import { Radio, CheckCircle, Database, ArrowUpRight, ShieldCheck, Activity } from 'lucide-react';
import { Card } from './Card';
import { Badge } from './Badge';
import { ConversionFeedbackData } from '../data/mockData';

interface ConversionFeedbackVisualProps {
  isFocused?: boolean;
}

export function ConversionFeedbackVisual({ isFocused = false }: ConversionFeedbackVisualProps) {
  return (
    <Card 
      variant="black" 
      notch="tr" 
      withTechBorder 
      className={`p-6 md:p-8 shadow-xl transition-all duration-500 relative overflow-hidden ${
        isFocused ? 'ring-4 ring-rain-accent ring-offset-4 ring-offset-rain-bg' : ''
      }`}
    >
      {/* Background glow accent */}
      <div className="absolute -top-16 -right-16 w-32 h-32 bg-rain-accent/15 blur-2xl rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-rain-accent clip-bl-sm flex items-center justify-center text-rain-white">
            <Radio size={16} className="animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-rain-accent uppercase block">
              TELEMETRY FEEDBACK
            </span>
            <h3 className="text-lg font-bold tracking-tight text-rain-white uppercase">
              CAPI Signal Transmission
            </h3>
          </div>
        </div>

        <Badge variant="accent" className="text-[9px] py-1 px-2 font-mono">
          STATUS: {ConversionFeedbackData.status}
        </Badge>
      </div>

      {/* Status Matrix */}
      <div className="space-y-3 font-mono text-xs relative z-10">
        {/* Row 1: Outcome Recorded */}
        <div className="p-3 bg-white/5 border border-white/10 clip-tr-sm flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CheckCircle size={14} className="text-emerald-400 shrink-0" />
            <span className="text-rain-muted uppercase text-[11px]">Outcome Recorded:</span>
          </div>
          <span className="text-rain-white font-bold tracking-wider">
            {ConversionFeedbackData.outcomeRecorded}
          </span>
        </div>

        {/* Row 2: Conversion signal sent */}
        <div className="p-3 bg-white/5 border border-white/10 clip-bl-sm flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Activity size={14} className="text-rain-accent shrink-0" />
            <span className="text-rain-muted uppercase text-[11px]">Conversion Signal:</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-rain-white font-bold tracking-wider">SENT VIA CAPI</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping" />
          </div>
        </div>

        {/* Row 3: Destination Meta Dataset */}
        <div className="p-3 bg-white/5 border border-white/10 clip-tr-sm flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Database size={14} className="text-white/60 shrink-0" />
            <span className="text-rain-muted uppercase text-[11px]">Destination:</span>
          </div>
          <div className="text-right">
            <span className="text-rain-white font-bold tracking-wider block">
              {ConversionFeedbackData.destination}
            </span>
            <span className="text-[9px] text-rain-muted">
              {ConversionFeedbackData.datasetId}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-rain-muted relative z-10">
        <div className="flex items-center gap-1.5">
          <ShieldCheck size={12} className="text-emerald-400" />
          <span>MATCH QUALITY: <strong className="text-rain-white">{ConversionFeedbackData.matchQuality}</strong></span>
        </div>
        <div className="flex items-center gap-1">
          <span>DISPATCH: <strong className="text-rain-white">{ConversionFeedbackData.latency}</strong></span>
        </div>
      </div>
    </Card>
  );
}
