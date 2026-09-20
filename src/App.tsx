import React, { useState, useEffect } from 'react';
import { 
  Activity, BarChart3, Bot, ChevronRight, Filter, 
  LayoutDashboard, MessageSquare, Target, Settings, Search, Bell, Menu, Plus, RefreshCw, Smartphone
} from 'lucide-react';
import { cn } from './lib/utils';
import { Card } from './components/Card';
import { Button } from './components/Button';
import { Badge } from './components/Badge';
import { 
  KPIs, FunnelData, Campaigns, Creatives, 
  ActivityLog, AIRecommendations, ConversationInsights,
  ConversationsList, AgentCronLogs, AgentChangesList, DailyBrief
} from './data/mockData';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { TextScramble } from './components/TextScramble';

function formatKES(amount: number) {
  return `KES ${amount.toLocaleString('en-KE')}`;
}

const TABS = {
  OVERVIEW: "Overview",
  CAMPAIGNS: "Campaigns",
  CREATIVES: "Creatives",
  CONVERSATIONS: "Conversations",
  AGENT_CONFIG: "Agent Config"
};

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(TABS.OVERVIEW);

  return (
    <div className="min-h-screen flex w-full bg-rain-bg text-rain-white overflow-hidden font-sans">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} activeTab={activeTab} />
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto space-y-8 pb-20 h-full"
            >
              {activeTab === TABS.OVERVIEW && <OverviewView />}
              {activeTab === TABS.CAMPAIGNS && <CampaignsView />}
              {activeTab === TABS.CREATIVES && <CreativesView />}
              {activeTab === TABS.CONVERSATIONS && <ConversationsView />}
              {activeTab === TABS.AGENT_CONFIG && <AgentConfigView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// ==========================================
// VIEWS
// ==========================================

function OverviewView() {
  return (
    <>
      <DashboardHeader title="Rainlight_OS" />
      <KPISection />
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <AcquisitionFunnel />
          <AcquisitionLoop />
        </div>
        
        <div className="space-y-8">
          <AIDecisions />
          <ActivityFeed />
        </div>
      </div>
    </>
  );
}

function CampaignsView() {
  return (
    <>
      <DashboardHeader title="Campaigns" />
      <div className="flex justify-end gap-4 mb-4">
        <Button variant="outline" className="text-rain-white"><RefreshCw size={14} className="mr-2"/> Sync Meta</Button>
        <Button variant="black"><Plus size={14} className="mr-2"/> New Campaign</Button>
      </div>
      <CampaignTable />
    </>
  );
}

function CreativesView() {
  return (
    <>
      <DashboardHeader title="Creatives" />
      <div className="flex justify-end gap-4 mb-4">
        <Button variant="black"><Bot size={14} className="mr-2"/> Generate Variations</Button>
      </div>
      <CreativeIntelligence />
    </>
  );
}

function ConversationsView() {
  const [filter, setFilter] = useState('ALL');
  
  const filtered = ConversationsList.filter(c => filter === 'ALL' || (filter === 'HANDOFF' && c.needsHandoff));

  return (
    <div className="h-full flex flex-col">
      <DashboardHeader title="Inbox" />
      
      <div className="flex-1 min-h-[500px] flex gap-6 mt-4">
        {/* Sidebar */}
        <Card variant="white" notch="none" className="w-1/3 flex flex-col p-0 overflow-hidden shadow-xl">
          <div className="p-4 border-b-2 border-black/10 flex justify-between items-center bg-rain-grey/30">
            <div className="flex gap-2">
              <button onClick={() => setFilter('ALL')} className={cn("text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-1", filter === 'ALL' ? 'bg-rain-black text-rain-white' : 'text-rain-muted hover:text-rain-black')}>All</button>
              <button onClick={() => setFilter('HANDOFF')} className={cn("text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-1 flex items-center gap-1", filter === 'HANDOFF' ? 'bg-rain-accent text-rain-white' : 'text-rain-muted hover:text-rain-black')}>
                <div className={cn("w-1.5 h-1.5 rounded-full", filter === 'HANDOFF' ? 'bg-rain-white' : 'bg-rain-accent')}></div>
                Handoff
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-black/10">
            {filtered.map(c => (
              <div key={c.id} className="p-4 hover:bg-black/5 cursor-pointer transition-colors relative">
                {c.unread && <div className="absolute top-4 right-4 w-2 h-2 bg-rain-accent rounded-full"></div>}
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-rain-black text-sm">{c.leadName}</span>
                  <span className="text-[9px] font-mono font-bold text-rain-muted uppercase">{c.time}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={c.status === 'BOOKED' ? 'black' : c.status === 'NEEDS HANDOFF' ? 'accent' : 'outline'} className="text-[8px] py-0">{c.status}</Badge>
                  <span className="text-[10px] text-rain-muted flex items-center gap-1 uppercase font-mono font-bold tracking-wider">
                    {c.platform === 'whatsapp' ? <Smartphone size={10} /> : <MessageSquare size={10} />}
                    {c.platform}
                  </span>
                </div>
                <p className="text-xs text-rain-black/70 truncate">{c.lastMsg}</p>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Main Panel */}
        <Card variant="white" notch="bl" className="flex-1 flex flex-col p-0 overflow-hidden shadow-xl relative">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>
          <div className="p-6 border-b-2 border-black/10 bg-white relative z-10 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-rain-black text-lg">Amani Real Estate</h3>
              <p className="text-[10px] font-mono text-rain-muted uppercase tracking-widest">Instagram • Ad: Speed-to-Lead</p>
            </div>
            <Button variant="black" size="sm">TAKE OVER</Button>
          </div>
          <div className="flex-1 p-6 overflow-y-auto space-y-6 relative z-10">
            <div className="flex justify-center">
              <span className="text-[9px] font-mono font-bold bg-rain-grey px-2 py-1 uppercase tracking-widest text-rain-muted">Today</span>
            </div>
            <div className="flex gap-4 max-w-[80%]">
              <div className="w-8 h-8 bg-rain-black clip-tr-sm shrink-0 flex items-center justify-center text-xs text-rain-white font-bold">A</div>
              <div className="bg-rain-grey p-4 text-sm text-rain-black clip-tr-sm">
                Hi! Thanks for your interest. Are you currently running ads for your properties?
              </div>
            </div>
            <div className="flex gap-4 max-w-[80%] ml-auto justify-end">
              <div className="bg-rain-black p-4 text-sm text-rain-white clip-bl-sm">
                Yes, but the leads are low quality. I need to talk to a human about pricing for your system.
              </div>
              <div className="w-8 h-8 bg-rain-accent clip-bl-sm shrink-0 flex items-center justify-center text-xs text-rain-white font-bold">L</div>
            </div>
            <div className="flex justify-center">
              <span className="text-[9px] font-mono font-bold bg-rain-accent/10 text-rain-accent px-2 py-1 uppercase tracking-widest border border-rain-accent/20">Agent Paused • Handoff Requested</span>
            </div>
          </div>
          <div className="p-4 bg-white border-t-2 border-black/10 relative z-10">
            <div className="flex gap-2">
              <input type="text" placeholder="Type message..." className="flex-1 bg-rain-grey border-none p-3 text-sm focus:outline-none focus:ring-2 focus:ring-rain-black clip-tr-sm text-rain-black placeholder:text-rain-muted" />
              <Button variant="black">SEND</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function AgentConfigView() {
  return (
    <>
      <DashboardHeader title="Agent Config" />
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <Card variant="black" notch="tr" className="p-8">
            <h2 className="text-xl font-bold tracking-tight uppercase flex items-center gap-3 mb-6">
              <Bot size={20} className="text-rain-white" />
              Base Instructions
            </h2>
            <textarea 
              className="w-full h-48 bg-rain-bg text-rain-white border border-rain-white/20 p-4 font-mono text-xs focus:outline-none focus:border-rain-white clip-bl-sm resize-none"
              defaultValue={`SYSTEM ROLE: You are an expert sales setter for Rainlight.\n\nOBJECTIVE: Qualify inbound leads and book them onto a calendar. Do not provide pricing unless explicitly requested twice.\n\nOBJECTION HANDLING:\n- "Too expensive": Pivot to ROI and time saved.\n- "Need to think": Ask what specific part they need to think about.\n\nESCALATION:\nIf the user requests a human directly, tag [HANDOFF] and stop replying.`}
            />
            <div className="mt-4 flex justify-end">
              <Button variant="white">DEPLOY UPDATE</Button>
            </div>
          </Card>
          
          <Card variant="white" notch="none" className="p-8">
            <h3 className="font-bold text-lg uppercase text-rain-black mb-6 flex justify-between items-center">
              Agent Improvement Logs
            </h3>
            <div className="space-y-4">
              {AgentChangesList.map((change, i) => (
                <div key={i} className="flex gap-4 items-start p-4 bg-rain-grey clip-tr-sm hover:bg-black/5 transition-colors">
                  <div className="w-16 shrink-0 pt-0.5">
                    <span className="text-[10px] font-mono font-bold text-rain-muted uppercase">{change.date}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-bold text-sm text-rain-black">{change.metric}</span>
                      <span className={cn("text-sm font-bold", change.change.startsWith('+') ? "text-rain-black" : "text-rain-accent")}>
                        {change.change}
                      </span>
                    </div>
                    <p className="text-xs text-rain-muted">{change.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          <AISetterPerformance />
        </div>
        
        <div className="space-y-8">
          <Card variant="white" notch="none" className="p-6">
            <h3 className="font-bold text-lg uppercase text-rain-black mb-4">Daily Brief</h3>
            <ul className="space-y-3">
              {DailyBrief.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-rain-black/80 font-medium">
                  <div className="w-1.5 h-1.5 bg-rain-accent mt-1.5 shrink-0 rotate-45"></div>
                  {item}
                </li>
              ))}
            </ul>
          </Card>
          
          <Card variant="white" notch="none" className="p-6">
            <h3 className="font-bold text-lg uppercase text-rain-black mb-4 flex justify-between items-center">
              Active Engines
              <span className="text-[10px] font-mono text-rain-muted tracking-widest">CRON</span>
            </h3>
            <div className="space-y-4">
              {AgentCronLogs.map(cron => (
                <div key={cron.id} className="flex justify-between items-center border-b border-black/10 pb-3 last:border-0 last:pb-0">
                  <div>
                    <div className="text-xs font-bold text-rain-black uppercase">{cron.name}</div>
                    <div className="text-[9px] font-mono text-rain-muted mt-1 uppercase">Last: {cron.lastRun}</div>
                  </div>
                  <Badge variant={cron.status === 'SUCCESS' ? 'black' : 'outline'} className={cron.status === 'SUCCESS' ? '' : 'text-rain-accent border-rain-accent'}>
                    {cron.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

// ==========================================
// SUBCOMPONENTS
// ==========================================

function Sidebar({ isOpen, setIsOpen, activeTab, setActiveTab }: { isOpen: boolean; setIsOpen: (v: boolean) => void; activeTab: string; setActiveTab: (v: string) => void }) {
  const navItems = [
    { icon: LayoutDashboard, label: TABS.OVERVIEW },
    { icon: Target, label: TABS.CAMPAIGNS },
    { icon: Activity, label: TABS.CREATIVES },
    { icon: MessageSquare, label: TABS.CONVERSATIONS },
    { icon: Bot, label: TABS.AGENT_CONFIG },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <aside className={cn(
        "fixed md:static inset-y-0 left-0 z-50 w-24 flex flex-col items-center py-8 bg-rain-bg transition-transform transform md:translate-x-0 shrink-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Floating sidebar effect */}
        <div className="flex-1 w-16 bg-rain-white clip-bl-sm flex flex-col items-center py-6 shadow-2xl relative">
          <div className="w-12 h-12 bg-rain-black clip-tr-sm flex items-center justify-center text-rain-white mb-8 shrink-0 relative">
            <span className="font-bold font-mono text-xl">R</span>
            <div className="absolute top-0 right-0 w-3 h-3 bg-rain-accent border-2 border-rain-white"></div>
          </div>
          
          <nav className="flex flex-col gap-6 w-full items-center">
            {navItems.map((item, idx) => {
              const active = activeTab === item.label;
              return (
                <button 
                  key={idx} 
                  onClick={() => { setActiveTab(item.label); setIsOpen(false); }}
                  className={cn(
                    "p-3 clip-bl-sm transition-all relative group flex items-center justify-center",
                    active ? "bg-rain-black text-rain-white" : "text-rain-muted hover:text-rain-black hover:bg-black/5"
                  )}
                  title={item.label}
                >
                  <item.icon size={20} strokeWidth={2} />
                </button>
              )
            })}
          </nav>
          
          <div className="mt-auto flex flex-col gap-4 items-center">
            <button className="p-3 text-rain-muted hover:text-rain-black transition-colors clip-tr-sm hover:bg-black/5">
              <Settings size={20} strokeWidth={2} />
            </button>
            <div className="w-10 h-10 bg-rain-grey overflow-hidden border-2 border-rain-black shrink-0 clip-both-sm">
              <img src="https://ui-avatars.com/api/?name=Rainlight+AI&background=000&color=fff" alt="User" className="w-full h-full object-cover scale-150" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function Topbar({ toggleSidebar, activeTab }: { toggleSidebar: () => void; activeTab?: string }) {
  return (
    <header className="h-20 flex items-center justify-between px-4 md:px-8 shrink-0 z-30 relative">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-rain-white" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <div className="hidden md:flex items-center gap-2 text-xs font-bold tracking-widest text-rain-muted uppercase font-mono">
          <span className="text-rain-white">SYS.OP</span>
          <ChevronRight size={14} className="text-rain-accent" />
          <span>{activeTab || "GROWTH ENGINE"}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-rain-muted" />
          <input 
            type="text" 
            placeholder="SEARCH CAMPAIGNS..." 
            className="bg-rain-black border border-white/10 rounded-none px-9 py-2 text-xs font-mono tracking-wider focus:outline-none focus:border-rain-white transition-colors w-64 text-rain-white clip-bl-sm"
          />
        </div>
        <button className="relative text-rain-muted hover:text-rain-white transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rain-accent rounded-none border-2 border-rain-bg"></span>
        </button>
        
        <div className="flex items-center bg-rain-black border border-white/10 clip-tr-sm p-1">
          {['Meta', 'Google'].map((net) => (
            <button 
              key={net} 
              className={cn(
                "px-4 py-1.5 text-[10px] font-bold font-mono tracking-widest uppercase transition-colors clip-bl-sm",
                net === 'Meta' ? "bg-rain-white text-rain-black" : "text-rain-muted hover:text-rain-white"
              )}
            >
              {net}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

function DashboardHeader({ title = "Rainlight_OS" }: { title?: string }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 bg-rain-accent rotate-45"></div>
          <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-rain-muted uppercase">Intelligence Layer Active</span>
        </div>
        <h1 className="text-5xl font-bold tracking-tighter text-rain-white uppercase flex items-center gap-2">
          {title.split('_').map((part, i, arr) => (
            <React.Fragment key={i}>
              <TextScramble text={part} />
              {i < arr.length - 1 && <span className="text-rain-accent">_</span>}
            </React.Fragment>
          ))}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex bg-rain-black border border-white/10 p-1 clip-tr-sm">
          {['Today', '7D', '30D', '90D'].map((time) => (
            <button 
              key={time} 
              className={cn(
                "px-4 py-2 text-[10px] font-bold font-mono tracking-widest uppercase transition-colors clip-bl-sm",
                time === '7D' ? "bg-rain-white text-rain-black" : "text-rain-muted hover:text-rain-white"
              )}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function KPISection() {
  const metrics = [
    { label: "AD SPEND", value: formatKES(KPIs.spend), delta: "+14.2%" },
    { label: "LEADS", value: KPIs.leads, delta: "+8.4%" },
    { label: "QUALIFIED", value: KPIs.qualified, delta: "+12.1%" },
    { label: "MEETINGS", value: KPIs.bookings, delta: "+18.5%", highlight: true },
    { label: "COST/MEETING", value: formatKES(KPIs.costPerBooking), delta: "-5.2%", invertDelta: true },
    { label: "CUSTOMERS", value: KPIs.customers, delta: "+2" },
  ];

  return (
    <Card variant="white" notch="both" className="p-0 shadow-2xl">
      <div className="flex flex-wrap md:flex-nowrap divide-y md:divide-y-0 md:divide-x divide-black/10">
        {metrics.map((m, i) => {
          const isPositive = m.invertDelta ? m.delta.startsWith('-') : m.delta.startsWith('+');
          return (
            <div key={i} className={cn("p-6 flex-1 min-w-[140px]", m.highlight ? "bg-rain-black text-rain-white" : "")}>
              <p className={cn("text-[10px] font-mono font-bold tracking-[0.15em] mb-4 uppercase", m.highlight ? "text-white/80" : "text-rain-muted")}>
                {m.label}
              </p>
              <p className={cn("text-3xl font-bold tracking-tighter mb-2", m.highlight ? "text-rain-white" : "text-rain-black")}>
                {m.value}
              </p>
              <div className="flex items-center gap-2 mt-4">
                <span className={cn(
                  "text-[10px] font-mono font-bold tracking-wider",
                  isPositive ? (m.highlight ? "text-rain-white" : "text-emerald-600") : (m.highlight ? "text-rain-accent" : "text-rain-accent")
                )}>
                  {m.delta}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function AcquisitionFunnel() {
  return (
    <Card variant="white" notch="tr" withTechBorder className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold tracking-tight uppercase flex items-center gap-3 text-rain-black">
          <div className="w-3 h-3 bg-rain-black"></div>
          Acquisition Funnel
        </h2>
        <Badge variant="outline" className="border-black/20 text-rain-black">DROP-OFF RATE</Badge>
      </div>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={FunnelData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
            <XAxis type="number" scale="log" domain={[1, 'auto']} hide />
            <YAxis dataKey="stage" type="category" axisLine={false} tickLine={false} tick={{ fill: '#09090b', fontSize: 10, fontFamily: 'JetBrains Mono', fontWeight: 'bold' }} width={100} />
            <Tooltip 
              cursor={{fill: '#000000', opacity: 0.05}} 
              contentStyle={{ backgroundColor: '#ffffff', border: '2px solid #000000', borderRadius: '0', fontFamily: 'JetBrains Mono', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}
            />
            <Bar dataKey="value" barSize={32}>
              {FunnelData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index > 3 ? '#f03e16' : '#121214'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 pt-4 border-t-2 border-black/10 flex justify-between text-[10px] font-mono font-bold tracking-widest text-rain-muted uppercase">
        <div>Top of Funnel</div>
        <div className="text-rain-accent">Downstream Outcomes</div>
      </div>
    </Card>
  );
}

function AcquisitionLoop() {
  return (
    <Card variant="black" notch="bl" className="p-8 overflow-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col items-start gap-8">
        <div className="w-full flex justify-between items-start">
          <div className="md:w-1/2">
            <h2 className="text-xl font-bold tracking-tight uppercase flex items-center gap-3 mb-2">
              <div className="w-3 h-3 bg-rain-accent"></div>
              Closed-Loop Learning
            </h2>
            <p className="text-xs font-mono text-rain-muted tracking-wider leading-relaxed">Every downstream outcome becomes a signal for the next campaign decision. The system self-optimizes via continuous feedback.</p>
          </div>
          <Badge variant="outline" className="text-rain-white border-rain-white/30 hidden md:inline-flex">AUTO-OPTIMIZING</Badge>
        </div>
        
        <div className="w-full flex items-center justify-center py-10 relative">
          {/* Animated circular track */}
          <div className="absolute w-[280px] h-[280px] rounded-full border border-dashed border-white/20 animate-[spin_20s_linear_infinite]"></div>
          <div className="absolute w-[280px] h-[280px] rounded-full border border-transparent">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-rain-accent rotate-45 animate-pulse shadow-[0_0_15px_#ea4335]"></div>
          </div>
          
          <div className="grid grid-cols-2 gap-24 relative z-10">
            <div className="flex flex-col items-center gap-3 translate-x-8 translate-y-8">
              <div className="w-14 h-14 bg-rain-black border-2 border-rain-white flex items-center justify-center relative clip-bl-sm shadow-2xl group">
                <Target size={20} className="text-rain-white group-hover:text-rain-accent transition-colors" />
              </div>
              <span className="text-[10px] font-mono font-bold text-rain-white uppercase tracking-[0.2em] bg-rain-black px-2 py-1">Meta Ads</span>
            </div>
            
            <div className="flex flex-col items-center gap-3 -translate-x-8 translate-y-8">
              <div className="w-14 h-14 bg-rain-black border-2 border-rain-white flex items-center justify-center relative clip-tr-sm shadow-2xl group">
                <MessageSquare size={20} className="text-rain-white group-hover:text-rain-accent transition-colors" />
              </div>
              <span className="text-[10px] font-mono font-bold text-rain-white uppercase tracking-[0.2em] bg-rain-black px-2 py-1">AI Setter</span>
            </div>
            
            <div className="flex flex-col items-center gap-3 translate-x-8 -translate-y-8">
              <div className="w-14 h-14 bg-rain-black border-2 border-rain-white flex items-center justify-center relative clip-tr-sm shadow-2xl group">
                <Bot size={20} className="text-rain-white group-hover:text-rain-accent transition-colors" />
              </div>
              <span className="text-[10px] font-mono font-bold text-rain-white uppercase tracking-[0.2em] bg-rain-black px-2 py-1">Analysis</span>
            </div>
            
            <div className="flex flex-col items-center gap-3 -translate-x-8 -translate-y-8 relative">
              <div className="absolute -inset-2 bg-rain-accent/20 blur-xl rounded-full"></div>
              <div className="w-16 h-16 bg-rain-accent border-2 border-rain-accent flex items-center justify-center relative clip-both-sm shadow-2xl z-10 hover:scale-105 transition-transform">
                <Activity size={24} className="text-rain-white" />
              </div>
              <span className="text-[10px] font-mono font-bold text-rain-accent uppercase tracking-[0.2em] bg-rain-black px-2 py-1 relative z-10">Outcome</span>
            </div>
          </div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[10px] font-mono text-rain-muted uppercase tracking-widest max-w-[120px]">
            Data Engine
            <div className="h-[1px] w-8 bg-rain-accent mx-auto mt-2"></div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function CampaignTable() {
  return (
    <Card variant="white" notch="none" className="p-0 overflow-hidden shadow-xl border-t-[12px] border-t-rain-black">
      <div className="p-6 md:p-8 border-b-2 border-black/10 flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight uppercase text-rain-black">Live Campaigns</h2>
        <Badge variant="black">RUNNING: {Campaigns.length}</Badge>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="text-[10px] font-mono font-bold text-rain-muted bg-rain-grey/30 uppercase tracking-widest border-b-2 border-black/10">
            <tr>
              <th className="px-6 py-4">Campaign</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Spend</th>
              <th className="px-6 py-4 text-right">Leads</th>
              <th className="px-6 py-4 text-right">Qualified</th>
              <th className="px-6 py-4 text-right">Bookings</th>
              <th className="px-6 py-4 text-right text-rain-black">Cost/Booking</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10 font-mono text-xs font-medium">
            {Campaigns.map((c) => (
              <tr key={c.id} className="hover:bg-black/5 transition-colors group">
                <td className="px-6 py-5 font-sans text-sm font-bold text-rain-black tracking-tight">{c.name}</td>
                <td className="px-6 py-5">
                  <Badge 
                    variant={
                      c.status === "ACTIVE" ? "black" : 
                      c.status === "TESTING" ? "outline" : 
                      c.status === "LEARNING" ? "white" : "outline"
                    }
                    className={c.status === "LEARNING" ? "border-2 border-rain-black text-rain-black" : (c.status === 'TESTING' ? "text-rain-black" : "")}
                  >
                    {c.status}
                  </Badge>
                </td>
                <td className="px-6 py-5 text-right text-rain-muted">{formatKES(c.spend)}</td>
                <td className="px-6 py-5 text-right text-rain-black">{c.leads}</td>
                <td className="px-6 py-5 text-right text-rain-black">{c.qualified}</td>
                <td className="px-6 py-5 text-right text-rain-black font-bold">{c.bookings}</td>
                <td className="px-6 py-5 text-right text-rain-accent font-bold group-hover:scale-105 transition-transform origin-right">{formatKES(c.costPerBooking)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function CreativeIntelligence() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold tracking-tight uppercase text-rain-white flex items-center gap-3">
        <div className="w-3 h-3 bg-rain-white"></div>
        Creative Intelligence
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Creatives.map(c => (
          <Card key={c.id} variant="white" notch="bl" className="p-0 flex flex-col h-full border-t-[8px] border-t-black hover:border-t-rain-accent transition-all shadow-xl overflow-hidden relative">
            {/* @ts-ignore */}
            {c.image && (
              <div className="w-full h-32 bg-rain-grey relative">
                {/* @ts-ignore */}
                <img src={c.image} alt="Creative" className="w-full h-full object-cover mix-blend-luminosity opacity-80" crossOrigin="anonymous" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
              </div>
            )}
            <div className="p-6 flex flex-col h-full relative z-10 -mt-6">
              <div className="flex justify-between items-start mb-6">
                <Badge variant={
                  c.status === "WINNER" ? "black" : 
                  c.status === "LOSER" ? "accent" : "outline"
                } className={c.status === "PROMISING" ? "text-rain-black border-black/30" : ""}>{c.status}</Badge>
                <div className="text-[9px] font-mono font-bold tracking-widest text-rain-black bg-white/80 backdrop-blur-sm px-1 uppercase text-right max-w-[50%]">{c.campaign}</div>
              </div>
              
              <p className="text-lg font-bold mb-8 flex-1 leading-tight tracking-tight text-rain-black">"{c.hook}"</p>
              
              <div className="space-y-3 font-mono text-[11px] font-bold tracking-wider">
                <div className="flex justify-between">
                  <span className="text-rain-muted uppercase">CTR</span>
                  <span className="text-rain-black">{c.ctr}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-rain-muted uppercase">Cost/Lead</span>
                  <span className="text-rain-black">{formatKES(c.cpl)}</span>
                </div>
                <div className="h-0.5 bg-black/10 w-full my-3"></div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-rain-black uppercase">Cost/Booking</span>
                  <span className={cn(
                    "px-2 py-1 text-rain-white clip-bl-sm",
                    c.status === 'WINNER' ? "bg-rain-black" : c.status === 'LOSER' ? "bg-rain-accent" : "bg-rain-muted"
                  )}>
                    {formatKES(c.costPerBooking)}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <Card variant="black" notch="tr" className="p-6 mt-4 flex flex-col sm:flex-row items-center gap-6 justify-between border border-white/20">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-rain-white clip-bl-sm flex items-center justify-center shrink-0">
            <Activity className="text-rain-black" size={20} />
          </div>
          <div>
            <h4 className="font-mono font-bold tracking-[0.2em] text-[10px] text-rain-muted uppercase mb-1">Signature Insight</h4>
            <p className="text-sm font-medium tracking-wide leading-relaxed text-rain-white">Creative 03 attracts more clicks but lower-intent prospects. Creative 01 produces 3.7× more qualified meetings per shilling spent.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function AIDecisions() {
  const [recs, setRecs] = useState(AIRecommendations);

  const handleAction = (id: string, newStatus: string) => {
    setRecs(recs.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  return (
    <Card variant="white" notch="both" withTechBorder className="p-8 shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold tracking-tight uppercase flex items-center gap-3 text-rain-black">
          <Bot size={24} className="text-rain-accent" />
          AI Decisions
        </h2>
        <Badge variant="black">ACTION REQ</Badge>
      </div>
      
      <div className="space-y-6">
        {recs.map(r => (
          <div key={r.id} className="border-2 border-rain-black p-5 relative overflow-hidden group clip-tr-sm text-rain-black">
            {r.status === "PENDING" && (
              <div className="absolute top-0 left-0 w-2 h-full bg-rain-accent"></div>
            )}
            
            <div className="flex justify-between items-start mb-4 pl-3">
              <div className="flex items-center gap-3">
                <Badge variant={r.action === 'PAUSE' ? 'accent' : 'black'}>{r.action}</Badge>
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-rain-muted">{r.target}</span>
              </div>
              {r.status !== "PENDING" && (
                <Badge variant="outline" className="text-rain-black border-black/30">{r.status}</Badge>
              )}
            </div>
            
            <p className="text-sm font-bold tracking-tight mb-4 pl-3">"{r.hook}"</p>
            
            <div className="text-[11px] font-mono font-medium tracking-wide space-y-3 mb-6 pl-3">
              <p><span className="text-rain-muted uppercase font-bold mr-2">Why:</span> <span className="text-rain-black">{r.reason}</span></p>
              <p><span className="text-rain-accent uppercase font-bold mr-2">Impact:</span> <span className="text-rain-black">{r.impact}</span></p>
            </div>
            
            {r.status === "PENDING" && (
              <div className="flex gap-3 mt-4 pt-5 border-t-2 border-black/10 pl-3">
                <Button size="sm" variant="black" className="flex-1" onClick={() => handleAction(r.id, "APPROVED")}>APPROVE</Button>
                <Button size="sm" variant="outline" className="flex-1 border-black/30 text-rain-black hover:bg-black/5" onClick={() => handleAction(r.id, "DISMISSED")}>REVIEW</Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

function AISetterPerformance() {
  return (
    <Card variant="black" notch="tr" className="p-8 flex flex-col shadow-2xl">
      <h2 className="text-xl font-bold tracking-tight uppercase mb-8 flex items-center gap-3">
        <MessageSquare size={20} className="text-rain-white" />
        Setter Performance
      </h2>
      
      <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
        <div>
          <p className="text-[10px] font-mono font-bold tracking-widest text-rain-muted uppercase mb-1">New Convos</p>
          <p className="text-3xl font-bold tracking-tighter text-rain-white">174</p>
        </div>
        <div>
          <p className="text-[10px] font-mono font-bold tracking-widest text-rain-muted uppercase mb-1">Response</p>
          <p className="text-3xl font-bold tracking-tighter text-rain-white">8<span className="text-lg text-rain-muted ml-1">sec</span></p>
        </div>
        <div>
          <p className="text-[10px] font-mono font-bold tracking-widest text-rain-muted uppercase mb-1">Qualified</p>
          <p className="text-3xl font-bold tracking-tighter text-rain-white">63</p>
        </div>
        <div>
          <p className="text-[10px] font-mono font-bold tracking-widest text-rain-muted uppercase mb-1">Booked</p>
          <p className="text-3xl font-bold tracking-tighter text-rain-accent">31</p>
        </div>
      </div>
      
      <div className="bg-rain-white text-rain-black border-[3px] border-rain-white p-5 mt-auto clip-bl-sm shadow-inner relative">
        <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-black/10">
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase">Live Transmit</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-rain-accent rounded-full animate-pulse"></div>
            <span className="text-[9px] font-mono font-bold tracking-widest text-rain-muted">REC</span>
          </div>
        </div>
        
        <div className="space-y-5 text-xs font-sans font-medium tracking-wide">
          <div className="flex gap-3">
            <div className="w-6 h-6 bg-rain-black clip-tr-sm shrink-0 flex items-center justify-center text-[10px] text-rain-white font-bold">L</div>
            <div className="pt-1">How much does this cost?</div>
          </div>
          
          <div className="flex gap-3">
            <div className="w-6 h-6 bg-rain-accent clip-tr-sm shrink-0 flex items-center justify-center text-[10px] text-rain-white font-bold">A</div>
            <div className="pt-1 text-rain-muted">
              It depends on the workflow you're trying to automate. Can I ask roughly how many inquiries your team handles each month?
            </div>
          </div>
          
          <div className="flex justify-center mt-4 pt-2">
            <Badge variant="black" className="px-4 py-1 border border-rain-black text-[9px]">BOOKED: WED · 14:00</Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}

function Guardrails() {
  return (
    <Card variant="white" notch="none" className="p-8 shadow-xl text-rain-black">
      <h2 className="text-xl font-bold tracking-tight uppercase mb-6 flex items-center gap-3">
        <div className="w-3 h-3 bg-rain-black"></div>
        Guardrails
      </h2>
      <div className="space-y-0 font-mono text-[11px] font-bold tracking-wider uppercase divide-y-2 divide-black/10">
        <div className="flex justify-between items-center py-4">
          <span className="text-rain-muted">Daily spend ceiling</span>
          <span className="text-rain-black">KES 25,000</span>
        </div>
        <div className="flex justify-between items-center py-4">
          <span className="text-rain-muted">Max budget increase</span>
          <span className="text-rain-black">20%</span>
        </div>
        <div className="flex justify-between items-center py-4">
          <span className="text-rain-muted">Pause underperforming</span>
          <span className="text-rain-white bg-rain-accent px-2 py-0.5 clip-bl-sm">AUTO</span>
        </div>
        <div className="flex justify-between items-center py-4">
          <span className="text-rain-muted">Publish new creative</span>
          <span className="text-rain-white bg-rain-black px-2 py-0.5 clip-tr-sm">REQ APP</span>
        </div>
      </div>
    </Card>
  );
}

function ActivityFeed() {
  return (
    <Card variant="white" notch="none" className="p-8 shadow-xl">
      <h2 className="text-xl font-bold tracking-tight uppercase mb-8 flex items-center gap-3 text-rain-black">
        <Activity size={24} className="text-rain-black" />
        Agent Log
      </h2>
      <div className="space-y-6">
        {ActivityLog.map(log => (
          <div key={log.id} className="flex gap-5 relative">
            <div className="w-12 text-[10px] font-mono font-bold tracking-widest text-rain-muted pt-1 shrink-0 text-right">{log.time}</div>
            
            <div className="relative z-10 flex flex-col items-center pt-1.5">
              <div className="w-2.5 h-2.5 bg-rain-black outline outline-2 outline-white rounded-none clip-tr-sm z-10"></div>
              <div className="w-0.5 h-full bg-black/10 absolute top-3 bottom-[-24px] -z-10"></div>
            </div>
            
            <div className="pb-2">
              <p className="text-sm font-bold tracking-tight text-rain-black uppercase">{log.title}</p>
              {log.detail && <p className="text-[11px] font-mono font-medium tracking-wide text-rain-muted mt-2">{log.detail}</p>}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
