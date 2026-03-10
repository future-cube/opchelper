<script setup lang="ts">
import {
  buildMediaKit,
  buildChangeRequest,
  buildPaymentReminder,
  buildPricingNote,
  buildProjectBrief,
  buildSponsorshipOutreach,
  buildWelcomeSequence,
  buildWeeklyReview,
  type Lang,
  type PaymentReminderInput
} from "~/utils/templates";

type TemplateId =
  | "project_brief"
  | "pricing_note"
  | "change_request"
  | "payment_reminder"
  | "weekly_review"
  | "media_kit"
  | "sponsorship_outreach"
  | "welcome_sequence";

type FieldDef = {
  key: string;
  label: Record<Lang, string>;
  placeholder?: Record<Lang, string>;
  textarea?: boolean;
};

type TemplateDef = {
  id: TemplateId;
  name: Record<Lang, string>;
  description: Record<Lang, string>;
  fields: FieldDef[];
};

const { locale } = useI18n();
const lang = computed<Lang>(() => (locale.value === "zh" ? "zh" : "en"));

const templates: TemplateDef[] = [
  {
    id: "project_brief",
    name: { zh: "项目简报", en: "Project brief" },
    description: { zh: "把目标、范围、交付物写清楚，减少反复沟通。", en: "Clarify goals, scope, deliverables, and reduce back-and-forth." },
    fields: [
      {
        key: "clientName",
        label: { zh: "客户/项目", en: "Client / Project" },
        placeholder: { zh: "例如：ACME 官网改版", en: "e.g., ACME website revamp" }
      },
      {
        key: "industry",
        label: { zh: "行业/背景", en: "Industry / Context" },
        placeholder: { zh: "例如：SaaS / 电商 / 内容", en: "e.g., SaaS / e-commerce / media" }
      },
      { key: "goal", label: { zh: "目标", en: "Goal" }, placeholder: { zh: "例如：提升线索转化率到 3%", en: "e.g., increase conversion to 3%" } },
      {
        key: "audience",
        label: { zh: "目标用户", en: "Audience" },
        placeholder: { zh: "例如：B 端采购/技术负责人", en: "e.g., B2B buyers / technical decision makers" }
      },
      {
        key: "timeline",
        label: { zh: "时间安排", en: "Timeline" },
        placeholder: { zh: "例如：两周，含 2 次评审", en: "e.g., 2 weeks, 2 review rounds" }
      },
      {
        key: "scope",
        label: { zh: "范围（Scope）", en: "Scope" },
        textarea: true,
        placeholder: { zh: "- 主页\n- 定价页\n- 表单", en: "- home\n- pricing\n- form" }
      },
      {
        key: "deliverables",
        label: { zh: "交付物（Deliverables）", en: "Deliverables" },
        textarea: true,
        placeholder: { zh: "- 设计稿\n- 前端代码\n- 上线支持", en: "- design files\n- frontend code\n- launch support" }
      },
      {
        key: "outOfScope",
        label: { zh: "不包含（Out of scope）", en: "Out of scope" },
        textarea: true,
        placeholder: { zh: "- 文案撰写\n- 服务器运维", en: "- copywriting\n- server ops" }
      },
      { key: "notes", label: { zh: "备注（Notes）", en: "Notes" }, textarea: true }
    ]
  },
  {
    id: "pricing_note",
    name: { zh: "报价说明", en: "Pricing note" },
    description: { zh: "把计费方式、验收与付款条款结构化写清楚。", en: "Clarify pricing, acceptance criteria, and payment terms." },
    fields: [
      { key: "clientName", label: { zh: "客户/项目", en: "Client / Project" } },
      {
        key: "pricingModel",
        label: { zh: "计费方式", en: "Pricing model" },
        placeholder: { zh: "例如：固定价 / 按天 / 订阅", en: "e.g., fixed / day-rate / retainer" }
      },
      { key: "scope", label: { zh: "范围摘要", en: "Scope summary" }, textarea: true },
      {
        key: "acceptanceCriteria",
        label: { zh: "验收标准", en: "Acceptance criteria" },
        textarea: true,
        placeholder: {
          zh: "- 页面在主流浏览器正常\n- 表单可提交并收到通知",
          en: "- works in major browsers\n- form submits + notifications"
        }
      },
      {
        key: "paymentTerms",
        label: { zh: "付款条款", en: "Payment terms" },
        textarea: true,
        placeholder: { zh: "- 50% 预付款\n- 50% 验收后 7 天内", en: "- 50% upfront\n- 50% within 7 days after acceptance" }
      },
      {
        key: "changePolicy",
        label: { zh: "变更政策", en: "Change policy" },
        textarea: true,
        placeholder: {
          zh: "范围变更将评估工期与费用，确认后再排期执行。",
          en: "Scope changes will be re-estimated for timeline and cost before scheduling."
        }
      },
      {
        key: "risks",
        label: { zh: "风险与假设", en: "Risks & assumptions" },
        textarea: true,
        placeholder: { zh: "- 客户提供素材按时到位\n- 评审反馈在 24h 内", en: "- assets provided on time\n- feedback within 24h" }
      },
      { key: "notes", label: { zh: "备注（Notes）", en: "Notes" }, textarea: true }
    ]
  },
  {
    id: "change_request",
    name: { zh: "需求变更说明", en: "Change request" },
    description: { zh: "把变更影响量化，帮助双方快速决策。", en: "Quantify impact so both sides can decide quickly." },
    fields: [
      { key: "clientName", label: { zh: "客户/项目", en: "Client / Project" } },
      {
        key: "changeSummary",
        label: { zh: "变更概述", en: "Change summary" },
        textarea: true,
        placeholder: { zh: "例如：新增多语言 + 两套落地页", en: "e.g., add i18n + 2 landing pages" }
      },
      {
        key: "impact",
        label: { zh: "影响评估", en: "Impact" },
        textarea: true,
        placeholder: { zh: "例如：增加 3 天；需要新增文案与翻译", en: "e.g., +3 days; needs copy + translation" }
      },
      { key: "newTimeline", label: { zh: "新排期", en: "New timeline" }, placeholder: { zh: "例如：延期到 3/25", en: "e.g., move to Mar 25" } },
      { key: "extraCost", label: { zh: "额外费用", en: "Extra cost" }, placeholder: { zh: "例如：+¥3,000", en: "e.g., +$300" } },
      {
        key: "decisionDeadline",
        label: { zh: "确认截止", en: "Decision deadline" },
        placeholder: { zh: "例如：本周五 18:00 前", en: "e.g., by Friday 6pm" }
      },
      { key: "notes", label: { zh: "备注（Notes）", en: "Notes" }, textarea: true }
    ]
  },
  {
    id: "payment_reminder",
    name: { zh: "催款邮件", en: "Payment reminder" },
    description: { zh: "礼貌但坚定。选择语气，一键生成可复制邮件正文。", en: "Polite but firm. Pick a tone and generate paste-ready copy." },
    fields: [
      { key: "clientName", label: { zh: "收件人/客户", en: "Client / contact" }, placeholder: { zh: "例如：王先生 / ACME", en: "e.g., Alex / ACME" } },
      { key: "invoiceId", label: { zh: "发票号", en: "Invoice ID" }, placeholder: { zh: "例如：INV-001", en: "e.g., INV-001" } },
      { key: "amount", label: { zh: "金额", en: "Amount" }, placeholder: { zh: "例如：¥8,000", en: "e.g., $800" } },
      { key: "dueDate", label: { zh: "到期日", en: "Due date" }, placeholder: { zh: "例如：2026-03-15", en: "e.g., 2026-03-15" } },
      {
        key: "tone",
        label: { zh: "语气（gentle/neutral/firm）", en: "Tone (gentle/neutral/firm)" },
        placeholder: { zh: "例如：gentle", en: "e.g., gentle" }
      },
      { key: "payLinkOrAccount", label: { zh: "付款信息/链接", en: "Payment info/link" }, placeholder: { zh: "例如：收款账号 / 支付链接", en: "e.g., bank info / payment link" } },
      { key: "notes", label: { zh: "备注（Notes）", en: "Notes" }, textarea: true }
    ]
  },
  {
    id: "weekly_review",
    name: { zh: "周复盘", en: "Weekly review" },
    description: { zh: "固定复盘结构，把改进做成节奏。", en: "A simple loop to make improvements consistent." },
    fields: [
      {
        key: "weekRange",
        label: { zh: "周期", en: "Week range" },
        placeholder: { zh: "例如：2026-03-09 ~ 2026-03-15", en: "e.g., 2026-03-09 ~ 2026-03-15" }
      },
      { key: "wins", label: { zh: "本周产出（Wins/Output）", en: "Wins / output" }, textarea: true },
      { key: "metrics", label: { zh: "关键指标（Metrics）", en: "Metrics" }, textarea: true },
      { key: "issues", label: { zh: "问题与阻塞（Issues/Blockers）", en: "Issues / blockers" }, textarea: true },
      { key: "nextWeek", label: { zh: "下周重点（Next Week）", en: "Next week" }, textarea: true },
      { key: "notes", label: { zh: "备注（Notes）", en: "Notes" }, textarea: true }
    ]
  },
  {
    id: "media_kit",
    name: { zh: "赞助媒体包（Media Kit）", en: "Sponsorship media kit" },
    description: { zh: "写清楚你是谁、受众是谁、你提供什么、套餐与报价。", en: "Brand, audience, deliverables, packages & pricing." },
    fields: [
      { key: "brand", label: { zh: "品牌/账号名", en: "Brand / channel" }, placeholder: { zh: "例如：SoloOps Weekly", en: "e.g., SoloOps Weekly" } },
      { key: "positioning", label: { zh: "一句话定位", en: "One-line positioning" } },
      { key: "audience", label: { zh: "受众画像", en: "Audience profile" }, textarea: true },
      { key: "stats", label: { zh: "数据（近 30 天/区间）", en: "Stats (range / last 30 days)" }, textarea: true },
      { key: "offers", label: { zh: "可交付内容", en: "Deliverables" }, textarea: true },
      { key: "packages", label: { zh: "套餐与报价", en: "Packages & pricing" }, textarea: true },
      { key: "notes", label: { zh: "备注（Notes）", en: "Notes" }, textarea: true }
    ]
  },
  {
    id: "sponsorship_outreach",
    name: { zh: "赞助合作邀约邮件", en: "Sponsorship outreach email" },
    description: { zh: "发给品牌方/代理：快速说明价值与下一步。", en: "A concise outreach email to brands/agencies." },
    fields: [
      { key: "to", label: { zh: "对方品牌/联系人", en: "Brand / contact" }, placeholder: { zh: "例如：XX 品牌市场团队", en: "e.g., Acme Marketing Team" } },
      { key: "who", label: { zh: "你是谁（1 句）", en: "Who you are (1 sentence)" } },
      { key: "audience", label: { zh: "你的受众（1 句）", en: "Your audience (1 sentence)" } },
      { key: "offer", label: { zh: "交付内容（≤3 条）", en: "Deliverables (≤3 bullets)" }, textarea: true },
      { key: "cta", label: { zh: "下一步（CTA）", en: "CTA / next step" } },
      { key: "notes", label: { zh: "备注（Notes）", en: "Notes" }, textarea: true }
    ]
  },
  {
    id: "welcome_sequence",
    name: { zh: "Newsletter 欢迎序列（3 封）", en: "Newsletter welcome sequence (3 emails)" },
    description: { zh: "让新订阅者快速理解你是谁、看什么、下一步做什么。", en: "Turn new subscribers into returning readers/customers." },
    fields: [
      { key: "brand", label: { zh: "Newsletter 名称", en: "Newsletter name" } },
      { key: "promise", label: { zh: "核心承诺", en: "Core promise" }, textarea: true },
      { key: "leadMagnet", label: { zh: "免费资源/下载（可选）", en: "Free resource (optional)" } },
      { key: "cta", label: { zh: "最终 CTA", en: "Final CTA" } },
      { key: "notes", label: { zh: "备注（Notes）", en: "Notes" }, textarea: true }
    ]
  }
];

