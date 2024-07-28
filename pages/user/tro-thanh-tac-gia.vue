<script setup>
import {useConfigStore} from "~/store/config.js";
import {useUserStore} from "~/store/user.js";

const runtimeConfig = useRuntimeConfig();

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
        await useNuxtApp().$api('/report-user', {
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
            <h6 class="mb-0 text-uppercase">Đóng góp cùng MonkeyD</h6>
            <hr>
            <div class="card">
                <div class="card-body">
                    <div class="card bg-warning text-center">
                        <div class="card-body">
                            <div class="p-2 text-dark rounded">
                                Trở thành tác giả/nhóm dịch cùng đóng góp truyện với MonkeyD <br>
                                Tác giả/Nhóm dịch không được phép đăng truyện 18+, truyện 16+ có nội dung ướt át, truyện
                                re-up và đặc biệt là truyện có bản quyền.<br>
                                MonkeyD xin được phép xử lý mạnh tay khi phát hiện <b>team</b> cố tình đăng các loại
                                truyện đã được cảnh báo.
                                <br>
                                Sau khi gửi yêu cầu đóng góp vui lòng gửi tin nhắn đến <a
                                :href="runtimeConfig.public.contactFb" target="_blank">Fanpage MonkeyD</a> để xác
                                thực tài khoản.
                            </div>
                        </div>
                    </div>

                    <form v-if="!success" action="" method="POST" @submit.prevent="handleSubmit">
                        <div class="mb-3">
                            <input v-model="form.sdt"
                                   type="text" name="phone" value="" class="form-control" placeholder="Số điện thoại"
                                   required>
                        </div>
                        <div class="mb-3">
                            <input v-model="form.fb"
                                   type="text" name="facebook" value="" class="form-control" placeholder="Link Facebook"
                                   required>
                        </div>
                        <div class="mb-4">
                            <textarea v-model="form.message"
                                      name="note" id="note" cols="30" rows="5" class="form-control"
                                      placeholder="Lời nhắn cho MonkeyD" required/>
                        </div>
                        <div class="input-group mb-3 justify-content-center">
                            <button type="submit" class="btn btn-primary px-5">Gửi yêu cầu</button>
                        </div>
                    </form>

                    <template v-if="success">
                        <div class="mgt-10  alert alert-success alert-dismissible" role="alert">
                            Cảm ơn bạn đã gửi yêu cầu đóng góp và trở thành một phần của MonkeyD. Team sẽ xem xét và duyệt
                            yêu cầu của bạn trong thời gian sớm nhất!
                        </div>

                        <div class="card bg-info">
                            <div class="card-body">
                                <div class="p-2 text-dark rounded">
                                    <p class="mb-2">
                                        Bạn đã gửi yêu cầu đăng ký cho MonkeyD, vui lòng chờ team xem xét và duyệt yêu cầu
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
