<script setup>
import { useConfigStore } from "~/store/config.js";
import { useUserStore } from "~/store/user.js";

const userStore = useUserStore();
const configStore = useConfigStore();

const TIME_OUT = 5 * 60 * 1000;

const aff = computed(() => configStore.$state.affList?.find(x => x?.location === 1));
const affModal = computed(() => configStore.$state.affModal);
const checkVIP = computed(() => userStore.checkVIP());

const isOpen = ref(false);
const isBlock = ref(false);
const timeoutId = ref(null);

configStore.setAffModal(true);

const handleAffLayerClick = () => {
    configStore.setAffModal(false);
    sessionStorage.setItem('aff-popup', 'true');
    sessionStorage.setItem('affPopupClickTime', Date.now().toString());
    resetTimer();
};

const startTimer = () => {
    if (timeoutId.value) {
        clearTimeout(timeoutId.value);
    }

    timeoutId.value = setTimeout(() => {
        if (!(checkVIP.value || !aff.value)) {
            configStore.setAffModal(true);
            sessionStorage.removeItem('aff-popup');
            sessionStorage.removeItem('affPopupClickTime');
        }
    }, TIME_OUT);
};

const resetTimer = () => {
    if (timeoutId.value) {
        clearTimeout(timeoutId.value);
    }

    if (document.visibilityState === "hidden" || !document.hasFocus()) {
        startTimer();
    }
};

const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
        startTimer();
    } else {
        resetTimer();
    }
};

const handleFocus = () => {
    resetTimer();
};

const handleBlur = () => {
    startTimer();
};

const checkAffClickTime = () => {
    const affClickTime = sessionStorage.getItem('affPopupClickTime');
    if (affClickTime) {
        const currentTime = Date.now();
        const timeDiff = currentTime - parseInt(affClickTime, 10);
        if (timeDiff >= TIME_OUT) {
            configStore.setAffModal(true);
            sessionStorage.removeItem('aff-popup');
            sessionStorage.removeItem('affPopupClickTime');
        }
    }
};

watch([checkVIP, aff], () => {
    if (checkVIP.value || !aff.value) {
        configStore.setAffModal(false);
    }
}, { immediate: true })

watch(affModal, () => {
    if (affModal.value) {
        isBlock.value = true;
        setTimeout(() => {
            isOpen.value = true;
            document.body.style.overflow = 'hidden';
        }, 150);
    } else {
        isOpen.value = false;
        setTimeout(() => {
            isBlock.value = false;
            document.body.style.overflow = '';
        }, 150);
    }
}, { immediate: true });

onMounted(() => {
    checkAffClickTime();

    if (sessionStorage.getItem('aff-popup')) {
        configStore.setAffModal(false);
    }
    resetTimer();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);
});

onUnmounted(() => {
    if (timeoutId.value) {
        clearTimeout(timeoutId.value);
    }
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    window.removeEventListener("focus", handleFocus);
    window.removeEventListener("blur", handleBlur);
});
</script>

<template>
    <div class="modal fade" :class="isOpen ? 'show' : ''" id="reportModal" tabindex="-1" role="dialog"
        :aria-modal="affModal" :aria-hidden="!affModal" :style="{ display: isBlock ? 'block' : 'none' }">
        <div class="modal-dialog" role="document" style="margin-top: 30px">
            <div class="modal-content">
                <div class="modal-body text-center" style="font-size: 15px; margin-top: 15px">
                    <p>
                        Để có kinh phí và năng lượng tiếp tục dịch và ra mắt các bộ truyện hay.
                        <br>
                        <b>Phê Truyện</b> rất mong mọi người có thể <b>Click</b> vào link hoặc hình ảnh bên dưới để ủng
                        hộ <b>Phê Truyện</b>.
                        <br>
                    </p>
                    <p>
                        <a :href="aff?.link" target="_blank" style="display:block;" @click="handleAffLayerClick">
                            <img :src="aff?.banner" alt="" style="display: block; width: 320px; margin: 15px auto 10px">
                        </a>
                    </p>
                    <p>
                        <a :href="aff?.link" target="_blank" class="text-primary" @click="handleAffLayerClick">
                            <b>{{ aff?.link }}</b>
                        </a>
                    </p>
                    <p>
                        Quảng cáo sẽ được tắt sau khi <b>Click</b>.
                        <br>
                        <b>Phê Truyện</b> xin chân thành cảm ơn!
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-header {
    border-bottom: none;
    padding-bottom: 0;
}

.modal-body {
    padding-top: 3px;
}
</style>
