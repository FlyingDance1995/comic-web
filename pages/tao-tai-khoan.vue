<script setup>
import {useRegisterStore} from '@/store/account'

const form = reactive({
    email: '',
    fullname: '',
    password: '',
    rePassword: ''
});
const showPass = ref(false);
const showRePass = ref(false);
const loading = ref(false);
const error = ref({});

const handleRegister = async () => {
    validateField();
    if (error.value && Object.keys(error.value)?.length > 0) return;

    try {
        loading.value = true;

        const response = await useNuxtApp().$api('/users/register', {
            method: "POST",
            body: {
                email: form.email,
                password: form.password,
                fullname: form.fullname,
            }
        });
        console.log('data', response)
        loading.value = false;
    } catch (e) {
        if (e?.response?.status !== 500 && e?.response?._data?.email) {
            error.value['email'] = "Email đã được sử dụng";
        }

        loading.value = false;
    }
};

const validateField = () => {
    error.value = {};

    if (!form.email) {
        error.value['email'] = 'Email không được để trống';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        error.value['email'] = 'Email không đúng định dạng';
    }

    if (!form.fullname) {
        error.value['fullname'] = 'Tên hiển thị không được để trống';
    }

    if (!form.password) {
        error.value['password'] = 'Mật khẩu không được để trống';
    } else if (form.password.length < 6) {
        error.value['password'] = 'Mật khẩu phải lớn hơn 6 ký tự';
    }

    if (!form.rePassword) {
        error.value['rePassword'] = 'Xác nhận mật khẩu không được để trống';
    } else if (form.password !== form.rePassword) {
        error.value['rePassword'] = 'Xác nhận mật khẩu không đúng';
    }
};
</script>

<template>
    <div class="d-flex align-items-center justify-content-center my-5">
        <div class="container-fluid">
            <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
                <div class="col mx-auto">
                    <div class="card mb-0">
                        <div class="card-body">
                            <div class="p-4">
                                <div class="mb-3 text-center">
                                    <img src="/images/logo/Logo-MonkeyD.png" width="120" alt="">
                                </div>

                                <div class="text-center mb-4">
                                    <p class="mb-0">Điền thông tin bên dưới để tạo tài khoản</p>
                                </div>

                                <div class="form-body">
                                    <form class="row g-3" action="" method="POST" @submit.prevent="handleRegister">
                                        <div v-if="error && Object.keys(error)?.length > 0"
                                             class="mgt-10 alert alert-danger alert-dismissible" role="alert">
                                            <p v-for="item in Object.keys(error)"
                                               :key="item"
                                               class="mb-1">
                                                {{error[item]}}
                                            </p>
                                        </div>

                                        <div class="col-12">
                                            <label for="inputUsername" class="form-label">Email</label>
                                            <input v-model="form.email"
                                                   type="email" class="form-control" name="email" id="inputUsername"
                                                   placeholder="example@user.com">
                                        </div>

                                        <div class="col-12">
                                            <label for="inputEmailAddress" class="form-label">Tên hiển thị</label>
                                            <input v-model="form.fullname"
                                                   type="text" class="form-control" name="name" id="inputEmailAddress"
                                                   placeholder="Tên của bạn">
                                        </div>

                                        <div class="col-12">
                                            <label for="inputChoosePassword" class="form-label">Mật khẩu</label>
                                            <div class="input-group" id="show_hide_password">
                                                <input v-model="form.password"
                                                       :type="showPass ? 'text': 'password'"
                                                       class="form-control border-end-0" name="password"
                                                       id="inputChoosePassword" placeholder="Mật khẩu của bạn">
                                                <a href="javascript:;" class="input-group-text bg-transparent"
                                                   @click="showPass = !showPass">
                                                    <i v-if="!showPass" class="bx bx-hide"></i>
                                                    <i v-else class="bx bx-show"></i>
                                                </a>
                                            </div>
                                        </div>

                                        <div class="col-12">
                                            <label for="inputConfirmPassword" class="form-label">
                                                Nhập lại mật khẩu
                                            </label>

                                            <div class="input-group" id="show_hide_confirm_password">
                                                <input v-model="form.rePassword"
                                                       :type="showRePass ? 'text': 'password'"
                                                       name="password_confirmation"
                                                       class="form-control border-end-0" id="inputConfirmPassword"
                                                       placeholder="Nhập lại mật khẩu">
                                                <a href="javascript:;" class="input-group-text bg-transparent"
                                                   @click="showRePass = !showRePass">
                                                    <i v-if="!showRePass" class="bx bx-hide"></i>
                                                    <i v-else class="bx bx-show"></i>
                                                </a>
                                            </div>
                                        </div>

                                        <div class="col-12">
                                            <div class="d-grid">
                                                <button type="submit"
                                                        class="btn btn-primary"
                                                        :style="{
                                                            pointerEvents: loading ? 'none' : 'auto'
                                                        }">
                                                     {{ loading ? 'Loading...' : 'Đăng ký'}}
                                                </button>
                                            </div>
                                        </div>

                                        <div class="col-12">
                                            <div class="text-center">
                                                <p class="mb-0">
                                                    Đã có tài khoản?
                                                    <a href="/login">Đăng nhập ngay</a>
                                                </p>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
