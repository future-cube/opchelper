import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    guidesZh: defineCollection({
      type: "page",
      source: {
        include: "content/zh/guides/**",
        prefix: "/zh/guides"
      },
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        tags: z.array(z.string()).optional(),
        updatedAt: z.string().optional()
      })
    }),
    guidesEn: defineCollection({
      type: "page",
      source: {
        include: "content/en/guides/**",
        prefix: "/en/guides"
      },
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        tags: z.array(z.string()).optional(),
        updatedAt: z.string().optional()
      })
    }),
    playbooksZh: defineCollection({
      type: "page",
      source: {
        include: "content/zh/playbooks/**",
        prefix: "/zh/playbooks"
      },
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        tags: z.array(z.string()).optional(),
        updatedAt: z.string().optional()
      })
    }),
    playbooksEn: defineCollection({
      type: "page",
      source: {
        include: "content/en/playbooks/**",
        prefix: "/en/playbooks"
      },
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        tags: z.array(z.string()).optional(),
        updatedAt: z.string().optional()
      })
    }),
    downloadsZh: defineCollection({
      type: "page",
      source: {
        include: "content/zh/downloads/**",
        prefix: "/zh/downloads"
      },
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
      source: {
        include: "content/en/downloads/**",
        prefix: "/en/downloads"
      },
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
      source: {
        include: "content/directory/*.json",
        prefix: "/directory"
      },
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
