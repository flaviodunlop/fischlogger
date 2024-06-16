<script setup>
useHead({
  title: 'fischlogger.ch - Willkommen',
});
</script>

<template>
  <div class="welcome">
    <div class="logo-container">
      <h1 class="welcome_title">Willkommen</h1>
        <NuxtLink to="/home" class="nuxt-link-class"> 
            <img class="welcome_img" src="/img/fischlogger_logo_large.png" alt="fischlogger.ch Logo">
        </NuxtLink>
    </div>
  </div>
</template>

<style>
  .welcome{
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: radial-gradient(circle, #1b1b1b, #111111);
  }

  .logo-container {
    text-align: center;
  }

  .logo-container img {
    width: 400px; /* Breite des Logos */
    height: auto;
  }
  .welcome_title{
    font-size: 60px;
    color: #2c513c;
  }

  .welcome_img{
    transition: transform 0.8s ease;
  }

  .welcome_img:hover{
    transform: scale(1.23);
  }

  @media (min-width: 1000px) {
    .welcome_title{
    font-size: 150px;
    }
  }

</style>