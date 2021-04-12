<template>
    <div class="checkbox row">
        <input
            type="checkbox"
            @input="checked"
            :id="typeInfo.type"
            class="checkbox__input"
        />
        <div
            class="checkbox__image bg-def"
            :class="[`checkbox__image_${ typeInfo.type }`, `${ typeInfo.type }`]"
        />
        <label :for="typeInfo.type" class="checkbox__label">
            {{ typeInfo.name }}
        </label>
    </div>
</template>

<script>
    export default {
        name: "Checkbox",
        props: { typeInfo: Object },
        methods: {
            checked() {
                this.$emit("checked", this.typeInfo.type);
            }
        }
    }
</script>

<style scoped lang="scss">
    .checkbox {
        align-items: center;
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 0;
        }

        &__input {
            width: 16px;
            height: 16px;
            border: 1px solid $confirm;
            margin: 0 10px 0 0;
            cursor: pointer;
        }

        &__input[checked] {
            background-color: $confirm;
        }

        &__image {
            width: 45px;
            height: 45px;
            margin: 0 18px 0 18px;
            background-size: 45px 45px;
        }

        &__label {
            margin: 0 0 0 10px;
            font-size: 18px;
        }

        &__image_BLISTER, &__image_SPRAY,
        &__image_SYRINGE, &__image_VACCINE,
        &__image_UNKNOWN, &__image_PACKAGING,
        &__image_CAPSULE {
            background-size: 30px 35px;
        }

        &__image_OINTMENT {
            background-size: 30px 30px;
        }
    }
</style>