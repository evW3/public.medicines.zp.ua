<template>
    <div>
        <Loader v-if="isLoading && !isReadyMap" />
        <div v-else>
            <Sidebar/>
            <Map @ready="changeIsReady"/>
        </div>
    </div>
</template>

<script>
  import Map from '@/components/Map';
  import Sidebar from "@/components/Sidebar";
  import Loader from "../components/Loader";

  export default {
      name: "Home",
      data: () => ({
          isLoading: true,
          isReadyMap: false
      }),
      async mounted() {
          Promise.all([
              this.$store.dispatch('fetchDrugs', { type: "init" }),
              this.$store.dispatch('fetchDrugTypes')
          ]).then(() => this.isLoading = false);
      },
      components: {
          Map, Sidebar, Loader
      },
      methods: {
          changeIsReady() {
              this.isReadyMap = !this.isReadyMap;
          }
      }
  }
</script>