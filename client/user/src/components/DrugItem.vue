<template>
    <div class="drug row" :class="{ 'drug_active': params.id === currentDrugId }" @click="changeIsActive">
        <div class="drug__icon bg-def" :class="[`drug__icon_${ params.type }`, `${ params.type}`]"/>
        <div class="drug__description col">
            <span class="drug__title" :title="params.name">{{ params.name }}</span>
            <span class="drug__type">{{ params.typeName }}</span>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex"

    export default {
        name: "DrugItem",
        props: { params: Object },
        computed: {
            ...mapGetters(['currentDrugId'])
        },
        methods: {
            async changeIsActive() {
                if(this.params.id !== this.currentDrugId) {
                    this.$store.commit('setCurrentDrugId', this.params.id);
                    await this.$store.dispatch('fetchHospitalByDrug', {
                        drugId: this.params.id,
                        typeName: this.params.typeName
                    });
                }
            }
        }
    }
</script>

<style lang="scss">
    .drug {
        width: 100%;
        height: 70px;
        justify-content: flex-start;
        align-items: center;
        background-color: white;
        padding: 10px 0 10px 0;
        font-size: 15px;

        &:hover {
            background-color: $hover;
            transition: 0.4s;
            cursor: pointer;
        }

        &__icon {
            width: 50px;
            height: 50px;
            margin: 0 20px 0 20px;
            background-size: 50px 50px;
        }

        &__description {
            justify-content: center;
            align-items: flex-start;
        }

        &__title {
            font-family: 'AvenirNextCyr Medium';
            width: 220px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 15px;
        }

        &__type {
            color: $dark;
        }
    }

    .drug_active {
        background-color: $active;
        transition: .4s;
        cursor: pointer;
        &:hover {
            background-color: $active;
        }
    }

    .drug__icon_CAPSULE {
        background-size: 45px 45px;
    }

    .drug__icon_BLISTER, .drug__icon_SPRAY,
    .drug__icon_SYRINGE, .drug__icon_VACCINE,
    .drug__icon_UNKNOWN {
        background-size: 40px 45px;
    }

    .drug__icon_OINTMENT {
        background-size: 40px 40px;
    }

</style>