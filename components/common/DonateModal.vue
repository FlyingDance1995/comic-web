<script setup>
import {useConfigStore} from "~/store/config.js";
import {clickOutSide as vClickOutSide} from '@mahdikhashan/vue3-click-outside'

const configStore = useConfigStore();

const donateModal = computed(() => configStore.$state.donateModal);

const isOpen = ref(false);
const isBlock = ref(false);

const isChecked = ref(false);

const handleClickOutside = () => {
    if (donateModal.value) configStore.setDonateModal(false);
};

const handleSubmit = async () => {
    try {
        configStore.setLoadingModal(true);
        // await useNuxtApp().$api('/donate', {
        //     method: "POST",
        //     body: {
        //
        //     }
        // });
        configStore.setLoadingModal(false);
        setTimeout(() => {
            configStore.setSwal({
                open: true,
                title: 'Donate thành công',
                text: 'Cảm ơn bạn đã donate cho Team',
                type: 'success'
            });
            configStore.setDonateModal(false);
        }, 500);

    } catch (error) {
        configStore.setLoadingModal(false);
        setTimeout(() => {
            configStore.setSwal({
                open: true,
                title: 'Donate không thành công',
                text: 'Số dư của bạn không đủ',
                type: 'error'
            });
        }, 500);
        console.log("error", error);
    }
};

    watch(donateModal, () => {
        if (donateModal.value) {
            isChecked.value = false;
            isBlock.value = true;
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                isOpen.value = true;
            }, 150);
        } else {
            isOpen.value = false;
            document.body.style.overflow = '';
            setTimeout(() => {
                isBlock.value = false;
            }, 150);
        }
    });

const inputDonate = ref();

const handleBlur = () => {
    let inputValue = inputDonate.value;
    if (inputValue[0] === '0') {
        inputValue = inputValue.replaceAll(/\D/g,'')
        inputValue = parseInt(inputValue);
        console.log(inputValue)
        if (inputValue === 0) {
            inputDonate.value = '';
        } else {
            inputDonate.value = inputValue.toString()
        }
    }
}

watch(inputDonate, () => {
    // xoa khong phai so
    inputDonate.value = inputDonate.value?.replace(/\D/g, '');
    // format ...
    inputDonate.value = inputDonate.value?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
});
</script>

<template>
    <div class="modal fade"
         :class="isOpen ? 'show' : ''"
         id="donateModal" tabindex="-1" role="dialog"
         aria-labelledby="donateModalLabel" :aria-modal="donateModal" :aria-hidden="!donateModal"
         :style="{display: isBlock ? 'block' : 'none'}">
        <div class="modal-dialog" role="document">
            <div v-click-out-side="handleClickOutside"
                 class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="reportLicenseModalLabel">Donate ủng hộ Team</h5>
                </div>

                <div class="modal-body">
                    <form action="" method="POST" id="donateForm" @submit.prevent="handleSubmit">
                        <div class="mb-3">
                            <label for="donate_link" class="d-block mb-3"><b>Xu hiện có: </b>0</label>
                            <label for="donate_link" class="d-block mb-2"><span>Số xu muốn donate</span></label>
                            <div class="d-flex align-items-center">
                                <div class="coin-icon">
                                    <i class='bx bx-coin-stack ' style="font-size: 16px"></i>
                                </div>
                                <input v-model="inputDonate"
                                       @blur="handleBlur"
                                       type="text" class="form-control" name="donate_link" id="donate_link"
                                       placeholder="Xu" required=""
                                       style="border-top-left-radius: 0px; border-bottom-left-radius: 0px;">
                            </div>
                        </div>

                        <div class="mb-3 d-flex justify-content-center">
                            <button type="submit" class="btn btn-success btn-sm m-2">Donate</button>
                            <button type="button" class="btn btn-danger btn-sm m-2 close" data-dismiss="modal"
                                    aria-label="Close" @click="configStore.setDonateModal(false)">
                                Huỷ
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.coin-icon {
    border: 1px solid #dee2e6;
    border-right: none;
    height: 38px;
    border-top-left-radius: 0.375rem;
    border-bottom-left-radius: 0.375rem;
    padding: 7px 12px;
    display: flex;
    align-items: center;
    background: #f8f9fa;
    color: #212529;
}
</style>