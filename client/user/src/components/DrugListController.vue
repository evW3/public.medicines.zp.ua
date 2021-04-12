<template>
    <div class="control-panel">
        <label class="control-panel__icon control-panel__search bg-def"/>
        <input
            @input="onInput"
            type="text"
            placeholder="Пошук..."
            class="control-panel__input"
            v-model="search"
        >
        <button class="control-panel__icon control-panel__filter bg-def " @click="changeIsModal"/>
    </div>
    <ModalFilter v-if="isModalShow" @close="changeIsModal" />
</template>

<script>
    import ModalFilter from "@components/ModalFilter";
    import debounce from "lodash.debounce";

    export default {
        name: "DrugListController",
        components: { ModalFilter },
        data: () => ({
            search: null,
            isModalShow: false,
        }),
        methods: {
            changeIsModal() {
                this.isModalShow = !this.isModalShow;
            },
            onInput: debounce(async function() {
                await this.$store.dispatch('fetchDrugs', { type: 'search', search:this.search });
            }, 1000)
        }
    }
</script>

<style lang="scss">
    .control-panel {
        width: 100%;
        height: 50px;
        display: flex;
        border-top: 1px solid $border-sidebar;
        &__icon {
            width: 50px;
            height: 100%;
        }
        &__search {
            background-image: url('../assets/imgs/icons/drugList/search.svg');
            background-size: 22px 21px;
        }
        &__input {
            height: 50px;
            width: calc(100% - 100px);
        }
        &__filter {
            background-image: url('../assets/imgs/icons/drugList/filter.svg');
            background-size: 22px 20px;
        }
    }
</style>