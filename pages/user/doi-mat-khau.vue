<script setup>
import {useConfigStore} from "~/store/config.js";

const configStore = useConfigStore();

const showPass = ref(false);
const showPass1 = ref(false);
const showPass2 = ref(false);
const form = reactive({
    current_password: "",
    new_password: "",
    re_new_password: ""
});
const error = ref();
const success = ref(false);

const handleChangePass = async () => {
    try {
        success.value = false;
        validateField();
        if (error.value && Object.keys(error.value)?.length > 0) return;
        configStore.setLoadingModal(true);
        await useNuxtApp().$api('/profile/change_password', {
            method: "POST",
            body: {
                current_password: form.current_password,
                new_password: form.new_password,
            }
        });
        configStore.setLoadingModal(false);
        success.value = true;
        form.current_password = "";
        form.new_password = "";
        form.re_new_password = "";
    } catch (e) {
        if (e?.response?.status !== 500 && e?.response?._data?.error) {
            const tmp = e?.response?._data?.error?.join('');
            if (tmp.includes('The current password is not correct')) {
                error.value['password'] = 'Mật khẩu hiện tại không đúng';
            }
        }
        console.log("error", e?.response);
        configStore.setLoadingModal(false);
    }
};

const validateField = () => {
    error.value = {};

    if (!form.current_password || !form.new_password || !form.re_new_password) {
        error.value['password'] = 'Mật khẩu không được để trống';
    } else if (form.current_password.length < 6 || form.new_password.length < 6 || form.re_new_password.length < 6) {
        error.value['password'] = 'Mật khẩu phải tối thiểu 6 ký tự';
    } else if (form.new_password !== form.current_password) {
        error.value['password'] = 'Xác nhận mật khẩu mới không đúng';
    }
};
</script>

<template>
    <div class="row">
        <div class="col-xl-6 mx-auto">
            <h6 class="mb-0 text-uppercase">Đổi mật khẩu</h6>
            <hr>
            <div class="card">
                <div class="card-body">
                    <form action="" method="POST" @submit.prevent="handleChangePass">
                        <div v-if="error && Object.keys(error)?.length > 0"
                             class="mgt-10 alert alert-danger">
                            <p v-for="item in Object.keys(error)"
                               :key="item"
                               class="mb-1">
                                {{error[item]}}
                            </p>
                        </div>

                        <div v-if="success" class="mgt-10  alert alert-success alert-dismissible" role="alert">
                            Đổi mật khẩu thành công
                        </div>

                        <div class="input-group mb-3">
                            <div class="input-group" id="show_hide_current_password">
                                <input v-model="form.current_password"
                                       :type="showPass ? 'text': 'password'"
                                       class="form-control border-end-0" name="current_password"
                                       id="inputCurrentPassword" placeholder="Mật khẩu hiện tại">
                                <a href="javascript:;" class="input-group-text bg-transparent"
                                   @click="showPass = !showPass">
                                    <i v-if="!showPass" class="bx bx-hide"></i>
                                    <i v-else class="bx bx-show"></i>
                                </a>
                            </div>
                        </div>

                        <div class="input-group mb-3">
                            <div class="input-group" id="show_hide_password">
                                <input v-model="form.new_password"
                                       :type="showPass1 ? 'text': 'password'"
                                       class="form-control border-end-0" name="password"
                                       id="inputChoosePassword" placeholder="Mật khẩu mới">
                                <a href="javascript:;" class="input-group-text bg-transparent"
                                   @click="showPass1 = !showPass1">
                                    <i v-if="!showPass1" class="bx bx-hide"></i>
                                    <i v-else class="bx bx-show"></i>
                                </a>
                            </div>
                        </div>

                        <div class="input-group mb-3">
                            <div class="input-group" id="show_hide_confirm_password">
                                <input v-model="form.re_new_password"
                                       :type="showPass2 ? 'text': 'password'"
                                       name="password_confirmation" class="form-control border-end-0"
                                       id="inputConfirmPassword" placeholder="Nhập lại mật khẩu">
                                <a href="javascript:;" class="input-group-text bg-transparent"
                                   @click="showPass2 = !showPass2">
                                    <i v-if="!showPass2" class="bx bx-hide"></i>
                                    <i v-else class="bx bx-show"></i>
                                </a>
                            </div>
                        </div>

                        <div class="input-group mb-3 justify-content-center">
                            <button type="submit" class="btn btn-primary px-5">Đổi mật khẩu</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
