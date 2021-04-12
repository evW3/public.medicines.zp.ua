<template>
    <div class="medicine-name row" :class="{'medicine-name_active': isActive }">
        <label class="medicine-name__delete" v-if="!isActive && !isEdit" @click="deleteId">✖</label>
        <label class="bg-def medicine-name__img" v-if="!isActive && !isEdit" @click="edit"/>
        <input
                :readonly="isActive || !isEdit"
                class="medicine-name__input"
                :class="{ 'medicine-name__input_active': isActive }"
                v-model="nameToEdit"
        />
        <label class="medicine-name__confirm" v-if="!isActive && isEdit" @click="save">✓</label>
    </div>
</template>

<script>
    import Input from "../Input";
    export default {
        name: "Medicine-name",
        components: {Input},
        props: { name: String, nameBdId: Number, nameId: Number, isActive: Boolean },
        data: () => ({
            isEdit: false,
            nameToEdit: null
        }),
        mounted() {
          this.nameToEdit = this.name;
        },
        methods: {
            edit() { this.isEdit = !this.isEdit },

            async deleteId() {
                await this.$store.dispatch('deleteHospitalName', { id: this.nameBdId, nameId: this.nameId });
            },

            async save() {
                if(this.name !== this.nameToEdit) {
                    await this.$store.dispatch('changeName', { id: this.nameBdId, nameId: this.nameId, name: this.nameToEdit });
                } else {
                    this.isEdit = !this.isEdit;
                }
            }
        }
    }
</script>

<style lang="scss">
    .medicine-name {
        border: 1px solid #000000;
        width: 380px;
        height: 50px;
        align-items: center;
        justify-content: flex-start;
        padding: 10px;
        margin: 0 0 20px 0;
    }

    .medicine-name:last-child {
        margin: 0;
    }

    .medicine-name_active {
        border: 1px solid #2B48FF;
    }

    .medicine-name__img {
        width: 50px;
        height: 50px;
        background-image: url('../../assets/imgs/icons/adminPanel/pancil.svg');
        background-size: 20px 20px;
    }

    .medicine-name__delete {
        font-size: 30px;
    }

    .medicine-name__input {
        font-family: 'AvenirNextCyr Bold';
        font-size: 15px;
        width: 100%;
        height: 100%;
    }

    .medicine-name__confirm {
        font-size: 30px;
        color: #1ABB5B;
    }

    .medicine-name__input_active {
        color: #2B48FF;
    }

    @media (min-width: 300px) and (max-width: 899px) {
        .medicine-name {
            border: 1px solid #000000;
            width: 278px;
            height: 40px;
            align-items: center;
            justify-content: flex-start;
            padding: 10px;
            margin: 0 0 20px 0;
        }
    }

</style>