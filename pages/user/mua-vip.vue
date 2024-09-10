<script setup>
import {useConfigStore} from "~/store/config.js";
import {useUserStore} from "~/store/user.js";

const userStore = useUserStore();
const configStore = useConfigStore();

const user = computed(() => userStore.$state.user);
const form = reactive({
    fb: "",
    sdt: "",
    message: ""
});
const success = ref(false);

const handleSubmit = async () => {
    try {
        if (!user.value) {
            return configStore.setSwal({
                open: true,
                title: 'Oops...',
                text: 'Bạn cần đăng nhập để có thể thực hiện hành động này.',
                type: 'error'
            });
        }

        configStore.setLoadingModal(true);
        await useNuxtApp().$api('/report-vip', {
            method: 'POST',
            body: {
                ...form
            }
        });
        form.fb = "";
        form.sdt = "";
        form.message = "";
        success.value = true;
        configStore.setLoadingModal(false);
    } catch (e) {
        configStore.setLoadingModal(false);
        setTimeout(() => {
            configStore.setSwal({
                open: true,
                title: 'Oops...',
                text: 'Có lỗi xảy ra, vui lòng thử lại sau!',
                type: 'error'
            });
        }, 150);
        console.log(e);
    }
};
</script>

<template>
    <div class="row">
        <div class="col-xl-6 mx-auto">
            <h6 class="mb-0 text-uppercase">Nâng cấp VIP</h6>
            <hr>
            <div class="card">
                <div class="card-body">
                    <div class="card bg-warning text-center">
                        <div class="card-body">
                            <div class="p-2 text-dark rounded">
                                Nâng cấp VIP bạn sẽ đọc truyện mà không có quảng cáo và được đọc truyện mới nhất
                            </div>
                        </div>
                    </div>

                    <form v-if="!success" action="" method="POST" @submit.prevent="handleSubmit">
                        <div class="mb-3">
                            <input v-model="form.sdt"
                                   type="text" name="phone" class="form-control" placeholder="Số điện thoại"
                                   required>
                        </div>
                        <div class="mb-3">
                            <input v-model="form.fb"
                                   type="text" name="facebook" class="form-control" placeholder="Link Facebook"
                                   required>
                        </div>
                        <div class="mb-4">
                            <textarea v-model="form.message"
                                      name="note" id="note" cols="30" rows="5" class="form-control"
                                      placeholder="Lời nhắn cho Phê Truyện" required/>
                        </div>
                        <div class="input-group mb-3 justify-content-center">
                            <button type="submit" class="btn btn-primary px-5">Gửi yêu cầu</button>
                        </div>
                    </form>

                    <template v-if="success">
                        <div class="mgt-10  alert alert-success alert-dismissible" role="alert">
                            Cảm ơn bạn đã gửi yêu cầu nâng cấp VIP. Team sẽ xem xét và duyệt
                            yêu cầu của bạn trong thời gian sớm nhất!
                        </div>

                        <div class="card bg-info">
                            <div class="card-body">
                                <div class="p-2 text-dark rounded">
                                    <p class="mb-2">
                                        Bạn đã gửi yêu cầu nâng cấp VIP, vui lòng chờ team xem xét và duyệt yêu cầu
                                        của bạn!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.dark-theme .text-dark {
    color: #c0c8d1 !important;
}
</style>
