<script setup>
import {useUserStore} from "~/store/user.js";
import {useConfigStore} from "~/store/config.js";

const userStore = useUserStore();
const configStore = useConfigStore();

const TIME_OUT = 5 * 60 * 1000;

const checkVIP = computed(() => userStore.checkVIP());

const aff = ref();
const listAff = computed(() => configStore.$state.affList?.filter(x => x?.location === 5 || x?.location === 6));
const currentIndex = ref(0);
const isClick = ref(false);

const handleAffLayerClick = () => {
    isClick.value = true;

    if (currentIndex.value >= 1) return;
    currentIndex.value += 1;
    setTimeout(showAff, TIME_OUT);
};

const showAff = () => {
    try {
        isClick.value = false;
        aff.value = listAff.value[currentIndex.value];
    } catch (error) {
        console.log(error);
    }
}

onMounted(() => {
    setTimeout(showAff, TIME_OUT);
});
</script>

<template>
    <a v-if="aff && !isClick && !checkVIP"
       id="affLayer"
       class="transparent-layer"
       :href="aff?.link"
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
