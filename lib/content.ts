export type Feature = { title: string; body: string };
export type ProductPage = {
  slug: string; name: string; tagline: string; group: "Channels" | "Build" | "Optimize" | "Scale" | "Duet";
  hero: string; features: Feature[]; steps: string[]; stat: { value: string; label: string };
};

export const products: ProductPage[] = [
  { slug: "voice", name: "Voice", tagline: "Human-like conversation", group: "Channels",
    hero: "Phone support that sounds like your best agent on their best day: calm, quick and fully on-brand.",
    features: [
      { title: "Natural turn-taking", body: "Handles interruptions, pauses and corrections without making callers repeat themselves." },
      { title: "Brand voice controls", body: "Pick tone, pacing and vocabulary so every call sounds unmistakably like your company." },
      { title: "Warm handoff to people", body: "Escalates with a written summary and the full transcript, so nobody starts from zero." },
      { title: "Live actions", body: "Looks up orders, changes bookings and issues refunds during the call, not after it." }],
    steps: ["Connect your phone number or contact-center platform", "Describe call flows in plain language", "Test with simulated callers", "Go live with a staged rollout"],
    stat: { value: "50%+", label: "target resolution on voice" } },
  { slug: "chat", name: "Chat", tagline: "Safe, on-brand replies", group: "Channels",
    hero: "Chat that completes the job: verifying identity, calling your systems and closing the ticket in one thread.",
    features: [
      { title: "Multi-step workflows", body: "Runs refunds, plan changes and address updates end to end with approvals where you want them." },
      { title: "Grounded answers", body: "Replies cite your help center, policies and past resolved tickets, and decline when the source is missing." },
      { title: "Guardrails", body: "Blocked topics, tone rules and PII redaction apply to every message before it is sent." },
      { title: "Embeddable widget", body: "Drop a single script on your site or app, styled to match your product." }],
    steps: ["Import articles and past tickets", "Choose guardrails and tone", "Preview in the playground", "Publish the widget"],
    stat: { value: "70%", label: "target chat resolution" } },
  { slug: "email", name: "Emails", tagline: "Contextual resolutions", group: "Channels",
    hero: "Inbox support that reads the whole thread, checks the account and replies with a finished answer.",
    features: [
      { title: "Thread-aware replies", body: "Understands quoted history, attachments and forwarded context before drafting." },
      { title: "Draft or send", body: "Start in review mode and switch categories to auto-send as confidence grows." },
      { title: "Smart routing", body: "Tags, prioritizes and routes what it can't resolve to the right queue." },
      { title: "Templates that adapt", body: "Replace rigid macros with replies that change with the customer's situation." }],
    steps: ["Forward a support inbox", "Set send rules per category", "Review drafts in a queue", "Promote categories to auto-send"],
    stat: { value: "32%", label: "target deflection lift" } },
  { slug: "aop", name: "AOPs", tagline: "Workflows for AI agents", group: "Build",
    hero: "Agent Operating Procedures let anyone on support write how the agent should behave, in plain language.",
    features: [
      { title: "Natural-language logic", body: "Describe the steps, conditions and exceptions the way you'd brief a new hire." },
      { title: "Readable by everyone", body: "Ops, QA and compliance can all review exactly what the agent is told to do." },
      { title: "Versioning", body: "Every change is tracked, diffable and reversible with one click." },
      { title: "Tool calling", body: "Reference integrations by name and let the agent decide when to call them." }],
    steps: ["Pick a starting template", "Write the procedure", "Run it against past tickets", "Publish a new version"],
    stat: { value: "10x", label: "faster workflow iteration" } },
  { slug: "integrations", name: "Integrations", tagline: "Pre-built connectors", group: "Build",
    hero: "Connect help desks, order systems and billing tools so the agent can act, not just answer.",
    features: [
      { title: "Help desk sync", body: "Two-way sync with Zendesk, Freshdesk, Intercom and Help Scout style platforms." },
      { title: "Commerce and billing", body: "Read orders and subscriptions, and issue refunds or credits inside limits you set." },
      { title: "Custom APIs", body: "Register any REST endpoint with a schema and let the agent call it safely." },
      { title: "Scoped permissions", body: "Each connector exposes only the actions you enable, with an audit log." }],
    steps: ["Choose a connector", "Authorize access", "Enable allowed actions", "Reference it from an AOP"],
    stat: { value: "40+", label: "connector patterns supported" } },
  { slug: "missions", name: "Missions", tagline: "Long-horizon execution", group: "Build",
    hero: "Some work takes days. Missions let the agent follow a case until it is truly closed.",
    features: [
      { title: "Persistent goals", body: "Track a case across channels, waiting for customer replies or partner updates." },
      { title: "Scheduled follow-ups", body: "Nudges customers, checks status and closes the loop on its own." },
      { title: "Proactive outreach", body: "Starts conversations when an order is late or a payment fails." },
      { title: "Clear ownership", body: "Every mission shows its state, owner and next action." }],
    steps: ["Define the goal", "Set checkpoints", "Let the agent run", "Review outcomes"],
    stat: { value: "3x", label: "more cases closed without touch" } },
  { slug: "experiments", name: "Experiments", tagline: "Live A/B testing", group: "Optimize",
    hero: "Compare two versions of your agent on real traffic and ship whichever customers prefer.",
    features: [
      { title: "Traffic splitting", body: "Route a percentage of conversations to each variant with sticky assignment." },
      { title: "Outcome metrics", body: "Measure resolution, CSAT, handle time and escalation rate side by side." },
      { title: "Guard metrics", body: "Auto-pause an experiment if quality drops below your threshold." },
      { title: "One-click promote", body: "Make the winner the default without a redeploy." }],
    steps: ["Clone a version", "Change one thing", "Split traffic", "Promote the winner"],
    stat: { value: "2 wks", label: "to confidence at typical volume" } },
  { slug: "testing-qa", name: "Testing & QA", tagline: "Simulations at scale", group: "Optimize",
    hero: "Run hundreds of simulated customers against every change before any real customer sees it.",
    features: [
      { title: "Scenario library", body: "Build suites from real tickets, edge cases and adversarial prompts." },
      { title: "Automated grading", body: "A grader model scores accuracy, policy compliance and tone with reasons." },
      { title: "Regression guard", body: "Block publishing when a change breaks a previously passing scenario." },
      { title: "Shareable reports", body: "Send pass/fail results to stakeholders in a single link." }],
    steps: ["Pick scenarios", "Run the suite", "Review failures", "Fix and re-run"],
    stat: { value: "500+", label: "scenarios per run" } },
  { slug: "insights-and-reporting", name: "Insights & reporting", tagline: "Voice of the customer", group: "Scale",
    hero: "Turn every conversation into structured data about what customers want, and why they are frustrated.",
    features: [
      { title: "Topic clustering", body: "Automatically groups conversations into themes that update daily." },
      { title: "Sentiment and CSAT", body: "Track mood and satisfaction by topic, channel and customer segment." },
      { title: "Cost and deflection", body: "See what automation saves, in hours and in money." },
      { title: "Exports", body: "Send metrics to your warehouse or download CSVs." }],
    steps: ["Collect conversations", "Cluster topics", "Review trends", "Act on opportunities"],
    stat: { value: "100%", label: "of conversations analyzed" } },
  { slug: "watchtower", name: "Watchtower", tagline: "Always-on QA", group: "Scale",
    hero: "Continuous monitoring that flags risky or low-quality conversations the moment they happen.",
    features: [
      { title: "Every conversation scored", body: "Not a sample. Each exchange gets a quality and risk score." },
      { title: "Custom checks", body: "Define what counts as a miss: promises, tone, compliance or missing steps." },
      { title: "Alerts", body: "Notify the right channel when a threshold is crossed." },
      { title: "Review queue", body: "Humans triage flagged items and feed corrections back to the agent." }],
    steps: ["Define checks", "Set thresholds", "Receive alerts", "Resolve and learn"],
    stat: { value: "24/7", label: "coverage on every channel" } },
  { slug: "suggestions", name: "Suggestions", tagline: "AI powered knowledge", group: "Scale",
    hero: "The agent tells you which articles are missing, outdated or contradictory, then drafts the fix.",
    features: [
      { title: "Gap detection", body: "Finds questions the agent could not answer from your sources." },
      { title: "Draft articles", body: "Writes a proposed answer grounded in how your team actually resolves it." },
      { title: "Conflict finder", body: "Highlights policies that disagree across documents." },
      { title: "Approve and publish", body: "A reviewer accepts changes and the agent learns immediately." }],
    steps: ["Detect gaps", "Review drafts", "Approve", "Measure improvement"],
    stat: { value: "1 click", label: "from gap to published answer" } },
  { slug: "duet", name: "Duet", tagline: "AI partner to build self-improving agents", group: "Duet",
    hero: "A co-pilot that reads your conversations, proposes improvements and helps you ship them safely.",
    features: [
      { title: "Ask in plain English", body: "Ask why refunds are escalating and Duet investigates and shows its evidence." },
      { title: "Proposed edits", body: "Suggests AOP changes with a predicted impact and a test plan." },
      { title: "Closed loop", body: "Runs simulations, opens an experiment and reports the result." },
      { title: "You stay in control", body: "Nothing ships without a human approving it." }],
    steps: ["Ask a question", "Review the diagnosis", "Approve a change", "Watch the result"],
    stat: { value: "Weekly", label: "improvement cadence" } },
  { slug: "overview", name: "Product overview", tagline: "The complete platform", group: "Build",
    hero: "Build, optimize and scale AI support agents on one platform that learns from your knowledge and your past tickets.",
    features: [
      { title: "One agent, every channel", body: "Chat, voice and email share one brain, one policy set and one history." },
      { title: "Learns from tickets", body: "Resolved tickets become grounded knowledge the agent can cite." },
      { title: "Measured improvement", body: "Tests, experiments and monitoring keep quality climbing." },
      { title: "Enterprise-ready", body: "Role-based access, audit logs and row-level data isolation." }],
    steps: ["Import knowledge", "Define procedures", "Test", "Launch and improve"],
    stat: { value: "95%", label: "target cost reduction on routine contacts" } },
];

