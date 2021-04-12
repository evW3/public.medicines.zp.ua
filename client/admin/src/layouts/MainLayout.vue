<template>
    <div class="main-layout row">
        <Sidebar/>
        <main class="main-layout__body">
            <router-view />
        </main>
    </div>
</template>

<script>
    import Sidebar from "../components/Sidebar";
    export default {
        name: "MainLayout",
        components: { Sidebar }
    }
</script>

<style lang="scss">
    .main-layout__body {
        width: 100%;
        background-color: #ECEFF1;
    }

    @media (max-width: 899px) {
        .main-layout {
            flex-direction: column!important;
        }
    }
</style>