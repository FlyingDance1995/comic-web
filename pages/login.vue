<script setup>
import {useLoginStore} from '@/store/account'

const email = ref('admin@admin.vn');
const password = ref('Admin@1235!!');
const accountStore = useLoginStore();
const showPass = ref(false);

const handleLogin = async () => {
    await accountStore.fetchLogin(
        {
            email: email.value,
            password: password.value,
        }
    );
};

const {account, loading, error} = storeToRefs(accountStore);
</script>

<template>
    <div class="section-authentication-signin d-flex align-items-center justify-content-center my-5 my-lg-0">
        <div class="container">
            <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
                <div class="col mx-auto">
                    <div class="card mb-0">
                        <div class="card-body">
                            <div class="p-4">
                                <div class="mb-3 text-center">
                                    <img src="/images/logo/Logo-MonkeyD.png" width="220" alt="">
                                </div>

                                <div class="text-center mb-4">
                                    <p class="mb-0">Vui lòng đăng nhập vào tài khoản của bạn</p>
                                </div>

                                <div class="form-body">
                                    <form class="row g-3" action="" method="POST" @submit.prevent="handleLogin">
<!--                                        <div class="mgt-10 alert alert-danger alert-dismissible" role="alert">-->
<!--                                            <p class="mb-1">Địa chỉ Email đã tồn tại</p>-->
<!--                                            <p class="mb-1">Xác nhận mật khẩu không đúng</p>-->
<!--                                        </div>-->

                                        <div class="col-12">
                                            <label for="inputEmailAddress" class="form-label">
                                                Username hoặc Email
                                            </label>
                                            <input type="text" name="email" class="form-control" id="inputEmailAddress"
                                                   placeholder="jhon@example.com">
                                        </div>

                                        <div class="col-12">
                                            <label for="inputChoosePassword" class="form-label">Mật khẩu</label>
                                            <div class="input-group" id="show_hide_password">
                                                <input :type="showPass ? 'text': 'password'" class="form-control border-end-0" name="password"
                                                       id="inputChoosePassword" placeholder="Nhập mật khẩu">
                                                <a href="javascript:;" class="input-group-text bg-transparent"
                                                   @click="showPass = !showPass">
                                                    <i v-if="!showPass" class="bx bx-hide"></i>
                                                    <i v-else class="bx bx-show"></i>
                                                </a>
                                            </div>
                                        </div>

                                        <div class="col-md-6 text-end">
                                            <a href="/quen-mat-khau">
                                                Quên mật khẩu?
                                            </a>
                                        </div>

                                        <div class="col-12">
                                            <div class="d-grid">
                                                <button type="submit" class="btn btn-primary">Đăng nhập</button>
                                            </div>
                                        </div>

                                        <div class="col-12">
                                            <div class="text-center ">
                                                <p class="mb-0">Chưa có tài khoản? <a
                                                    href="/tao-tai-khoan">Đăng ký ngay</a>
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
