<script setup>
import {useConfigStore} from "~/store/config.js";

const configStore = useConfigStore();

const swal = computed(() => configStore.$state.swal);

const handleOk = async () => {
    if (swal.value.type === 'error' || swal.value.type === 'success') {
        closeModal();
    }
    if (swal.value.onSubmit) {
        await swal.value.onSubmit();
    }
    if (swal.value.type === 'info') {
        closeModal();
        const response = await swal.value.onSubmit();
        setTimeout(() => {
            configStore.setSwal({
                open: true,
                title: response ? 'Thành công' : 'Thất bại',
                text: response ? response : 'Có lỗi xảy ra',
                type: response ? 'success' : 'error',
            });
        }, 200);
    }
};

const closeModal = () => {
    const swalContainer = document.querySelector('.swal2-container');
    const swalModal = document.querySelector('.swal2-modal');

    swalContainer.classList.remove('swal2-backdrop-show');
    swalContainer.classList.add('swal2-backdrop-hide');
    swalModal.classList.remove('swal2-show');
    swalModal.classList.add('swal2-hide');
    setTimeout(() => {
        configStore.setOpenSwal(false);
    }, 300);
};

watch(swal, () => {
    if (swal.value.open) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}, {immediate: true, deep: true});
</script>

<template>
    <div v-if="swal.open"
         class="swal2-container swal2-center swal2-backdrop-show"
         style="overflow-y: auto;"
         @click="closeModal">
        <div aria-labelledby="swal2-title" aria-describedby="swal2-content"
             class="swal2-popup swal2-modal swal2-icon-error swal2-show" tabindex="-1" role="dialog"
             aria-live="assertive" aria-modal="true" style="display: flex;"
             @click.stop="">
            <div class="swal2-header">
                <ul class="swal2-progress-steps" style="display: none;"></ul>
                <div v-if="swal.type === 'error'"
                     class="swal2-icon swal2-error swal2-icon-show"
                     style="display: flex">
                    <span class="swal2-x-mark">
                    <span class="swal2-x-mark-line-left"></span>
                    <span class="swal2-x-mark-line-right"></span>
                  </span>
                </div>
                <div v-if="swal.type === 'info'"
                     class="swal2-icon swal2-question swal2-icon-show"
                     style="display: flex">
                    <div class="swal2-icon-content">?</div>
                </div>
                <div v-if="swal.type === 'warning'"
                     class="swal2-icon swal2-warning swal2-icon-show" style="display: flex;"></div>
                <div v-if="swal.type === 'info2'"
                     class="swal2-icon swal2-info swal2-icon-show" style="display: flex;"></div>
                <div v-if="swal.type === 'success'"
                     class="swal2-icon swal2-success swal2-icon-show" style="display: flex;">
                    <div class="swal2-success-circular-line-left" style="background-color: rgb(255, 255, 255);"></div>
                    <span class="swal2-success-line-tip"></span>
                    <span class="swal2-success-line-long"></span>
                    <div class="swal2-success-ring"></div>
                    <div class="swal2-success-fix" style="background-color: rgb(255, 255, 255);"></div>
                    <div class="swal2-success-circular-line-right" style="background-color: rgb(255, 255, 255);"></div>
                </div>
                <img class="swal2-image" style="display: none;" alt="">
                <h2 class="swal2-title" id="swal2-title" style="display: flex;">{{ swal.title }}</h2>
                <button type="button" class="swal2-close" aria-label="Close this dialog" style="display: none;">×
                </button>
            </div>

            <div class="swal2-content">
                <div id="swal2-content" class="swal2-html-container" style="display: block;">
                    {{ swal.text }}
                </div>
                <input class="swal2-input" style="display: none;"><input type="file" class="swal2-file"
                                                                         style="display: none;">
                <div class="swal2-range" style="display: none;"><input type="range">
                    <output></output>
                </div>
                <select class="swal2-select" style="display: none;"></select>
                <div class="swal2-radio" style="display: none;"></div>
                <label for="swal2-checkbox" class="swal2-checkbox" style="display: none;"><input type="checkbox"><span
                    class="swal2-label"></span></label><textarea class="swal2-textarea"
                                                                 style="display: none;"></textarea>
                <div class="swal2-validation-message" id="swal2-validation-message"></div>
            </div>

            <div class="swal2-actions">
                <button type="button"
                        class="swal2-confirm swal2-styled"
                        aria-label=""
                        style="display: inline-block; border-left-color: rgb(48, 133, 214); border-right-color: rgb(48, 133, 214);"
                        @click.stop="handleOk">
                    OK
                </button>

                <button v-if="swal.type !== 'error' && swal.type !== 'success'"
                        type="button"
                        class="swal2-cancel swal2-styled"
                        aria-label=""
                        @click.stop="closeModal">
                    Cancel
                </button>
            </div>

            <div class="swal2-footer" style="display: none;"></div>
            <div class="swal2-timer-progress-bar-container">
                <div class="swal2-timer-progress-bar" style="display: none;"></div>
            </div>
        </div>
    </div>
</template>
