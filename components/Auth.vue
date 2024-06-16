<script setup>
const supabase = useSupabaseClient()

const loading = ref(false)
const email = ref('')
const password = ref('')
const login = ref(true)

// zum Login Sign Up wechseln
const changeSignIn = () => {
  login.value = !login.value
}
// new User
async function signUpNewUser() {
  try {
    loading.value = true
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        emailRedirectTo: 'https://fischlogger.vercel.app/home'},
    })
    if (error) throw error
    alert('Ein Email mit dem Bestätigungslink wurde an dich gesendet!')
  }  catch (error) {
    alert(error.error_description || error.message)
  }
  finally {
    loading.value = false
  }
}

// Login
async function signInWithEmail() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
}


</script>

<template>
  <!-- Login -->
  <form class="login" @submit.prevent="signInWithEmail" v-if="login">
    <div class="login_box">
      <h1>Login</h1>
      <div>
        <input class="inputField" type="email" placeholder="Deine Email" v-model="email" required/>
        <input class="inputField" type="password" placeholder="Passwort" v-model="password" required />
      </div>
      <div class = form-group>
        <input
          type="submit"
          class="button"
          :value="loading ? 'Loading...' : 'Einloggen'"
          :disabled="loading"
          />
        <p @click="changeSignIn()" style="font-size: 14px; color: grey; text-decoration: underline; cursor: pointer;">neuer User</p>
      </div>
    </div>
  </form>
  <!-- Neuer User -->
  <form class="login" @submit.prevent="signUpNewUser" v-else>
    <div class="login_box">
      <h1>Registrieren</h1>
      <div>
        <input class="inputField" type="email" placeholder="Deine Email" v-model="email" required/>
        <input class="inputField" type="password" placeholder="Passwort" v-model="password" required />
      </div>
      <div class = form-group>
        <input
          type="submit"
          class="button"
          :value="loading ? 'Loading...' : 'Registrieren'"
          :disabled="loading"
        />
        <p @click="changeSignIn()" style="font-size: 14px; color: grey; text-decoration: underline; cursor: pointer;">zum Login</p>
      </div>
    </div>
  </form>
</template>
<style>
.login{
  display:flex;
  justify-content: center;
  align-items: center;
}

.login_box{
  display:flex;
  flex-direction: column;
  align-items: center;
  padding:20px;
  border:1px solid rgb(5, 48, 4);
  border-radius:10px;
  margin:20px;
}
</style>