<script setup>
import {userDarkMode} from "@/composables/state";
import {useMenuStore} from "~/store/menu.js";
import {useConfigStore} from "~/store/config.js";

const menuStore = useMenuStore();
const configStore = useConfigStore();

const {isDarkMode, toggleDarkMode} = userDarkMode();

const handleClickMenu = () => {
    menuStore.setMenu(true);
};

const openSearchModal = () => {
    configStore.setSearchModal(true);
};
</script>

<template>
    <header>
        <div class="topbar d-flex align-items-center">
            <nav class="navbar navbar-expand gap-3 container">
                <div class="mobile-toggle-menu d-block d-lg-none" data-bs-toggle="offcanvas"
                     data-bs-target="#offcanvasNavbar" @click="handleClickMenu">
                    <i class="bx bx-menu"></i>
                </div>

                <div class="topbar-logo-header d-flex">
                    <div class="">
                        <NuxtLink to="/">
                            <img src="/images/logo/Logo.png" class="logo-icon"
                                 alt="Phê Truyện - Chuyên cập nhật các truyện tiểu thuyết, ngôn tình, truyện ngắn hot nhất"
                                 width="120" height="30">
                        </NuxtLink>
                    </div>
                </div>

                <CommonNavigation2/>

                <div class="search-bar d-lg-block d-none">
                    <div class="position-relative popup-search w-100">
                        <form action="/tim-kiem" method="GET">
                            <input class="form-control search-input form-control-lg ps-5" type="search"
                                   placeholder="Tìm truyện" name="search" value="" id="searchInputPC"
                                   style="max-height: 40px !important; min-height: inherit !important;">
                            <span
                                class="position-absolute top-50 search-show ms-3 translate-middle-y start-0 top-50 fs-4">
                                <i class="bx bx-search"></i>
                            </span>
                        </form>
                    </div>
                </div>

                <div class="top-menu ms-auto">
                    <ul class="navbar-nav align-items-center gap-1">
                        <li class="nav-item mobile-search-icon d-flex d-lg-none" data-bs-toggle="modal"
                            data-bs-target="#SearchModal"
                            @click="openSearchModal">
                            <a class="nav-link" href="javascript:;">
                                <i class="bx bx-search"></i>
                            </a>
                        </li>

                        <li class="nav-item dark-mode d-flex">
                            <a class="nav-link dark-mode-icon" href="javascript:;"
                               @click="toggleDarkMode">
                                <i v-if="isDarkMode" class="bx bx-sun"></i>
                                <i v-else class="bx bx-moon"></i>
                            </a>
                        </li>

                        <ClientOnly>
                            <CommonNotify/>
                        </ClientOnly>
                    </ul>
                </div>

                <ClientOnly>
                    <CommonUserBox/>
                </ClientOnly>
            </nav>
        </div>
    </header>
</template>

<style scoped>
.logo-icon {
    width: 150px;
}

.topbar-logo-header {
    border-right: none;
}

input::placeholder {
    color: #4c5258 !important;
    opacity: 1 !important
}

.form-control {
    display: block;
    width: 100%;
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: var(--bs-body-color);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #f2b3f5;
    background-clip: padding-box;
    border: var(--bs-border-width) solid #f7ebeb;
    border-radius: var(--bs-border-radius);
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out
}

.form-control:focus {
    color: var(--bs-body-color);
    /*background-color: var(--bs-body-bg);*/
    border-color: rgb(243 229 243);
    outline: 0;
    box-shadow: 0 0 0 .25rem rgb(243 229 243 / 25%);
}

@media screen and (max-width: 768px) {
    .logo-icon {
        width: 120px;
    }
}
</style>
