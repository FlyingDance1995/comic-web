<script setup>
const router = useRouter();

const form = reactive({
    email: '',
    password: '',
    otp: '',
});
const showPass = ref(false);
const loading = ref(false);
const loadingRetry = ref(false);
const formForgot = ref(false);
const error = ref({});

const handleCreateOTP = async () => {
    try {
        if (loading.value) return;

        loading.value = true;
        await useNuxtApp().$api('/users/create-otp', {
            method: "POST",
            body: {
                email: form.email,
            }
        });
        loading.value = false;
        formForgot.value = true;
    } catch (e) {
        console.log("error", e?.response);
        loading.value = false;
    }
};

const handleForgotPass = async () => {
    if (loading.value) return;

    validateField();
    if (error.value && Object.keys(error.value)?.length > 0) return;

    try {
        loading.value = true;
        const response = await useNuxtApp().$api('/users/forgot-password', {
            method: "POST",
            body: {
                email: form.email,
                otp: form.otp,
                password: form.password
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
        await useNuxtApp().$api('/users/create-otp', {
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

    if (!form.otp) {
        error.value['otp'] = "Hãy nhập mã OTP";
    }

    if (!form.password) {
        error.value['password'] = 'Mật khẩu không được để trống';
    } else if (form.password.length < 6) {
        error.value['password'] = 'Mật khẩu phải tối thiểu 6 ký tự';
    }
};
</script>

<template>
    <Head>
        <Title>Quên mật khẩu</Title>
    </Head>

    <div class="section-authentication-cover">
        <div>
            <div class="row g-0">
                <div
                    class="col-12 col-xl-7 col-xxl-8 auth-cover-left align-items-center justify-content-center d-none d-xl-flex">
                    <div class="card shadow-none bg-transparent shadow-none rounded-0 mb-0">
                        <div class="card-body">
                            <img src="/images/forgot-password-cover.svg"
                                 class="img-fluid" width="600" alt="">
                        </div>
                    </div>
                </div>

                <div class="col-12 col-xl-5 col-xxl-4 auth-cover-right align-items-center justify-content-center">
                    <div class="card rounded-0 m-3 shadow-none bg-transparent mb-0">
                        <div class="card-body p-sm-5">
                            <div class="p-3">
                                <div class="text-center">
                                    <img src="/images/forgot-2.png" width="100" alt="">
                                </div>
                                <h4 class="mt-5 font-weight-bold">Quên mật khẩu?</h4>
                                <p class="text-muted">Nhập Email đăng ký của bạn để đặt lại mật khẩu</p>

                                <form v-if="!formForgot" action="" method="POST" @submit.prevent="handleCreateOTP">
                                    <div class="my-4">
                                        <label class="form-label">Email</label>
                                        <input v-model="form.email"
                                               type="email" name="email" class="form-control"
                                               placeholder="example@user.com" required>
                                    </div>
                                    <div class="d-grid gap-2">
                                        <button type="submit"
                                                class="btn btn-primary"
                                                :style="{
                                                    pointerEvents: loading ? 'none' : 'auto'
                                                }">
                                            {{loading ? 'Loading...' : 'Tiếp theo'}}
                                        </button>
                                        <NuxtLink to="/login" class="btn btn-light">
                                            <i class="bx bx-arrow-back me-1"></i>
                                            Quay lại trang đăng nhập
                                        </NuxtLink>
                                    </div>
                                </form>

                                <form v-if="formForgot" action="" method="POST" @submit.prevent="handleForgotPass">
                                    <div v-if="error && Object.keys(error)?.length > 0"
                                         class="mgt-10 alert alert-danger alert-dismissible" role="alert">
                                        <p v-for="item in Object.keys(error)"
                                           :key="item"
                                           class="mb-1">
                                            {{error[item]}}
                                        </p>
                                    </div>

                                    <div class="mt-4 mb-2">
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

                                    <div class="mb-4">
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

                                    <div class="d-grid gap-2">
                                        <button type="submit"
                                                class="btn btn-primary"
                                                :style="{
                                                    pointerEvents: loading ? 'none' : 'auto'
                                                }">
                                            {{loading ? 'Loading...' : 'Đặt lại mật khẩu'}}
                                        </button>
                                        <NuxtLink to="/login" class="btn btn-light">
                                            <i class="bx bx-arrow-back me-1"></i>
                                            Quay lại trang đăng nhập
                                        </NuxtLink>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