export const industries = [
  { slug: "financial-services", name: "Financial services", tagline: "Trust in every interaction", body: "Verify identity, explain fees and handle disputes with auditable, compliant answers.", points: ["Dispute and chargeback intake", "Card controls and limits", "Compliance-ready transcripts"] },
  { slug: "travel-hospitality", name: "Travel & hospitality", tagline: "Smoother trips and stays", body: "Rebook, upgrade and resolve disruptions at the moment travelers need help.", points: ["Itinerary changes", "Loyalty questions", "Disruption outreach"] },
  { slug: "healthcare", name: "Healthcare", tagline: "Faster access to care", body: "Help patients schedule, understand coverage and find the right next step.", points: ["Appointment scheduling", "Coverage explanations", "Safe escalation to staff"] },
  { slug: "technology", name: "Technology", tagline: "Better experiences at scale", body: "Support users through setup, billing and troubleshooting without growing headcount.", points: ["Account and billing help", "Guided troubleshooting", "Bug report triage"] },
  { slug: "retail", name: "Retail", tagline: "Tailored shopping journeys at scale", body: "Answer product questions, track orders and process returns across peak seasons.", points: ["Order status and returns", "Product recommendations", "Holiday surge handling"] },
  { slug: "telecommunications", name: "Telecommunications", tagline: "Effortless service and connection", body: "Resolve outages, plan changes and bill questions in a single conversation.", points: ["Plan and device changes", "Outage communication", "Bill explanations"] },
  { slug: "insurance", name: "Insurance", tagline: "Claims without the complexity", body: "Guide policyholders through claims and coverage questions with clarity.", points: ["First notice of loss", "Claim status", "Policy questions"] },
];

