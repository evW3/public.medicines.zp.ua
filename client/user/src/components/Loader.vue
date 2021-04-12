<template>
    <div class="loader__container">
        <div class="lds-facebook"><div /><div /><div /></div>
    </div>
</template>

<script>
    export default {
        name: "Loader"
    }
</script>

<style lang="scss">
    .loader__container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .lds-facebook {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
    }
    .lds-facebook div {
        display: inline-block;
        position: absolute;
        left: 8px;
        width: 16px;
        background-color: $blue;
        animation: lds-facebook 1.2s cubic-bezier(0, .5, .5, 1) infinite;
    }
    .lds-facebook div:first-child {
        left: 8px;
        animation-delay: -.24s;
    }
    .lds-facebook div:nth-child(2) {
        left: 32px;
        animation-delay: -.12s;
    }
    .lds-facebook div:last-child {
        left: 56px;
        animation-delay: 0s;
    }
    @keyframes lds-facebook {
        0% {
            top: 8px;
            height: 64px;
        }
        50%, 100% {
            top: 24px;
            height: 32px;
        }
    }
</style>