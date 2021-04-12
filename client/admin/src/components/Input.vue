<template>
    <form
       class="login-form row"
       @submit.prevent="onSubmit"
       :class="{ 'login-form_incorrect': isInvalid && isDirty }"
    >
        <label
           for="code"
           class="login-form__img bg-def"
           :class="{ 'login-form__img-incorrect': isInvalid && isDirty }"
        />
        <input
            type="password"
            placeholder="*****"
            id="code"
            v-model="code"
            class="login-form__code"
        >
        <button
           class="login-form__button"
           :class="{ 'login-form__button-incorrect': isInvalid && isDirty }"
           type="submit"
        >➔</button>
    </form>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: "Input",
        data: () => ({
            code: "",
            isDirty: false,
            isInvalid: false
        }),
        computed: {
            ...mapGetters(['admin'])
        },
        methods: {
            async onSubmit() {

                if (!(this.code.trim())) {
                    this.isDirty = true;
                    this.isInvalid = true;
                    return;
                }

                await this.$store.dispatch('fetchAdmin', this.code);

                if (this.admin.token !== 'INVALID') {
                    await this.$router.push("/admin/");
                } else {
                    this.code = "";
                    this.isDirty = true;
                    this.isInvalid = true;
                }
            },
        },
        watch: {
            code: function (code) {
                if(this.isDirty && code.trim()) {
                    this.isInvalid = false;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    $PrimaryThemeColor: #2B48FF;
    $ErrorLevel: #F44336;

    .login-form {
        align-items: center;
        border: 1px solid $PrimaryThemeColor;
        padding: 0 10px 0 0;
        margin: 50px 0 0 0;
        &_incorrect {
            border: 1px solid $ErrorLevel;
        }
        &__img {
            width: 45px;
            height: 45px;
            background-image: url('../assets/imgs/icons/login/lock.svg');
            background-size: 18px 23px;
            background-color: $PrimaryThemeColor;
        }
        &__img-incorrect {
            background-color: $ErrorLevel;
        }
        &__code {
            font-family: 'AvenirNextCyr Regular';
            font-size: 18px;
            height: 45px;
            width: 300px;
            padding: 12px 16px 12px 16px;
        }
        &__button {
            font-family: 'AvenirNextCyr Bold';
            font-size: 14px;
            color: $PrimaryThemeColor;
            width: 25px;
            height: 25px;
            border: 2px solid $PrimaryThemeColor;
            border-radius: 50%;
            cursor: pointer;
        }
        &__button-incorrect {
            border: 2px solid $ErrorLevel;
            color: $ErrorLevel;
        }
    }

    @media (max-width: 656px) {

        .login-form {
            margin: 30px 0 0 0;
            &__code {
                width: 200px;
            }
        }
    }
</style>