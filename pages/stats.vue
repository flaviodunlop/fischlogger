<!--Scrpit to hide behind Login-->
<script setup>
  import Header from '../components/Header'
  import Footer from '../components/Footer'

  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  
  const fishStore = useFishStore()
  const { loadFishLogs } = fishStore
  const { largestFish, smallestFish  } = storeToRefs(fishStore)

  // Fetch data
  await useAsyncData('loadFishLogs', async () => {
    return loadFishLogs()}
  )

  // Average size per species
  const avg_sizes_dict = ref({})

  const loadAvgSizes = async () => {
    const { data: data_avgSizes } = await supabase
      .from('fishlog')
      .select('avgPerSpecies: size.avg(), species')
      .eq('user_id', user.value.id)
    if (data_avgSizes) {
      avg_sizes_dict.value = data_avgSizes.map(data => ({
        avgSizeSpecies: data.avgPerSpecies,
        species: data.species,
      }));
    }
  }
  await useAsyncData('loadAvgSizes', async () => {
    return loadAvgSizes()}
  )
  // Load Species Count
  // mit einer View direkt in Supabase gelöst
  // liefert die Anzahl gefangener Fische pro Spezies pro User in abstiegender Reihenfolge
  const least_species_dict = ref({})
  const most_species_dict = ref({})

  const loadSpeciesCount = async () => {
    const { data } = await supabase
      .from('species_count') // View in Supabase
      .select('*')
      .eq('user_id', user.value.id)

      let least_species = data[0]
      let most_species = data[data.length - 1]

      least_species_dict.value = {
          species: least_species.species,
          count: least_species.count,
        };

      most_species_dict.value = {
          species: most_species.species,
          count: most_species.count,
        }
  }
  await useAsyncData('loadSpeciesCount', async () => {
    return loadSpeciesCount()}
  )
</script>

<template> 
  <Header />
    <main>
        <h1>Deine Achievments</h1>
        <article class="stats">
          <!-- Largest Fish -->  
          <div class = "stats_box">
            <h2 class="fish_text">Grösster Fisch</h2>
            <img :src="`img/${largestFish.species}.svg`" class="fish_img" :alt="largestFish.species">
            <p class="fish_text">{{ largestFish.species}}</p> 
            <p class="fish_text">{{ largestFish.size}} cm</p> 
          </div>
          <!-- Smallest Fish -->  
          <div class = "stats_box">
            <h2 class="fish_text">Kleinster Fisch</h2>
            <img :src="`img/${smallestFish.species}.svg`" class="fish_img" :alt="smallestFish.species">
            <p class="fish_text">{{smallestFish.species}}</p>  
            <p class="fish_text">{{smallestFish.size}} cm</p>
          </div>
          <!-- Most caught species -->
          <div class = "stats_box">
            <h2 class="fish_text">Am meisten gefangen</h2>
            <img :src="`img/${most_species_dict.species}.svg`" class="fish_img" :alt="most_species_dict.species">
            <p class="fish_text">{{most_species_dict.species}}</p>  
            <p class="fish_text">{{most_species_dict.count}}</p>
          </div>
          <!-- Least caught species -->
          <div class = "stats_box">
            <h2 class="fish_text">Am wenigsten gefangen</h2>
            <img :src="`img/${least_species_dict.species}.svg`" class="fish_img" :alt="least_species_dict.species">
            <p class="fish_text">{{least_species_dict.species}}</p>  
            <p class="fish_text">{{least_species_dict.count}}</p>
          </div>
        </article>
    
        <!-- Average size per species -->
        <div>
          <h2>Durchschnittliche Grössen</h2>
        </div>
        <article class="stats">
          <div class="stats_box_small" v-for="(species, index) in avg_sizes_dict" :key="index">
            <img :src="`img/${species.species}.svg`" class="fish_img" :alt="species.species">
            <p class="fish_text">{{ species.species }}</p>
            <p class="fish_text">{{ Math.round(species.avgSizeSpecies) }} cm</p>
          </div>
        </article>
        <!--LINK ZUM LOGGER-->
        <div style="margin-top: 30px; margin-bottom: 30px;" class="stats">
          <!-- NuxtLink für die Navigation zur anderen Seite -->
          <NuxtLink to="/logger" class="button_table_green">Neuen Fisch loggen</NuxtLink>
        </div>
    </main>
  <Footer /> 
</template>

<script>
</script>
