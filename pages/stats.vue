<!--Scrpit to hide behind Login-->
<script setup>
  import Header from '../components/Header'
  import Footer from '../components/Footer'

  definePageMeta({
     middleware: 'auth'
     })

  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  // LOAD DATA FROM DB
  // Load Log Data from DB
  const fish_log_Array = ref([])
  const speciesCount = ref({})
  const largestFish = ref({})
  const smallestFish = ref({})
  const loaded = ref(false)  // für v-if zum checken ob Daten geladen sind

  const loadFishLogs = async () => {
    const { data: fishLogData } = await supabase
      .from('fishlog')
      .select('*')
      .eq('user_id', user.value.id)
    if (fishLogData) {
      fish_log_Array.value = fishLogData.map(fishLog => ({
        id: fishLog.id,
        created_at: fishLog.created_at,
        species: fishLog.species,
        air_temp: fishLog.air_temp,
        water_temp: fishLog.water_temp,
        size: fishLog.size,
      }));

      // Counting species
      speciesCount.value = fish_log_Array.value.reduce((count, log) => {
        count[log.species] = (count[log.species] || 0) + 1;
        return count;
      });

      // Largest Fish
      largestFish.value = fish_log_Array.value.reduce((largest, log) => {
        if (!largest.size || log.size > largest.size) {
          return log;
        }
        return largest;
      });

      // Smallest Fish
      smallestFish.value = fish_log_Array.value.reduce((smallest, log) => {
        if (!smallest.size || log.size < smallest.size) {
          return log;
        }
        return smallest;
      });

      //console.log("loaded data..")
    } else {
      console.log("data is null")
    }
    loaded.value = true
  };
  // Fetch data
  loadFishLogs()
 
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
  loadAvgSizes()

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
  loadSpeciesCount()
</script>

<template> 
  <Header />
    <main>
        <h1>Deine Achievments</h1>
        <article class="stats" v-if="loaded">
          <!-- Largest Fish -->  
          <div class = "stats_box">
            <h2 class="fish_text">Grösster Fisch</h2>
            <img :src="`img/${largestFish.species.toLowerCase()}.svg`" class="fish_img" :alt="largestFish.species">
            <p class="fish_text">{{ largestFish.species}}</p> 
            <p class="fish_text">{{ largestFish.size}} cm</p> 
          </div>
          <!-- Smallest Fish -->  
          <div class = "stats_box">
            <h2 class="fish_text">Kleinster Fisch</h2>
            <img :src="`img/${smallestFish.species.toLowerCase()}.svg`" class="fish_img" :alt="smallestFish.species">
            <p class="fish_text">{{smallestFish.species}}</p>  
            <p class="fish_text">{{smallestFish.size}} cm</p>
          </div>
          <!-- Most caught species -->
          <div class = "stats_box">
            <h2 class="fish_text">Am meisten gefangen</h2>
            <img :src="`img/${most_species_dict.species.toLowerCase()}.svg`" class="fish_img" :alt="most_species_dict.species">
            <p class="fish_text">{{most_species_dict.species}}</p>  
            <p class="fish_text">{{most_species_dict.count}}</p>
          </div>
          <!-- Least caught species -->
          <div class = "stats_box">
            <h2 class="fish_text">Am wenigsten gefangen</h2>
            <img :src="`img/${least_species_dict.species.toLowerCase()}.svg`" class="fish_img" :alt="least_species_dict.species">
            <p class="fish_text">{{least_species_dict.species}}</p>  
            <p class="fish_text">{{least_species_dict.count}}</p>
          </div>
        </article>
        <!-- wird aktuell nicht ausgeführt da das Laden zu schnell geht um die Meldung lesen zu können
        <article class="stats" v-else>
          <h2>Daten werden geladen...</h2>
        </article>-->
        
        <!-- Average size per species -->
        <div>
          <h2>Durchschnittliche Grössen</h2>
        </div>
        <article class="stats">
          <div class="stats_box_small" v-for="(species, index) in avg_sizes_dict" :key="index">
            <img :src="`img/${species.species.toLowerCase()}.svg`" class="fish_img" :alt="species.species">
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
