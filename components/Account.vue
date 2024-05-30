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