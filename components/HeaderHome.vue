<template>
  <!--HEADER-->
  <header>
    <div class="logo">
        <NuxtLink to="/" class="nuxt-link-class">
          <img class="header_logo"src="/img/fischlogger_header.png" alt="Logo">
        </NuxtLink>
      </div>
      <div>
          <NuxtLink to="/login" class="nuxt-link-class">
            <img class="header_profile" src="/img/profil.svg"  height="80px">
          </NuxtLink>
        </div>
  </header>
</template>

<style>
header{
  display:flex;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
  margin-bottom: 20px
}

.header_logo{
  max-width: 300px;
  height: auto;
}

.header_profile{
  height: 60px;
  width: auto;
}

.logo{
  flex:1;
}

@media (min-width: 1000px) {
  .header_logo{
    max-width: 450px;
  }

  .header_profile{
    height: 80px;
  }
}
</style>