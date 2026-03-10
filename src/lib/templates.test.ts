import { describe, expect, it } from "vitest";
import {
  buildChangeRequest,
  buildPaymentReminder,
  buildPricingNote,
  buildProjectBrief,
  buildWeeklyReview
} from "./templates";

describe("templates", () => {
  it("buildProjectBrief includes scope and deliverables", () => {
    const md = buildProjectBrief({
      clientName: "ACME",
      scope: "- Landing page\n- Analytics",
      deliverables: "- Figma\n- HTML/CSS"
    });
    expect(md).toContain("项目简报");
    expect(md).toContain("ACME");
    expect(md).toContain("范围（Scope）");
    expect(md).toContain("Landing page");
    expect(md).toContain("交付物（Deliverables）");
    expect(md).toContain("Figma");
  });

  it("buildPricingNote includes payment terms", () => {
    const md = buildPricingNote({
      pricingModel: "固定价",
      paymentTerms: "- 50% 预付款\n- 50% 验收后 7 天内"
    });
    expect(md).toContain("报价说明");
    expect(md).toContain("付款条款");
    expect(md).toContain("预付款");
  });

  it("buildChangeRequest includes next step section", () => {
    const md = buildChangeRequest({
      changeSummary: "新增多语言",
      impact: "增加 3 天工期"
    });
    expect(md).toContain("需求变更说明");
    expect(md).toContain("下一步（Next Step）");
  });

  it("buildPaymentReminder includes invoice id and opening", () => {
    const md = buildPaymentReminder({
      clientName: "ACME",
      invoiceId: "INV-001",
      amount: "¥8,000",
      tone: "gentle"
    });
    expect(md).toContain("催款邮件");
    expect(md).toContain("INV-001");
    expect(md).toContain("想跟进一下");
  });

  it("buildWeeklyReview includes issues and next week", () => {
    const md = buildWeeklyReview({
      weekRange: "2026-03-09 ~ 2026-03-15",
      issues: "- 需求不清晰",
      nextWeek: "- 完成报价与排期"
    });
    expect(md).toContain("周复盘");
    expect(md).toContain("问题与阻塞");
    expect(md).toContain("下周重点");
  });
});
