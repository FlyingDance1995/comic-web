<script setup>
import {useUserStore} from "~/store/user.js";

const userStore = useUserStore();
const {setTimeAff} = useRuntimeConfig().public;

const user = computed(() => userStore.$state.user);
const checkVIP = computed(() => userStore.checkVIP());

const aff = ref();
const listAff = ref([]);
const currentIndex = ref(0);
const isAff = ref(sessionStorage.getItem('aff') !== null);
const isClick = ref(false);

try {
    listAff.value = await useNuxtApp().$api('/affiliate');
    aff.value = listAff.value[currentIndex.value];
    currentIndex.value = (currentIndex.value + 1) % listAff.value.length;
} catch (error) {
    console.log(error);
}

const checkSessionStorage = () => {
    if (!isAff.value) return;

    aff.value = listAff.value[Math.floor(Math.random() * listAff.value.length)];
    currentIndex.value = (currentIndex.value + 1) % listAff.value.length;
    sessionStorage.removeItem('aff');
    isAff.value = false;
};

const handleAffLayerClick = () => {
    sessionStorage.setItem('aff', 'true');
    isAff.value = true;
    isClick.value = true;
};

const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
        if(!isClick.value) checkSessionStorage();
        isClick.value = false;
    }
};

let intervalId;

onMounted(() => {
    intervalId = setInterval(checkSessionStorage, setTimeAff * 1000);
    // document.addEventListener('visibilitychange', handleVisibilityChange);
});

onUnmounted(() => {
    clearInterval(intervalId);
    // document.removeEventListener('visibilitychange', handleVisibilityChange);
});
</script>

<template>
    <a v-if="aff && !isAff && !checkVIP"
       id="affLayer"
       class="transparent-layer"
       :href="aff"
       target="_blank"
       @click="handleAffLayerClick"/>
</template>

<style scoped>
.transparent-layer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0);
    z-index: 9999999999;
    justify-content: center;
    align-items: center;
}
</style>
