<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
</script>


<template> 
  <!--HEADER-->
  <Header />

  <!--MAIN-->
  <!--LOGGER-->
  <h1>Wie funktioniert fischlogger?</h1>
  <main class="howto">
    <article class="howto_article">
      <div>
        <h2>1. Fisch loggen</h2>
        <p>Gefangener Fisch mit Angabe von Art, Grösse und Temperaturen loggen. Datum und Zeit werden automatisch eingetragen.</p>
      </div>
    </article>
    <!-- Image Logger Mockup-->
    <div>
      <img src="/img/mockup_logger.png" class="howto_img" alt="Logger">
    </div>
    <article class="howto_article">
      <div>
        <h2>2. Statistiken geniessen</h2>
        <p>Alle möglichen Zahlen und Fakten in den Statistiken entdecken.</p>
      </div>
    </article>
    <!-- Image Logger Mockup-->
    <div>
        <img src="/img/mockup_stats.png" class="howto_img" alt="Logger">
    </div>
    <!--LINK ZUM LOGGER-->
    <div style="margin-top: 30px; margin-bottom: 30px;" class="stats">
      <NuxtLink to="/logger" class="button_table_green">Jetzt loslegen!</NuxtLink>
    </div>
  </main>
<!--FOOTER-->
  <Footer />
</template>