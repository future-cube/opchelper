export default defineI18nConfig(() => ({
  legacy: false,
  locale: "zh",
  messages: {
    zh: {
      nav: {
        home: "首页",
        guides: "学习",
        playbook: "手册",
        directory: "导航",
        tools: "工具",
        downloads: "下载",
        about: "关于",
        start: "开始使用"
      },
      home: {
        badge: "学习中心 · 资源导航 · 工具与模板",
        title: "一个人，也能运营一家公司",
        subtitle:
          "OPC Helper 是“一人公司能力学校”：用可执行的教程、路线图和资源导航，帮你把经营变成可复制的系统。",
        ctaLearn: "开始学习（Guides）",
        ctaDir: "资源导航（Directory）"
      }
    },
    en: {
      nav: {
        home: "Home",
        guides: "Learn",
        playbook: "Playbooks",
        directory: "Directory",
        tools: "Tools",
        downloads: "Downloads",
        about: "About",
        start: "Get Started"
      },
      home: {
        badge: "Learning hub · Directories · Tools",
        title: "Run a company — as a solo operator",
        subtitle:
          "OPC Helper helps solo operators learn essential skills with practical guides, curated directories, and lightweight tools.",
        ctaLearn: "Start learning",
        ctaDir: "Explore directory"
      }
    }
  }
}));

