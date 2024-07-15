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
    <div class="container">
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
    </div>
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
}
</style>
