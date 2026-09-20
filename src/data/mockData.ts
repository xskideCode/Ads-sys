export const KPIs = {
  spend: 184320,
  leads: 386,
  qualified: 141,
  bookings: 58,
  costPerBooking: 3178,
  showRate: 74,
  customers: 12
};

export const FunnelData = [
  { stage: "Impressions", value: 45000 },
  { stage: "Clicks", value: 16842 },
  { stage: "Leads", value: 4386 },
  { stage: "Qualified", value: 2141 },
  { stage: "Booked", value: 958 },
  { stage: "Attended", value: 643 },
  { stage: "Customers", value: 212 }
];

export const Campaigns = [
  { id: "c1", name: "AI Automation Audit", status: "ACTIVE", spend: 58420, leads: 116, qualified: 51, bookings: 22, costPerBooking: 2655, showRate: 81, customers: 6 },
  { id: "c2", name: "Speed-to-Lead Kenya", status: "LEARNING", spend: 32100, leads: 84, qualified: 28, bookings: 11, costPerBooking: 2918, showRate: 72, customers: 2 },
  { id: "c3", name: "Missed Leads Retargeting", status: "TESTING", spend: 18400, leads: 42, qualified: 18, bookings: 9, costPerBooking: 2044, showRate: 88, customers: 3 },
  { id: "c4", name: "Founder VSL Test", status: "PAUSED", spend: 41000, leads: 64, qualified: 12, bookings: 4, costPerBooking: 10250, showRate: 50, customers: 0 },
];

