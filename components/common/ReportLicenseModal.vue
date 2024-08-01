<script setup>
import {useConfigStore} from "~/store/config.js";
import {clickOutSide as vClickOutSide} from '@mahdikhashan/vue3-click-outside'

const configStore = useConfigStore();

const reportModal = computed(() => configStore.$state.reportModal);

const isOpen = ref(false);
const isBlock = ref(false);
const form = reactive({
    "link_story": "",
    "link_violate": "",
    "contact": ""
});
const isChecked = ref(false);

const handleClickOutside = () => {
    if (reportModal.value) configStore.setReportModal(false);
};

const handleSubmit = async () => {
    try {
        configStore.setLoadingModal(true);
        await useNuxtApp().$api('/report-license', {
            method: "POST",
            body: {
                ...form
            }
        });
        configStore.setLoadingModal(false);
        setTimeout(() => {
            configStore.setSwal({
                open: true,
                title: 'Báo cáo thành công',
                text: 'Cảm ơn bạn đã gửi báo cáo vi phạm bản quyền đến MonkeyD. Team sẽ xem xét và liên hệ bạn trong thời gian sớm nhất!',
                type: 'success'
            });
        }, 150);
    } catch (error) {
        configStore.setLoadingModal(false);
        console.log("error", error);
    }
};

watch(reportModal, () => {
    if (reportModal.value) {
        form.link_story = "";
        form.link_violate = "";
        form.contact = "";
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
</script>

<template>
    <div class="modal fade"
         :class="isOpen ? 'show' : ''"
         id="reportLicenseModal" tabindex="-1" role="dialog"
         aria-labelledby="reportLicenseModalLabel" :aria-modal="reportModal" :aria-hidden="!reportModal"
         :style="{display: isBlock ? 'block' : 'none'}">
        <div class="modal-dialog" role="document">
            <div v-click-out-side="handleClickOutside"
                 class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="reportLicenseModalLabel">Báo cáo tác phẩm vi phạm bản quyền</h5>
                </div>

                <div class="modal-body">
                    <form action="" method="POST" id="reportLicenseForm" @submit.prevent="handleSubmit">
                        <div class="mb-3">
                            <label for="violate_link" class="d-block"><b>Link tác phẩm vi phạm</b></label>
                            <input v-model="form.link_story"
                                   type="text" class="form-control" name="violate_link" id="violate_link"
                                   placeholder="Ex: https://monkeyd.vn/tac-pham-vi-pham.1/" required="">
                        </div>

                        <div class="mb-3">
                            <label for="original_link" class="d-block"><b>Link tác phẩm gốc</b></label>
                            <input v-model="form.link_violate"
                                   type="text" class="form-control" name="original_link" id="original_link"
                                   placeholder="Ex: https://example.net/tac-pham-goc.1/" required="">
                        </div>

                        <div class="mb-3">
                            <label for="report_email" class="d-block"><b>Email liên hệ</b></label>
                            <input v-model="form.contact"
                                   type="email" class="form-control" name="report_email" id="report_email" required="">
                        </div>

                        <div class="mb-3">
                            <label for="confirm_report">
                                <input v-model="isChecked"
                                       type="checkbox" name="confirm_report" id="confirm_report" required="">
                                Tôi cam kết báo cáo này là đúng sự thật
                            </label>
                        </div>

                        <div class="mb-3 d-flex justify-content-center">
                            <button type="submit" class="btn btn-danger btn-sm m-2">Gửi báo cáo</button>
                            <button type="button" class="btn btn-secondary btn-sm m-2 close" data-dismiss="modal"
                                    aria-label="Close" @click="configStore.setReportModal(false)">
                                Huỷ
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
