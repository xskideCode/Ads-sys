import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Sparkles, TrendingUp, DollarSign, Layers, CheckCircle2, RefreshCw } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import { Badge } from './Badge';
import { Creatives } from '../data/mockData';
import { cn } from '../lib/utils';

function formatKES(amount: number) {
  return `KES ${amount.toLocaleString('en-KE')}`;
}

export type BudgetMode = "Small Budget" | "Balanced" | "Large Budget";

interface CreativeIntelligenceEnhancedProps {
  isFocused?: boolean;
  focusWinnerBucket?: boolean;
}

export function CreativeIntelligenceEnhanced({ 
  isFocused = false, 
  focusWinnerBucket = false 
}: CreativeIntelligenceEnhancedProps) {
  const [budgetMode, setBudgetMode] = useState<BudgetMode>("Balanced");
  const [isGenerating, setIsGenerating] = useState(false);
  const [creativeList, setCreativeList] = useState(Creatives);

  // Budget mode determines how many test variations are actively funded
  const getVisibleCreatives = () => {
    switch (budgetMode) {
      case "Small Budget":
        return creativeList.slice(0, 3);
      case "Balanced":
        return creativeList.slice(0, 5);
      case "Large Budget":
        return creativeList.slice(0, 7);
      default:
        return creativeList.slice(0, 5);
    }
  };

  const handleGenerateVariations = () => {
    setIsGenerating(true);
    setTimeout(() => {
      // Simulate generating fresh variations by cycling/refreshing items
      setCreativeList((prev) => {
        const next = [...prev];
        const [first, ...rest] = next;
        return [...rest, first];
      });
      setIsGenerating(false);
    }, 650);
  };

  const visibleCreatives = getVisibleCreatives();
  const winnerBucketCreatives = creativeList.filter((c) => c.status === "WINNER");

  return (
    <div className="space-y-8">
      {/* Control Bar: Budget Mode Selector & Action */}
      <Card 
        variant="black" 
        notch="tr" 
        withTechBorder
        className={`p-6 shadow-xl transition-all duration-500 border border-white/10 ${
          isFocused ? 'ring-4 ring-rain-accent ring-offset-4 ring-offset-rain-bg' : ''
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 bg-rain-accent rotate-45 inline-block" />
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-rain-accent uppercase">
                TESTING ENGINE & BUDGET MODES
              </span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-rain-white uppercase flex items-center gap-2">
              Creative Variation Testing
            </h2>
            <p className="text-xs font-mono text-rain-muted mt-1">
              Select budget allocation to regulate the active pool of AI hook variations tested against downstream outcomes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Budget Mode Selector */}
            <div className="bg-white/5 border border-white/15 p-1 clip-bl-sm flex items-center">
              {(["Small Budget", "Balanced", "Large Budget"] as BudgetMode[]).map((mode) => {
                const isSelected = budgetMode === mode;
                return (
                  <button
                    key={mode}
                    onClick={() => setBudgetMode(mode)}
                    className={cn(
                      "px-3 py-1.5 text-[10px] font-mono font-bold tracking-wider uppercase transition-all clip-tr-sm",
                      isSelected
                        ? "bg-rain-white text-rain-black shadow-md"
                        : "text-rain-muted hover:text-rain-white hover:bg-white/5"
                    )}
                  >
                    {mode}
                  </button>
                );
              })}
            </div>

            {/* Generate Variations Button */}
            <Button
              variant="accent"
              onClick={handleGenerateVariations}
              disabled={isGenerating}
              className="gap-2 shrink-0"
            >
              {isGenerating ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  ANALYZING HOOKS...
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  GENERATE VARIATIONS
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Budget Allocation Indicator */}
        <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono">
          <div className="flex items-center gap-3">
            <span className="text-rain-muted uppercase">Active Testing Pool:</span>
            <span className="text-rain-white font-bold bg-white/10 px-2 py-0.5 clip-bl-sm">
              {visibleCreatives.length} Variations Active
            </span>
            <span className="text-rain-muted hidden sm:inline">•</span>
            <span className="text-rain-muted hidden sm:inline">
              Mode: <strong className="text-rain-white uppercase">{budgetMode}</strong>
            </span>
          </div>
          <div className="text-[10px] text-rain-muted uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Downstream Conversion Feedback Active</span>
          </div>
        </div>
      </Card>

      {/* WINNER BUCKET (Distinct Highlighted Section) */}
      <Card 
        variant="white" 
        notch="both" 
        withTechBorder 
        className={`p-6 md:p-8 shadow-2xl transition-all duration-500 border-t-[10px] border-t-rain-black ${
          focusWinnerBucket ? 'ring-4 ring-rain-accent ring-offset-4 ring-offset-rain-bg' : ''
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 bg-rain-accent rotate-45 inline-block" />
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-rain-accent uppercase">
                GRADUATED PERFORMERS
              </span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-rain-black uppercase flex items-center gap-3">
              Winner Bucket
            </h3>
            <p className="text-xs font-mono text-rain-muted mt-1 max-w-xl">
              Creatives with confirmed low cost-per-booked-meeting are moved into the Winner Bucket for scaled daily budget.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Badge variant="black" className="text-[10px] py-1 px-3">
              WINNER BUCKET: {winnerBucketCreatives.length} SCALED
            </Badge>
          </div>
        </div>

        {/* Winner Bucket Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {winnerBucketCreatives.map((c) => (
            <div
              key={`winner-${c.id}`}
              className="border-2 border-rain-black bg-rain-grey/30 clip-bl-sm p-6 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 bg-rain-black text-rain-white px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest clip-bl-sm">
                LOCKED FOR SCALE
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="black" className="text-[9px]">WINNER</Badge>
                  <span className="text-[10px] font-mono font-bold text-rain-muted uppercase">
                    {c.campaign}
                  </span>
                </div>

                <p className="text-lg font-bold text-rain-black tracking-tight mb-6 leading-snug">
                  "{c.hook}"
                </p>
              </div>

              <div className="space-y-3 font-mono text-xs border-t-2 border-black/10 pt-4 mt-2">
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <span className="text-[9px] text-rain-muted uppercase block">CTR</span>
                    <span className="font-bold text-rain-black">{c.ctr}%</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-rain-muted uppercase block">Cost / Lead</span>
                    <span className="font-bold text-rain-black">{formatKES(c.cpl)}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-rain-muted uppercase block">Cost / Booking</span>
                    <span className="font-bold text-rain-accent">{formatKES(c.costPerBooking)}</span>
                  </div>
                </div>

                <div className="bg-rain-black text-rain-white p-2.5 clip-tr-sm flex items-center justify-between text-[11px] mt-2">
                  <span className="text-white/70 uppercase">Scaled Daily Budget:</span>
                  <span className="text-emerald-400 font-bold">{c.scaledBudget || "KES 5,000/day"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Active Creative Variations Grid (Promising, Winner, Loser) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-rain-white" />
            <h3 className="text-lg font-bold tracking-tight uppercase text-rain-white">
              Active Variation Roster ({visibleCreatives.length})
            </h3>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-rain-muted uppercase">
            <span>Tags:</span>
            <span className="text-rain-white font-bold">WINNER</span>
            <span>•</span>
            <span className="text-rain-white">PROMISING</span>
            <span>•</span>
            <span className="text-rain-accent font-bold">LOSER</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {visibleCreatives.map((c) => (
              <motion.div
                key={c.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <Card 
                  variant="white" 
                  notch="bl" 
                  className={cn(
                    "p-0 flex flex-col h-full border-t-[8px] transition-all shadow-xl overflow-hidden relative",
                    c.status === "WINNER" 
                      ? "border-t-rain-black hover:border-t-rain-accent" 
                      : c.status === "LOSER" 
                      ? "border-t-rain-accent" 
                      : "border-t-black/40 hover:border-t-black"
                  )}
                >
                  {c.image && (
                    <div className="w-full h-28 bg-rain-grey relative">
                      <img 
                        src={c.image} 
                        alt="Creative visual" 
                        className="w-full h-full object-cover mix-blend-luminosity opacity-80" 
                        crossOrigin="anonymous" 
                        referrerPolicy="no-referrer" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                    </div>
                  )}

                  <div className="p-6 flex flex-col h-full relative z-10 -mt-4">
                    <div className="flex justify-between items-start mb-4">
                      <Badge 
                        variant={
                          c.status === "WINNER" ? "black" : 
                          c.status === "LOSER" ? "accent" : "outline"
                        } 
                        className={c.status === "PROMISING" ? "text-rain-black border-black/30 font-bold" : ""}
                      >
                        {c.status}
                      </Badge>
                      <div className="text-[9px] font-mono font-bold tracking-widest text-rain-black bg-white/90 backdrop-blur-sm px-1 uppercase text-right max-w-[55%] truncate">
                        {c.campaign}
                      </div>
                    </div>

                    <p className="text-base font-bold mb-6 flex-1 leading-tight tracking-tight text-rain-black">
                      "{c.hook}"
                    </p>

                    <div className="space-y-2.5 font-mono text-[11px] font-bold tracking-wider pt-2 border-t border-black/10">
                      <div className="flex justify-between">
                        <span className="text-rain-muted uppercase text-[10px]">CTR</span>
                        <span className="text-rain-black">{c.ctr}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-rain-muted uppercase text-[10px]">Cost / Lead</span>
                        <span className="text-rain-black">{formatKES(c.cpl)}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs pt-1">
                        <span className="text-rain-black uppercase text-[10px]">Cost / Booking</span>
                        <span className={cn(
                          "px-2 py-1 text-rain-white clip-bl-sm text-[11px]",
                          c.status === 'WINNER' ? "bg-rain-black" : c.status === 'LOSER' ? "bg-rain-accent" : "bg-rain-muted"
                        )}>
                          {formatKES(c.costPerBooking)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
