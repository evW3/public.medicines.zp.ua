<template>
    <div class="sidebar col">
        <div class="sidebar__logo sidebar__icon bg-def" />
        <Links class="sidebar__links"/>
        <button class="sidebar__burger sidebar__icon bg-def" @click="burgerMenu"/>
        <div class="sidebar__control col">
            <button
                class="error sidebar__icon bg-def"
                @click="changeIsOpenError"
                v-if="isError"
            />
            <div class="pop-up col" v-if="isOpenError" >
                <button class="pop-up__close" @click="changeIsOpenError">✖</button>
                <span class="pop-up__title">Лікарня не визначена</span>
                <span class="pop-up__body">
                    Ліки, що ви завантажили не належать до жодної з лікарень що є в базі.
                    Ви можете додати індетифікатор до існуючої бази або
                    <p class="pop-up__link" @click="showModal">додати нову лікарню</p>
                </span>
            </div>
            <button class="upload sidebar__icon bg-def" @click="upload"/>
            <button class="exit sidebar__icon bg-def" @click="logout"/>
        </div>
        <div v-if="isMenu" class="mobile-menu col">
            <div class="mobile-menu__header row">
                <button class="error bg-def" @click="showModal" v-if="isError"/>
                <button class="close" @click="burgerMenu">✖</button>
            </div>
            <div class="mobile-menu__body col">
                <Links />
                <button class="upload mobile-menu__icon bg-def" @click="upload"/>
                <button class="exit mobile-menu__icon bg-def" @click="logout"/>
            </div>
        </div>
        <AddHospital v-if="isModalActive" @close="showModal" />
    </div>
</template>

<script>
    import Links from './Links';
    import AddHospital from "./Modal/AddHospital";

    export default {
        name: "Sidebar",
        data: () => ({
            isError: true,
            isMenu: false,
            isOpenError: false,
            isModalActive: false
        }),
        components: { Links, AddHospital },
        methods: {
            showModal() {
                this.isModalActive = !this.isModalActive
            },
            changeIsOpenError() {
              this.isOpenError = !this.isOpenError;
            },
            logout() {
                localStorage.clear();
                this.$router.push('/admin/login');
            },
            upload() {
                //need logic
            },
            burgerMenu() {
                this.isMenu = !this.isMenu;
            }
        },
    }
</script>

<style lang="scss">

    .sidebar {
        width: 70px;
        height: 100vh;
        &__logo {
            background-size: 36px 47px ;
            background-image: url('../assets/imgs/icons/sidebar/logo.svg');
        }
        &__icon {
            width: 70px;
            height: 70px;
            cursor: pointer;
        }
        &__burger {
            display: none;
        }
        &__control, &__fixed {
            height: 210px;
            position: absolute;
            justify-content: flex-end;
            top: calc(100% - 210px);
        }
    }

    .pop-up {
        top: 0;
        left: 58px;
        padding: 20px 40px;
        box-shadow: 0 4px 14px rgba(0, 0, 0, .17);
        width: 500px;
        height: 140px;
        background-color: #fff;
        position: absolute;
        ::before {
            content: '';
            top: 19px;
            border: 15px solid transparent;
            border-right: 15px solid #fff;
            position: absolute;
            right: 100%;
        }
        &__close {
            right: 5px;
            font-size: 17px;
            top: 5px;
            position: absolute;
        }
        &__title {
            font-family: 'AvenirNextCyr Bold';
            font-size: 20px;
            text-align: center;
            margin-bottom: 15px;
        }
        &__link {
            width: fit-content;
            color: #2B48FF;
            border-bottom: 1px solid #2B48FF;
        }
    }

    .mobile-menu {
        display: none;
    }

    .error {
        background-image: url('../assets/imgs/icons/sidebar/error.svg');
        background-size: 39px 33px;
    }

    .upload {
        background-image: url('../assets/imgs/icons/sidebar/upload.svg');
        background-size: 25px 27px;
    }

    .exit {
        background-image: url('../assets/imgs/icons/sidebar/exit.svg');
        background-size: 22px 23px;
    }

    @media (min-width: 300px) and (max-width: 899px) {
        .sidebar {
            width: 100%;
            flex-direction: row!important;
            justify-content: space-between;
            height: 70px;
            &__control, &__links {
                display: none!important;
            }
            &__burger {
                display: block;
                width: 70px;
                height: 70px;
                background-image: url('../assets/imgs/icons/sidebar/burger.svg');
                background-size: 23px 19px;
            }
        }

        .close {
            color: #2B48FF;
            font-size: 30px;
        }

        .mobile-menu {
            position: absolute;
            width: 100%;
            height: 100vh;
            justify-content: flex-start;
            align-items: center;
            top:0;
            background-color: #fff;
            &__icon {
                width: 136px;
                height: 136px;
            }
            &__header {
                width: 100%;
                justify-content: space-between;
                align-items: center;
                padding: 0 17px 0 17px;
                margin-bottom: 25px;
            }
        }

        .upload {
            background-size: 41px 44px;
        }

        .exit {
            background-size: 45px 47px;
        }

        .error {
            width: 33px;
            height: 40px;
            background-size: 33px 27px;
        }
    }

</style>