export type Lang = "zh" | "en";

export type ProjectBriefInput = {
  clientName?: string;
  industry?: string;
  goal?: string;
  audience?: string;
  scope?: string;
  deliverables?: string;
  timeline?: string;
  outOfScope?: string;
  notes?: string;
};

export type PricingNoteInput = {
  clientName?: string;
  pricingModel?: string;
  scope?: string;
  acceptanceCriteria?: string;
  paymentTerms?: string;
  changePolicy?: string;
  risks?: string;
  notes?: string;
};

export type ChangeRequestInput = {
  clientName?: string;
  changeSummary?: string;
  impact?: string;
  newTimeline?: string;
  extraCost?: string;
  decisionDeadline?: string;
  notes?: string;
};

export type PaymentReminderInput = {
  clientName?: string;
  invoiceId?: string;
  amount?: string;
  dueDate?: string;
  tone?: "gentle" | "neutral" | "firm";
  payLinkOrAccount?: string;
  notes?: string;
};

export type WeeklyReviewInput = {
  weekRange?: string;
  wins?: string;
  metrics?: string;
  issues?: string;
  nextWeek?: string;
  notes?: string;
};

export type MediaKitInput = {
  brand?: string;
  positioning?: string;
  audience?: string;
  stats?: string;
  offers?: string;
  packages?: string;
  notes?: string;
};

export type SponsorshipOutreachInput = {
  to?: string;
  who?: string;
  audience?: string;
  offer?: string;
  cta?: string;
  notes?: string;
};

export type WelcomeSequenceInput = {
  brand?: string;
  promise?: string;
  leadMagnet?: string;
  cta?: string;
  notes?: string;
};

const normalize = (value: string | undefined): string => (value ?? "").trim();

const t = (lang: Lang, zh: string, en: string): string => (lang === "zh" ? zh : en);

const mdSection = (lang: Lang, title: string, body: string): string => {
  const cleaned = body.trim();
  return cleaned.length > 0
    ? `## ${title}\n\n${cleaned}\n`
    : `## ${title}\n\n- ${t(lang, "（待补充）", "(TBD)")}\n`;
};

const mdLine = (lang: Lang, label: string, value: string | undefined): string => {
  const sep = lang === "zh" ? "：" : ": ";
  return `- **${label}**${sep}${normalize(value) || t(lang, "（待补充）", "(TBD)")}`;
};

export function buildProjectBrief(lang: Lang, input: ProjectBriefInput): string {
  const headerLines = [
    lang === "zh" ? "# 项目简报" : "# Project Brief",
    "",
    mdLine(lang, lang === "zh" ? "客户/项目" : "Client / Project", input.clientName),
    mdLine(lang, lang === "zh" ? "行业/背景" : "Industry / Context", input.industry),
    mdLine(lang, lang === "zh" ? "目标" : "Goal", input.goal),
    mdLine(lang, lang === "zh" ? "目标用户" : "Audience", input.audience),
    mdLine(lang, lang === "zh" ? "时间安排" : "Timeline", input.timeline),
    ""
  ].join("\n");

  const scope = mdSection(lang, lang === "zh" ? "范围（Scope）" : "Scope", normalize(input.scope));
  const deliverables = mdSection(lang, lang === "zh" ? "交付物（Deliverables）" : "Deliverables", normalize(input.deliverables));
  const outOfScope = mdSection(lang, lang === "zh" ? "不包含（Out of scope）" : "Out of scope", normalize(input.outOfScope));
  const notes = mdSection(lang, lang === "zh" ? "备注（Notes）" : "Notes", normalize(input.notes));

  return `${headerLines}\n${scope}\n${deliverables}\n${outOfScope}\n${notes}`.trim() + "\n";
}

