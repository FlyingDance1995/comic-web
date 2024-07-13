<script setup>
const {data: ads} = await useAPI('/affiliate');
const linkAds = ads?.value?.[Math.floor(Math.random() * ads?.value?.length)] || [];

const aff = ref();

const handleAffLayerClick = () => {
    sessionStorage.setItem('aff', 'true');
    aff.value = true;
};

onMounted(() => {
    aff.value = sessionStorage.getItem('aff') !== null;
})
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
