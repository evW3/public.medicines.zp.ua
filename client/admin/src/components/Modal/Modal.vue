<template>
    <div class="modal-backdrop row">
        <div class="modal col">
            <form @submit.prevent="onSubmit">
                <div class="modal__header row">
                    <span  class="modal__title">Відредагувати</span>
                    <button class="modal__close" @click="close">✖</button>
                </div>
                <div class="modal-content col">
                    <span class="modal-content__header">Індетифікатори:</span>
                    <div class="modal-content__body row">
                        <div class="modal-content__actions col">
                            <div class="modal-content__names col" v-if="!isLoading">
                                <MedicineNames
                                    :is-active="true"
                                    :name="currentHospital.primaryName"
                                />
                                <MedicineNames
                                    v-for="(i, idx) in hospitalNames"
                                    :key="i.name"
                                    :name="i.name"
                                    :name-bd-id="i.id"
                                    :name-id="idx"
                                    :is-active="false"
                                />
                            </div>
                            <div class="modal-content__create row">
                                <input type="text" v-model="name">
                                <button type="button" @click="addName">+</button>
                            </div>
                        </div>
                        <div class="modal-content__cards col">
                            <div class="modal-content__inputs">
                                <input
                                   type="text"
                                   placeholder="Назва на мапі*"
                                   v-model="tmpMapName"
                                   :class="{ 'invalid': !tmpMapName.trim() }"
                                />
                                <input
                                   type="text"
                                   placeholder="Адреса*"
                                   v-model="tmpAddress"
                                   :class="{ 'invalid': !tmpAddress.trim() }"
                                />
                            </div>
                            <div class="position col" @click="showMap">
                                <span class="position__title">Геопозиція</span>
                                <div class="position__item row">
                                    <div class="position__lat row">
                                        <div class="position-icon bg-def" />
                                        <span class="position__text">lat</span>
                                    </div>
                                    <span class="position__coordinates">{{ tmpLatLng.lat }}</span>
                                </div>
                                <div class="position__item row">
                                    <div class="position__lng row">
                                        <div class="position__lng-img position-icon bg-def" />
                                        <span class="position__text">lng</span>
                                    </div>
                                    <span class="position__coordinates">{{ tmpLatLng.lng }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal__footer">
                    <button type="submit">✓</button>
                </div>
            </form>
        </div>
        <Map v-if="isShowMap" @close="closeMap"/>
    </div>
</template>

<script>
    import Input from "../Input";
    import MedicineNames from "./MedicineNames";
    import Map from "../Map";

    import { mapGetters } from 'vuex';

    export default {
        name: 'modal',
        components: { Input, MedicineNames, Map },
        props: { idxMedicine: Number },
        data: () => ({
            isShowMap: false,
            currentHospital : null,
            isLoading : true,
            tmpAddress: null,
            tmpMapName: null,
            tmpLatLng: {},
            name: null
        }),
        computed: {
            ...mapGetters(['hospitals']),
            ...mapGetters(['hospitalNames'])
        },
        async beforeMount() {
            this.currentHospital = this.hospitals[this.idxMedicine];
            this.isLoading = false;
            this.tmpAddress = this.currentHospital.markerAddress || '';
            this.tmpMapName = this.currentHospital.markerName || '';
            this.tmpLatLng = {lat: this.currentHospital.lat, lng: this.currentHospital.lng };
        },
        methods: {
            close() {
                this.$emit('close');
            },
            async addName() {
                try {
                    await this.$store.dispatch('createHospitalName', { hospitalId: this.hospitals[this.idxMedicine].id, name: this.name });
                } catch (e) {
                    console.log(e);
                }
            },
            showMap() {
                this.isShowMap = !this.isShowMap;
            },
            closeMap(latLng) {
                !!latLng?.lng ? this.tmpLatLng = latLng : null;
                this.showMap();
            },
            async onSubmit() {

                if (!(this.tmpAddress.trim() && this.tmpMapName.trim())) {
                    return;
                }

                const data =  { markerAddress: this.tmpAddress, markerName: this.tmpMapName, lat: this.tmpLatLng.lat || 0.0, lng: this.tmpLatLng.lng || 0.0 }
                await this.$store.dispatch('merge', { medicineIndex: this.idxMedicine, data });
                this.$emit('close');
            }
        }
    };
</script>

<style lang="scss">
    .modal-backdrop {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        justify-content: center;
        align-items: center;
        right: 0;
        background-color: rgba(0, 0, 0, .5);
    }

    .modal {
        background: #FFFFFF;
        width: 951px;
        height: 593px;
        overflow: hidden;
        ::-webkit-scrollbar {
            width: 4px;
            background: #DCDCDC;
        }

        ::-webkit-scrollbar-thumb {
            background: #BFBFBF;
            border-radius: 3px;
        }
        form {
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            overflow-y: auto;
            overflow-x: hidden;
        }
        &__header {
            width: 100%;
            padding: 20px 0 0 0;
            align-items: center;
            justify-content: center;
        }
        &__title {
            font-family: 'AvenirNextCyr Bold';
            font-size: 22px;
            width: 100%;
            text-align: center;
        }
        &__close {
            position: relative;
            font-size: 28px;
            right: 15px;
        }
        &__footer {
            width: 100%;
            height: 60px;
            margin: 10px 0 0 0;
            button {
                width: 100%;
                height: 100%;
                color: #fff;
                background-color: #2B48FF;
                font-family: 'AvenirNextCyr Bold';
                font-size: 30px;
            }
        }
    }

    .modal-content {
        padding: 0 18px 0 35px;
        margin: 15px 0 0 0;
        &__header {
            font-size: 18px;
            margin: 0 0 23px 0;
        }
        &__names {
            overflow-y: auto;
            height: 330px;
            margin: 0 0 20px 0;
            padding: 0 13px 0 0;
            ::-webkit-scrollbar {
                width: 4px;
            }
        }
        &__create {
            border: 1px solid #000000;
            width: 380px;
            height: 50px;
            align-items: center;
            justify-content: space-between;
            overflow: hidden;
            input {
                font-family: 'AvenirNextCyr Bold';
                font-size: 15px;
                width: 310px;
                margin: 0 0 0 10px;
                height: 100%;
            }
            button {
                font-size: 33px;
                width: 50px;
                height: 50px;
                color: #fff;
                background: #1ABB5B;
                cursor: pointer;
            }
        }
        &__cards {
            padding: 0 20px 0 20px;
            justify-content: space-between;
        }
        &__inputs {
            padding: 0 30px 0 30px;
            input {
                font-size: 18px;
                width: 396px;
                height: 50px;
                padding: 15px;
                background: #FFFFFF;
                margin: 0 0 20px 0;
                border: 1px solid #D1D1D1;
            }
            .invalid {
                border: 1px solid #F44336!important;
            }
        }
    }

    .position {
        padding: 30px;
        border: 1px solid;
        cursor: pointer;
        &__title {
            font-family: 'AvenirNextCyr Medium';
            font-size: 18px;
            text-align: center;
            margin: 0 0 20px 0;
        }
        &__item {
            width: 396px;
            height: 50px;
            border: 1px solid;
            align-items: center;
            &:last-child {
                margin: 20px 0 0 0;
            }
        }
        &__lat, &__lng {
            width: 100px;
            height: 100%;
            border-right: 1px solid;
            align-items: center;
            padding: 10px;
        }
        &-icon {
            width: 30px;
            height: 30px;
            background-size: 30px 30px;
            margin: 0 10px 0 0;
            background-image: url('../../assets/imgs/icons/adminPanel/lat.svg');
        }
        &__text {
            font-size: 18px;
        }
        &__coordinates {
            font-size: 18px;
            margin: 0 0 0 16px;
        }
        &__lng-img {
            transform: rotate(90deg);
        }
    }

    @media (min-width: 300px) and (max-width: 899px) {
        .modal {
            height: 100%;
            width: 100%;
            &__title {
                font-size: 16px;
            }
            &__footer {
                height: 48px;
            }
        }

        .modal-content {
            &__header {
                display: none;
            }
            &__body {
                flex-direction: column; //important
            }
            &__actions {
                align-items: center;
            }
            &__names {
                overflow-y: auto;
                height: auto;
                max-height: 160px;
                margin: 0 0 20px 0;
                padding: 0 13px 0 0;
            }
            &__create {
                width: 278px;
                height: 40px;
                margin: 0 17px 0 0;
                button {
                    width: 40px;
                    height: 40px;
                    font-size: 28px;
                }
                input {
                    width: 226px;
                }
            }
            &__cards {
                align-items: center;
                margin: 25px 0 0 0;
            }
            &__inputs {
                padding: 0 17px 0 0;
                display: flex;
                flex-direction: column;
                input {
                    font-size: 14px;
                    width: 278px;
                    height: 40px;
                }
            }
        }

        .position {
            padding: 16px;
            align-items: center;
            margin: 0 17px 0 0;
            &__title {
                font-size: 16px;
            }
            &__item {
                width: 245px;
                height: 40px;
            }
            &__lat, &__lng {
                width: 70px;
                padding: 0 0 0 5px;
            }
            &-icon {
                width: 25px;
                height: 25px;
                background-size: 21px 20px;
                margin: 0;
            }
            &__text {
                font-size: 14px;
                margin-left: 10px;
            }
            &__coordinates {
                font-size: 14px;
            }
        }
    }

</style>