export function buildPricingNote(lang: Lang, input: PricingNoteInput): string {
  const headerLines = [
    lang === "zh" ? "# 报价说明" : "# Pricing Note",
    "",
    mdLine(lang, lang === "zh" ? "客户/项目" : "Client / Project", input.clientName),
    mdLine(lang, lang === "zh" ? "计费方式" : "Pricing model", input.pricingModel),
    mdLine(lang, lang === "zh" ? "范围摘要" : "Scope summary", input.scope),
    ""
  ].join("\n");

  const acceptance = mdSection(lang, lang === "zh" ? "验收标准（Acceptance）" : "Acceptance criteria", normalize(input.acceptanceCriteria));
  const payment = mdSection(lang, lang === "zh" ? "付款条款（Payment Terms）" : "Payment terms", normalize(input.paymentTerms));
  const change = mdSection(lang, lang === "zh" ? "变更政策（Change Policy）" : "Change policy", normalize(input.changePolicy));
  const risks = mdSection(lang, lang === "zh" ? "风险与假设（Risks/Assumptions）" : "Risks & assumptions", normalize(input.risks));
  const notes = mdSection(lang, lang === "zh" ? "备注（Notes）" : "Notes", normalize(input.notes));

  return `${headerLines}\n${acceptance}\n${payment}\n${change}\n${risks}\n${notes}`.trim() + "\n";
}

export function buildChangeRequest(lang: Lang, input: ChangeRequestInput): string {
  const headerLines = [
    lang === "zh" ? "# 需求变更说明" : "# Change Request",
    "",
    mdLine(lang, lang === "zh" ? "客户/项目" : "Client / Project", input.clientName),
    mdLine(lang, lang === "zh" ? "变更概述" : "Change summary", input.changeSummary),
    mdLine(lang, lang === "zh" ? "影响评估" : "Impact", input.impact),
    mdLine(lang, lang === "zh" ? "新排期" : "New timeline", input.newTimeline),
    mdLine(lang, lang === "zh" ? "额外费用" : "Extra cost", input.extraCost),
    mdLine(lang, lang === "zh" ? "确认截止" : "Decision deadline", input.decisionDeadline),
    ""
  ].join("\n");

  const notes = mdSection(lang, lang === "zh" ? "备注（Notes）" : "Notes", normalize(input.notes));
  const next = [
    `## ${lang === "zh" ? "下一步（Next Step）" : "Next step"}`,
    "",
    lang === "zh"
      ? "- 请确认是否接受上述变更与影响。\n- 若接受：我将更新排期与里程碑，并开始执行。\n- 若不接受：我们将按原计划交付原范围。"
      : "- Please confirm whether you accept the change and the impact.\n- If yes: I will update schedule/milestones and start.\n- If no: we deliver the original scope as planned.",
    ""
  ].join("\n");

  return `${headerLines}\n${next}\n${notes}`.trim() + "\n";
}

export function buildPaymentReminder(lang: Lang, input: PaymentReminderInput): string {
  const tone = input.tone ?? "neutral";
  const openingZh =
    tone === "gentle"
      ? "想跟进一下发票的付款进度，麻烦你确认是否方便在本周内完成付款。"
      : tone === "firm"
        ? "提醒一下该发票已到期/临近到期，麻烦你尽快安排付款，并在完成后回复确认。"
        : "跟进一下发票付款进度，麻烦你确认预计付款时间。";
  const openingEn =
    tone === "gentle"
      ? "Just checking in on the invoice — would it be possible to complete payment this week?"
      : tone === "firm"
        ? "Reminder: this invoice is due/overdue. Please arrange payment as soon as possible and confirm once done."
        : "Following up on the invoice payment status — could you confirm your expected payment date?";
  const opening = lang === "zh" ? openingZh : openingEn;

  const headerLines = [
    lang === "zh" ? "# 催款邮件" : "# Payment reminder",
    "",
    mdLine(lang, lang === "zh" ? "收件人/客户" : "Client / contact", input.clientName),
    mdLine(lang, lang === "zh" ? "发票号" : "Invoice ID", input.invoiceId),
    mdLine(lang, lang === "zh" ? "金额" : "Amount", input.amount),
    mdLine(lang, lang === "zh" ? "到期日" : "Due date", input.dueDate),
    ""
  ].join("\n");

  const body = [
    `## ${lang === "zh" ? "邮件正文（可直接复制）" : "Email copy (paste-ready)"}`,
    "",
    lang === "zh"
      ? `你好，${normalize(input.clientName) || "（称呼）"}：`
      : `Hi ${normalize(input.clientName) || "(name)"},`,
    "",
    opening,
    "",
    lang === "zh"
      ? `- 发票号：${normalize(input.invoiceId) || "（待补充）"}\n- 金额：${normalize(input.amount) || "（待补充）"}\n- 到期日：${normalize(input.dueDate) || "（待补充）"}`
      : `- Invoice: ${normalize(input.invoiceId) || "(TBD)"}\n- Amount: ${normalize(input.amount) || "(TBD)"}\n- Due: ${normalize(input.dueDate) || "(TBD)"}`,
    "",
    normalize(input.payLinkOrAccount)
      ? `${lang === "zh" ? "付款信息/链接" : "Payment info/link"}: ${normalize(input.payLinkOrAccount)}`
      : `${lang === "zh" ? "付款信息/链接" : "Payment info/link"}: ${t(lang, "（待补充）", "(TBD)")}`,
    "",
    lang === "zh" ? "谢谢！" : "Thank you,",
    ""
  ].join("\n");

  const notes = mdSection(lang, lang === "zh" ? "备注（Notes）" : "Notes", normalize(input.notes));

  return `${headerLines}\n${body}\n${notes}`.trim() + "\n";
}

