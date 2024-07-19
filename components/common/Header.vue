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
                            <img src="/images/logo/Logo-MonkeyD.png" class="logo-icon"
                                 alt="MonkeyD - Chuyên cập nhật các truyện tiểu thuyết, ngôn tình, truyện ngắn hot nhất 2024"
                                 width="120" height="30">
                        </NuxtLink>
                    </div>
                </div>

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

                        <ul id="search-autocomplete">
                            <li class="d-flex justify-content-start align-items-center mb-2 border-bottom">
                                <NuxtLink to="/trang-lan" class="m-2">
                                    <img src=""
                                         alt="TRĂNG LẶN"
                                         class="img-search">
                                </NuxtLink>

                                <NuxtLink to="/trang-lan" class="m-2 search-item-title">
                                    TRĂNG LẶN
                                </NuxtLink>
                            </li>
                        </ul>
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
                            <a class="nav-link dark-mode-icon" href="javascript:;" @click="toggleDarkMode">
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

