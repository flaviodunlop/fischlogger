<script setup>
const supabase = useSupabaseClient()

const loading = ref(true)
const username = ref('')
const full_name = ref('')


loading.value = true
const user = useSupabaseUser()

const { data } = await supabase
  .from('profiles')
  .select('username, full_name')
  .eq('id', user.value.id)
  .single()

if (data) {
  username.value = data.username
  full_name.value = data.full_name
}

loading.value = false

async function updateProfile() {
  try {
    loading.value = true
    const user = useSupabaseUser()

    const updates = {
      id: user.value.id,
      username: username.value,
      full_name: full_name.value,
      updated_at: new Date(),
    }

    const { error } = await supabase.from('profiles').upsert(updates, {
      returning: 'minimal', // Don't return the value after inserting
    })
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

async function signOut() {
  try {
    loading.value = true
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    user.value = null
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="form-widget" @submit.prevent="updateProfile">
    <h1>Dein Account</h1>
    <div class = "form-group">
      <label for="email">Email</label>
      <input id="email" type="text" :value="user.email" disabled />
    </div>
    <div class = "form-group">
      <label for="username">Username</label>
      <input id="username" type="text" v-model="username" />
    </div>
    <div class = "form-group">
      <label for="full_name">Name</label>
      <input id="full_name" type="text" v-model="full_name" />
    </div>

    <div class = "form-group">
      <input
        type="submit"
        class="button"
        :value="loading ? 'Loading ...' : 'Profil aktualisieren'"
        :disabled="loading"
      />
    </div>

    <div class = "form-group">
      <button class="button" @click="signOut" :disabled="loading">Logout</button>
    </div>
  </form>
</template>

<style>
.form-widget {
  max-width: 400px;
  padding: 30px;
  margin-left: auto;
  margin-right: auto;
  border: 5px solid var(--darkgreen);
  border-radius: 15px;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;}
  
  .form-group {
    width: 360px;
    display: flex;
    flex-direction: column; /* Arrange label and input vertically */
    align-items: center; /* Center items horizontally */
    margin-bottom: 15px; /* Add some space between form groups */
  }

.form-widget input{
  text-align: center;
  width: 350px;
  height: inherit;
}

.form-widget label{
  font-size: 20px;
  font-weight: 700;
  margin-top: 10px;}

.form-widget button{
  width: 50%;
  height: 50px;
  margin-top: 20px;
  border-radius: 15px;
  background-color: var(--darkgreen);
  color: white;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;}
</style>