export type Line = [who: "Customer" | "Agent" | "System", text: string];
export type Depth = {
  before: string[]; after: string[];
  useCases: { title: string; body: string }[];
  example: { title: string; lines: Line[] };
  faq: [string, string][];
  related: string[];
};

export const productDepth: Record<string, Depth> = {
  voice: {
    before: ["Callers wait in a queue for simple questions", "Agents re-verify identity on every transfer", "After-hours calls go to voicemail"],
    after: ["Calls are answered in the first ring, any hour", "Identity is verified once and carried into any handoff", "Voicemail becomes a resolved conversation"],
    useCases: [{ title: "Order status and changes", body: "Look up an order, change an address before it ships and confirm by text." }, { title: "Appointment scheduling", body: "Find an open slot, book it and send a calendar invite while the caller is still on the line." }, { title: "Billing questions", body: "Explain a charge, offer a payment plan inside your rules and log the outcome." }],
    example: { title: "A refund call", lines: [["Customer", "Hi, I want to return the jacket I bought last week."], ["Agent", "Happy to help. Can I confirm the email on the order?"], ["Customer", "It's sam@example.com."], ["Agent", "Thanks, Sam. The jacket is within the 30-day window, so I can start the return now. You'll get a prepaid label by email in a minute."]] },
    faq: [["Can callers reach a person?", "Yes. You set the triggers, and the agent hands off with a summary and transcript."], ["Does it work with our phone system?", "It connects to your number or contact-center platform. Exact connectors vary, so confirm yours during setup."], ["How is quality kept high?", "Every change is simulated against real call scenarios before publishing, and Watchtower scores calls afterward."]],
    related: ["chat", "testing-qa", "watchtower"],
  },
  chat: {
    before: ["Macros that don't fit the customer's situation", "Customers repeat details after each handoff", "Peak-season backlogs"],
    after: ["Answers cite the exact policy that applies", "Context follows the customer from bot to human", "Volume spikes are absorbed automatically"],
    useCases: [{ title: "Returns and refunds", body: "Check eligibility, create the return and confirm the refund timeline." }, { title: "Account and plan changes", body: "Upgrade, downgrade or pause with the right confirmation and approvals." }, { title: "Troubleshooting", body: "Walk through steps from your docs and escalate with logs attached when stuck." }],
    example: { title: "A plan change", lines: [["Customer", "Can I move to the annual plan?"], ["Agent", "Yes. Annual is $480 a year, which saves $120. Want me to switch you now?"], ["Customer", "Yes please."], ["System", "Action: change_plan(annual) completed. Receipt emailed."], ["Agent", "Done. Your receipt is in your inbox."]] },
    faq: [["Can it say 'I don't know'?", "Yes. When no source supports an answer, it says so and escalates instead of guessing."], ["How do we control tone?", "Set voice, banned phrases and formality once. The same rules apply on every channel."], ["Where is the widget available?", "It embeds with a single script on web and in-app pages."]],
    related: ["aop", "integrations", "suggestions"],
  },
  email: {
    before: ["Long threads need a person to read the whole history", "Macros sound robotic", "Misrouted emails bounce between queues"],
    after: ["The agent reads the thread and replies in context", "Replies adapt to each customer's situation", "Every email is tagged and routed correctly"],
    useCases: [{ title: "Inbox triage", body: "Categorize, prioritize and route every message on arrival." }, { title: "Draft-and-review", body: "Agents approve drafts in a queue and promote safe categories to auto-send." }, { title: "Forwarded complaints", body: "Pull the key facts from messy forwards and respond with the right resolution." }],
    example: { title: "A delayed shipment", lines: [["Customer", "My order was due Tuesday and still hasn't arrived."], ["System", "Carrier lookup: delayed at regional hub, new ETA Friday."], ["Agent", "I'm sorry for the delay. The carrier shows it at a regional hub with a new ETA of Friday. I've added a $10 credit to your account for the trouble."]] },
    faq: [["Does it send automatically?", "Only for categories you promote. Everything else stays as a draft for review."], ["Does it handle attachments?", "It reads text attachments and flags other types for a person."], ["Can it keep our signature?", "Yes, signatures and disclaimers are applied by rule."]],
    related: ["chat", "suggestions", "insights-and-reporting"],
  },
  aop: {
    before: ["Rigid decision trees that break on edge cases", "Engineering tickets for every wording change", "Nobody can read how the bot decides"],
    after: ["Procedures written in plain language", "Support leads ship changes the same day", "Anyone can review what the agent is told"],
    useCases: [{ title: "Refund approvals", body: "Define thresholds, required checks and when to escalate." }, { title: "Identity verification", body: "Specify which questions to ask and when a customer is verified." }, { title: "Seasonal policies", body: "Update a holiday return window once and publish everywhere." }],
    example: { title: "An AOP excerpt", lines: [["System", "When the customer reports a damaged item:"], ["System", "1. Ask for a photo. 2. Confirm the order number. 3. If the item is under $75, send a replacement. Otherwise escalate to the quality team."]] },
    faq: [["Do I need to code?", "No. AOPs are plain language. Developers only register tools the agent can call."], ["How do I roll back?", "Every version is saved, so reverting is one click."], ["Can I test before publishing?", "Yes. Run the draft against simulated and historical conversations first."]],
    related: ["testing-qa", "integrations", "duet"],
  },
  integrations: {
    before: ["Agents can answer but can't act", "Copy-pasting between five tools", "Unclear who changed what"],
    after: ["The agent completes the task in your systems", "One conversation, every tool", "A full audit trail per action"],
    useCases: [{ title: "Help desk sync", body: "Mirror tickets, tags and statuses in both directions." }, { title: "Order and billing actions", body: "Refund, reship or credit within limits you define." }, { title: "Custom internal APIs", body: "Expose any REST endpoint with a typed schema." }],
    example: { title: "A guarded action", lines: [["Agent", "I can refund $42.00 to the original card."], ["System", "Policy check: amount under $100 limit. Approved."], ["System", "Action: issue_refund(order_1042, 42.00) succeeded."]] },
    faq: [["Is access scoped?", "Yes. You enable specific actions per connector, nothing more."], ["What if a system is down?", "The agent tells the customer, queues the action and escalates if needed."], ["Can we add our own?", "Yes, register any REST endpoint with a schema."]],
    related: ["aop", "missions", "overview"],
  },
  missions: {
    before: ["Cases stall waiting on follow-ups", "Customers chase for updates", "Nobody owns the loop closure"],
    after: ["The agent follows up on schedule", "Customers get proactive updates", "Every case has an owner and next step"],
    useCases: [{ title: "Delivery exceptions", body: "Contact customers about late orders and arrange a fix before they ask." }, { title: "Failed payments", body: "Reach out, help update a card and confirm recovery." }, { title: "Warranty claims", body: "Collect evidence over days, check status and close the claim." }],
    example: { title: "A multi-day mission", lines: [["System", "Day 1: claim opened, photos requested."], ["System", "Day 3: reminder sent, photos received."], ["System", "Day 4: replacement approved, tracking shared. Mission closed."]] },
    faq: [["How long can a mission run?", "As long as the goal needs, with checkpoints you define."], ["Can customers opt out?", "Yes, opt-outs are respected on every channel."], ["Who sees progress?", "Your team sees state, owner and next action in one view."]],
    related: ["aop", "chat", "email"],
  },
  experiments: {
    before: ["Changes shipped on gut feel", "No way to compare versions fairly", "Rollbacks after customers complain"],
    after: ["Two versions tested on live traffic", "Outcomes compared side by side", "Winners promoted with confidence"],
    useCases: [{ title: "Tone tests", body: "Compare a warmer greeting against a concise one." }, { title: "Policy changes", body: "Check a new refund threshold before rolling it out." }, { title: "Escalation rules", body: "Find the handoff point that keeps CSAT high and cost low." }],
    example: { title: "A two-arm test", lines: [["System", "Variant A (current): 61% resolution, CSAT 4.2."], ["System", "Variant B (shorter replies): 66% resolution, CSAT 4.3."], ["System", "Guard metric escalations: within threshold. Ready to promote B."]] },
    faq: [["How is traffic split?", "By percentage, with each customer staying in one variant."], ["What if quality drops?", "Guard metrics pause the experiment automatically."], ["How long should I run one?", "Until the sample is large enough for a clear read, usually a few weeks at typical volume."]],
    related: ["testing-qa", "insights-and-reporting", "duet"],
  },
  "testing-qa": {
    before: ["Manual spot-checks before release", "Regressions found by customers", "No shared definition of 'good'"],
    after: ["Hundreds of scenarios run in minutes", "Regressions blocked before publishing", "Graded results everyone can read"],
    useCases: [{ title: "Pre-release suites", body: "Run the full scenario set on every AOP change." }, { title: "Adversarial checks", body: "Try prompt injections and policy bypass attempts on purpose." }, { title: "Model upgrades", body: "Compare before and after when swapping underlying models." }],
    example: { title: "A suite result", lines: [["System", "412 scenarios run. 398 passed, 14 failed."], ["System", "Top failure: refund over limit promised before lookup (6 cases)."], ["System", "Publishing blocked until resolved."]] },
    faq: [["Where do scenarios come from?", "Real tickets, hand-written edge cases and generated adversarial prompts."], ["Who grades?", "A grader model scores each reply with reasons, and people can override."], ["Can it gate publishing?", "Yes, set pass thresholds that must be met."]],
    related: ["aop", "experiments", "watchtower"],
  },
  "insights-and-reporting": {
    before: ["Reports built by hand each month", "Themes buried in free text", "Savings are guesses"],
    after: ["Live dashboards across every channel", "Topics clustered automatically", "Deflection and cost measured directly"],
    useCases: [{ title: "Product feedback loop", body: "Send top complaint themes to the product team weekly." }, { title: "Staffing forecasts", body: "Predict volume by topic and plan coverage." }, { title: "Executive reporting", body: "Show resolution, CSAT and savings in one view." }],
    example: { title: "A weekly insight", lines: [["System", "Rising topic: 'login after password reset' up 38% week over week."], ["System", "Suggested action: update reset article and add an AOP step."]] },
    faq: [["Can I export data?", "Yes, as CSV or to your warehouse."], ["How are topics found?", "Conversations are clustered by meaning and labeled automatically."], ["Is sentiment reliable?", "It is a signal, not a verdict. You can review samples behind every number."]],
    related: ["watchtower", "suggestions", "experiments"],
  },
  watchtower: {
    before: ["A 2% sample is reviewed", "Problems surface after complaints", "QA is a monthly project"],
    after: ["Every conversation is scored", "Alerts fire the moment a threshold is crossed", "QA runs continuously"],
    useCases: [{ title: "Compliance monitoring", body: "Flag unapproved promises or missing disclosures." }, { title: "Tone drift", body: "Notice when replies stop sounding like your brand." }, { title: "Escalation review", body: "Triage flagged cases and feed fixes back as AOP edits." }],
    example: { title: "An alert", lines: [["System", "Alert: 9 conversations in the last hour promised a refund before order lookup."], ["System", "Linked AOP step: 'Verify order first'. Review queue opened."]] },
    faq: [["Does it slow replies?", "No, scoring runs after the message is sent."], ["Can I define custom checks?", "Yes, describe a miss in plain language."], ["Who gets alerts?", "Any channel or email you choose."]],
    related: ["testing-qa", "insights-and-reporting", "aop"],
  },
  suggestions: {
    before: ["Knowledge base drifts out of date", "Gaps found by angry customers", "Contradicting policy docs"],
    after: ["Gaps surfaced from real questions", "Drafts written for review", "Conflicts highlighted before they confuse"],
    useCases: [{ title: "Missing article detection", body: "See questions asked often with no good source." }, { title: "Policy cleanup", body: "Find two documents that give different return windows." }, { title: "Ticket-to-article", body: "Turn a well-solved ticket into a reusable answer." }],
    example: { title: "A suggested article", lines: [["System", "Gap: 41 questions this month about 'change billing email'. No source found."], ["System", "Draft article created from 6 resolved tickets. Awaiting your approval."]] },
    faq: [["Does it publish automatically?", "No. A reviewer approves every change."], ["Does it learn from tickets?", "Yes, resolved tickets inform drafts and are cited as sources."], ["How are conflicts shown?", "Side by side, with the sentences that disagree highlighted."]],
    related: ["insights-and-reporting", "chat", "duet"],
  },
  duet: {
    before: ["Analysts dig through transcripts for days", "Fixes wait for a free engineer", "Impact is argued, not measured"],
    after: ["Ask a question and get evidence in minutes", "Proposed edits arrive ready to test", "Impact verified by simulation and experiment"],
    useCases: [{ title: "Root-cause analysis", body: "Find why a topic's resolution rate dropped last Tuesday." }, { title: "Procedure drafting", body: "Describe a policy and get a first AOP to refine." }, { title: "Weekly improvement review", body: "Receive the three changes most likely to help next." }],
    example: { title: "A Duet exchange", lines: [["Customer", "Why did refunds escalate more this week?"], ["Agent", "A policy change on Monday lowered the auto-refund limit to $50. 63% of escalations were refunds between $50 and $100. I can draft a revised step and test it."]] },
    faq: [["Can Duet publish changes?", "No. It proposes, a person approves."], ["Does it show its evidence?", "Yes, with links to the conversations it used."], ["Is it separate from the agent?", "Yes. Duet works on your agent, not in front of customers."]],
    related: ["aop", "experiments", "testing-qa"],
  },
  overview: {
    before: ["Separate tools per channel", "Knowledge scattered across docs and tickets", "Improvement is ad hoc"],
    after: ["One agent across chat, voice and email", "Knowledge learned from articles and past tickets", "A build, optimize, scale loop"],
    useCases: [{ title: "Tier-1 automation", body: "Resolve repetitive questions end to end." }, { title: "Surge handling", body: "Absorb launches and seasonal peaks without temporary hires." }, { title: "24/7 coverage", body: "Keep service levels at night and on weekends." }],
    example: { title: "From ticket to answer", lines: [["System", "Imported 1,240 resolved tickets and 86 articles."], ["Customer", "Can I change my delivery address?"], ["Agent", "Yes, until the order ships. I've updated it to the new address and emailed a confirmation."]] },
    faq: [["How does it learn from past tickets?", "Resolved tickets are indexed as sources the agent retrieves and cites."], ["What stops wrong answers?", "Grounding, guardrails, simulation testing and continuous monitoring."], ["How fast can we start?", "Import content, write a first procedure and test in the playground the same day."]],
    related: ["aop", "integrations", "insights-and-reporting"],
  },
};

