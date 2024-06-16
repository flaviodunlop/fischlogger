<script setup>
  useHead({
    title: 'fischlogger.ch - Logger',
  });
  definePageMeta({
    layout: false,
  })
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const fishStore = useFishStore()
  const { loadFishLogs } = fishStore
  const { fish_log_Array, speciesCount} = storeToRefs(fishStore)

  // Fetch data
  await useAsyncData('loadFishLogs', async () => {
    return await loadFishLogs()}
  )

  // INPUT FORM 
  // empty values
  const newSpecies = ref('')
  const newAirTemp = ref('')
  const newWaterTemp = ref('')
  const newSize = ref('')

  // Insert
  const addFishLog = async () => {

  // Values auslesen
  const species = newSpecies.value
  const air_temp = newAirTemp.value
  const water_temp = newWaterTemp.value
  const size = newSize.value

  // Validieren
  if (!species || !air_temp || !water_temp || !size) {
    alert('Bitte alle Felder ausfüllen')
    return
  }

  // Insert in DB
  const { error } = await supabase
    .from('fishlog')
    .insert([
      {
        user_id: user.value.id,
        species: species,
        air_temp: air_temp,
        water_temp: water_temp,
        size: size,
      }
    ])

  if (error) {
    console.error('Error inserting fishlog:', error.message)
    return
  }
  else {
    //console.log("inserted data..")
  
    // Load data again
  await loadFishLogs()
  }

  // Clear input fields
  newSpecies.value = ''
  newAirTemp.value = ''
  newWaterTemp.value = ''
  newSize.value = '' 
  };

  // Update
  const updateLog = async (id, species, air_temp, water_temp, size) => {
    const { error } = await supabase
      .from('fishlog')
      .update({ species, air_temp, water_temp, size })
      .eq('id', id)
    if (error) {
      console.error('Error updating fishlog:', error.message)
      return
    }
    //console.log("updated data..")
  await loadFishLogs()
  };

  // Delete
  const deleteLog = async (id) => {
    const { error } = await supabase
      .from('fishlog')
      .delete()
      .eq('id', id)
    if (error) {
      console.error('Error deleting fishlog:', error.message)
      return
    }
    //console.log("deleted data..")
    await loadFishLogs()
  };

  // Format date Function
  function formatDate(dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleString('de-DE', options).replace(",", "");
}
</script>

