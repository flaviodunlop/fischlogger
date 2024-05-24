<script setup>
import Footer from '../components/Footer'
</script>

<template>
  <!--HEADER-->
  <header>
    <div class="logo">
      <NuxtLink to="/" class="nuxt-link-class">
        <img class="header_logo" src="/img/fischlogger_header.png" alt="Logo">
      </NuxtLink>
    </div>
    <div>
      <NuxtLink to="/login" class="nuxt-link-class">
        <img class="header_profile" src="/img/profil.svg">
      </NuxtLink>
    </div>
  </header>

  <!--MAIN-->
  <!--BOX LOGGER-->
  <main class="all_boxes">
    <article class="box_large_left">
      <NuxtLink to="/logger" class="nuxt-link-class">  <!-- Nuxt Link Class not in use-->
        <img src="/img/fisch_loggen.jpg" class="nachrichtenbild_titelseite" alt="Fisch loggen">
      </NuxtLink>
      <div class="zwei_ueberschriften">
        <h2><NuxtLink to="/logger" class="box_title">Fisch loggen</NuxtLink></h2>
      </div>
    </article>
 
    <!-- BOX PROFIL-->
    <article class="box_small">
      <NuxtLink to="/login" class="nuxt-link-class">  <!-- Nuxt Link Class not in use-->
        <img src="/img/fischer_profil.jpg" class="nachrichtenbild_titelseite" alt="Profil">
      </NuxtLink>
      <div class="zwei_ueberschriften">
        <h2><NuxtLink to="/login" class="box_title">Profil</NuxtLink></h2>
      </div>
    </article>
      
    <!-- BOX HOWTO-->
    <article class="box_small">
      <!-- NuxtLink zur logger-Seite -->
      <NuxtLink to="/howto" class="nuxt-link-class">  <!-- Nuxt Link Class not in use-->
        <img src="/img/howto.jpg" class="nachrichtenbild_titelseite" alt="HowTo">
      </NuxtLink>
      <div class="zwei_ueberschriften">
        <h2><NuxtLink to = "/howto" class="box_title">How To</NuxtLink></h2>
      </div>
    </article>

    <!--BOX STATS-->  
    <article class="box_large_right">
      <NuxtLink to="/stats" class="nuxt-link-class">  <!-- Nuxt Link Class not in use-->
        <img src="/img/stats.jpg" class="nachrichtenbild_titelseite" alt="Stats">
      </NuxtLink>
        <div class="zwei_ueberschriften">
            <h2><NuxtLink to="/stats" class="box_title">Statistiken</NuxtLink></h2>
        </div>
    </article>
  </main>
  
  <Footer />
</template>

<script lang="ts" setup>
</script>