export const Creatives = [
  { id: "cr1", hook: "Every new lead gets a call in under five minutes.", campaign: "Speed-to-Lead Kenya", ctr: 2.9, cpl: 1080, bookings: 14, costPerBooking: 2310, status: "WINNER", image: "https://images.unsplash.com/photo-1552581234-2616094c4280?auto=format&fit=crop&w=400&q=80", inWinnerBucket: true, scaledBudget: "KES 6,000/day" },
  { id: "cr2", hook: "You're paying for leads you're replying to tomorrow.", campaign: "AI Automation Audit", ctr: 3.2, cpl: 1200, bookings: 9, costPerBooking: 2800, status: "PROMISING", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80", inWinnerBucket: false },
  { id: "cr3", hook: "Your ads aren't broken. Your follow-up is.", campaign: "Missed Leads Retargeting", ctr: 3.8, cpl: 820, bookings: 2, costPerBooking: 8610, status: "LOSER", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80", inWinnerBucket: false },
  { id: "cr4", hook: "What happens in the first 8 seconds after a WhatsApp ad click?", campaign: "Speed-to-Lead Kenya", ctr: 3.4, cpl: 940, bookings: 11, costPerBooking: 2420, status: "WINNER", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=400&q=80", inWinnerBucket: true, scaledBudget: "KES 4,800/day" },
  { id: "cr5", hook: "Stop sending ad traffic to a dead inbox on Friday evening.", campaign: "AI Automation Audit", ctr: 2.7, cpl: 1350, bookings: 6, costPerBooking: 3100, status: "PROMISING", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80", inWinnerBucket: false },
  { id: "cr6", hook: "Turn cold ad chats into confirmed calendar slots automatically.", campaign: "Missed Leads Retargeting", ctr: 2.5, cpl: 1410, bookings: 4, costPerBooking: 3450, status: "PROMISING", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80", inWinnerBucket: false },
  { id: "cr7", hook: "Why manual DM replies waste 40% of your Meta ad spend.", campaign: "Speed-to-Lead Kenya", ctr: 1.8, cpl: 2100, bookings: 1, costPerBooking: 9200, status: "LOSER", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80", inWinnerBucket: false },
];

export const PipelineSnapshotData = [
  { stage: "NEW LEAD", count: 386, delta: "+34 today", note: "Inbound ad click", icon: "inbound" },
  { stage: "FOLLOW-UP", count: 294, delta: "8s avg reply", note: "AI conversational intake", icon: "message" },
  { stage: "QUALIFIED", count: 141, delta: "Criteria verified", note: "High commercial intent", icon: "check" },
  { stage: "BOOKED", count: 58, delta: "Calendar synced", note: "Target outcome achieved", icon: "calendar" },
  { stage: "PURCHASED", count: 12, delta: "KES 1.8M GMV", note: "Closed client contracts", icon: "dollar" },
];

export const ConversionFeedbackData = {
  outcomeRecorded: "Meeting Booked",
  leadName: "TechCorp Kenya",
  channel: "WhatsApp Inbound",
  signalType: "Conversions API (CAPI)",
  destination: "Meta Dataset",
  datasetId: "DS-9041-CAPI",
  status: "SENT",
  latency: "180ms",
  matchQuality: "9.4 / 10",
  lastSent: "Just now",
};

export const ActivityLog = [
  { id: 1, time: "NOW", type: "system", title: "Creative performance analysis running", detail: "" },
  { id: 2, time: "00:03", type: "conversion", title: "Meeting booked", detail: "Wed · 14:00" },
  { id: 3, time: "00:07", type: "qualification", title: "Lead qualified", detail: "Instagram • Construction company • Meeting proposed" },
  { id: 4, time: "00:09", type: "intelligence", title: "Creative 07 marked WINNER", detail: "" },
  { id: 5, time: "00:14", type: "action", title: "Budget increase proposed", detail: "Speed-to-Lead Kenya • KES 4,000 → KES 4,600" },
];

export const AIRecommendations = [
  { 
    id: "rec1",
    action: "PAUSE",
    target: "CREATIVE 03",
    hook: "Your ads aren't broken. Your follow-up is.",
    reason: "CTR remains strong at 3.8%, but qualified-booking rate has fallen from 17.4% to 7.1% over the last 72 hours.",
    impact: "Estimated wasted spend: KES 6,400 / week",
    status: "PENDING"
  },
  {
    id: "rec2",
    action: "SCALE",
    target: "CREATIVE 07",
    hook: "Every new lead gets a call in under five minutes.",
    reason: "13 booked meetings from 44 leads. Lowest cost per qualified booking in the current campaign.",
    impact: "Recommendation: Increase daily budget from KES 3,000 → KES 3,600.",
    status: "PENDING"
  }
];

export const ConversationInsights = {
  painPoints: [
    { label: "Slow response time", percent: 31 },
    { label: "Leads going cold", percent: 24 },
    { label: "Manual WhatsApp follow-up", percent: 19 },
    { label: "No lead tracking", percent: 14 },
    { label: "Other", percent: 12 },
  ],
  objections: [
    "Need to discuss with partner",
    "Too expensive",
    "Already using a CRM",
    "Send more information",
    "Not ready yet",
  ]
};

export const ConversationsList = [
  { id: "msg1", leadName: "Juma Logistics", platform: "whatsapp", status: "QUALIFIED", time: "2m ago", unread: true, lastMsg: "Yes, we handle about 200 inquiries a week.", needsHandoff: false },
  { id: "msg2", leadName: "Amani Real Estate", platform: "ig", status: "NEEDS HANDOFF", time: "15m ago", unread: true, lastMsg: "I need to talk to a human about pricing.", needsHandoff: true },
  { id: "msg3", leadName: "TechCorp Kenya", platform: "messenger", status: "BOOKED", time: "1h ago", unread: false, lastMsg: "Great, see you on Wednesday at 14:00.", needsHandoff: false },
  { id: "msg4", leadName: "Sarah's Bakery", platform: "ig", status: "QUALIFYING", time: "2h ago", unread: false, lastMsg: "We just started running ads.", needsHandoff: false },
  { id: "msg5", leadName: "Nairobi Motors", platform: "whatsapp", status: "DISQUALIFIED", time: "5h ago", unread: false, lastMsg: "We don't have budget right now.", needsHandoff: false },
];

export const AgentCronLogs = [
  { id: "c1", name: "Meta Ads Sync", status: "SUCCESS", lastRun: "2 mins ago", nextRun: "13 mins" },
  { id: "c2", name: "Creative Intelligence", status: "SUCCESS", lastRun: "15 mins ago", nextRun: "45 mins" },
  { id: "c3", name: "Lead Qualification Engine", status: "SUCCESS", lastRun: "Just now", nextRun: "Continuous" },
  { id: "c4", name: "Budget Optimizer", status: "WARNING", lastRun: "1 hour ago", nextRun: "11 hours" },
];

export const AgentChangesList = [
  { date: "Oct 24", metric: "Cost/Booking", change: "-12%", detail: "Optimized response time from 3s to 1.5s" },
  { date: "Oct 20", metric: "Qual. Rate", change: "+18%", detail: "Updated objection handling for 'Too expensive'" },
  { date: "Oct 15", metric: "Bookings", change: "+5%", detail: "Switched to timezone-aware scheduling" },
];

export const DailyBrief = [
  "Reduced Cost per Booking by KES 450 over the last 48 hours.",
  "Creative 07 continues to be the top performer, consider scaling.",
  "2 leads require human handoff in the inbox.",
  "Detected a new objection pattern: 'Already using a CRM'."
];
