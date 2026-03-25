<script setup lang="ts">
import { claw123Head } from "~/utils/claw123Head";
import clawBody from "~/assets/claw123/body.html?raw";

definePageMeta({ layout: false });
useHead(() => claw123Head);
</script>

<template>
  <div class="claw123-root" v-html="clawBody" />
</template>
