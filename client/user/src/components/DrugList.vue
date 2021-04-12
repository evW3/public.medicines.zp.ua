<template>
    <div @scroll="onScroll" class="drug-list">
        <DrugItem
            v-for="d in drugs"
            :key="d.id"
            :params="d"
        />
        <Loader v-if="drugLoading" class="drug-list__loading"/>
    </div>
</template>

<script>
    import { mapGetters } from "vuex"
    import DrugItem from "@components/DrugItem";
    import Loader from "@components/Loader";

    export default {
        name: "Drugs",
        components: { Loader, DrugItem },
        computed: {
            ...mapGetters(['drugs']),
            ...mapGetters(['drugLoading'])
        },
        methods: {
            async onScroll(e) {
                if(e.target.scrollHeight - 800 < e.target.scrollTop && !this.drugLoading) {
                    await this.$store.dispatch('fetchDrugs');
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .drug-list {
        height: 100%;
        overflow-y: auto;
        &__loading {
            width: 100%;
            height: 70px;
        }
    }
</style>