const templateId = ref<TemplateId>("project_brief");
const values = reactive<Record<string, string>>({});
const copyState = ref<"idle" | "ok" | "fail">("idle");

const activeTemplate = computed(() => templates.find((t) => t.id === templateId.value)!);

const normalizeTone = (value: string | undefined): PaymentReminderInput["tone"] => {
  if (value === "gentle" || value === "neutral" || value === "firm") return value;
  return "neutral";
};

const output = computed(() => {
  const l = lang.value;
  const v = values;
  if (templateId.value === "project_brief") return buildProjectBrief(l, v);
  if (templateId.value === "pricing_note") return buildPricingNote(l, v);
  if (templateId.value === "change_request") return buildChangeRequest(l, v);
  if (templateId.value === "weekly_review") return buildWeeklyReview(l, v);
  if (templateId.value === "media_kit") return buildMediaKit(l, v);
  if (templateId.value === "sponsorship_outreach") return buildSponsorshipOutreach(l, v);
  if (templateId.value === "welcome_sequence") return buildWelcomeSequence(l, v);
  return buildPaymentReminder(l, { ...v, tone: normalizeTone(v.tone) });
});

const resetValues = () => {
  for (const key of Object.keys(values)) delete values[key];
};

watch(
  () => templateId.value,
  () => {
    resetValues();
    copyState.value = "idle";
  }
);

