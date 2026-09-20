import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, ChevronRight, ChevronLeft, X, Sparkles, Video } from 'lucide-react';
import { Button } from './Button';
import { Badge } from './Badge';

export interface ShowcaseStepInfo {
  step: number;
  title: string;
  tab: string;
  focusId: string;
  scriptCue: string;
}

export const SHOWCASE_STEPS: ShowcaseStepInfo[] = [
  {
    step: 1,
    title: "Campaigns & Meta Sync",
    tab: "Campaigns",
    focusId: "campaigns-sync",
    scriptCue: "“I built a Meta ads system that doesn’t stop at the WhatsApp message. The ad brings the person in…”",
  },
  {
    step: 2,
    title: "Inbox & AI Response",
    tab: "Conversations",
    focusId: "inbox-response",
    scriptCue: "“…the AI responder handles the first conversation in seconds, and the inbox moves that lead to the next step.”",
  },
  {
    step: 3,
    title: "Outcome Selector",
    tab: "Overview",
    focusId: "outcome-selector",
    scriptCue: "“But here is the part most setups miss: a message is not necessarily a qualified lead, a booked meeting or a purchase.”",
  },
  {
    step: 4,
    title: "Conversion Signal (CAPI)",
    tab: "Overview",
    focusId: "capi-signal",
    scriptCue: "“When the real outcome happens, the system can send that signal back to Meta through the Conversions API.”",
  },
  {
    step: 5,
    title: "Creative Variations & Budget",
    tab: "Creatives",
    focusId: "creative-variations",
    scriptCue: "“Now Meta has more than a message to learn from… the system can test new creative variations based on budget…”",
  },
  {
    step: 6,
    title: "Winner Bucket",
    tab: "Creatives",
    focusId: "winner-bucket",
    scriptCue: "“…compare the outcomes and move the strongest formats into a winner bucket.”",
  },
  {
    step: 7,
    title: "Pipeline Snapshot & Closed Loop",
    tab: "Overview",
    focusId: "pipeline-snapshot",
    scriptCue: "“From new lead to follow-up to booked or purchased. I built this to connect the ad, the conversation and the outcome.”",
  },
];

interface ShowcaseControllerProps {
  isActive: boolean;
  onToggle: () => void;
  currentStepIndex: number;
  onSelectStep: (stepIndex: number) => void;
}

export function ShowcaseController({
  isActive,
  onToggle,
  currentStepIndex,
  onSelectStep,
}: ShowcaseControllerProps) {
  const currentStep = SHOWCASE_STEPS[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < SHOWCASE_STEPS.length - 1) {
      onSelectStep(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      onSelectStep(currentStepIndex - 1);
    }
  };

  // Enable arrow keys for smooth hands-free screen recording transitions
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Space") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "Escape") {
        onToggle();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive, currentStepIndex]);

  if (!isActive) {
    return (
      <Button
        variant="accent"
        size="sm"
        onClick={onToggle}
        className="gap-2 shadow-lg hover:scale-105 transition-transform font-mono text-[11px]"
      >
        <Video size={14} className="animate-pulse" />
        <span>SHOWCASE MODE</span>
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-rain-black/95 backdrop-blur-md text-rain-white border-2 border-rain-accent p-4 clip-both-sm shadow-[0_12px_40px_rgba(0,0,0,0.85)]"
      >
        {/* Top bar with Step Indicator & Exit */}
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-rain-accent rotate-45" />
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-rain-accent uppercase">
              SHOWCASE REVEAL • STEP 0{currentStep.step} OF 0{SHOWCASE_STEPS.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="accent" className="text-[9px] py-0.5">
              VIEW: {currentStep.tab.toUpperCase()}
            </Badge>
            <button
              onClick={onToggle}
              className="text-rain-muted hover:text-white p-1 transition-colors"
              title="Exit Showcase"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Current Step Title & Teleprompter Voiceover Cue */}
        <div className="mb-3">
          <h4 className="text-base font-bold uppercase tracking-tight text-white flex items-center gap-2">
            <span>{currentStep.step}.</span> {currentStep.title}
          </h4>
          <p className="text-xs font-mono text-rain-accent/90 mt-1 italic line-clamp-2 leading-tight">
            {currentStep.scriptCue}
          </p>
        </div>

        {/* Bottom Controls Row: Prev, Quick Step Chips, Next Reveal */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-white/15">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className="text-rain-white border-white/30 text-[10px] h-8 px-3 gap-1"
          >
            <ChevronLeft size={14} />
            PREV
          </Button>

          {/* Quick jump step numbers */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {SHOWCASE_STEPS.map((s, idx) => (
              <button
                key={s.step}
                onClick={() => onSelectStep(idx)}
                className={`w-7 h-7 font-mono font-bold text-[10px] flex items-center justify-center transition-all clip-bl-sm ${
                  idx === currentStepIndex
                    ? 'bg-rain-accent text-white font-black scale-110 shadow-md'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
                title={s.title}
              >
                {s.step}
              </button>
            ))}
          </div>

          <Button
            variant="accent"
            size="sm"
            onClick={handleNext}
            disabled={currentStepIndex === SHOWCASE_STEPS.length - 1}
            className="text-[10px] h-8 px-3 gap-1 font-bold shadow-md"
          >
            NEXT REVEAL
            <ChevronRight size={14} />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
