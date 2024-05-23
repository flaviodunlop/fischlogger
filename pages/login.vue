<script setup>
  import Header from '../components/Header'
  import Footer from '../components/Footer'
  const user = useSupabaseUser()
</script>

<template>
  <!--HEADER-->
  <Header />

  <!--LOGIN-->
  <div class="container" style="padding: 50px 0 100px 0">
    <Account v-if="user" />
    <Auth v-else />
  </div>
  <!--FOOTER-->
  <Footer />
</template>