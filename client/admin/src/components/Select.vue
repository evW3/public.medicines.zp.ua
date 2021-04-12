<template>
    <div class="select">
        <div class="select__header">
            <span class="select__type">Назва індетифікатора</span>
            <div
                class="select__arrow bg-def"
                @click="controlOptions"
                :class="{ 'select__arrow_active':isShowOptions }"
            />
        </div>
        <div class="select__options" v-show="isShowOptions">
            <span
                class="select__option"
                v-for="option in options"
                :title="option"
            >{{ option }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Select",
        data: () => ({
            options:
            [
                'Повседневная практика',
                'в значительной степени обуславливает647547 57 567 54353453453 53 ',
                'начало повседневной',
                'информационно-техническое',
                'развитие различных форм деятельности',
                'соответствующих условий активизации.',
            ],
            isShowOptions: false
        }),
        methods: {
            controlOptions() {
                this.isShowOptions = !this.isShowOptions;
            }
        }
    }
</script>

<style lang="scss">
    .select {
        width: 100%;
        height: 50px;
        border: 1px solid #D1D1D1;
        align-items: center;
        justify-content: center;
        margin: 0 0 20px 0;
        &__header {
            display: flex;
            align-items: center;
            padding: 10px 15px;
            justify-content: space-between;
        }
        &__type,  &__option {
            color: rgba(0, 0, 0, .5);
            font-size: 18px;
        }
        &__arrow {
            width: 30px;
            background-image: url('../assets/imgs/icons/select/arrow.svg');
            height: 30px;
            background-size: 20px 20px;
            transform: rotate(-90deg);
        }
        &__arrow_active {
            transform: rotate(90deg);
        }
        &__options {
            position: relative;
            width: 100%;
            height: 200px;
            padding: 0 15px;
            background-color: #fff;
            overflow-y: scroll;
            box-shadow: 0 4px 14px rgba(0, 0, 0, .17);
        }
        &__option {
            height: 50px;
            display: flex;
            align-items: center;
            width: calc(100% - 20px);
            white-space: nowrap;
            overflow-x: hidden;
            text-overflow: ellipsis;
        }
        &__options::-webkit-scrollbar {
            width: 4px;
            background: #DCDCDC;
        }
        &__options::-webkit-scrollbar-thumb {
            background: #BFBFBF;
            border-radius: 3px;
        }
    }
</style>