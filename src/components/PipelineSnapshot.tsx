import React from 'react';
import { motion } from 'motion/react';
import { UserCheck, MessageSquare, Calendar, CheckSquare, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { Card } from './Card';
import { Badge } from './Badge';

interface PipelineSnapshotProps {
  isFocused?: boolean;
}

const PIPELINE_STAGES = [
  {
    name: "NEW LEAD",
    count: 386,
    subtext: "Inbound Meta Ad Click",
    rate: "100%",
    icon: Sparkles,
    color: "black",
  },
  {
    name: "FOLLOW-UP",
    count: 294,
    subtext: "8s AI Auto-Response",
    rate: "76.2%",
    icon: MessageSquare,
    color: "black",
  },
  {
    name: "QUALIFIED",
    count: 141,
    subtext: "Budget & Fit Verified",
    rate: "36.5%",
    icon: CheckSquare,
    color: "black",
  },
  {
    name: "BOOKED",
    count: 58,
    subtext: "Calendar Synced / CAPI",
    rate: "15.0%",
    icon: Calendar,
    color: "accent",
    highlight: true,
  },
  {
    name: "PURCHASED",
    count: 12,
    subtext: "KES 1.8M Retainer GMV",
    rate: "3.1%",
    icon: UserCheck,
    color: "black",
  },
];

export function PipelineSnapshot({ isFocused = false }: PipelineSnapshotProps) {
  return (
    <Card 
      variant="white" 
      notch="bl" 
      withTechBorder 
      className={`p-6 md:p-8 shadow-xl transition-all duration-500 border-t-[8px] border-t-rain-black ${
        isFocused ? 'ring-4 ring-rain-accent ring-offset-4 ring-offset-rain-bg' : ''
      }`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-rain-black" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-rain-muted uppercase">
              MESSAGING FUNNEL VELOCITY
            </span>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-rain-black uppercase">
            Conversational Pipeline Snapshot
          </h3>
        </div>

        {/* Human Handoff Quick Indicator */}
        <div className="flex items-center gap-2 bg-rain-accent/10 border border-rain-accent/30 px-3 py-1.5 clip-tr-sm self-start sm:self-auto">
          <AlertCircle size={14} className="text-rain-accent shrink-0 animate-pulse" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rain-black">
            HUMAN HANDOFF:
          </span>
          <Badge variant="accent" className="text-[9px] py-0 px-1.5 font-mono font-bold">
            2 ACTIVE
          </Badge>
        </div>
      </div>

      <p className="text-xs font-mono text-rain-muted mb-6 leading-relaxed">
        Live progression of prospects from initial ad message through AI triage, qualification, and final business outcome.
      </p>

      {/* 5 Sequential Stages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 relative mb-6">
        {PIPELINE_STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          return (
            <div key={stage.name} className="relative flex flex-col">
              <div
                className={`p-4 border transition-all clip-bl-sm flex flex-col justify-between h-full ${
                  stage.highlight
                    ? 'bg-rain-black text-rain-white border-rain-black shadow-md ring-2 ring-rain-accent'
                    : 'bg-rain-grey/50 hover:bg-rain-grey text-rain-black border-black/10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[9px] font-mono font-bold tracking-widest ${
                      stage.highlight ? 'text-rain-accent' : 'text-rain-muted'
                    }`}>
                      0{idx + 1}
                    </span>
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 clip-tr-sm ${
                      stage.highlight ? 'bg-rain-accent text-white' : 'bg-black/10 text-rain-black'
                    }`}>
                      {stage.rate}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-6 h-6 flex items-center justify-center clip-tr-sm shrink-0 ${
                      stage.highlight ? 'bg-white/10 text-rain-accent' : 'bg-white text-rain-black border border-black/10'
                    }`}>
                      <Icon size={12} strokeWidth={2.5} />
                    </div>
                    <div className="text-xs font-mono font-bold tracking-wider uppercase truncate">
                      {stage.name}
                    </div>
                  </div>

                  <div className={`text-2xl font-bold tracking-tight mb-1 ${
                    stage.highlight ? 'text-rain-white' : 'text-rain-black'
                  }`}>
                    {stage.count}
                  </div>
                </div>

                <div className={`text-[10px] font-mono mt-3 pt-2 border-t ${
                  stage.highlight ? 'border-white/20 text-white/70' : 'border-black/10 text-rain-muted'
                }`}>
                  {stage.subtext}
                </div>
              </div>

              {/* Connecting arrow for desktop */}
              {idx < PIPELINE_STAGES.length - 1 && (
                <div className="hidden md:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-20 w-5 h-5 items-center justify-center text-black/30">
                  <ArrowRight size={12} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Human Handoff Callout Banner */}
      <div className="p-4 bg-rain-black text-rain-white clip-tr-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-rain-accent clip-bl-sm flex items-center justify-center text-rain-white shrink-0 mt-0.5">
            <AlertCircle size={16} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight text-rain-white uppercase">
                Human Handoff Protocol
              </span>
              <Badge variant="accent" className="text-[9px] py-0">AUTO-ESCALATION</Badge>
            </div>
            <p className="text-xs font-mono text-rain-muted mt-1 leading-relaxed">
              When high-value prospects request pricing negotiations or human consultation (e.g. Amani Real Estate), the AI pauses messaging and alerts the sales team instantly.
            </p>
          </div>
        </div>

        <div className="font-mono text-xs text-right shrink-0 flex md:flex-col items-center md:items-end justify-between gap-1">
          <span className="text-[10px] text-rain-muted uppercase tracking-widest">Active Escalations:</span>
          <span className="text-rain-accent font-bold">2 conversations paused</span>
        </div>
      </div>
    </Card>
  );
}
