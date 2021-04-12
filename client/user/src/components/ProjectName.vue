<template>
    <span class="project-name row">
        <p class="project-name__blue">МедЛіки</p>
        <p class="project-name__yellow">.ZP.UA</p>
    </span>
</template>

<script>
    export default {
        name: "ProjectName"
    }
</script>

<style scoped lang="scss">
    .project-name {
        font-family: "AvenirNextCyr Bold";
        font-size: 22px;
        justify-content: center;
        &__blue {
            color: $blue;
        }
        &__yellow {
            color: $confirm;

        }
    }
</style>