<script setup lang="ts">
import { useRegisterStore } from '@/store/account'

const email = ref('admin@admin.vn');
const password = ref('Admin@1235!!');
const rePassword = ref('Admin@1235!!');
const fullname = ref("Nguyễn Quốc Hoàn");

const accountStore = useRegisterStore();


const handleRegister = async () => {
    await accountStore.fetchRegister(
        {
            email: email.value,
            password: password.value,
            fullname: fullname.value,
        }
    );
};

const { account, loading, error } = storeToRefs(accountStore);
console.log('account', account)
</script>

<template>
    <div class="page-content">
        <div class="d-flex align-items-center justify-content-center my-5">
            <div class="container-fluid">
                <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
                    <div class="col mx-auto">
                        <div class="card mb-0">
                            <div class="card-body">
                                <div class="p-4">
                                    <div class="mb-3 text-center">
                                        <img src="https://monkeyd.vn/images/logo/Logo-MonkeyD.png" width="120" alt="">
                                    </div>
                                    <div class="text-center mb-4">
                                        <p class="mb-0">Điền thông tin bên dưới để tạo tài khoản</p>
                                    </div>
                                    <div class="form-body">
                                        <form class="row g-3" action="https://monkeyd.vn/user/create" method="POST">
                                            <input type="hidden" name="_token"
                                                value="WUxnEw8B4kTJLog3u8UugUGuMAE7gwUi6qq5jnMr">

                                            <div class="col-12">
                                                <label for="inputUsername" class="form-label">Email</label>
                                                <input type="email" class="form-control" name="email" id="inputUsername"
                                                    placeholder="example@user.com">
                                            </div>
                                            <div class="col-12">
                                                <label for="inputEmailAddress" class="form-label">Tên hiển thị</label>
                                                <input type="text" class="form-control" name="name" id="inputEmailAddress"
                                                    placeholder="Tên của bạn">
                                            </div>
                                            <div class="col-12">
                                                <label for="inputChoosePassword" class="form-label">Mật khẩu</label>
                                                <div class="input-group" id="show_hide_password">
                                                    <input type="password" class="form-control border-end-0" name="password"
                                                        id="inputChoosePassword" placeholder="Mật khẩu của bạn">
                                                    <a href="javascript:;" class="input-group-text bg-transparent"><i
                                                            class="bx bx-hide"></i>
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <label for="inputConfirmPassword" class="form-label">Nhập lại mật
                                                    khẩu</label>
                                                <div class="input-group" id="show_hide_confirm_password">
                                                    <input type="password" name="password_confirmation"
                                                        class="form-control border-end-0" id="inputConfirmPassword"
                                                        placeholder="Nhập lại mật khẩu">
                                                    <a href="javascript:;" class="input-group-text bg-transparent"><i
                                                            class="bx bx-hide"></i></a>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="d-grid">
                                                    <button type="submit" class="btn btn-primary">Đăng ký</button>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="text-center ">
                                                    <p class="mb-0">Đã có tài khoản? <a href="https://monkeyd.vn/login">Đăng
                                                            nhập ngay</a></p>
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
    <h1>Đăng Ký - MonkeyD</h1>
    <form action="/register" method="POST">
      <input type="text" v-model="fullname" placeholder="Tên hiển thị" required>
      <input type="email" v-model="email" placeholder="Email" required>
      <input type="password" v-model="password" placeholder="Mật khẩu" required>
      <input type="password" v-model="rePassword" placeholder="Nhập lại mật khẩu" required>
      <button type="submit" class="btn btn-primary" :disabled="loading">Đăng Ký</button>
    </form>
    <div class="login-link">
      <p>Đã có tài khoản? <a href="#">Đăng nhập ngay</a></p>
      <div style="color: red;">{{ error }}</div>
    </div>
  </div> -->
</template>

<style scoped>
/* Add your CSS styles here */
body {
    font-family: Arial, sans-serif;
    background-color: #f2f2f2;
    margin: 0;
    padding: 0;
}

.container {
    max-width: 600px;
    margin: 50px auto;
    background-color: white;
    padding: 30px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
    margin-bottom: 30px;
}

form {
    display: flex;
    flex-direction: column;
}

input[type=text],
input[type=email],
input[type=password] {
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.login-link {
    text-align: center;
    margin-top: 20px;
}

.login-link a {
    color: #4CAF50;
    text-decoration: none;
}

.login-link a:hover {
    text-decoration: underline;
}</style>