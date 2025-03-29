<script setup>
import {useCategoryStore} from '@/store/category'
import {useMenuStore} from "~/store/menu.js";
import {useUserStore} from "~/store/user.js";

const menuStore = useMenuStore();
const categoryStore = useCategoryStore();
const userStore = useUserStore();

const {category, loading, error} = storeToRefs(categoryStore);

const user = computed(() => userStore.$state.user);
const openMenu = computed(() => menuStore.$state.open);
const openSubMenu = ref(false);
const openSubMenu2 = ref(false);
const openSubMenuVip = ref(false);

const category1 = [
    {slug: "truyen-moi", name: "Truyện mới cập nhật"},
    {slug: "truyen-hoan-thanh", name: "Truyện Full"},
    {slug: "truyen-sang-tac", name: "Truyện sáng tác"},
]

const subMenuVip = [
    {slug: "/user/nap-tien", name: "Nạp tiền", icon: 'bx bx-credit-card'},
    {slug: "/user/mua-vip", name: "Mua VIP", icon: 'bx bx-crown'},
    {slug: "/user/lich-su-giao-dich", name: "Lịch sử giao dịch", icon: 'bx bx-history'},
]

const closeMenu = () => {
    menuStore.setMenu(false);
};
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
                                    <img src="/images/logo/Logo.png" class="logo-icon"
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
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle dropdown-toggle-nocaret"
                                   :class="openSubMenu2 ? 'show' : ''"
                                   :aria-expanded="openSubMenu2"
                                   href="javascript:;"
                                   data-bs-toggle="dropdown" @click="openSubMenu2 = !openSubMenu2">
                                    <div class="parent-icon"><i class="bx bx-list-ol"></i>
                                    </div>
                                    <div class="menu-title d-flex align-items-center">Danh sách</div>
                                    <div class="ms-auto dropy-icon"><i class="bx bx-chevron-down"></i></div>
                                </a>

                                <ul class="dropdown-menu scroll-menu ps ps--active-x ps--active-y ps--scrolling-y"
                                    :class="openSubMenu2 ? 'show' : ''"
                                    style="overflow: auto !important;">
                                    <li v-for="(item, index) in category1" :key="index">
                                        <NuxtLink class="dropdown-item"
                                                  :to="`/${item.slug}`" @click="closeMenu">
                                            {{ item.name }}
                                        </NuxtLink>
                                    </li>

                                    <template v-if="user">
                                        <li>
                                            <NuxtLink class="dropdown-item"
                                                      to="/user/lich-su-doc-truyen" @click="closeMenu">
                                                Truyện đã đọc
                                            </NuxtLink>
                                        </li>

                                        <li>
                                            <NuxtLink class="dropdown-item"
                                                      to="/user/truyen-da-luu" @click="closeMenu">
                                                Truyện đã đánh dấu
                                            </NuxtLink>
                                        </li>

                                        <li>
                                            <NuxtLink class="dropdown-item"
                                                      to="/user/dich-gia-dang-theo-doi" @click="closeMenu">
                                                Đang theo dõi Team
                                            </NuxtLink>
                                        </li>
                                    </template>
                                </ul>
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
                                            {{ item.name }}
                                        </NuxtLink>
                                    </li>
                                </ul>
                            </li>

                            <li class="nav-item">
                                <NuxtLink class="nav-link" to="/danh-sach-nhom-dich" @click="closeMenu">
                                    <div class="parent-icon">
                                        <i class="bx bx-group"></i>
                                    </div>
                                    <div class="menu-title d-flex align-items-center">Team</div>
                                </NuxtLink>
                            </li>

                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle dropdown-toggle-nocaret"
                                   :class="openSubMenuVip ? 'show' : ''"
                                   :aria-expanded="openSubMenuVip"
                                   href="javascript:;"
                                   data-bs-toggle="dropdown" @click="openSubMenuVip = !openSubMenuVip">
                                    <div class="parent-icon"><i class="bx bx-wallet"></i>
                                    </div>
                                    <div class="menu-title d-flex align-items-center">Ví</div>
                                    <div class="ms-auto dropy-icon"><i class="bx bx-chevron-down"></i></div>
                                </a>

                                <ul class="dropdown-menu scroll-menu ps ps--active-x ps--active-y ps--scrolling-y"
                                    :class="openSubMenuVip ? 'show' : ''"
                                    style="overflow: auto !important;">
                                    <li v-for="(item, index) in subMenuVip" :key="index">
                                        <NuxtLink class="dropdown-item"
                                                  :to="item.slug" @click="closeMenu">
                                            <i :class="item.icon"></i>
                                            {{ item.name }}
                                        </NuxtLink>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<style scoped>
@media screen and (max-width: 768px) {
    .logo-icon {
        width: 120px;
    }
}

@media screen and (max-width: 991px) {
    .primary-menu {
        display: none;
    }
}

.topbar .navbar {
    height: 59px;
}

.primary-menu .navbar {
    box-shadow: none !important;
    padding: 0;
    border-bottom: none !important;
}

.primary-menu .container {
    padding: 0;
}

.topbar .navbar .navbar-nav .nav-link {
    width: auto;
}
</style>
