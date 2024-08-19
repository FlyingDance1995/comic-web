<script setup>
import {useCategoryStore} from '@/store/category'
import {useMenuStore} from "~/store/menu.js";
import {useUserStore} from "~/store/user.js";

const menuStore = useMenuStore();
const categoryStore = useCategoryStore();

await categoryStore.fetchCategory();

const {category, loading, error} = storeToRefs(categoryStore);
const openMenu = computed(() => menuStore.$state.open);
const openSubMenu = ref(false);
const openSubMenu1 = ref(false);

const closeMenu = () => {
    menuStore.setMenu(false);
};

let userStore = null;
const user = ref();
const checkVIP = ref(false);
if (process.client) {
    userStore = useUserStore();
    const userComputed = computed(() => userStore.$state.user);
    const checkVIPComputed = computed(() => userStore.checkVIP());

    watch(userComputed, () => {
        user.value = userComputed.value;
        checkVIP.value = checkVIPComputed.value;
    }, {immediate: true, deep: true});
}
</script>

<template>
    <div class="primary-menu">
        <nav class="navbar navbar-expand-lg align-items-center">
            <div class="container">
                <div class="offcanvas offcanvas-start"
                     :class="openMenu ? 'show' : 'hiding'"
                     tabindex="-1"
                     id="offcanvasNavbar"
                     aria-labelledby="offcanvasNavbarLabel">
                    <div class="offcanvas-header border-bottom">
                        <div class="d-flex align-items-center">
                            <div class="">
                                <NuxtLink to="/">
                                    <img src="/images/logo/Logo.svg" class="logo-icon"
                                         alt="Phê Truyện - Chuyên cập nhật các truyện tiểu thuyết, ngôn tình, truyện ngắn hot nhất">
                                </NuxtLink>
                            </div>
                        </div>

                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas"
                                aria-label="Close" @click="closeMenu">
                        </button>
                    </div>

                    <div class="offcanvas-body">
                        <ul class="navbar-nav align-items-center flex-grow-1">
                            <li class="nav-item">
                                <NuxtLink class="nav-link" to="/" @click="closeMenu">
                                    <div class="menu-title d-flex align-items-center">Trang chủ</div>
                                </NuxtLink>
                            </li>

                            <li class="nav-item">
                                <NuxtLink class="nav-link" to="/truyen-moi" @click="closeMenu">
                                    <div class="menu-title d-flex align-items-center">Truyện mới</div>
                                </NuxtLink>
                            </li>

                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle dropdown-toggle-nocaret"
                                   :class="openSubMenu ? 'show' : ''"
                                   :aria-expanded="openSubMenu"
                                   href="javascript:;"
                                   data-bs-toggle="dropdown" @click="openSubMenu = !openSubMenu">
                                    <div class="parent-icon"><i class="bx bx-list-ol"></i>
                                    </div>
                                    <div class="menu-title d-flex align-items-center">Thể loại</div>
                                    <div class="ms-auto dropy-icon"><i class="bx bx-chevron-down"></i></div>
                                </a>

                                <ul class="dropdown-menu scroll-menu ps ps--active-x ps--active-y ps--scrolling-y"
                                    :class="openSubMenu ? 'show' : ''"
                                    style="overflow: auto !important;">
                                    <li v-for="(item, index) in category" :key="index">
                                        <NuxtLink class="dropdown-item"
                                                  :to="`/the-loai/${item.slug}`" @click="closeMenu">
                                            <i class="bx bx-chevron-right"></i>{{ item.name }}
                                        </NuxtLink>
                                    </li>
                                </ul>
                            </li>

                            <li class="nav-item">
                                <NuxtLink class="nav-link" to="/truyen-hoan-thanh" @click="closeMenu">
                                    <div class="menu-title d-flex align-items-center">Truyện Full</div>
                                </NuxtLink>
                            </li>

                            <li class="nav-item">
                                <NuxtLink class="nav-link" to="/truyen-sang-tac" @click="closeMenu">
                                    <div class="menu-title d-flex align-items-center">
                                        <div class="parent-icon">
                                            <i class="bx bx-star"></i>
                                        </div>
                                        Truyện Sáng Tác
                                    </div>
                                </NuxtLink>
                            </li>

                            <li class="nav-item">
                                <NuxtLink class="nav-link" to="/danh-sach-nhom-dich" @click="closeMenu">
                                    <div class="parent-icon">
                                        <i class="bx bx-group"></i>
                                    </div>
                                    <div class="menu-title d-flex align-items-center">Team</div>
                                </NuxtLink>
                            </li>

                            <li v-if="user"
                                class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle dropdown-toggle-nocaret"
                                   :class="openSubMenu1 ? 'show' : ''"
                                   :aria-expanded="openSubMenu1"
                                   href="javascript:;"
                                   data-bs-toggle="dropdown" @click="openSubMenu1 = !openSubMenu1">
                                    <div class="parent-icon"><i class="bx bx-dock-left"></i>
                                    </div>
                                    <div class="menu-title d-flex align-items-center">Tủ truyện</div>
                                    <div class="ms-auto dropy-icon"><i class="bx bx-chevron-down"></i></div>
                                </a>

                                <ul class="dropdown-menu scroll-menu"
                                    :class="openSubMenu1 ? 'show' : ''">
                                    <li>
                                        <NuxtLink class="dropdown-item"
                                                  to="/user/lich-su-doc-truyen" @click="closeMenu">
                                            <i class="bx bx-show"></i> Truyện đã đọc
                                        </NuxtLink>
                                    </li>

                                    <li>
                                        <NuxtLink class="dropdown-item"
                                                  to="/user/truyen-da-luu" @click="closeMenu">
                                            <i class="bx bx-bookmark"></i> Truyện đã đánh dấu
                                        </NuxtLink>
                                    </li>

                                    <li>
                                        <NuxtLink class="dropdown-item"
                                                  to="/user/dich-gia-dang-theo-doi" @click="closeMenu">
                                            <i class="bx bx-bell"></i> Đang theo dõi team
                                        </NuxtLink>
                                    </li>
                                </ul>
                            </li>

                            <li v-if="!checkVIP"
                                class="nav-item">
                                <NuxtLink class="nav-link" to="/user/mua-vip">
                                    <div class="parent-icon">
                                        <i class="bx bx-star"></i>
                                    </div>
                                    <div class="menu-title d-flex align-items-center">Premium</div>
                                </NuxtLink>
                            </li>

                            <li v-if="user"
                                class="nav-item">
                                <NuxtLink class="nav-link" to="/page/chinh-sach-va-quy-dinh-chung">
                                    <div class="menu-title d-flex align-items-center">Chính sách</div>
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>
