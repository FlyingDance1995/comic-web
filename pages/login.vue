<script setup lang="ts">
import { useLoginStore } from '@/store/account'

const email = ref('admin@admin.vn');
const password = ref('Admin@1235!!');
const accountStore = useLoginStore();


const handleLogin = async () => {
    await accountStore.fetchLogin(
        {
            email: email.value,
            password: password.value,
        }
    );
};

const { account, loading, error } = storeToRefs(accountStore);
console.log('account', account)

</script>

<template>
    <div class="page-content">
        <div class="section-authentication-signin d-flex align-items-center justify-content-center my-5 my-lg-0">
            <div class="container">
                <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
                    <div class="col mx-auto">
                        <div class="card mb-0">
                            <div class="card-body">
                                <div class="p-4">
                                    <div class="mb-3 text-center">
                                        <img src="https://monkeyd.vn/images/logo/Logo-MonkeyD.png" width="220" alt="">
                                    </div>
                                    <div class="text-center mb-4">
                                        <p class="mb-0">Vui lòng đăng nhập vào tài khoản của bạn</p>
                                    </div>
                                    <div class="form-body">
                                        <form class="row g-3" action="https://monkeyd.vn/login" method="POST">
                                            <input type="hidden" name="_token"
                                                value="WUxnEw8B4kTJLog3u8UugUGuMAE7gwUi6qq5jnMr">

                                            <div class="col-12">
                                                <label for="inputEmailAddress" class="form-label">Username hoặc
                                                    Email</label>
                                                <input type="text" name="email" class="form-control" id="inputEmailAddress"
                                                    placeholder="jhon@example.com">
                                            </div>
                                            <div class="col-12">
                                                <label for="inputChoosePassword" class="form-label">Mật khẩu</label>
                                                <div class="input-group" id="show_hide_password">
                                                    <input type="password" name="password" class="form-control border-end-0"
                                                        id="inputChoosePassword" placeholder="Nhập mật khẩu">
                                                    <a href="javascript:;" class="input-group-text bg-transparent">
                                                        <i class="bx bx-hide"></i>
                                                    </a>
                                                </div>
                                            </div>

                                            <div class="col-md-6 text-end"> <a href="https://monkeyd.vn/quen-mat-khau">Quên
                                                    mật khẩu?</a>
                                            </div>
                                            <div class="col-12">
                                                <div class="d-grid">
                                                    <button type="submit" class="btn btn-primary">Đăng nhập</button>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="text-center ">
                                                    <p class="mb-0">Chưa có tài khoản? <a
                                                            href="https://monkeyd.vn/tao-tai-khoan">Đăng ký ngay</a>
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
                <!--end row-->
            </div>
        </div>
    </div>

    <!-- <div class="container">
        <div class="login-box">
            <h2>Đăng nhập</h2>
            <form action="/login" method="POST">
                <input type="text" v-model="email" placeholder="Username hoặc Email" required>
                <input type="password" v-model="password" placeholder="Mật khẩu" required>
                <button type="submit" class="btn btn-primary" :disabled="loading">Đăng nhập</button>
                <a href="#">Quên mật khẩu?</a>
                <p>Chưa có tài khoản? <a href="#">Đăng ký ngay</a></p>

                <div style="color: red;">{{ error }}</div>
            </form>
        </div>
    </div> -->
</template>

<style scoped>
/* CSS styles */
body {
    font-family: Arial, sans-serif;
    background-color: #f2f2f2;
    margin: 0;
    padding: 0;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.login-box {
    background-color: white;
    padding: 40px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 480px;
}

.login-box h2 {
    text-align: center;
    margin-bottom: 20px;
}

.login-box input[type="text"],
.login-box input[type="password"] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.login-box button {
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
}

.login-box a {
    text-decoration: none;
}

.login-box a:hover {
    text-decoration: underline;
}</style>
