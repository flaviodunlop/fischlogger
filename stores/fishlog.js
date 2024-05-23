export const useFishStore = defineStore('fishStore',() => {
    const fish_log_Array = ref({})
    const speciesCount = ref({})
    const largestFish = ref({})
    const smallestFish = ref({})

    async function loadFishLogs() {
        const supabase = useSupabaseClient()
        const user = useSupabaseUser()
        const { data: fishLogData } = await supabase
        .from('fishlog')
        .select('*')
        .eq('user_id', user.value.id)
        .order('created_at', { ascending: false })
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
      })

      } else {
        console.log("data is null")
      }
    }
    return { loadFishLogs, fish_log_Array, speciesCount, largestFish, smallestFish}
  })
  