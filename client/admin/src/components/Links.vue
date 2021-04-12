<template>
    <nav>
        <button
           v-for="r in routes"
           :key="r.to"
           :href="r.to"
           class="link bg-def"
           :class="{ 'link_active': currentActive === r.page, [r.page]: true }"
           @click="changeActive(r.page)"
        />
    </nav>
</template>

<script>
    export default {
        name: "Links",
        data: () => ({
            routes: [ { 'to': '/', 'page': 'HOMEPAGE' } ],
            currentActive: 'HOMEPAGE',
        }),
        methods: {
            changeActive(page) {
                this.currentActive = page;
            }
        }
    }
</script>

<style scoped lang="scss">
    $ActiveItem: #D9DEFF;

    .link {
        width: 70px;
        height: 70px;
        cursor: pointer;
        &_active {
            background-color: $ActiveItem;
        }
    }

    .HOMEPAGE {
        background-image: url('../assets/imgs/icons/sidebar/homepage.svg');
        background-size: 27px 23px;
    }

    @media (min-width: 300px) and (max-width: 899px) {
        .link {
            width: 136px;
            height: 136px;
        }

        .HOMEPAGE {
            background-image: url('../assets/imgs/icons/sidebar/homepage.svg');
            background-size: 52px 44px;
        }
    }
</style>