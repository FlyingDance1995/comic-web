<script setup>
import {userDarkMode} from "@/composables/state";
import {useUserStore} from "~/store/user.js";
import {useMenuStore} from "~/store/menu.js";

let userStore = null;

const menuStore = useMenuStore();

const {isDarkMode, toggleDarkMode} = userDarkMode();
const user = ref();
const openMenu = ref(false);

if (window) {
    userStore = useUserStore();
    user.value = userStore.$state.user;
}

const handleLogout = () => {
    userStore.setUser(null);
    userStore.setToken(null);
    userStore.setExpiry(null);
    window.location.reload();
};

const handleClickMenu = () => {
    menuStore.setMenu(true)
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
                            data-bs-target="#SearchModal">
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
                    </ul>
                </div>

                <div v-if="user?.id" class="user-box dropdown px-2">
                    <a class="d-flex align-items-center nav-link dropdown-toggle gap-3 dropdown-toggle-nocaret"
                       :class="openMenu ? 'show' : ''"
                       href="#"
                       role="button"
                       data-bs-toggle="dropdown"
                       :aria-expanded="openMenu"
                       @click="openMenu = !openMenu">
                        <img src="/images/avata.png" class="user-img" alt="test">
                        <div class="user-info">
                            <p class="user-name mb-0">{{ user?.email }}</p>
                            <p class="designattion mb-0">{{ user?.fullname }}</p>
                        </div>
                    </a>

                    <ul class="dropdown-menu dropdown-menu-end"
                        :class="openMenu ? 'show' : ''">
                        <!--                        <li>-->
                        <!--                            <a class="dropdown-item d-flex align-items-center" href="javascript:void(0)">-->
                        <!--                                <i class="bx bx-coin-stack fs-5"></i><span>0</span>-->
                        <!--                            </a>-->
                        <!--                        </li>-->
                        <!--                        <li>-->
                        <!--                            <div class="dropdown-divider mb-0"></div>-->
                        <!--                        </li>-->
                        <!--                        <li><a class="dropdown-item d-flex align-items-center"-->
                        <!--                               href="https://monkeyd.vn/user/tro-thanh-tac-gia"><i-->
                        <!--                            class="bx bx-chevrons-up fs-5"></i><span>Đăng truyện</span></a>-->
                        <!--                        </li>-->
                        <!--                        <li><a class="dropdown-item d-flex align-items-center"-->
                        <!--                               href="https://monkeyd.vn/user/dich-gia-dang-theo-doi"><i-->
                        <!--                            class="bx bx-bell fs-5"></i><span>Đang theo dõi</span></a>-->
                        <!--                        </li>-->
                        <!--                        <li><a class="dropdown-item d-flex align-items-center"-->
                        <!--                               href="https://monkeyd.vn/user/lich-su-doc-truyen"><i class="bx bx-show fs-5"></i><span>Truyện đã đọc</span></a>-->
                        <!--                        </li>-->
                        <!--                        <li><a class="dropdown-item d-flex align-items-center"-->
                        <!--                               href="https://monkeyd.vn/user/truyen-da-luu"><i-->
                        <!--                            class="bx bx-bookmark-alt fs-5"></i><span>Truyện đã lưu</span></a>-->
                        <!--                        </li>-->
                        <!--                        <li><a class="dropdown-item d-flex align-items-center"-->
                        <!--                               href="https://monkeyd.vn/user/thong-tin-ca-nhan"><i-->
                        <!--                            class="bx bx-user fs-5"></i><span>Thông tin</span></a>-->
                        <!--                        </li>-->
                        <!--                        <li><a class="dropdown-item d-flex align-items-center"-->
                        <!--                               href="https://monkeyd.vn/user/doi-mat-khau"><i-->
                        <!--                            class="bx bx-cog fs-5"></i><span>Đổi mật khẩu</span></a>-->
                        <!--                        </li>-->
                        <!--                        <li>-->
                        <!--                            <div class="dropdown-divider mb-0"></div>-->
                        <!--                        </li>-->
                        <li>
                            <a class="dropdown-item d-flex align-items-center"
                               href="javascript:;"
                               @click="handleLogout">
                                <i class="bx bx-log-out-circle"></i>
                                <span>Đăng xuất</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div v-if="!user" class="d-flex justify-content-between">
                    <NuxtLink to="/login" class="btn btn-sm btn-primary" style="margin-right: 5px">
                        Đăng nhập</NuxtLink>
                    <NuxtLink to="/tao-tai-khoan" class="btn btn-sm btn-primary">
                        Đăng ký
                    </NuxtLink>
                </div>
            </nav>
        </div>
    </header>
</template>
