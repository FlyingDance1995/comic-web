<script setup>
const aff = ref();
const linkAds = ref();

try {
    const ads = await useNuxtApp().$api('/affiliate');
    linkAds.value = ads[Math.floor(Math.random() * ads.length)] || [];
} catch (error) {
    console.log(error);
}

const handleAffLayerClick = () => {
    sessionStorage.setItem('aff', 'true');
    aff.value = true;
};

aff.value = sessionStorage.getItem('aff') !== null;

const checkSessionStorage = () => {
    sessionStorage.removeItem('aff')
    aff.value = false;
};

let intervalId;

onMounted(() => {
    intervalId = setInterval(checkSessionStorage, 300000);
});

onUnmounted(() => {
    clearInterval(intervalId);
});
</script>

<template>
    <a v-if="!aff"
       id="affLayer"
       class="transparent-layer"
       :href="linkAds"
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
