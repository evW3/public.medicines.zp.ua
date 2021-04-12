<template>
    <div class="modal-backdrop">
        <div class="modal">
            <div class="modal__header row">
                <span class="modal__title">Фильтр</span>
            </div>
            <div class="modal__body col">
                <span class="modal__type-title">По типу лекарства:</span>
                <div class="modal__type-content col">
                    <Checkbox
                        v-for="type in drugTypes"
                        :key="type.type"
                        :typeInfo="type"
                        @checked="filterChoice"
                    />
                </div>
            </div>
            <div class="modal__footer row">
                <button class="modal__btn modal__save" @click="saveFilter">Сохранить</button>
                <button class="modal__btn" @click="close">Отменить</button>
            </div>
        </div>
    </div>
</template>

<script>
    import Checkbox from "@components/Checkbox";
    import { mapGetters } from 'vuex';

    export default {
        name: 'Modal',
        data: () => ({
            filterOptions: {},
        }),
        components: { Checkbox },
        computed: {
            ...mapGetters(['drugTypes'])
        },
        mounted() {
            this.drugTypes.forEach(t => this.filterOptions[t.type] = false);
        },
        methods: {
            close() {
                this.$emit('close');
            },

            filterChoice(value) {
                this.filterOptions[value] = !this.filterOptions[value];
            },

            async saveFilter() {
                let filterArray = [];
                Object.entries(this.filterOptions).forEach(([key, value]) => value && filterArray.push(key));
                await this.$store.dispatch('fetchDrugs', { type: 'filter', filter: filterArray });
                this.$emit('close');
            }
        },
    };
</script>

<style lang="scss">

    .modal-backdrop {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: $dark;
        display: flex;
        z-index: 500;
        justify-content: center;
        align-items: center;
    }

    .modal {
        background-color: white;
        width: 320px;
        box-sizing: border-box;
        height: 420px;
        overflow-x: hidden;
        display: flex;
        padding: 20px;
        flex-direction: column;
        &__header {
            justify-content: center;
        }
        &__title {
            font-family: 'AvenirNextCyr Bold';
            font-size: 21px;
            color: $blue;
        }
        &__body {
            height: 100%;
            overflow: hidden;
        }
        &__type-title {
            font-size: 18px;
            margin-top: 10px;
            margin-bottom: 10px;
        }
        &__type-content {
            overflow-y: scroll;
            width: 100%;
            border-bottom: .5px solid $border-sidebar;
            border-top: .5px solid $border-sidebar;
            padding: 10px 0 10px 10px;
            box-sizing: border-box;
            justify-content: flex-start;
            overflow-x: hidden;
            height: 100%;
        }
        &__footer {
            width: 100%;
            height: 45px;
            justify-content: space-between;
            margin: 10px 0 0 0;
        }
        &__btn {
            width: 40%;
            height: 35px;
            background-color: $another-ligth;
            cursor: pointer;
        }
        &__save {
            background-color: $blue;
            color: white;
        }
    }

    @media(max-width: 490px) {
        .modal-backdrop {
            justify-content: center;
            align-items: flex-end;
        }

        .modal {
            width: 100%;
            height: 80%;
        }
    }

</style>