export function buildWeeklyReview(lang: Lang, input: WeeklyReviewInput): string {
  const headerLines = [
    lang === "zh" ? "# 周复盘" : "# Weekly Review",
    "",
    mdLine(lang, lang === "zh" ? "周期" : "Week", input.weekRange),
    ""
  ].join("\n");

  const wins = mdSection(lang, lang === "zh" ? "本周产出（Wins/Output）" : "Wins / output", normalize(input.wins));
  const metrics = mdSection(lang, lang === "zh" ? "关键指标（Metrics）" : "Metrics", normalize(input.metrics));
  const issues = mdSection(lang, lang === "zh" ? "问题与阻塞（Issues/Blockers）" : "Issues / blockers", normalize(input.issues));
  const next = mdSection(lang, lang === "zh" ? "下周重点（Next Week）" : "Next week", normalize(input.nextWeek));
  const notes = mdSection(lang, lang === "zh" ? "备注（Notes）" : "Notes", normalize(input.notes));

  return `${headerLines}\n${wins}\n${metrics}\n${issues}\n${next}\n${notes}`.trim() + "\n";
}

export function buildMediaKit(lang: Lang, input: MediaKitInput): string {
  const headerLines = [
    lang === "zh" ? "# 赞助媒体包（Media Kit）" : "# Sponsorship Media Kit",
    "",
    mdLine(lang, lang === "zh" ? "品牌/账号" : "Brand", input.brand),
    mdLine(lang, lang === "zh" ? "一句话定位" : "Positioning", input.positioning),
    ""
  ].join("\n");

  const audience = mdSection(lang, lang === "zh" ? "受众（Audience）" : "Audience", normalize(input.audience));
  const stats = mdSection(lang, lang === "zh" ? "数据概览（Stats）" : "Key metrics", normalize(input.stats));
  const offers = mdSection(lang, lang === "zh" ? "可交付内容（Deliverables）" : "Deliverables", normalize(input.offers));
  const packages = mdSection(lang, lang === "zh" ? "套餐与报价（Packages）" : "Packages & pricing", normalize(input.packages));
  const notes = mdSection(lang, lang === "zh" ? "备注（Notes）" : "Notes", normalize(input.notes));

  const process = [
    `## ${lang === "zh" ? "合作流程（Process）" : "Process"}`,
    "",
    lang === "zh"
      ? "1. 确认目标与排期\n2. 确认素材与审核边界（可选）\n3. 上线交付 + 复盘数据"
      : "1. Confirm goals & schedule\n2. Asset review scope (optional)\n3. Publish + share recap",
    ""
  ].join("\n");

  return `${headerLines}\n${audience}\n${stats}\n${offers}\n${packages}\n${process}\n${notes}`.trim() + "\n";
}

