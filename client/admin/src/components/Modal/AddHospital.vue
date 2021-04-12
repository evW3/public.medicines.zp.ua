<template>
    <div class="modal-backdrop row">
        <div class="modal-add col">
            <form @submit.prevent="onSubmit">
                <div class="modal-add__header row">
                    <span class="modal-add__header__title">Додати нову лікарню</span>
                    <button class="modal-add__close" @click="close">✖</button>
                </div>
                <div class="modal-add__body col">
                    <span class="modal-add__body__header">Індетифікатори</span>
                    <div class="modal-add__body__body col">
                        <Select />
                        <div class="modal-add__body__cards col">
                            <div class="modal-add__body__cards__inputs col">
                                <input
                                   type="text"
                                   placeholder="Назва на мапі*"
                                   v-model="tmpMapName"
                                   :class="{ 'modal-add__body__cards__inputs__name-invalid': isDirty && isInvalid }"
                                />
                                <input
                                        type="text"
                                        placeholder="Адреса*"
                                        v-model="tmpAddress"
                                        :class="{ 'modal-add__body__cards__inputs__address-invalid': isDirty && isInvalid }"
                                />
                            </div>
                            <div class="modal-add__body__position col" @click="showMap">
                                <span class="modal-add__body__position__title">Геопозиція:</span>
                                <div class="modal-add__body__position__item row">
                                    <div class="modal-add__body__position__item__lat row">
                                        <div class="modal-add__body__position__item__lat__img modal-add__img bg-def" />
                                        <span class="modal-add__body__position__item__lat__text">lat</span>
                                    </div>
                                    <span class="modal-add__body__position__item__text">{{ tmpLatLng.lat }}</span>
                                </div>
                                <div class="modal-add__body__position__item row">
                                    <div class="modal-add__body__position__item__lng row">
                                        <div class="modal-add__body__position__item__lng__img modal-add__img bg-def" />
                                        <span class="modal-add__body__position__item__lng__text">lng</span>
                                    </div>
                                    <span class="modal-add__body__position__item__text">{{ tmpLatLng.lng }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-add__footer">
                    <button type="submit">✓</button>
                </div>
            </form>
        </div>
        <Map v-if="isShowMap" @close="closeMap"/>
    </div>
</template>

<script>
    import Map from "../Map";
    import Select from "../Select";

    export default {
        name: 'modal',
        components: { Map, Select },
        data: () => ({
            isShowMap: false,
            isLoading : true,
            tmpAddress: "",
            tmpMapName: "",
            tmpLatLng: {},
            isDirty: false,
            isInvalid: false,
            name: null,
            options: ['test1','test2','test3','test4','test5','test6']
        }),
        methods: {
            close() {
                this.$emit('close');
            },
            async addName() {
                try {
                    await this.$store.dispatch('addNewName', { medicineIndex: this.idxMedicine, name: this.name });
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
                    this.isDirty = true;
                    this.invalid = true;
                    return;
                }

                const data =  { address: this.tmpAddress, mapName: this.tmpMapName, lat: this.tmpLatLng.lat || '', lng: this.tmpLatLng.lng || '' }
                await this.$store.dispatch('merge', { medicineIndex: this.idxMedicine, data });
                this.$emit('close');
            }
        }
    };
</script>

<style lang="scss">
    .modal-add__header, .modal-add__body__actions__names, .modal-add__body__position__title {
        justify-content: flex-start;
    }

    .modal-backdrop {
        position: fixed;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, .5);
    }

    .modal-add {
        background: #FFFFFF;
        width: 472px;
        height: 615px;
        overflow: hidden;
    }

    .modal-add form {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .modal-add__header {
        width: 100%;
        padding: 20px 0 0 0;
        align-items: center;
        justify-content: center;
    }

    .modal-add__header__title {
        font-family: 'AvenirNextCyr Bold';
        font-size: 20px;
    }

    .modal-add__close {
        position: absolute;
        font-size: 28px;
        right: calc(calc(100vw - 472px)/2 + 20px);
    }

    .modal-add__body {
        padding: 0 15px 0 15px;
    }

    .modal-add__body__header {
        font-size: 16px;
        margin: 0 0 23px 0;
    }

    .modal-add__body__select {
        margin-bottom: 40px;
    }

    .modal-add__body__cards {
        justify-content: space-between;
    }

    .modal-add__body__cards__inputs input {
        width: 100%;
        height: 50px;
        font-size: 18px;
        color: rgba(0, 0, 0, .5);
        padding: 15px;
        background: #FFFFFF;
        margin: 0 0 20px 0;
        border: 1px solid #D1D1D1;
    }

    .modal-add__body__cards__inputs input::placeholder {
        color: rgba(0, 0, 0, .5);
    }

    .modal-add__body__cards__inputs__name-invalid, .modal-add__body__cards__inputs__address-invalid {
        border: 1px solid #F44336 !important;
    }

    .modal-add__body__position {
        padding: 16px 16px 20px 16px;
        align-items: center;
        border: 1px solid;
    }

    .modal-add__body__position__title {
        font-family: 'AvenirNextCyr Bold';
        font-size: 16px;
        margin: 0 0 20px 0;
    }

    .modal-add__body__position__item {
        width: 100%;
        height: 50px;
        border: 1px solid;
        align-items: center;
    }

    .modal-add__body__position__item:last-child {
        margin: 20px 0 0 0;
    }

    .modal-add__body__position__item__lat, .modal-add__body__position__item__lng {
        width: 70px;
        height: 100%;
        border-right: 1px solid;
        align-items: center;
        padding: 0 0 0 5px;
    }

    .modal-add__img {
        width: 25px;
        height: 25px;
        background-size: 21px 20px;
        margin: 0;
        background-image: url('../../assets/imgs/icons/adminPanel/lat.svg');
    }

    .modal-add__body__position__item__lat__text, .modal-add__body__position__item__lng__text {
        font-size: 14px;
        margin-left: 10px;
    }

    .modal-add__body__position__item__text {
        font-size: 14px;
        padding-left: 10px;
    }

    .modal-add__body__position__item__lng__img {
        transform: rotate(90deg);
    }

    .modal-add__footer {
        width: 100%;
        height: 60px;
        margin: 10px 0 0 0;
    }

    .modal-add__footer button {
        width: 100%;
        height: 100%;
        color: #fff;
        background-color: #2B48FF;
        font-family: 'AvenirNextCyr Bold';
        font-size: 30px;
    }

    @media (min-width: 300px) and (max-width: 899px) {

        .modal-add__header__title {
            font-size: 16px;
        }

        .modal-add {
            height: 100%;
            width: 100%;
        }

        .modal-add__close {
            right: 15px;
        }

        .modal-add__footer {
            height: 48px;
        }
    }

</style>