import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    guidesZh: defineCollection({
      type: "page",
      source: "zh/guides/**/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        tags: z.array(z.string()).optional(),
        updatedAt: z.string().optional()
      })
    }),
    guidesEn: defineCollection({
      type: "page",
      source: "en/guides/**/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        tags: z.array(z.string()).optional(),
        updatedAt: z.string().optional()
      })
    }),
    playbooksZh: defineCollection({
      type: "page",
      source: "zh/playbooks/**/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        tags: z.array(z.string()).optional(),
        updatedAt: z.string().optional()
      })
    }),
    playbooksEn: defineCollection({
      type: "page",
      source: "en/playbooks/**/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        tags: z.array(z.string()).optional(),
        updatedAt: z.string().optional()
      })
    }),
    downloadsZh: defineCollection({
      type: "page",
      source: "zh/downloads/**/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        tags: z.array(z.string()).optional(),
        updatedAt: z.string().optional(),
        downloadUrl: z.string().optional()
      })
    }),
    downloadsEn: defineCollection({
      type: "page",
      source: "en/downloads/**/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        tags: z.array(z.string()).optional(),
        updatedAt: z.string().optional(),
        downloadUrl: z.string().optional()
      })
    }),
    directory: defineCollection({
      type: "data",
      source: "directory/*.json",
      schema: z.object({
        category: z.enum(["provider", "gateway", "tool", "site"]),
        name: z.object({ zh: z.string(), en: z.string() }),
        description: z.object({ zh: z.string(), en: z.string() }),
        website: z.string().url(),
        docs: z.string().url().optional(),
        tags: z.array(z.string()).optional()
      })
    })
  }
});
