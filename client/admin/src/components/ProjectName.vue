<template>
    <span class="project-name">
        <p class="project-name__blue">МедЛіки</p>
        <p class="project-name__yellow">.ZP.UA</p>
    </span>
</template>

<script>
    export default {
        name: "ProjectName"
    }
</script>

<style lang="scss">
    .text-project {
        font-family: "AvenirNextCyr Bold";
        display: flex;
        flex-direction: row;
        justify-content: center;
        &__blue {
            color: #2B48FF;
        }
        &__yellow {
            color: #FEBD00;
        }
    }
</style>