const copyToClipboard = async (): Promise<void> => {
  copyState.value = "idle";
  try {
    await navigator.clipboard.writeText(output.value);
    copyState.value = "ok";
  } catch {
    copyState.value = "fail";
  } finally {
    window.setTimeout(() => (copyState.value = "idle"), 1200);
  }
};
</script>

<template>
  <div class="grid gap-6 lg:grid-cols-2">
    <div class="opc-card">
      <label class="block text-sm font-medium text-slate-900 dark:text-slate-100">
        {{ lang === "zh" ? "选择模板" : "Choose template" }}
        <select
          v-model="templateId"
          class="mt-2 w-full rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-900 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400/60 dark:bg-slate-950/60 dark:text-slate-100 dark:ring-white/10 dark:focus:ring-indigo-400"
        >
          <option v-for="t in templates" :key="t.id" :value="t.id">
            {{ t.name[lang] }}
          </option>
        </select>
      </label>

      <p class="mt-3 text-sm text-slate-600 dark:text-slate-200/75">{{ activeTemplate.description[lang] }}</p>

      <div class="mt-5 space-y-4">
        <div v-for="f in activeTemplate.fields" :key="f.key">
          <label class="block text-sm font-medium text-slate-900 dark:text-slate-100">
            {{ f.label[lang] }}
            <textarea
              v-if="f.textarea"
              v-model="values[f.key]"
              class="mt-2 min-h-[96px] w-full resize-y rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-900 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400/60 dark:bg-slate-950/60 dark:text-slate-100 dark:ring-white/10 dark:focus:ring-indigo-400"
              :placeholder="f.placeholder?.[lang]"
            />
            <input
              v-else
              v-model="values[f.key]"
              class="mt-2 w-full rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-900 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400/60 dark:bg-slate-950/60 dark:text-slate-100 dark:ring-white/10 dark:focus:ring-indigo-400"
              :placeholder="f.placeholder?.[lang]"
            />
          </label>
        </div>
      </div>
    </div>

    <div class="opc-card">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="text-base font-semibold text-slate-900 dark:text-white">{{ lang === "zh" ? "预览（Markdown）" : "Preview (Markdown)" }}</h2>
        <button
          type="button"
          class="opc-btn-primary"
          @click="copyToClipboard"
        >
          <span v-if="copyState === 'ok'">{{ lang === "zh" ? "已复制" : "Copied" }}</span>
          <span v-else-if="copyState === 'fail'">{{ lang === "zh" ? "复制失败" : "Copy failed" }}</span>
          <span v-else>{{ lang === "zh" ? "复制到剪贴板" : "Copy" }}</span>
        </button>
      </div>

      <pre class="mt-4 max-h-[560px] overflow-auto rounded-2xl bg-slate-50 p-4 text-xs leading-relaxed text-slate-900 ring-1 ring-slate-200 dark:bg-slate-950/60 dark:text-slate-100 dark:ring-white/10"><code>{{ output }}</code></pre>

      <p class="mt-3 text-xs text-slate-500 dark:text-slate-200/60">
        {{
          lang === "zh"
            ? "提示：可以直接粘贴到 Notion / 飞书 / 邮件；需要更个性化表达时，再在此基础上微调。"
            : "Tip: paste into Notion / Docs / email. Then tweak wording to match your voice."
        }}
      </p>
    </div>
  </div>
</template>
