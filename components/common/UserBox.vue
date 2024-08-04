<script setup>
import {clickOutSide as vClickOutSide} from '@mahdikhashan/vue3-click-outside'

import {useUserStore} from "~/store/user.js";
import {useConfigStore} from "~/store/config.js";

const route = useRoute();
const userStore = useUserStore();
const configStore = useConfigStore();

const user = computed(() => userStore.$state.user);
const token = computed(() => userStore.$state.token);
const openMenu = ref(false);
const notify = ref();

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
    }
};

if (user.value) {
    await getInfo();
}

watch(() => route.path, () => {
    openMenu.value = false;
}, {deep: true});

watch(token, () => {
    getInfo();
});
</script>

<template>
    <div v-if="user?.id" class="user-box dropdown px-2"
         v-click-out-side="handleClickOutside"
    >
        <a class="d-flex align-items-center nav-link dropdown-toggle gap-3 dropdown-toggle-nocaret"
           :class="openMenu ? 'show' : ''"
           href="#"
           role="button"
           data-bs-toggle="dropdown"
           :aria-expanded="openMenu"
           @click.prevent="openMenu = !openMenu">
            <img :src="user?.avatar || ''" onerror="this.src='/images/avata.png'" class="user-img"
                 alt="test">
            <div class="user-info">
                <p class="user-name mb-0">{{ user?.fullname }}</p>
                <p class="designattion mb-0">{{ user?.email }}</p>
            </div>
        </a>

        <ul id="drop-menu" class="dropdown-menu dropdown-menu-end"
            :class="openMenu ? 'show' : ''">
            <!--                        <li>-->
            <!--                            <a class="dropdown-item d-flex align-items-center" href="javascript:void(0)">-->
            <!--                                <i class="bx bx-coin-stack fs-5"></i><span>0</span>-->
            <!--                            </a>-->
            <!--                        </li>-->
            <!--                        <li>-->
            <!--                            <div class="dropdown-divider mb-0"></div>-->
            <!--                        </li>-->

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
    </div>

    <div v-if="!user" class="d-flex justify-content-between">
        <NuxtLink to="/login" class="btn btn-sm btn-primary" style="margin-right: 5px">
            Đăng nhập
        </NuxtLink>
        <NuxtLink to="/tao-tai-khoan" class="btn btn-sm btn-primary">
            Đăng ký
        </NuxtLink>
    </div>
</template>
