<template>
  <footer class = "footer">
    <div class="footer_content">
      <NuxtLink to="/" class="nuxt-link-class">  <!-- Nuxt Link Class not in use-->
        <img src="/img/fischlogger_logo_large.png" alt="Logo" height="80px">
      </NuxtLink>
      <p>© 2024 fischlogger.ch</p>
    </div> 
  </footer>   
</template>

<style>
  .footer {
    width: 100%;
    background-color: #2e2e2e;
    margin-top: 35px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  footer p {
    color: rgb(118, 118, 118);
  }

  .footer_content {
    display: flex;
    align-items: center; /* Zentrieren Sie den Inhalt vertikal */
  }

  .footer_content img {
    height: 80px;
    margin-right: 10px; /* Optional: Fügen Sie etwas Abstand zwischen dem Bild und dem Text hinzu */
  }
</style>

