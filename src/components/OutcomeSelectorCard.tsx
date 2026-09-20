import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, CheckCircle2, MessageSquare, ShoppingCart, SlidersHorizontal, Check } from 'lucide-react';
import { Card } from './Card';
import { Badge } from './Badge';

interface OutcomeSelectorCardProps {
  isFocused?: boolean;
}

export type OutcomeOption = "Messages" | "Qualified Lead" | "Booked Meeting" | "Purchase";

const OUTCOMES: {
  id: OutcomeOption;
  label: string;
  icon: React.ElementType;
  metaEvent: string;
  desc: string;
  recommended?: boolean;
}[] = [
  {
    id: "Messages",
    label: "Messages",
    icon: MessageSquare,
    metaEvent: "Contact / Initial Message",
    desc: "Optimizes for raw conversation volume. Often produces high click-through but lower lead intent.",
  },
  {
    id: "Qualified Lead",
    label: "Qualified Lead",
    icon: CheckCircle2,
    metaEvent: "Lead (Verified Intent)",
    desc: "Trains Meta on prospects that pass AI qualification criteria (budget, timeline, fit).",
  },
  {
    id: "Booked Meeting",
    label: "Booked Meeting",
    icon: Calendar,
    metaEvent: "Schedule / MeetingBooked",
    desc: "Recommended for B2B & high-ticket. Fires CAPI when a prospect confirms a calendar booking.",
    recommended: true,
  },
  {
    id: "Purchase",
    label: "Purchase",
    icon: ShoppingCart,
    metaEvent: "Purchase / ContractSigned",
    desc: "Full bottom-of-funnel signal. Fires on verified closed transaction or invoice payment.",
  },
];

export function OutcomeSelectorCard({ isFocused = false }: OutcomeSelectorCardProps) {
  const [selectedOutcome, setSelectedOutcome] = useState<OutcomeOption>("Booked Meeting");

  const currentOutcome = OUTCOMES.find((o) => o.id === selectedOutcome) || OUTCOMES[2];

  return (
    <Card 
      variant="white" 
      notch="tr" 
      withTechBorder 
      className={`p-6 md:p-8 shadow-xl transition-all duration-500 border-t-[8px] border-t-rain-black ${
        isFocused ? 'ring-4 ring-rain-accent ring-offset-4 ring-offset-rain-bg' : ''
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <SlidersHorizontal size={14} className="text-rain-accent" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-rain-muted uppercase">
              CAPI OPTIMIZATION TARGET
            </span>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-rain-black uppercase">
            Business Outcome Objective
          </h3>
        </div>
        <Badge variant="black" className="self-start sm:self-auto text-[9px] px-2.5 py-1">
          ACTIVE TARGET: {selectedOutcome}
        </Badge>
      </div>

      <p className="text-xs font-mono text-rain-muted mb-6 leading-relaxed">
        Select which business milestone triggers the Conversions API feedback loop back into Meta Ads Manager.
      </p>

      {/* 4 Outcome Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {OUTCOMES.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedOutcome === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => setSelectedOutcome(item.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 text-left border transition-all relative flex flex-col justify-between clip-bl-sm select-none ${
                isSelected
                  ? 'bg-rain-black text-rain-white border-rain-black shadow-lg'
                  : 'bg-rain-grey/50 hover:bg-rain-grey text-rain-black border-black/10'
              }`}
            >
              {/* Badge for Recommended */}
              {item.recommended && (
                <span className={`absolute top-2 right-2 text-[8px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 clip-tr-sm ${
                  isSelected ? 'bg-rain-accent text-rain-white' : 'bg-black/10 text-rain-black'
                }`}>
                  RECOMMENDED
                </span>
              )}

              <div className="flex items-center gap-2.5 mb-3">
                <div className={`w-8 h-8 rounded-none flex items-center justify-center clip-tr-sm shrink-0 ${
                  isSelected ? 'bg-rain-accent text-rain-white' : 'bg-white text-rain-black border border-black/10'
                }`}>
                  <Icon size={16} strokeWidth={2.5} />
                </div>
                <div className="font-bold text-sm tracking-tight pr-6">
                  {item.label}
                </div>
              </div>

              <div className="space-y-1 mt-auto">
                <div className={`text-[9px] font-mono uppercase tracking-wider ${
                  isSelected ? 'text-white/60' : 'text-rain-muted'
                }`}>
                  Event: {item.metaEvent.split(' ')[0]}
                </div>
                <div className="flex items-center gap-1.5 pt-1">
                  <div className={`w-3.5 h-3.5 rounded-none flex items-center justify-center clip-tr-sm text-[8px] ${
                    isSelected ? 'bg-rain-accent text-white' : 'border border-black/20 text-transparent'
                  }`}>
                    <Check size={10} strokeWidth={3} />
                  </div>
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${
                    isSelected ? 'text-rain-white' : 'text-rain-muted'
                  }`}>
                    {isSelected ? 'SELECTED' : 'SELECT'}
                  </span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Active Selection Details Banner */}
      <div className="p-4 bg-rain-grey/80 border border-black/10 clip-tr-sm flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 bg-rain-accent rotate-45 mt-1.5 shrink-0" />
          <div>
            <span className="font-mono font-bold text-rain-black uppercase tracking-wider">
              {currentOutcome.label} Optimization Active:
            </span>
            <span className="text-rain-muted font-medium ml-1.5 leading-relaxed">
              {currentOutcome.desc}
            </span>
          </div>
        </div>
        <div className="font-mono text-[10px] text-rain-black font-bold uppercase tracking-widest shrink-0 self-end md:self-auto bg-white px-2.5 py-1 border border-black/15 clip-bl-sm">
          Signal: {currentOutcome.metaEvent}
        </div>
      </div>
    </Card>
  );
}
