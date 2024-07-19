<script setup>
import {clickOutSide as vClickOutSide} from '@mahdikhashan/vue3-click-outside'
import {useUserStore} from "~/store/user.js";

const route = useRoute();
const userStore = useUserStore();

const user = computed(() => userStore.$state.user);
const token = computed(() => userStore.$state.token);

const notify = ref();
const showNotify = ref(false);

const handleClickOutsideNotify = () => {
    if (showNotify.value) showNotify.value = false;
};

const getNotify = async () => {
    try {
        const response = await useNuxtApp().$api('/profile/notify');
        notify.value = response;
    } catch (error) {
        console.log("error", error);
    }
};

if (user.value) {
    await getNotify();
}

watch(() => route.path, () => {
    showNotify.value = false;
}, {deep: true});

watch(token, () => {
    getNotify();
});
</script>

<template>
    <li v-if="user"
        class="nav-item dropdown dropdown-large"
        v-click-out-side="handleClickOutsideNotify">
        <a class="nav-link dropdown-toggle dropdown-toggle-nocaret position-relative show"
           href="#"
           data-bs-toggle="dropdown" aria-expanded="true"
           @click.prevent="showNotify = !showNotify">
            <span class="alert-count">
                {{ notify?.count ? notify.count > 100 ? '99+' : notify.count : 0 }}
            </span>
            <i class="bx bx-bell"></i>
        </a>

        <div class="dropdown-menu dropdown-menu-end"
             :class="{
                show: showNotify ? 'show' : ''
             }"
             data-bs-popper="static">
            <a href="javascript:;">
                <div class="msg-header">
                    <p class="msg-header-title">Thông báo</p>
                    <p class="msg-header-badge">{{ notify?.count || 0 }} tin mới</p>
                </div>
            </a>

            <div class="header-notifications-list ps">
                <div v-if="!notify?.count" class="text-center my-2">
                    Chưa có thông báo nào.
                </div>

                <NuxtLink v-for="item in notify?.results"
                          :key="item?.id"
                          class="dropdown-item position-relative"
                          :to="`/${item?.target?.story}`">
                    <div class="d-flex align-items-center">
                        <!--                                            <div class="user-online">-->
                        <div>
                            <img src="" class="msg-avatar" alt="" onerror="this.src='/images/avata.png'">
                        </div>

                        <div class="flex-grow-1">
                            <h6 class="msg-name">Bình luận mới
                                <span class="msg-time float-end">{{ timeAgo(item?.creation_time) }}</span>
                            </h6>
                            <p class="msg-info">{{ item?.contents }}</p>
                        </div>
                    </div>

                    <div v-if="item?.unread" class="new-noti">
                        <span class="dots"></span>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </li>
</template>
<style>
.ps {
    overflow: auto !important;
}
</style>
