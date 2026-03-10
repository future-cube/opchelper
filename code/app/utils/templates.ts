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

const normalize = (value: string | undefined): string => (value ?? "").trim();

const mdSection = (title: string, body: string): string => {
  const cleaned = body.trim();
  return cleaned.length > 0 ? `## ${title}\n\n${cleaned}\n` : `## ${title}\n\n- （待补充）\n`;
};

const mdLine = (label: string, value: string | undefined): string =>
  `- **${label}**：${normalize(value) || "（待补充）"}`;

export function buildProjectBrief(input: ProjectBriefInput): string {
  const headerLines = [
    "# 项目简报（Project Brief）",
    "",
    mdLine("客户/项目", input.clientName),
    mdLine("行业/背景", input.industry),
    mdLine("目标", input.goal),
    mdLine("目标用户", input.audience),
    mdLine("时间安排", input.timeline),
    ""
  ].join("\n");

  const scope = mdSection("范围（Scope）", normalize(input.scope));
  const deliverables = mdSection("交付物（Deliverables）", normalize(input.deliverables));
  const outOfScope = mdSection("不包含（Out of scope）", normalize(input.outOfScope));
  const notes = mdSection("备注（Notes）", normalize(input.notes));

  return `${headerLines}\n${scope}\n${deliverables}\n${outOfScope}\n${notes}`.trim() + "\n";
}

export function buildPricingNote(input: PricingNoteInput): string {
  const headerLines = [
    "# 报价说明（Pricing Note）",
    "",
    mdLine("客户/项目", input.clientName),
    mdLine("计费方式", input.pricingModel),
    mdLine("范围摘要", input.scope),
    ""
  ].join("\n");

  const acceptance = mdSection("验收标准（Acceptance）", normalize(input.acceptanceCriteria));
  const payment = mdSection("付款条款（Payment Terms）", normalize(input.paymentTerms));
  const change = mdSection("变更政策（Change Policy）", normalize(input.changePolicy));
  const risks = mdSection("风险与假设（Risks/Assumptions）", normalize(input.risks));
  const notes = mdSection("备注（Notes）", normalize(input.notes));

  return `${headerLines}\n${acceptance}\n${payment}\n${change}\n${risks}\n${notes}`.trim() + "\n";
}

export function buildChangeRequest(input: ChangeRequestInput): string {
  const headerLines = [
    "# 需求变更说明（Change Request）",
    "",
    mdLine("客户/项目", input.clientName),
    mdLine("变更概述", input.changeSummary),
    mdLine("影响评估", input.impact),
    mdLine("新排期", input.newTimeline),
    mdLine("额外费用", input.extraCost),
    mdLine("确认截止", input.decisionDeadline),
    ""
  ].join("\n");

  const notes = mdSection("备注（Notes）", normalize(input.notes));
  const next = [
    "## 下一步（Next Step）",
    "",
    "- 请确认是否接受上述变更与影响。",
    "- 若接受：我将更新排期与里程碑，并开始执行。",
    "- 若不接受：我们将按原计划交付原范围。",
    ""
  ].join("\n");

  return `${headerLines}\n${next}\n${notes}`.trim() + "\n";
}

export function buildPaymentReminder(input: PaymentReminderInput): string {
  const tone = input.tone ?? "neutral";
  const opening =
    tone === "gentle"
      ? "想跟进一下发票的付款进度，麻烦你确认是否方便在本周内完成付款。"
      : tone === "firm"
        ? "提醒一下该发票已到期/临近到期，麻烦你尽快安排付款，并在完成后回复确认。"
        : "跟进一下发票付款进度，麻烦你确认预计付款时间。";

  const headerLines = [
    "# 催款邮件（Payment Reminder）",
    "",
    mdLine("收件人/客户", input.clientName),
    mdLine("发票号", input.invoiceId),
    mdLine("金额", input.amount),
    mdLine("到期日", input.dueDate),
    ""
  ].join("\n");

  const body = [
    "## 邮件正文（可直接复制）",
    "",
    `你好，${normalize(input.clientName) || "（称呼）"}：`,
    "",
    opening,
    "",
    `- 发票号：${normalize(input.invoiceId) || "（待补充）"}`,
    `- 金额：${normalize(input.amount) || "（待补充）"}`,
    `- 到期日：${normalize(input.dueDate) || "（待补充）"}`,
    "",
    normalize(input.payLinkOrAccount)
      ? `付款信息/链接：${normalize(input.payLinkOrAccount)}`
      : "付款信息/链接：（待补充）",
    "",
    "谢谢！",
    ""
  ].join("\n");

  const notes = mdSection("备注（Notes）", normalize(input.notes));

  return `${headerLines}\n${body}\n${notes}`.trim() + "\n";
}

export function buildWeeklyReview(input: WeeklyReviewInput): string {
  const headerLines = ["# 周复盘（Weekly Review）", "", mdLine("周期", input.weekRange), ""].join("\n");

  const wins = mdSection("本周产出（Wins/Output）", normalize(input.wins));
  const metrics = mdSection("关键指标（Metrics）", normalize(input.metrics));
  const issues = mdSection("问题与阻塞（Issues/Blockers）", normalize(input.issues));
  const next = mdSection("下周重点（Next Week）", normalize(input.nextWeek));
  const notes = mdSection("备注（Notes）", normalize(input.notes));

  return `${headerLines}\n${wins}\n${metrics}\n${issues}\n${next}\n${notes}`.trim() + "\n";
}

