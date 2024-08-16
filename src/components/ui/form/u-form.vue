<!-- note : dont call submit function on btn onclick . put it on submit event (@submit) and never use the .prevent suffix  -->
<template>
  <Form class="contents">
    <slot />
  </Form>
</template>

<script setup lang="ts">
import { Form } from "vee-validate";
</script>
