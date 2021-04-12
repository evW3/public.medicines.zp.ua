<template>
    <div class="sidebar" :class="{ 'sidebar-hidden': isHidden }">
        <div class="sidebar__title col">
            <ProjectName/>
            <span class="sidebar__date-update">Залишок станом на <b>01.04.2020</b></span>
        </div>
        <DrugList />
        <DrugListController />
        <div class="sidebar__before bg-def" @click="controlSidebar">
            <div class="sidebar__arrow bg-def" :class="{'sidebar__arrow-active': isHidden}"/>
        </div>
    </div>
</template>

<script>
    import ProjectName from "@components/ProjectName";
    import DrugList from "@components/DrugList";
    import DrugListController from "@components/DrugListController";

    export default {
        name: "Sidebar",
        data: () => ({
            isHidden: false,
            drugs: null
        }),
        components: {
            ProjectName, DrugList, DrugListController
        },
        methods: {
            controlSidebar() {
                this.isHidden = !this.isHidden;
            }
        }
    }
</script>

<style scoped lang="scss">

    .sidebar {
        position: absolute;
        width: 350px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        z-index: 401;
        background: white;
        left: calc(100vw - 350px);
        box-shadow: 0 4px 37px rgba(0, 0, 0, .25);
        transition: .3s;
        &__title {
            padding: 15px 0 15px 0;
            border-bottom: 1px solid $border-sidebar;
            align-items: center;
        }
        &__date-update {
            font-size: 15px;
            text-align: center;
            margin: 10px 0 0 0;
        }
        &__before {
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 30px;
            height: 60px;
            cursor: pointer;
            top: calc(50% - 30px);
            left: -30px;
            background-color: white;
            border-radius: 100% 0 0 100% / 50% 0 0 50%;
        }
        &__arrow {
            width: 12px;
            height: 20px;
            background-image: url('../assets/imgs/icons/drugList/arrow.svg');
            background-size: 12px 20px;
            margin-left: 5px;
            transform: rotate(180deg);
        }
        &__arrow-active {
            transform: rotate(0deg);
        }
        &-hidden {
            left: calc(100vw);
        }
    }

    @media (max-width: 490px) {
        .sidebar {
            width: 100%;
            height: 70%;
            left: 0;
            top: 30%;
            box-shadow: 0 4px 37px rgba(0, 0, 0, .25);
            &__before {
                position: absolute;
                width: 60px;
                height: 30px;
                transition: .3s;
                top: -30px;
                left: calc(50% - 30px);
                background-color: white;
                border-radius: 50% 50% 0 0 / 100% 100% 0 0;
            }
            &__arrow {
                width: 100%;
                height: 100%;
                background-image: url('../assets/imgs/icons/drugList/arrow.svg');
                transform: rotate(270deg);
                background-size: 12px 20px;
            }
            &__arrow-active {
                transform: rotate(90deg);
            }
            &-hidden {
                top: calc(100vh - 85px);
            }
        }
    }
</style>