export type IndustryDepth = {
  challenges: { title: string; body: string }[];
  steps: string[];
  example: { title: string; lines: Line[] };
  considerations: string[];
  products: string[];
  faq: [string, string][];
};

export const industryDepth: Record<string, IndustryDepth> = {
  "financial-services": {
    challenges: [{ title: "Trust is fragile", body: "One wrong answer about a fee or a charge can cost a customer." }, { title: "Strict regulation", body: "Every statement needs to be consistent and reviewable." }, { title: "Fraud pressure", body: "Urgent card issues need fast, safe handling." }],
    steps: ["Verify identity with approved questions", "Retrieve the relevant policy or transaction", "Act within set limits or escalate", "Log a complete, reviewable transcript"],
    example: { title: "A disputed charge", lines: [["Customer", "I don't recognize a $64 charge."], ["Agent", "I can help. After verifying you, I'll show the merchant details and, if it isn't yours, freeze the card and open a dispute."], ["System", "Card frozen. Dispute case created."]] },
    considerations: ["Approval steps for money movement", "Redaction of account numbers in transcripts", "Review of every AOP by compliance before publishing"],
    products: ["aop", "watchtower", "integrations"],
    faq: [["Can it move money?", "Only through actions you enable, with limits and approvals you define."], ["Are transcripts auditable?", "Yes, each conversation and action is logged."]],
  },
  "travel-hospitality": {
    challenges: [{ title: "Disruptions spike volume", body: "A storm or strike can flood support in minutes." }, { title: "Time-sensitive requests", body: "Travelers need answers before boarding or check-in." }, { title: "Complex itineraries", body: "Changes ripple across flights, rooms and transfers." }],
    steps: ["Identify the booking", "Check availability and fare rules", "Rebook or offer alternatives", "Confirm and notify"],
    example: { title: "A cancelled flight", lines: [["Customer", "My 6pm flight was cancelled."], ["Agent", "I'm sorry. There's a 8:40pm departure with seats. Want me to rebook you at no charge?"], ["Customer", "Yes."], ["System", "Rebooked. New boarding pass sent."]] },
    considerations: ["Fare-rule accuracy", "Proactive outreach during disruptions", "Multilingual coverage"],
    products: ["missions", "voice", "chat"],
    faq: [["Can it contact travelers first?", "Yes, Missions can start conversations when a disruption is detected."], ["Does it handle several languages?", "Language support depends on the underlying model and your tested scenarios."]],
  },
  healthcare: {
    challenges: [{ title: "Access friction", body: "Patients struggle to book, reschedule and find the right clinic." }, { title: "Sensitive information", body: "Privacy rules limit what can be said and stored." }, { title: "Safety first", body: "Anything clinical must reach a person." }],
    steps: ["Confirm who is calling or messaging", "Handle scheduling and coverage questions", "Detect clinical or urgent language", "Escalate to staff with a summary"],
    example: { title: "Rescheduling", lines: [["Customer", "I need to move Thursday's appointment."], ["Agent", "I can offer Friday 10:15 or Monday 9:00 with the same provider. Which works?"], ["System", "Appointment updated. Reminder scheduled."]] },
    considerations: ["No clinical advice from the agent", "Strict redaction and retention settings", "Your own legal review for privacy regulations"],
    products: ["voice", "watchtower", "aop"],
    faq: [["Does it give medical advice?", "No. Clinical questions are escalated to staff by rule."], ["Is it compliant out of the box?", "Compliance depends on your configuration and legal review. We do not claim certifications we haven't completed."]],
  },
  technology: {
    challenges: [{ title: "Support scales with users", body: "Each signup adds tickets, often repetitive ones." }, { title: "Technical depth", body: "Troubleshooting needs logs and product knowledge." }, { title: "Fast-changing products", body: "Docs go stale after every release." }],
    steps: ["Identify the account and plan", "Match the issue to docs and past tickets", "Guide the fix or perform the action", "File a bug with context if unresolved"],
    example: { title: "A login issue", lines: [["Customer", "I can't log in after resetting my password."], ["Agent", "Resets can take a few minutes to sync. Please clear cookies and try again. If it still fails I'll escalate with your account details attached."]] },
    considerations: ["Link answers to current documentation", "Attach logs when escalating", "Use Suggestions to catch stale articles"],
    products: ["suggestions", "integrations", "chat"],
    faq: [["Can it file bugs?", "Yes, through an integration with your issue tracker."], ["How does it stay current?", "Suggestions flags outdated or missing articles after each release."]],
  },
  retail: {
    challenges: [{ title: "Seasonal peaks", body: "Holiday volume dwarfs the rest of the year." }, { title: "Where is my order?", body: "Most contacts are status and returns." }, { title: "Brand experience", body: "Every reply is a chance to build loyalty." }],
    steps: ["Look up the order", "Answer or start the return", "Offer a relevant alternative", "Confirm by email"],
    example: { title: "A return", lines: [["Customer", "These boots don't fit. Can I return them?"], ["Agent", "Yes, you're within 30 days. I've created a prepaid label and can ship a different size if you'd like."]] },
    considerations: ["Clear return-policy AOPs", "Peak-season load testing", "Proactive delay notices"],
    products: ["chat", "email", "missions"],
    faq: [["Can it recommend products?", "Yes, using catalog data you connect."], ["Will it handle peak load?", "Automation scales with volume, but test your flows before the season."]],
  },
  telecommunications: {
    challenges: [{ title: "Bill shock", body: "Customers contact support to understand charges." }, { title: "Outages", body: "A single incident can create a flood of identical contacts." }, { title: "Plan complexity", body: "Promotions and device plans confuse everyone." }],
    steps: ["Identify the line and plan", "Explain the bill or incident", "Offer a change or credit within limits", "Confirm and follow up"],
    example: { title: "A bill question", lines: [["Customer", "Why is my bill higher this month?"], ["Agent", "Your promotional discount ended on the 3rd, adding $15. I can move you to a plan that keeps the previous price. Want details?"]] },
    considerations: ["Outage-aware messaging", "Credit limits in AOPs", "Clear plan-change confirmations"],
    products: ["voice", "missions", "integrations"],
    faq: [["Can it announce outages?", "Yes, it can answer with live incident status and notify affected customers."], ["Can it change plans?", "Yes, through an integration with approval rules."]],
  },
  insurance: {
    challenges: [{ title: "Stressful moments", body: "Claims happen on bad days and tone matters." }, { title: "Documents and evidence", body: "Claims stall on missing photos or forms." }, { title: "Policy complexity", body: "Coverage questions have fine print." }],
    steps: ["Capture the first notice of loss", "Request needed documents", "Explain coverage with citations", "Hand off complex claims with a full file"],
    example: { title: "First notice of loss", lines: [["Customer", "Someone hit my parked car."], ["Agent", "I'm sorry that happened. Are you safe? I'll start a claim and need a few photos and the location."], ["System", "Claim opened. Photo request sent."]] },
    considerations: ["Empathetic tone controls", "Never promise coverage before review", "Escalation for injuries or disputes"],
    products: ["missions", "email", "aop"],
    faq: [["Can it decide a claim?", "No. It gathers information and explains policy. Decisions follow your own process."], ["Can it chase documents?", "Yes, Missions follows up until the file is complete."]],
  },
};
