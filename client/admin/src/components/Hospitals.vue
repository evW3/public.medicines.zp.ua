<template>
    <div class="hospitals">
        <div
            class="hospitals__item col"
            v-for="(h, idx) in hospitals"
            :key="h.id"
        >
            <div class="hospitals__title row">
                <div class="hospitals__title-img" />
                <span class="hospitals__title-text" :title="h.primaryName">{{ h.primaryName }}</span>
            </div>
            <div v-if="isEmpty(h)" class="hospitals__empty col">
                <div class="hospitals__empty-img bg-def" />
                <span class="hospitals__empty-text">Потрібно відредагувати дані</span>
            </div>
            <div v-else class="hospital-info col">
                <div class="hospital-info__card col">
                    <div class="hospital-info__item row">
                        <div class="hospital-info__item-img bg-def" />
                        <span>Ім’я на мапі:</span>
                    </div>
                    <span class="hospital-info__lng-text">{{ h.markerName }}</span>
                </div>
                <div class="hospital-info__card col">
                    <div class="hospital-info__item row">
                        <div class="hospital-info__item-img bg-def" />
                        <span>Адреса:</span>
                    </div>
                    <span class="hospital-info__address-text">{{ h.markerAddress }}</span>
                </div>
            </div>
            <button class="hospitals__button" @click="showModal(idx)">Відредагувати</button>
        </div>
        <Modal
            v-if="isModalActive"
            class="hospitals__modal"
            :isEditMode="true"
            :idx-medicine="indexMedicine"
            @close="showModal"
        />
    </div>
</template>

<script>
    import Modal from "./Modal/Modal";
    import { mapGetters } from 'vuex'

    export default {
        name: "Hospitals",
        data: () => ({
            indexMedicine: null,
            isModalActive: false
        }),
        computed: {
            ...mapGetters(['hospitals'])
        },
        methods: {
            isEmpty(hospital) {
                return !(hospital.lat && hospital.lng && hospital.markerAddress && hospital.markerName);
            },
            async showModal(idx = null) {
                this.indexMedicine = idx;
                idx !== null && await this.$store.dispatch('fetchHospitalNames', this.hospitals[idx].id); // not there, but for now OK
                this.isModalActive = !this.isModalActive;
            }
        },
        components: { Modal }
    }
</script>

<style lang="scss">
    .hospitals {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-column-gap: 39px;
        grid-row-gap: 39px;
        height: 100%;
        &__item {
            width: 100%;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            background-color: #fff;
            box-shadow: 0 4px 14px rgba(0, 0, 0, .17);
        }
        &__title {
            margin-bottom: 30px;
        }
        &__title-img {
            width: 22px;
            height: 20px;
            margin: 0 10px 0 0;
            align-items: center;
            background-image: url('../assets/imgs/icons/adminPanel/hospital.svg');
            background-size: 22px 20px;
        }
        &__title-text {
            font-family: 'AvenirNextCyr Bold';
            width: 230px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 14px;
        }
        &__empty {
            align-items: center;
            margin-bottom: 20px;
        }
        &__empty-img {
            width: 80px;
            height: 62px;
            background-image: url('../assets/imgs/icons/adminPanel/warning.svg');
            background-size: 73px 62px;
            margin: 0 0 20px 0;
        }
        &__empty-text {
            font-family: 'AvenirNextCyr Medium';
        }
        &__button {
            width: 100%;
            height: 35px;
            color: #fff;
            background-color: #2B48FF;
            margin: 20px 0 0 0;
        }
    }

    .hospital-info {
        width: 100%;
        &__card {
            margin: 0 0 15px 0;
        }
        &__card:last-child {
            margin: 0;
        }
        &__item {
            margin: 0 0 10px 0;
            align-items: center;
        }
        &__item-img {
            width: 21px;
            height: 27px;
            margin: 0 15px 0 0;
            background-image: url('../assets/imgs/icons/adminPanel/marker.svg');
            background-size: 21px 27px;
        }
        &__item span {
            font-family: 'AvenirNextCyr Medium';
        }
    }
    @media (min-width:768px) and (max-width: 1081px) {
        .hospitals {
            grid-template-columns: 1fr 1fr;
        }
    }

    @media (min-width: 425px) and (max-width: 768px) {
        .hospitals {
            grid-template-columns: 1fr 1fr;
        }
    }

    @media (min-width: 300px) and (max-width: 425px) {
        .hospitals {
            grid-template-columns: 1fr;
        }
    }
</style>