// Illustrative scenarios with fictional brands. Not real customers.
export const caseStudies = [
  { slug: "northwind-outfitters", brand: "Northwind Outfitters", industry: "Retail", metric: "68%", label: "chat resolution", summary: "A seasonal retailer absorbs holiday volume without hiring temporary staff." },
  { slug: "lumen-bank", brand: "Lumen Bank", industry: "Financial services", metric: "3x", label: "CSAT improvement", summary: "A digital bank moves card and dispute questions to an agent with approvals." },
  { slug: "orbit-stays", brand: "Orbit Stays", industry: "Travel & hospitality", metric: "80%", label: "deflection rate", summary: "A booking platform answers changes and cancellations instantly." },
  { slug: "pulsepath-health", brand: "PulsePath Health", industry: "Healthcare", metric: "45%", label: "fewer inbound calls", summary: "A clinic network offloads scheduling to chat and voice." },
  { slug: "stackly", brand: "Stackly", industry: "Technology", metric: "95%", label: "cost reduction on tier 1", summary: "A SaaS team removes repetitive billing tickets from their queue." },
  { slug: "wavecom", brand: "WaveCom", industry: "Telecommunications", metric: "$1M", label: "revenue from AI-handled plan changes", summary: "Plan upgrades close inside support conversations." },
];

