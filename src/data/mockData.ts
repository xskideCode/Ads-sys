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
  { id: "cr1", hook: "Every new lead gets a call in under five minutes.", campaign: "Speed-to-Lead Kenya", ctr: 2.9, cpl: 1080, bookings: 14, costPerBooking: 2310, status: "WINNER", image: "https://images.unsplash.com/photo-1552581234-2616094c4280?auto=format&fit=crop&w=400&q=80" },
  { id: "cr2", hook: "You're paying for leads you're replying to tomorrow.", campaign: "AI Automation Audit", ctr: 3.2, cpl: 1200, bookings: 9, costPerBooking: 2800, status: "PROMISING", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80" },
  { id: "cr3", hook: "Your ads aren't broken. Your follow-up is.", campaign: "Missed Leads Retargeting", ctr: 3.8, cpl: 820, bookings: 2, costPerBooking: 8610, status: "LOSER", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80" },
];

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
