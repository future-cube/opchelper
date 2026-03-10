<script setup lang="ts">
import {
  buildChangeRequest,
  buildPaymentReminder,
  buildPricingNote,
  buildProjectBrief,
  buildWeeklyReview,
  type PaymentReminderInput
} from "~/utils/templates";

type TemplateId = "project_brief" | "pricing_note" | "change_request" | "payment_reminder" | "weekly_review";

type FieldDef = {
  key: string;
  label: string;
  placeholder?: string;
  textarea?: boolean;
};

type TemplateDef = {
  id: TemplateId;
  name: string;
  description: string;
  fields: FieldDef[];
};

const templates: TemplateDef[] = [
  {
    id: "project_brief",
    name: "项目简报",
    description: "把目标、范围、交付物写清楚，减少反复沟通。",
    fields: [
      { key: "clientName", label: "客户/项目", placeholder: "例如：ACME 官网改版" },
      { key: "industry", label: "行业/背景", placeholder: "例如：SaaS / 电商 / 内容" },
      { key: "goal", label: "目标", placeholder: "例如：提升线索转化率到 3%" },
      { key: "audience", label: "目标用户", placeholder: "例如：B 端采购/技术负责人" },
      { key: "timeline", label: "时间安排", placeholder: "例如：两周，含 2 次评审" },
      { key: "scope", label: "范围（Scope）", textarea: true, placeholder: "- 主页\n- 定价页\n- 表单" },
      { key: "deliverables", label: "交付物（Deliverables）", textarea: true, placeholder: "- 设计稿\n- 前端代码\n- 上线支持" },
      { key: "outOfScope", label: "不包含（Out of scope）", textarea: true, placeholder: "- 文案撰写\n- 服务器运维" },
      { key: "notes", label: "备注（Notes）", textarea: true }
    ]
  },
  {
    id: "pricing_note",
    name: "报价说明",
    description: "把计费方式、验收与付款条款结构化写清楚。",
    fields: [
      { key: "clientName", label: "客户/项目" },
      { key: "pricingModel", label: "计费方式", placeholder: "例如：固定价 / 按天 / 订阅" },
      { key: "scope", label: "范围摘要", textarea: true },
      { key: "acceptanceCriteria", label: "验收标准", textarea: true, placeholder: "- 页面在主流浏览器正常\n- 表单可提交并收到通知" },
      { key: "paymentTerms", label: "付款条款", textarea: true, placeholder: "- 50% 预付款\n- 50% 验收后 7 天内" },
      { key: "changePolicy", label: "变更政策", textarea: true, placeholder: "范围变更将评估工期与费用，确认后再排期执行。" },
      { key: "risks", label: "风险与假设", textarea: true, placeholder: "- 客户提供素材按时到位\n- 评审反馈在 24h 内" },
      { key: "notes", label: "备注（Notes）", textarea: true }
    ]
  },
  {
    id: "change_request",
    name: "需求变更说明",
    description: "把变更影响量化，帮助双方快速决策。",
    fields: [
      { key: "clientName", label: "客户/项目" },
      { key: "changeSummary", label: "变更概述", textarea: true, placeholder: "例如：新增多语言 + 两套落地页" },
      { key: "impact", label: "影响评估", textarea: true, placeholder: "例如：增加 3 天；需要新增文案与翻译" },
      { key: "newTimeline", label: "新排期", placeholder: "例如：延期到 3/25" },
      { key: "extraCost", label: "额外费用", placeholder: "例如：+¥3,000" },
      { key: "decisionDeadline", label: "确认截止", placeholder: "例如：本周五 18:00 前" },
      { key: "notes", label: "备注（Notes）", textarea: true }
    ]
  },
  {
    id: "payment_reminder",
    name: "催款邮件",
    description: "礼貌但坚定。选择语气，一键生成可复制邮件正文。",
    fields: [
      { key: "clientName", label: "收件人/客户", placeholder: "例如：王先生 / ACME" },
      { key: "invoiceId", label: "发票号", placeholder: "例如：INV-001" },
      { key: "amount", label: "金额", placeholder: "例如：¥8,000" },
      { key: "dueDate", label: "到期日", placeholder: "例如：2026-03-15" },
      { key: "tone", label: "语气（gentle/neutral/firm）", placeholder: "例如：gentle" },
      { key: "payLinkOrAccount", label: "付款信息/链接", placeholder: "例如：收款账号 / 支付链接" },
      { key: "notes", label: "备注（Notes）", textarea: true }
    ]
  },
  {
    id: "weekly_review",
    name: "周复盘",
    description: "固定复盘结构，把改进做成节奏。",
    fields: [
      { key: "weekRange", label: "周期", placeholder: "例如：2026-03-09 ~ 2026-03-15" },
      { key: "wins", label: "本周产出（Wins/Output）", textarea: true },
      { key: "metrics", label: "关键指标（Metrics）", textarea: true },
      { key: "issues", label: "问题与阻塞（Issues/Blockers）", textarea: true },
      { key: "nextWeek", label: "下周重点（Next Week）", textarea: true },
      { key: "notes", label: "备注（Notes）", textarea: true }
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
  const v = values;
  if (templateId.value === "project_brief") return buildProjectBrief(v);
  if (templateId.value === "pricing_note") return buildPricingNote(v);
  if (templateId.value === "change_request") return buildChangeRequest(v);
  if (templateId.value === "weekly_review") return buildWeeklyReview(v);
  return buildPaymentReminder({ ...v, tone: normalizeTone(v.tone) });
});

const resetValues = () => {
  for (const key of Object.keys(values)) delete values[key];
};

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
    <div class="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
      <label class="block text-sm font-medium text-slate-100">
        选择模板
        <select
          v-model="templateId"
          class="mt-2 w-full rounded-xl bg-slate-950/60 px-3 py-2 text-sm text-slate-100 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          @change="
            () => {
              resetValues();
              copyState = 'idle';
            }
          "
        >
          <option v-for="t in templates" :key="t.id" :value="t.id">
            {{ t.name }}
          </option>
        </select>
      </label>

      <p class="mt-3 text-sm text-slate-200/75">{{ activeTemplate.description }}</p>

      <div class="mt-5 space-y-4">
        <div v-for="f in activeTemplate.fields" :key="f.key">
          <label class="block text-sm font-medium text-slate-100">
            {{ f.label }}
            <textarea
              v-if="f.textarea"
              v-model="values[f.key]"
              class="mt-2 min-h-[96px] w-full resize-y rounded-xl bg-slate-950/60 px-3 py-2 text-sm text-slate-100 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              :placeholder="f.placeholder"
            />
            <input
              v-else
              v-model="values[f.key]"
              class="mt-2 w-full rounded-xl bg-slate-950/60 px-3 py-2 text-sm text-slate-100 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              :placeholder="f.placeholder"
            />
          </label>
        </div>
      </div>
    </div>

    <div class="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="text-base font-semibold text-white">预览（Markdown）</h2>
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-xl bg-indigo-500 px-3 py-2 text-sm font-medium text-white shadow-sm shadow-indigo-500/20 transition hover:bg-indigo-400"
          @click="copyToClipboard"
        >
          <span v-if="copyState === 'ok'">已复制</span>
          <span v-else-if="copyState === 'fail'">复制失败</span>
          <span v-else>复制到剪贴板</span>
        </button>
      </div>

      <pre class="mt-4 max-h-[560px] overflow-auto rounded-2xl bg-slate-950/60 p-4 text-xs leading-relaxed text-slate-100 ring-1 ring-white/10"><code>{{ output }}</code></pre>

      <p class="mt-3 text-xs text-slate-200/60">
        提示：可以直接粘贴到 Notion / 飞书 / 邮件；需要更个性化表达时，再在此基础上微调。
      </p>
    </div>
  </div>
</template>