export function buildSponsorshipOutreach(lang: Lang, input: SponsorshipOutreachInput): string {
  const to = normalize(input.to) || t(lang, "（对方团队/联系人）", "(team/contact)");
  const subject = lang === "zh" ? `Subject: 赞助合作提案（${to}）` : `Subject: Sponsorship proposal (${to})`;
  const greeting = lang === "zh" ? `你好，${to}：` : `Hi ${to},`;

  const offer = normalize(input.offer) || (lang === "zh" ? "- （交付 1）\n- （交付 2）\n- （交付 3）" : "- (deliverable 1)\n- (deliverable 2)\n- (deliverable 3)");

  const body = [
    subject,
    "",
    greeting,
    "",
    normalize(input.who) || t(lang, "（一句话介绍你是谁、做什么）", "(one line about who you are)"),
    normalize(input.audience)
      ? `${t(lang, "我的受众主要是：", "My audience is: ")}${normalize(input.audience)}`
      : t(lang, "我的受众主要是：（待补充）", "My audience is: (TBD)"),
    "",
    t(lang, "我希望与贵司探讨一次赞助合作，核心交付如下：", "I’d love to explore a sponsorship. Key deliverables:"),
    "",
    offer,
    "",
    t(
      lang,
      "如果你愿意，我可以发一份简短的媒体包与报价单供你评估。",
      "If helpful, I can share a short media kit and rate card."
    ),
    "",
    normalize(input.cta) || t(lang, "本周是否方便约 15 分钟沟通？", "Would 15 minutes this week work?"),
    "",
    t(lang, "谢谢！", "Thanks,"),
    t(lang, "（你的名字）", "(your name)"),
    ""
  ].join("\n");

  const notes = mdSection(lang, lang === "zh" ? "备注（Notes）" : "Notes", normalize(input.notes));
  return `${body}\n${notes}`.trim() + "\n";
}

export function buildWelcomeSequence(lang: Lang, input: WelcomeSequenceInput): string {
  const brand = normalize(input.brand) || t(lang, "（你的 Newsletter）", "(Your Newsletter)");
  const promise = normalize(input.promise) || t(lang, "（核心承诺：你帮读者解决什么）", "(core promise)");
  const lead = normalize(input.leadMagnet) || t(lang, "（可选：免费资源/下载）", "(optional freebie)");
  const cta = normalize(input.cta) || t(lang, "（填写你的 CTA）", "(fill your CTA)");

  const email1 = [
    `## Email 1: ${t(lang, "欢迎 + 预期", "Welcome + expectations")}`,
    "",
    `${t(lang, "主题", "Subject")}: ${brand} · ${t(lang, "欢迎加入", "Welcome")}`,
    "",
    `${t(lang, "核心承诺", "Core promise")}: ${promise}`,
    "",
    t(
      lang,
      "- 你为什么做这个 newsletter\n- 每期会讲什么（3 个栏目）\n- 下一步：回复这封邮件告诉我你现在最想解决的问题",
      "- Why you publish\n- What to expect (3 sections)\n- Reply with your #1 problem right now"
    ),
    ""
  ].join("\n");

  const email2 = [
    `## Email 2: ${t(lang, "代表作 + 框架", "Flagship post + framework")}`,
    "",
    `${t(lang, "主题", "Subject")}: ${brand} · ${t(lang, "先从这篇开始", "Start here")}`,
    "",
    t(
      lang,
      "- 链接：你的代表作/置顶文章\n- 你的方法论框架：3-5 步\n- 提醒：把这封邮件收藏，后续反复用",
      "- Link: your flagship post\n- Your framework: 3-5 steps\n- Save this email for later"
    ),
    ""
  ].join("\n");

  const email3 = [
    `## Email 3: ${t(lang, "资源 + 轻度转化", "Resources + soft pitch")}`,
    "",
    `${t(lang, "主题", "Subject")}: ${brand} · ${t(lang, "资源合集 + 下一步", "Resources + next step")}`,
    "",
    `${t(lang, "资源 1", "Resource 1")}: ${lead}`,
    `${t(lang, "最终 CTA", "Final CTA")}: ${cta}`,
    ""
  ].join("\n");

  const notes = mdSection(lang, lang === "zh" ? "备注（Notes）" : "Notes", normalize(input.notes));
  return `# ${t(lang, "欢迎序列（3 封邮件）", "Welcome sequence (3 emails)")}\n\n${email1}\n${email2}\n${email3}\n${notes}`.trim() + "\n";
}
