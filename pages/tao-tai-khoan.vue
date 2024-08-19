<script setup>
const router = useRouter();

const form = reactive({
    email: '',
    fullname: '',
    password: '',
    rePassword: '',
    otp: ''
});
const showPass = ref(false);
const showRePass = ref(false);
const loading = ref(false);
const loadingRetry = ref(false);
const formOTP = ref(false);
const error = ref({});

const handleRegister = async () => {
    if (loading.value) return;

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
        formOTP.value = true;
        loading.value = false;
    } catch (e) {
        if (e?.response?.status !== 500 && e?.response?._data?.email) {
            error.value['email'] = "Email đã được sử dụng";
        }
        console.log("error", e?.response);
        loading.value = false;
    }
};

const handleVerify = async () => {
    if (loading.value) return;

    try {
        error.value = {};
        if (!form.otp) return error.value['otp'] = "Hãy nhập mã OTP";

        loading.value = true;
        const response = await useNuxtApp().$api('/users/register/verify-otp', {
            method: "POST",
            body: {
                email: form.email,
                otp: form.otp,
            }
        });
        // window.location.href = '/login';
        await router.push('/login');
    } catch (e) {
        if (e?.response?.status !== 500 && e?.response?._data?.error) {
            error.value['otp'] = e?.response?._data?.error;
        }
        console.log("error", e?.response);
        loading.value = false;
    }
};

const handleRetryOTP = async () => {
    try {
        if (loadingRetry.value) return;

        loadingRetry.value = true;
        const response = await useNuxtApp().$api('/users/create-otp', {
            method: "POST",
            body: {
                email: form.email,
            }
        });
        loadingRetry.value = false;
    } catch (e) {
        console.log("error", e?.response);
        loadingRetry.value = false;
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
        error.value['password'] = 'Mật khẩu phải tối thiểu 6 ký tự';
    }

    if (!form.rePassword) {
        error.value['rePassword'] = 'Xác nhận mật khẩu không được để trống';
    } else if (form.password !== form.rePassword) {
        error.value['rePassword'] = 'Xác nhận mật khẩu không đúng';
    }
};
</script>

<template>
    <Head>
        <Title>Đăng ký</Title>
    </Head>

    <div class="d-flex align-items-center justify-content-center my-5">
        <div class="container-fluid">
            <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
                <div class="col mx-auto">
                    <div class="card mb-0">
                        <div class="card-body">
                            <div class="p-4">
                                <div class="mb-3 text-center">
                                    <img src="/images/logo/Logo.svg" width="120" alt="">
                                </div>

                                <div class="text-center mb-4">
                                    <p class="mb-0">Điền thông tin bên dưới để tạo tài khoản</p>
                                </div>

                                <div class="form-body">
                                    <form v-if="!formOTP"
                                          class="row g-3"
                                          action=""
                                          method="POST"
                                          @submit.prevent="handleRegister">
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
                                                    <NuxtLink to="/login">Đăng nhập ngay</NuxtLink>
                                                </p>
                                            </div>
                                        </div>
                                    </form>

                                    <form v-else
                                          class="row g-3"
                                          action=""
                                          method="POST"
                                          @submit.prevent="handleVerify">
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
                                                   placeholder="example@user.com" disabled>
                                        </div>

                                        <div class="col-12">
                                            <label for="inputChoosePassword" class="form-label">Mã OTP</label>
                                            <div class="input-group" id="show_hide_password">
                                                <input v-model="form.otp"
                                                       type="text"
                                                       class="form-control border-end-0"
                                                       id="inputChoosePassword" placeholder="123456">
                                                <a href="javascript:;" class="input-group-text bg-transparent"
                                                   @click="handleRetryOTP">
                                                    Gửi lại
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
                                                    {{ loading ? 'Loading...' : 'Xác nhận'}}
                                                </button>
                                            </div>
                                        </div>

                                        <div class="col-12">
                                            <div class="text-center">
                                                <p class="mb-0">
                                                    Đã có tài khoản?
                                                    <NuxtLink to="/login">Đăng nhập ngay</NuxtLink>
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
