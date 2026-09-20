import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Target, Bot, MessageSquare, Award, Radio, ArrowRight } from 'lucide-react';
import { Card } from './Card';
import { Badge } from './Badge';

interface ClosedLoopOutcomeCardProps {
  isFocused?: boolean;
}

const STAGES = [
  {
    step: "01",
    label: "RUN ADS",
    name: "Meta Ads",
    icon: Target,
    desc: "Inbound traffic from Instagram & Facebook",
    tag: "IMPRESSIONS",
  },
  {
    step: "02",
    label: "RESPOND",
    name: "AI Responder",
    icon: Bot,
    desc: "Sub-8s first touch in WhatsApp & DM",
    tag: "FIRST TOUCH",
  },
  {
    step: "03",
    label: "QUALIFY",
    name: "Conversation",
    icon: MessageSquare,
    desc: "Criteria verification & objection handling",
    tag: "INTENT CHECK",
  },
  {
    step: "04",
    label: "OUTCOME",
    name: "Real Result",
    icon: Award,
    desc: "Booked meeting or verified customer",
    tag: "MILESTONE",
  },
  {
    step: "05",
    label: "CAPI SIGNAL",
    name: "Meta Signal",
    icon: Radio,
    desc: "Conversion feedback sent to Meta Dataset",
    tag: "FEEDBACK LOOP",
  },
];

export function ClosedLoopOutcomeCard({ isFocused = false }: ClosedLoopOutcomeCardProps) {
  const [activeStep, setActiveStep] = useState(3); // default highlight on Outcome/CAPI

  // Subtle auto-advance to demonstrate the continuous closed loop during recording
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STAGES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <Card 
      variant="black" 
      notch="both" 
      withTechBorder 
      className={`p-6 md:p-8 overflow-hidden relative shadow-2xl transition-all duration-500 ${
        isFocused ? 'ring-4 ring-rain-accent ring-offset-4 ring-offset-rain-bg' : ''
      }`}
    >
      {/* Background grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 bg-rain-accent rotate-45 inline-block" />
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-rain-accent uppercase">
              CLOSED-LOOP ARCHITECTURE
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-rain-white uppercase">
            Closed-Loop Outcome System
          </h2>
          <p className="text-xs font-mono text-rain-muted mt-1 max-w-2xl">
            Connecting top-of-funnel ad spend to real conversational outcomes via direct Meta Conversions API telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <Badge variant="outline" className="border-rain-white/30 text-rain-white text-[9px] py-1 px-2.5">
            CONTINUOUS FEEDBACK ACTIVE
          </Badge>
          <div className="hidden sm:flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 clip-bl-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-mono font-bold tracking-widest text-rain-white uppercase">
              LOOP IN SYNC
            </span>
          </div>
        </div>
      </div>

      {/* 5-Stage Horizontal Flow Nodes */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          const isActive = activeStep === idx;
          const isOutcomeOrCapi = idx >= 3;

          return (
            <div key={stage.step} className="relative flex flex-col">
              <motion.div
                onClick={() => setActiveStep(idx)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex-1 p-4 border transition-all cursor-pointer select-none clip-bl-sm flex flex-col justify-between ${
                  isActive
                    ? isOutcomeOrCapi
                      ? 'bg-rain-accent text-rain-white border-rain-accent shadow-[0_0_24px_rgba(240,62,22,0.35)]'
                      : 'bg-rain-white text-rain-black border-rain-white shadow-[0_0_20px_rgba(255,255,255,0.25)]'
                    : 'bg-black/60 text-rain-white border-white/15 hover:border-white/40'
                }`}
              >
                {/* Node Top: Step & Tag */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-mono font-bold tracking-widest ${
                    isActive ? (isOutcomeOrCapi ? 'text-white/80' : 'text-black/60') : 'text-rain-muted'
                  }`}>
                    {stage.step}
                  </span>
                  <span className={`text-[9px] font-mono font-bold tracking-wider uppercase px-1.5 py-0.5 clip-tr-sm ${
                    isActive
                      ? isOutcomeOrCapi
                        ? 'bg-black/30 text-white'
                        : 'bg-black text-white'
                      : 'bg-white/10 text-rain-muted'
                  }`}>
                    {stage.tag}
                  </span>
                </div>

                {/* Node Middle: Icon & Label */}
                <div className="my-2">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className={`w-8 h-8 rounded-none flex items-center justify-center clip-tr-sm ${
                      isActive
                        ? isOutcomeOrCapi
                          ? 'bg-white text-rain-accent'
                          : 'bg-rain-black text-rain-white'
                        : 'bg-white/10 text-white'
                    }`}>
                      <Icon size={16} strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className={`text-[11px] font-mono font-extrabold tracking-widest uppercase ${
                        isActive ? (isOutcomeOrCapi ? 'text-white' : 'text-black') : 'text-rain-white'
                      }`}>
                        {stage.label}
                      </div>
                      <div className={`text-[10px] font-sans font-semibold tracking-tight ${
                        isActive ? (isOutcomeOrCapi ? 'text-white/90' : 'text-black/80') : 'text-rain-muted'
                      }`}>
                        {stage.name}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Node Bottom: Concise description */}
                <p className={`text-[10px] font-mono tracking-tight leading-snug mt-2 pt-2 border-t ${
                  isActive
                    ? isOutcomeOrCapi
                      ? 'border-white/20 text-white/90'
                      : 'border-black/10 text-black/70'
                    : 'border-white/10 text-rain-muted'
                }`}>
                  {stage.desc}
                </p>
              </motion.div>

              {/* Connecting arrow for desktop view */}
              {idx < STAGES.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 items-center justify-center text-white/40">
                  <ArrowRight size={14} className={isActive ? 'text-rain-accent animate-pulse' : ''} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Return Loop Strip (CAPI back to Meta Ads) */}
      <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono">
        <div className="flex items-center gap-2 text-rain-white">
          <div className="w-2 h-2 bg-rain-accent rounded-full animate-ping" />
          <span className="font-bold tracking-wider uppercase text-rain-accent">
            RETURN SIGNAL TO META:
          </span>
          <span className="text-rain-muted">
            Algorithm trains on confirmed downstream meetings, not just message opens.
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-rain-muted uppercase tracking-widest">
          <span>Latency: ~180ms</span>
          <span>•</span>
          <span className="text-emerald-400 font-bold">Match Quality: 9.4/10</span>
        </div>
      </div>
    </Card>
  );
}