<!--TEMPLATE-->
<template> 
  <NuxtLayout name="general-header">
    <main>
      <!--LOGBUCH-->
      <h1>Dein Logbuch</h1>
        <article class="fish">
          <div>
            <img src="/img/Egli.svg" class="fish_img" alt="Egli">
            <p class="fish_text">{{ speciesCount.Egli }} / 50</p>
            <p class="fish_text">Egli</p>
          </div>
          <div>
            <img src="/img/Hecht.svg" class="fish_img" alt="Hecht">
            <p class="fish_text">{{speciesCount.Hecht}} / 5</p>
            <p class="fish_text">Hecht</p>
          </div>
          <div>
            <img src="/img/Zander.svg" class="fish_img" alt="Zander">
            <p class="fish_text">{{speciesCount.Zander}} / 5</p>
            <p class="fish_text">Zander</p>
          </div>
          <div>
            <img src="/img/Forelle.svg" class="fish_img" alt="Forelle">
            <p class="fish_text">{{speciesCount.Forelle}} / 7</p>
            <p class="fish_text">Forelle</p>
          </div>
          <div>
            <img src="/img/Felche.svg" class="fish_img" alt="Felche">
            <p class="fish_text">{{speciesCount.Felche}} / 7</p>
            <p class="fish_text">Felche</p>
          </div>
        </article>

      <!--LINK ZUM LOGGER-->
      <div style="margin-top: 30px; margin-bottom: 30px;" class="cross_link">
        <NuxtLink to="/stats" class="button_table_green">Deine kompletten Statistiken</NuxtLink>
      </div>

      <!--FORMULAR-->
      <div class="form">
        <h2>Fisch hinzufügen</h2>
          <select v-model="newSpecies">
            <option value="" disabled selected>Art auswählen</option>
            <option value="Egli">Egli</option>
            <option value="Hecht">Hecht</option>
            <option value="Zander">Zander</option>
            <option value="Forelle">Forelle</option>
            <option value="Felche">Felche</option>
          </select>
          <input type="number" v-model="newAirTemp" placeholder="Lufttemperatur eingeben (C)">
          <input type="number" v-model="newWaterTemp" placeholder="Wassertemperatur eingeben (C)">
          <input type="number" v-model="newSize" placeholder="Grösse eingeben (cm)">
          <button class="button" @click="addFishLog">Fisch hinzufügen</button>
      </div>

      <!--TABELLE FÄNGE-->
      <div>
        <h2>Deine Fänge</h2>
          <table>
            <thead>
              <tr>
                <th>Datum / Zeit</th>
                <th>Art</th>
                <th>Lufttemperatur (C)</th>
                <th>Wassertemperatur (C)</th>
                <th>Grösse (cm)</th>
                <th class="button_col"></th> <!--Space for the button-->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(fishLog, index) in fish_log_Array" :key="index">
                <td data-label="Datum / Zeit">{{ formatDate(fishLog.created_at) }}</td>
                <td data-label="Art">
                  <select v-model="fishLog.species" class="table_input">
                  <option value="" disabled selected>Art auswählen</option>
                  <option value="Egli">Egli</option>
                  <option value="Hecht">Hecht</option>
                  <option value="Zander">Zander</option>
                  <option value="Forelle">Forelle</option>
                  <option value="Felche">Felche</option></select></td>
                <td data-label="Lufttemperatur (C)"><input type="number" v-model="fishLog.air_temp"  class="table_input"></input></td>
                <td data-label="Wassertemperatur (C)"><input type="number" v-model="fishLog.water_temp" class="table_input"></input></td>
                <td data-label="Grösse (cm)"><input type="number" v-model="fishLog.size" class="table_input"></input></td>
                <td class="button_col"><button class="button_table_green" @click="updateLog(  fishLog.id,
                                                                                              fishLog.species,
                                                                                              fishLog.air_temp,
                                                                                              fishLog.water_temp,
                                                                                              fishLog.size)">Speichern</button>
                <button class="button_table_red" @click="deleteLog(fishLog.id)">Löschen</button></td> <!-- Button -->
              </tr>
            </tbody>
          </table>
      </div>
    </main>
  </NuxtLayout>
</template>


<style>
.fish {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin-top: 15px;
  margin-bottom: 15px;
}

.fish div {
  text-align: center;
}

.fish_img {
  width: 100px;
  height: 60px;
  padding-left: 15px;
  padding-right: 15px;
} 

.fish_text {
  margin-top: 8px;
  font-size: 22px;
  font-weight: 700;
}

.form {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 90%;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
  margin-bottom: 15px;
  border: 5px solid #2c513c;
  border-radius: 15px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #f2f2f2;
  }
  
  select {
    width: 90%;
    height: 40px;
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid rgb(0, 0, 0);
  }

  input {
    width: 90%;
    height: 40px;
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid rgb(0, 0, 0);
  }

  /* Styling for table */
  table {
    width:90%;
    margin-left:auto;
    margin-right:auto;
  }
  
  table, td, tr, th {
    text-align: center;
  }
  
  td, tr, th {
    padding:8px;
  }

  /* Head of the table */
  th {
    background:#eee;
    font-weight: bold;
    height: 50px;
  }
  
  .button_col{
      border: none;
      background-color: white;
    }
  
  .table_input {
    height: inherit;
    text-align: center;
  }
  
  /* TABLE MOBILE VIEW */
  @media (max-width: 1200px)  {

    thead {
      display:none;
    }
  
    tr {
      width: 100%;
      margin-bottom: 3em;
    }
  
    td {
      float: left;
      width: 100%;
      padding:0.2em;
      display: flex; /* Verwenden von Flexbox */
      align-items: center; /* Vertikal zentrieren */
      flex-direction: column; /* Flex-Richtung auf Spalte setzen */
    }
  
    td::before {
      content:attr(data-label);
      word-wrap: break-word;
      background: #ffffff;
      width: 160px;
      float:left;
      font-weight: bold;
      margin-top: 15px;
      margin-bottom: 10px;
    }

    .table_input {
      width: 70%;
      text-align: center;
      margin-top: 0;
    }

    .table_block {
      background-color: #f2f2f2;
    }

    .button_col {
      padding-top: 0px;
    }
    
    .button_table_red {
      margin-bottom: 30px
    }
  } 
</style>
