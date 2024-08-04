<script setup>
import {useUserStore} from "@/store/user.js";

const router = useRouter();

let userStore = null;
if (process.client) {
    userStore = useUserStore();
}

const form = reactive({
    email: '',
    password: '',
});
const showPass = ref(false);
const loading = ref(false);
const error = ref({});

const handleLogin = async () => {
    if (loading.value) return;

    validateField();
    if (error.value && Object.keys(error.value)?.length > 0) return;

    try {
        loading.value = true;
        const response = await useNuxtApp().$api('/auth/login', {
            method: "POST",
            body: {
                email: form.email,
                password: form.password,
            }
        });
        userStore.setUser(response?.user);
        userStore.setToken(response?.token);
        userStore.setExpiry(response?.expiry);
        // loading.value = false;
        // window.location.href = '/';
        await router.push('/');
    } catch (e) {
        if (e?.response?.status !== 500 && e?.response?._data) {
            error.value['error'] = "Email hoặc mật khẩu không chính xác";
        }
        console.log("error", e?.response);
        loading.value = false;
    }
};

const validateField = () => {
    error.value = {};

    if (!form.email) {
        error.value['email'] = 'Email không được để trống';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
        error.value['email'] = 'Email không đúng định dạng';
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
        <Title>Đăng nhập</Title>
    </Head>

    <div class="section-authentication-signin d-flex align-items-center justify-content-center my-5 my-lg-0">
        <div class="container">
            <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
                <div class="col mx-auto">
                    <div class="card mb-0">
                        <div class="card-body">
                            <div class="p-4">
                                <div class="mb-3 text-center">
                                    <img src="/images/logo/Logo.png" width="220" alt="">
                                </div>

                                <div class="text-center mb-4">
                                    <p class="mb-0">Vui lòng đăng nhập vào tài khoản của bạn</p>
                                </div>

                                <div class="form-body">
                                    <form class="row g-3" action="" method="POST" @submit.prevent="handleLogin">
                                        <div v-if="error && Object.keys(error)?.length > 0"
                                             class="mgt-10 alert alert-danger alert-dismissible" role="alert">
                                            <p v-for="item in Object.keys(error)"
                                               :key="item"
                                               class="mb-1">
                                                {{ error[item] }}
                                            </p>
                                        </div>

                                        <div class="col-12">
                                            <label for="inputEmailAddress" class="form-label">
                                                Email
                                            </label>
                                            <input v-model="form.email"
                                                   type="text" name="email"
                                                   class="form-control" id="inputEmailAddress"
                                                   placeholder="jhon@example.com">
                                        </div>

                                        <div class="col-12">
                                            <label for="inputChoosePassword" class="form-label">Mật khẩu</label>
                                            <div class="input-group" id="show_hide_password">
                                                <input v-model="form.password"
                                                       :type="showPass ? 'text': 'password'"
                                                       class="form-control border-end-0"
                                                       name="password"
                                                       id="inputChoosePassword" placeholder="Nhập mật khẩu">
                                                <a href="javascript:;" class="input-group-text bg-transparent"
                                                   @click="showPass = !showPass">
                                                    <i v-if="!showPass" class="bx bx-hide"></i>
                                                    <i v-else class="bx bx-show"></i>
                                                </a>
                                            </div>
                                        </div>

                                        <div class="col-md-6 text-end">
                                            <NuxtLink to="/quen-mat-khau">
                                                Quên mật khẩu?
                                            </NuxtLink>
                                        </div>

                                        <div class="col-12">
                                            <div class="d-grid">
                                                <button type="submit" class="btn btn-primary"
                                                        :style="{
                                                            pointerEvents: loading ? 'none' : 'auto'
                                                        }">
                                                    {{ loading ? 'Loading...' : 'Đăng nhập' }}
                                                </button>
                                            </div>
                                        </div>

                                        <div class="col-12">
                                            <div class="text-center ">
                                                <p class="mb-0">Chưa có tài khoản? <NuxtLink
                                                    to="/tao-tai-khoan">Đăng ký ngay</NuxtLink>
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
