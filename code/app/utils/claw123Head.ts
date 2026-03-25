export const claw123Head = {
  title: "Claw123龙虾导航 - OpenClaw中文社区",
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "keywords", content: "OpenClaw,Claw123,龙虾,养虾,OpenClaw导航" },
    { name: "version", content: "2026-03-24 16:04" },
    {
      name: "description",
      content:
        "Claw123龙虾导航，OpenClaw一站式服务平台，提供部署指南、技能精选、工具聚合与社区入口，让养虾更简单、更高效。",
    },
    { property: "og:image", content: "https://img.amz123.com/static/images/head_logo.jpg" },
    { name: "shareIcon", content: "https://img.amz123.com/static/images/head_logo.jpg" },
    { name: "renderer", content: "webkit" },
    { "http-equiv": "X-UA-Compatible", content: "IE=Edge,chrome=1" },
  ],
  link: [
    { rel: "canonical", href: "https://www.amz123.com" },
    {
      rel: "icon",
      type: "image/webp",
      href: "https://aicdn.zfty.work/space_13/image_cloud/202603/1773732077017224_claw123200.webp",
    },
    {
      rel: "shortcut icon",
      type: "image/webp",
      href: "https://aicdn.zfty.work/space_13/image_cloud/202603/1773732077017224_claw123200.webp",
    },
    {
      rel: "Bookmark",
      type: "image/webp",
      href: "https://aicdn.zfty.work/space_13/image_cloud/202603/1773732077017224_claw123200.webp",
    },
    {
      rel: "stylesheet",
      href: "https://aicdn.zfty.work/index/claw123_index.css?t=2026031701",
    },
  ],
  style: [
    {
      children:
        'div[data-opacity="1"] { opacity: 0; height: 1px; }\n' +
        'ul[data-opacity="1"] { opacity: 0; height: 1px; }',
    },
  ],
  script: [
    {
      src: "https://aicdn.zfty.work/index/claw123_index.js?t=2026031701",
      defer: true,
    },
    {
      src: "https://aicdn.zfty.work/index/claw123_data_burial.js",
      defer: true,
    },
    {
      children: `document.addEventListener("DOMContentLoaded", function () {
  var elements = document.querySelectorAll("[data-opacity='1']");
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.height = "auto";
        observer.unobserve(entry.target);
      }
    });
  });
  elements.forEach(function (element) {
    observer.observe(element);
  });
});`,
    },
  ],
};
