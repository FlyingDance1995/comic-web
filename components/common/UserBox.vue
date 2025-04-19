<script setup>
import {clickOutSide as vClickOutSide} from '@mahdikhashan/vue3-click-outside'

import {useUserStore} from "~/store/user.js";
import {useConfigStore} from "~/store/config.js";

const route = useRoute();
const userStore = useUserStore();

const user = computed(() => userStore.$state.user);
const token = computed(() => userStore.$state.token);
const checkVIP = computed(() => userStore.checkVIP());
const openMenu = ref(false);

const handleLogout = () => {
    userStore.setUser(null);
    userStore.setToken(null);
    userStore.setExpiry(null);
    window.location.reload();
};

const handleClickOutside = () => {
    if (openMenu.value) openMenu.value = false;
};

const getInfo = async () => {
    try {
        const response = await useNuxtApp().$api('/profile');
        userStore.setUser({
            ...user.value,
            ...response
        })
    } catch (error) {
        console.log("error", error);
        if (error?.response?.status === 401 || error?.response?.status === 403) {
            handleLogout()
        }
    }
};

watch(() => route.path, () => {
    openMenu.value = false;
}, {deep: true});

watch(token, () => {
    if (token.value && process.client) {
        getInfo();
    }
}, {immediate: true});
</script>

<template>
    <div class="user-box dropdown px-2" v-click-out-side="handleClickOutside">
        <a class="d-flex align-items-center nav-link dropdown-toggle gap-3 dropdown-toggle-nocaret position-relative"
           :class="openMenu ? 'show' : ''"
           href="#"
           role="button"
           data-bs-toggle="dropdown"
           :aria-expanded="openMenu"
           @click.prevent="openMenu = !openMenu">
            <img :src="user?.avatar || ''" onerror="this.src='/images/avata.png'" class="user-img"
                 alt="">
            <img v-if="checkVIP"
                 src="/images/khung-vip.png" class="frame-user-img"
                 alt="">
        </a>

        <ul v-if="user?.id"
            id="drop-menu"
            class="dropdown-menu dropdown-menu-end"
            :class="openMenu ? 'show' : ''">
            <li>
                <NuxtLink class="dropdown-item d-flex align-items-center" to="/user/nap-tien">
                    <i class="bx bx-money fs-5"></i><span>{{ user?.wallet?.balance?.toLocaleString()?.replaceAll('.', ',') || 0 }} coin</span>
                </NuxtLink>
            </li>

            <li>
                <div class="dropdown-divider mb-0"></div>
            </li>

            <li v-if="route.path.includes('/dang-truyen') || route.path.includes('/admin')">
                <NuxtLink class="dropdown-item d-flex align-items-center"
                          to="/"><i
                    class="bx bx-home-alt fs-5"></i><span>Trang chủ</span>
                </NuxtLink>
            </li>

            <li v-else-if="user?.role === 'moderator' || user?.role === 'admin'">
                <NuxtLink class="dropdown-item d-flex align-items-center"
                          to="/dang-truyen/quan-ly-truyen"><i
                    class="bx bx-book-open fs-5"></i><span>Quản lý truyện</span>
                </NuxtLink>
            </li>

            <li v-if="user?.role === 'user'">
                <NuxtLink class="dropdown-item d-flex align-items-center"
                          to="/user/tro-thanh-tac-gia"><i
                    class="bx bx-chevrons-up fs-5"></i><span>Đăng truyện</span>
                </NuxtLink>
            </li>

            <li>
                <NuxtLink class="dropdown-item d-flex align-items-center"
                          to="/user/dich-gia-dang-theo-doi">
                    <i class="bx bx-bell fs-5"></i><span>Đang theo dõi</span>
                </NuxtLink>
            </li>

            <li>
                <NuxtLink class="dropdown-item d-flex align-items-center"
                          to="/user/lich-su-doc-truyen">
                    <i class="bx bx-show fs-5"></i><span>Truyện đã đọc</span>
                </NuxtLink>
            </li>

            <li>
                <NuxtLink class="dropdown-item d-flex align-items-center"
                          to="/user/truyen-da-luu">
                    <i class="bx bx-bookmark-alt fs-5"></i><span>Truyện đã lưu</span>
                </NuxtLink>
            </li>

            <li>
                <NuxtLink class="dropdown-item d-flex align-items-center"
                          to="/user/thong-tin-ca-nhan">
                    <i class="bx bx-user fs-5"></i><span>Thông tin</span>
                </NuxtLink>
            </li>

            <li>
                <NuxtLink
                    class="dropdown-item d-flex align-items-center"
                    to="/user/doi-mat-khau">
                    <i class="bx bx-cog fs-5"></i><span>Đổi mật khẩu</span>
                </NuxtLink>
            </li>

            <li>
                <div class="dropdown-divider mb-0"></div>
            </li>

            <li>
                <a class="dropdown-item d-flex align-items-center"
                   href="javascript:;"
                   @click="handleLogout">
                    <i class="bx bx-log-out-circle"></i>
                    <span>Đăng xuất</span>
                </a>
            </li>
        </ul>

        <ul v-else
            id="drop-menu"
            class="dropdown-menu dropdown-menu-end"
            :class="openMenu ? 'show' : ''">
            <li>
                <NuxtLink class="dropdown-item d-flex align-items-center"
                          to="/login">
                    <i class='bx bx-log-in-circle'></i><span>Đăng nhập</span>
                </NuxtLink>
            </li>

            <li>
                <NuxtLink
                    class="dropdown-item d-flex align-items-center"
                    to="/tao-tai-khoan">
                    <i class='bx bx-edit'></i><span>Đăng ký</span>
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

<style>
.user-box .frame-user-img {
    position: absolute;
    z-index: 1;
    /*width: 65px;*/
    /* top: -2px; */
    /* left: -3px; */
    width: 70px;
    top: -13px;
    left: -14px;
}

.user-box {
    border: none;
}
</style>
