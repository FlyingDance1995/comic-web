<script setup>
import { useConfigStore } from "~/store/config.js";
import { useUserStore } from "~/store/user.js";

const userStore = useUserStore();
const configStore = useConfigStore();

const aff = computed(() => configStore.$state.affList?.find(x => x?.location === 1));
const affModal = computed(() => configStore.$state.affModal);
const checkVIP = computed(() => userStore.checkVIP());

const isOpen = ref(false);
const isBlock = ref(false);

configStore.setAffModal(true);

const handleClickOutside = () => {
    configStore.setAffModal(false);
    setTimeout(() => {
        configStore.setAffModal(true);
    }, 90000);
};

const handleAffLayerClick = () => {
    configStore.setAffModal(false);
    setTimeout(() => {
        configStore.setAffModal(true);
    }, 1800000);
};

const checkSessionStorage = () => {
    if (affModal.value) return;

    configStore.setAffModal(true);
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
        document.body.style.overflow = '';
        setTimeout(() => {
            isBlock.value = false;
        }, 150);
    }
}, { immediate: true });
</script>

<template>
    <div class="modal fade" :class="isOpen ? 'show' : ''" id="reportModal" tabindex="-1" role="dialog"
        :aria-modal="affModal" :aria-hidden="!affModal" :style="{ display: isBlock ? 'block' : 'none' }">
        <div class="modal-dialog" role="document" style="margin-top: 30px">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" @click="handleClickOutside" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>

                <div class="modal-body text-center" style="font-size: 15px">
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
                        Quảng cáo sẽ được tắt một khoảng thời gian sau khi <b>Click</b>.
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
