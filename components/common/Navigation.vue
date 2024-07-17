<script setup>
import { useCategoryStore } from '@/store/category'
import {useMenuStore} from "~/store/menu.js";

const menuStore = useMenuStore();
const categoryStore = useCategoryStore();

await categoryStore.fetchCategory();

const { category, loading, error } = storeToRefs(categoryStore);
const openMenu = computed(() => menuStore.$state.open);
const openSubMenu = ref(false);

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
                                <a href="/">
                                    <img src="/images/logo/Logo-MonkeyD.png" class="logo-icon"
                                         alt="MonkeyD - Chuyên cập nhật các truyện tiểu thuyết, ngôn tình, truyện ngắn hot nhất 2024">
                                </a>
                            </div>
                        </div>

                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas"
                                aria-label="Close" @click="closeMenu">
                        </button>
                    </div>

                    <div class="offcanvas-body">
                        <ul class="navbar-nav align-items-center flex-grow-1">
                            <li class="nav-item">
                                <a class="nav-link" href="/">
                                    <div class="menu-title d-flex align-items-center">Trang chủ</div>
                                </a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link" href="/truyen-moi">
                                    <div class="menu-title d-flex align-items-center">Truyện mới</div>
                                </a>
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
                                    style="overflow: auto !important; animation: none">
                                    <li v-for="(item, index) in category" :key="index">
                                        <a class="dropdown-item"
                                            :href="`/the-loai/${item.slug}`">
                                            <i class="bx bx-chevron-right"></i>{{ item.name }} 
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link" href="/truyen-hoan-thanh">
                                    <div class="menu-title d-flex align-items-center">Truyện Full</div>
                                </a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link" href="/truyen-sang-tac">
                                    <div class="menu-title d-flex align-items-center">
                                        <div class="parent-icon">
                                            <i class="bx bx-star"></i>
                                        </div>
                                        Truyện Sáng Tác
                                    </div>
                                </a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link" href="/danh-sach-nhom-dich">
                                    <div class="parent-icon">
                                        <i class="bx bx-group"></i>
                                    </div>
                                    <div class="menu-title d-flex align-items-center">Team</div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>
