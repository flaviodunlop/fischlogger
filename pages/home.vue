<script setup>
useHead({
  title: 'fischlogger.ch - Home',
});
definePageMeta({
  layout: false,
})
</script>

<template>
  <NuxtLayout name="home-header">  <!-- different Layout then usual because Link to index Page instead of home-->
    <!--MAIN-->
    <!--BOX LOGGER-->
    <main class="all_boxes">
      <article class="box_large_left">
        <NuxtLink to="/logger" class="nuxt-link-class">  <!-- Nuxt Link Class not in use-->
          <img src="/img/fisch_loggen.jpg" class="img_home" alt="Fisch loggen">
        </NuxtLink>
        <div class="text_img">
          <h2><NuxtLink to="/logger" class="box_title">Fisch loggen</NuxtLink></h2>
        </div>
      </article>
  
      <!-- BOX PROFIL-->
      <article class="box_small">
        <NuxtLink to="/login" class="nuxt-link-class">  <!-- Nuxt Link Class not in use-->
          <img src="/img/fischer_profil.jpg" class="img_home" alt="Profil">
        </NuxtLink>
        <div class="text_img">
          <h2><NuxtLink to="/login" class="box_title">Profil</NuxtLink></h2>
        </div>
      </article>
        
      <!-- BOX HOWTO-->
      <article class="box_small">
        <!-- NuxtLink zur logger-Seite -->
        <NuxtLink to="/howto" class="nuxt-link-class">  <!-- Nuxt Link Class not in use-->
          <img src="/img/howto.jpg" class="img_home" alt="HowTo">
        </NuxtLink>
        <div class="text_img">
          <h2><NuxtLink to = "/howto" class="box_title">How To</NuxtLink></h2>
        </div>
      </article>

      <!--BOX STATS-->  
      <article class="box_large_right">
        <NuxtLink to="/stats" class="nuxt-link-class">  <!-- Nuxt Link Class not in use-->
          <img src="/img/stats.jpg" class="img_home" alt="Stats">
        </NuxtLink>
          <div class="text_img">
              <h2><NuxtLink to="/stats" class="box_title">Statistiken</NuxtLink></h2>
          </div>
      </article>
    </main>
  </NuxtLayout>
</template>

<style>
  .box_large_left,.box_large_right, .box_small{
    box-sizing:border-box;
    height:70vw;
    margin-bottom:20px; /*only for smartphone, this will be canceled above 1000px width*/
    position: relative;
  }

  .img_home {
    object-fit: cover;
    width: 100%;
    height: 100%;
    transition: transform 0.2s ease; /* Übergangseffekt für den Zoom */
  }

  .img_home:hover {
    transform: scale(1.015); /* Zoom-Effekt beim Hover */
  }

  .box_large_left h2,.box_large_right h2, .box_small h2{/*added .big_article_vertical h2 for grid*/
    margin:5px 0 10px 0;
  }

  .box_title{
    color:white;
    margin-bottom:10px;
    padding:3px;
    line-height:100%;
  }

  .box_title{
    font-size: 48px;
  }

  .text_img{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }


  @media (min-width: 1000px) {
    /* HOME */
    .all_boxes{
      display:grid; /*https://www.youtube.com/watch?v=jV8B24rSN5o*/
      grid-template-columns: 31% 31% 31%;
      grid-auto-rows:32vw; /*https://youtu.be/jV8B24rSN5o?t=713*/
      grid-column-gap:20px;
      grid-row-gap:20px;
      justify-content: center;/*Breite ist ungefähr 99 prozent, deshalb zentrieren wir alles*/
    }

    .box_large_left, .box_large_right, .box_small{
      margin-bottom: 0px;
    }

    .box_large_left{
      height:auto;/*resetting height value from 70vw to default value*/
      grid-column:1/3;  /* 1/3 bedeutet: von der ersten Vertikalen Fugen bis zur dritten vertikalen Fuge*/
    }

    .box_large_right{
      height:auto;/*resetting height value from 70vw to default value*/
      grid-column:2/4;  /* 1/3 bedeutet: von der ersten Vertikalen Fugen bis zur dritten vertikalen Fuge*/
    }

    .box_small{
      height:auto;/*resetting height value from 70vw to default value*/
    }
  }
</style>
