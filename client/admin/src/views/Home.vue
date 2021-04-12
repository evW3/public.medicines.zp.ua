<template>
  <div class="home">
      <Hospitals />
  </div>
</template>

<script>
import ProjectName from "../components/ProjectName";
import Hospitals from "../components/Hospitals";

export default {
    name: 'Home',
    components: {
        ProjectName, Hospitals
    },
    data: () => ({
        hospitals: null,
    }),
    async beforeMount() {
        await this.$store.dispatch('hospitalsFetchInfo');
    }
}
</script>

<style lang="scss">
    .home {
        width: 100%;
        height: 100vh;
        padding: 30px;
        overflow-y: auto;
    }

    @media (max-width: 899px) {
        .home {
            height: calc(100vh - 70px);
            padding: 20px 10px;
        }
    }

</style>
