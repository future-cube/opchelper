<script setup lang="ts">
import midHtml from "~/assets/claw123/mid.html?raw";

useHead({
  link: [
    {
      rel: "stylesheet",
      href: "/claw123/mid.css"
    }
  ]
});
</script>

<template>
  <div class="claw123-mid-wrapper" v-html="midHtml" />
</template>
