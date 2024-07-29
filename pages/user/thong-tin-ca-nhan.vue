<script setup>
import {useUserStore} from "@/store/user.js";
import {useConfigStore} from "~/store/config.js";

const userConfig = useConfigStore();
const userStore = useUserStore();

const user = computed(() => userStore.$state.user);

const form = reactive({
    avatar: null,
    fullname: "",
    facebook: "",
    contact: "",
    description: "",
    email: ""
});
const errors = ref();
const success = ref(false);

const handleSubmit = async () => {
    try {
        userConfig.setLoadingModal(true);
        success.value = false;
        errors.value = '';
        const formData = new FormData();
        formData.append('fullname', form.fullname);
        if (form.avatar) {
            formData.append('avatar', form.avatar);
        }
        if (form.facebook) {
            formData.append('facebook', form.facebook);
        }
        if (form.contact) {
            formData.append('contact', form.contact);
        }
        if (form.description) {
            formData.append('description', form.description);
        }
        const response = await useNuxtApp().$api('/profile', {
            method: "PATCH",
            body: formData,
        });
        userConfig.setLoadingModal(false);
        userStore.setUser({
            ...user.value,
            ...response
        });
        success.value = true;
    } catch (error) {
        userConfig.setLoadingModal(false);
        if (error?.response?._data?.error) {
            errors.value = error?.response?._data?.error;
        }
        console.log("error", error?.response);
    }
};

const onUpload = () => {
    document.querySelector('.file-upload').click();
};

const handleChangeAvatar = async (event) => {
    const preview = document.querySelector('.profile-pic');

    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.src = e.target.result;
        };
        reader.readAsDataURL(file);

        form.avatar = file;
    }
};

watch(user, () => {
    form.fullname = user.value?.fullname;
    form.facebook = user.value?.facebook;
    form.contact = user.value?.contact;
    form.description = user.value?.description;
    form.email = user.value?.email;
}, {immediate: true, deep: true})
</script>

<template>
    <Head>
        <Title>Thông tin tài khoản</Title>
    </Head>

    <div class="row">
        <div class="col-xl-6 mx-auto">
            <h6 class="mb-0 text-uppercase">Thông tin tài khoản</h6>
            <hr>
            <div class="card">
                <div class="card-body">
                    <form action="" method="POST" enctype="multipart/form-data" @submit.prevent="handleSubmit">
                        <div v-if="errors" class="mgt-10 alert alert-danger">
                            <ul>
                                <li v-for="error in errors">{{typeof error === 'string' ? error : error.join('')}}</li>
                            </ul>
                        </div>

                        <div v-if="success" class="mgt-10  alert alert-success alert-dismissible" role="alert">
                            Thông tin tài khoản đã được cập nhật
                        </div>

                        <div class="form-group text-center">
                            <div class="avatar-wrapper mb-3">
                                <img class="profile-pic" width="150" :src="user?.avatar || ''" alt=""
                                     onerror="this.src='/images/avata.png'">
                                <div class="upload-button" @click="onUpload">
                                    <i class="bx bx-cloud-upload"></i>
                                </div>
                                <input class="file-upload" type="file" name="avatar" accept="image/*"
                                       @change="handleChangeAvatar">
                                <input type="hidden" name="avatar_file_link">
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="name" class="form-label">Tên hiển thị:</label>
                            <input v-model="form.fullname" type="text" class="form-control" name="name" id="name">
                        </div>

                        <div class="mb-3">
                            <label for="email" class="form-label">Email:</label>
                            <input v-model="form.email"
                                   type="email" class="form-control" name="email" id="email"
                                   disabled="" readonly="">
                        </div>

                        <div class="mb-3">
                            <label for="facebook" class="form-label">Facebook:</label>
                            <input v-model="form.facebook"
                                   type="text"
                                   class="form-control" name="facebook" id="facebook">
                        </div>

                        <div class="mb-4">
                            <label for="about_me" class="form-label">Tiểu sử:</label>
                            <textarea v-model="form.description"
                                      name="about_me"
                                      id="about_me"
                                      cols="30"
                                      rows="5"
                                      class="form-control"></textarea>
                        </div>

                        <div class="input-group mb-3 justify-content-center">
                            <button type="submit" class="btn btn-primary px-5">Cập nhật</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.avatar-wrapper {
    position: relative;
    height: 200px;
    width: 200px;
    margin: 50px auto;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 1px 1px 15px -5px black;
    transition: all .3s ease;
}

.avatar-wrapper:hover {
    transform: scale(1.05);
    cursor: pointer;
}

.avatar-wrapper:hover .profile-pic {
    opacity: .5;
}

.avatar-wrapper .profile-pic {
    height: 100%;
    width: 100%;
    transition: all .3s ease;
}

.avatar-wrapper .profile-pic:after {
    font-family: 'boxicons' !important;
    content: "\e9c9";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    font-size: 130px;
    background: #ecf0f1;
    color: #34495e;
    font-weight: 900;
    text-align: center;
}

.upload-button {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
}

.upload-button .bx-cloud-upload {
    position: absolute;
    font-size: 200px;
    top: 50%;
    left: 50%;
    text-align: center;
    opacity: 0;
    transition: all .3s ease;
    color: #34495e;
    transform: translate(-50%, -50%);
}

.upload-button:hover .bx-cloud-upload {
    opacity: .9;
}
</style>