export const resources = [
  { slug: "customer-owned-agents-arriving", type: "Blog", title: "Customer-owned AI agents are arriving. Prepare your support operation.", date: "Nov 2026" },
  { slug: "writing-your-first-aop", type: "Guide", title: "Writing your first Agent Operating Procedure", date: "Oct 2026" },
  { slug: "measuring-ai-support", type: "Guide", title: "Measuring AI support: the five numbers that matter", date: "Oct 2026" },
  { slug: "from-tickets-to-knowledge", type: "Blog", title: "From tickets to knowledge: how agents learn from history", date: "Sep 2026" },
  { slug: "simulation-testing", type: "Video", title: "Simulation testing walkthrough", date: "Sep 2026" },
  { slug: "support-leaders-2027", type: "Blog", title: "What support leaders should plan for in 2027", date: "Aug 2026" },
];

export const glossary: [string, string][] = [
  ["AOP", "Agent Operating Procedure: a natural-language workflow an AI agent follows."],
  ["Deflection rate", "Share of contacts resolved without a human agent."],
  ["Resolution rate", "Share of conversations where the customer's issue was fully solved."],
  ["CSAT", "Customer satisfaction score, usually collected right after an interaction."],
  ["Grounding", "Constraining an AI answer to cited sources such as articles and past tickets."],
  ["Escalation", "Handing a conversation to a human with context attached."],
  ["Handle time", "Average time spent on a conversation from start to resolution."],
  ["Hallucination", "A fluent but unsupported AI statement; prevented by grounding and testing."],
];

export const plans = [
  { id: "starter", name: "Starter", price: 47, url: "https://selar.com/47plan?currency=USD", popular: false,
    blurb: "For lean teams automating their first high-volume workflows.", credits: 500, sources: 25,
    features: ["500 AI resolutions / month", "25 knowledge sources", "Chat playground", "Ticket inbox and analytics", "Email support"] },
  { id: "growth", name: "Growth", price: 57, url: "https://selar.com/57plan?currency=USD", popular: true,
    blurb: "For scaling teams that need more resolutions per month.", credits: 2000, sources: 100,
    features: ["2,000 AI resolutions / month", "100 knowledge sources", "Everything in Starter", "Bulk ticket import for learning", "Priority support"] },
  { id: "scale", name: "Scale", price: 97, url: "https://selar.com/97plan?currency=USD", popular: false,
    blurb: "For enterprise-scale support operations.", credits: 10000, sources: 500,
    features: ["10,000 AI resolutions / month", "500 knowledge sources", "Everything in Growth", "Advanced analytics", "Dedicated onboarding"] },
];

export const FREE_PLAN = { id: "free", name: "Free trial", credits: 25, sources: 3 };
export function planLimits(id: string) {
  const p = plans.find((x) => x.id === id);
  return p ? { credits: p.credits, sources: p.sources } : { credits: FREE_PLAN.credits, sources: FREE_PLAN.sources };
}
