<script setup>
import {useConfigStore} from "~/store/config.js";
import {clickOutSide as vClickOutSide} from '@mahdikhashan/vue3-click-outside'

const configStore = useConfigStore();

const reportErrorModal = computed(() => configStore.$state.reportErrorModal);
const storyReportError = computed(() => configStore.$state.storyReportError);

const isOpen = ref(false);
const isBlock = ref(false);
const form = reactive({
    "chapter": "",
    "category": "Sử dụng từ ngữ thô tục",
    "detail": ""
});

const handleClickOutside = () => {
    if (reportErrorModal.value) configStore.setReportErrorModal(false);
};

const handleSubmit = async () => {
    try {
        if (form.chapter === '') {
            return configStore.setSwal({
                open: true,
                title: 'Oops...',
                text: 'Vui lòng chọn chapter bị lỗi!',
                type: 'error'
            });
        }

        configStore.setLoadingModal(true);
        await useNuxtApp().$api('/report-error', {
            method: "POST",
            body: {
                ...form
            }
        });
        configStore.setLoadingModal(false);
        setTimeout(() => {
            configStore.setSwal({
                open: true,
                title: 'Thành công',
                text: 'Cảm ơn bạn đã báo cáo lỗi với Phê Truyện - Chuyên cập nhật các truyện tiểu thuyết, ngôn tình, truyện ngắn hot nhất. Team sẽ xem xét báo cáo và sửa lỗi trong thời gian sớm nhất.',
                type: 'success'
            });
        }, 150);
    } catch (error) {
        configStore.setLoadingModal(false);
        console.log("error", error);
    }
};

watch(reportErrorModal, () => {
    if (reportErrorModal.value) {
        form.chapter = "";
        form.category = "Sử dụng từ ngữ thô tục";
        form.detail = "";
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
         id="reportModal" tabindex="-1" role="dialog"
         aria-labelledby="reportModalLabel" :aria-modal="reportErrorModal" :aria-hidden="!reportErrorModal"
         :style="{display: isBlock ? 'block' : 'none'}">
        <div class="modal-dialog" role="document">
            <div v-click-out-side="handleClickOutside"
                 class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="reportModalLabel">Báo cáo lỗi</h5>
                </div>

                <div class="modal-body">
                    <div id="frm-modal-donate">
                        <div class="input-donate">
                            <input type="hidden" name="story_id" id="report_story_id" value="2047">
                            <div class="input-group mb-3">
                                <select v-model="form.category"
                                        name="error" id="error" class="form-select">
                                    <option value="Sử dụng từ ngữ thô tục">Sử dụng từ ngữ thô tục</option>
                                    <option value="Truyện không chính chủ">Truyện không chính chủ</option>
                                    <option value="Nội dung có yếu tố chính trị">Nội dung có yếu tố chính trị</option>
                                    <option value="Nội dung xuyên tạc lịch sử">Nội dung xuyên tạc lịch sử</option>
                                    <option value="Nội dung không phù hợp với độ tuổi">Nội dung không phù hợp với độ
                                        tuổi
                                    </option>
                                    <option value="Nội dung không phù hợp với độ tuổi">Nội dung tuyên truyền mê tín dị
                                        đoan
                                    </option>
                                    <option value="Lỗi khác">Lỗi khác</option>
                                </select>
                            </div>

                            <div class="input-group mb-3">
                                <select v-model="form.chapter"
                                        name="error_chapter" id="error_chapter" class="form-select">
                                    <option value="">-- Chọn chapter --</option>
                                    <option v-for="item in storyReportError?.results"
                                            :value="item?.chapter_number">{{item?.chapter_number}}</option>
                                </select>
                            </div>

                            <div class="input-group mb-3">
                                <textarea v-model="form.detail"
                                          name="error_note" id="error_note" cols="30" rows="4"
                                          placeholder="Mô tả chi tiết lỗi (Nếu có)" class="form-control"></textarea>
                            </div>

                            <div class="input-group mb-3">
                                <p class="bg-warning radius-10 p-2">
                                    Vui lòng mô tả chi tiết lỗi. Nếu báo lỗi đúng sẽ được thưởng ngay 1 coin. <br>
                                    Đối với mỗi báo cáo "Truyện không chính chủ" chính xác sẽ nhận ngay 10 coin.
                                </p>
                            </div>

                            <div class="mb-3 d-flex justify-content-center">
                                <button type="submit" class="btn btn-danger btn-sm m-2" @click="handleSubmit">
                                    Gửi báo cáo
                                </button>
                                <button type="button" class="btn btn-secondary btn-sm m-2 close" data-dismiss="modal"
                                        aria-label="Close" @click="configStore.setReportErrorModal(false)">
                                    Huỷ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
