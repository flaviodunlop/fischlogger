<script setup>
  definePageMeta  ({
    layout: false,
  })
  const user = useSupabaseUser()
</script>

<template>
  <NuxtLayout name="general-header">
    <!--LOGIN-->
    <div class="container" style="padding: 50px 0 100px 0">
      <Account v-if="user" />
      <Auth v-else />
    </div>
  </NuxtLayout>
</template>