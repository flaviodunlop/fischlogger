<script setup>
useHead({
  title: 'fischlogger.ch - Wie funktioniert fischlogger?',
});
definePageMeta({
  layout: false,
})
</script>

<template>
  <NuxtLayout name="general-header">
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
      <div style="margin-top: 30px; margin-bottom: 30px;" class="cross_link">
        <NuxtLink to="/logger" class="button_table_green">Jetzt loslegen!</NuxtLink>
      </div>
    </main>
  </NuxtLayout>
</template>
<style>
  .howto {
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 50px;
}

.howto_article {
  margin-bottom: 20px;
}

.howto_img {
  max-width: 50%; /* Maximale Breite des Bildes auf 100% festlegen */
  min-width: 450px;
  height: auto; /* Automatische Höhe beibehalten */
}
</style>