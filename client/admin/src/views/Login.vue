<template>
    <div class="login col">
            <div class="login__image bg-def" />
            <Input />
    </div>
</template>

<script>
    import Input from "../components/Input";
    export default {
        name: "Login",
        components: {
            Input
        }
    }
</script>

<style scoped lang="scss">
    .login {
        width: 100%;
        height: 100vh;
        align-items: center;
    }

    .login__image {
        width: 660px;
        height: 330px;
        margin: 10% 0 30px 0;
        background-size: 656px 327px;
        background-image: url('../assets/imgs/icons/login/medicine.svg');
    }
    
    @media (max-width: 656px) {
        .login__image {
            transform: scale(.66);
        }
    }
    @media (max-width: 420px) {

        .login__image {
            width: 100%;
            height: 195px;
            transform: scale(1);
            margin: 20% 0 30px 0;
            background-size: 280px 140px;
        }
    }
</style>