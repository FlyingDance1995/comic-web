<script setup>
import {optionsUserRole} from "~/constants/options.js";
import {Option, Row, Col, Form, Modal, Button, Notice} from "view-ui-plus";

const openModal = ref(false);
const loading = ref(false);
const formRef = ref();
const dataEdit = ref(null);
const formItem = reactive({
    fullname: "",
    email: "",
    contact: "",
    role: "",
    fb: "",
    description: "",
    avatar: ""
});
const previewImg = ref('');
const previewImgRef = ref();
const uploadRef = ref();

const validateSelectRole = (rule, value, callback) => {
    if (!value || value?.length === 0) {
        return callback(new Error('Vui lòng chọn quyền'));
    }
    callback()
};

const rules = {
    fullname: [
        { required: true, message: 'Vui lòng nhập tên người dùng', trigger: 'blur' }
    ],
    email: [
        { required: true, message: 'Vui lòng nhập email', trigger: 'blur' }
    ],
    role: [
        { required: true, validator: validateSelectRole, trigger: 'change' }
    ],
};

const submit = () => {
    formRef.value.validate(async valid => {
        if (valid) {
            try {
                loading.value = true;
                const formData = new FormData();
                formData.append('fullname', formItem.fullname);
                formData.append('email', formItem.email);
                formData.append('contact', formItem.contact);
                formData.append('role', formItem.role);
                formData.append('fb', formItem.fb);
                formData.append('description', formItem.description);
                if (formItem.avatar && dataEdit.value) {
                    formData.append('avatar', formItem.avatar);
                } else if (!dataEdit.value) {
                    if (!formItem.avatar) {
                        Notice.error({
                            title: `Hãy chọn ảnh cho người dùng`,
                        });
                        return loading.value = false;
                    } else {
                        formData.append('avatar', formItem.avatar);
                    }
                }
                await useNuxtApp().$api(dataEdit.value ? `/admin/users/${dataEdit?.value?.id}` : '/admin/users', {
                    method: dataEdit.value ? 'PATCH' : 'POST',
                    body: formData
                });
                useNuxtApp().$emitter.emit('add-user');
                Notice.success({
                    title: `${dataEdit.value ? 'Cập nhật' : 'Tạo mới'} thành công`,
                });
                loading.value = false;
                close();
            } catch (e) {
                Notice.error({
                    title: `${dataEdit.value ? 'Cập nhật' : 'Tạo mới'} thất bại`,
                });
                loading.value = false;
                console.log(e?.response);
            }
        }
    });
};

const open = async (data = null) => {
    await formRef.value.resetFields();

    setTimeout(() => {
        const previews = document.querySelectorAll('.profile-pic-1');
        if (uploadRef.value) uploadRef.value.value = null;

        if (data) {
            dataEdit.value = data;
            formItem.fullname = data?.fullname;
            formItem.email = data?.email;
            formItem.contact = data?.contact;
            formItem.role = data?.role;
            formItem.fb = data?.fb;
            formItem.description = data?.description;
            previewImg.value = data?.avatar;
            if (previews) {
                previews.forEach(x => {
                    x.src = data?.avatar || '/no-image.png';
                })
            }
        } else {
            dataEdit.value = null;
            previewImg.value = '/no-image.png';
            if (previews) {
                previews.forEach(x => {
                    x.src = data?.avatar || '/no-image.png';
                })
            }
        }

        loading.value = false;
        openModal.value = true;
    }, 100);
};

const close = () => {
    openModal.value = false;
}

const onUpload = () => {
    uploadRef.value.click();
};

const handleChangeAvatar = (event) => {
    const previews = document.querySelectorAll('.profile-pic-1');

    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previews.forEach(x => {
                x.src = e.target.result;
            })
        };
        reader.readAsDataURL(file);
        formItem.avatar = file;
    }
};

defineExpose({
    open
});
</script>

<template>
    <Modal
        v-model="openModal"
        :title="dataEdit ? 'Chỉnh sửa' : 'Tạo mới'"
        width="800px">
        <Form ref="formRef" :model="formItem" :rules="rules" label-position="top">
            <Row :gutter="20">
                <Col flex="200px">
                    <div class="avatar-wrapper mb-3">
                        <img class="profile-pic-1" width="150" :src="previewImg || ''" alt=""
                             onerror="this.src='/no-image.png'">
                        <div class="upload-button" @click="onUpload">
                            <i class="bx bx-cloud-upload"></i>
                        </div>
                        <input ref="uploadRef"
                               class="file-upload-1" type="file" name="avatar" accept=".jpg, .jpeg, .gif, .png"
                               @change="handleChangeAvatar">
                    </div>
                </Col>

                <Col flex="auto">
                    <FormItem label="Tên" prop="fullname">
                        <Input v-model="formItem.fullname" placeholder="Tên"/>
                    </FormItem>

                    <FormItem label="Email" prop="email">
                        <Input v-model="formItem.email" placeholder="Email" disabled/>
                    </FormItem>

                    <FormItem label="Contact" prop="contact">
                        <Input v-model="formItem.contact" placeholder="Contact"/>
                    </FormItem>

                    <FormItem label="Role" prop="role">
                        <Select v-model="formItem.role"
                                placeholder="Role">
                            <Option v-for="item in optionsUserRole"
                                    :value="item.value"
                                    :key="item.value">
                                {{ item.label }}
                            </Option>
                        </Select>
                    </FormItem>

                    <FormItem label="Facebook" prop="fb">
                        <Input v-model="formItem.fb" placeholder="Facebook"/>
                    </FormItem>
                </Col>
            </Row>

            <div>
                <FormItem label="Mô tả" prop="description">
                    <Input v-model="formItem.description"
                            type="textarea"
                            :autosize="{minRows: 5,maxRows: 5}"
                            placeholder="Mô tả"/>
                </FormItem>
            </div>
        </Form>

        <template #footer>
            <Button @click="close">
                Đóng
            </Button>

            <Button type="primary" @click="submit" :loading="loading">
                {{ dataEdit ? 'Cập nhật' : 'Tạo mới' }}
            </Button>
        </template>
    </Modal>
</template>

<style lang="less" scoped>
.avatar-wrapper {
    position: relative;
    height: 220px;
    width: 200px;
    overflow: hidden;
    box-shadow: 0 0 8px 0 #757575;
    transition: all .3s ease;
}

.avatar-wrapper:hover {
    cursor: pointer;
}

.avatar-wrapper:hover .profile-pic-1 {
    opacity: .5;
}

.avatar-wrapper .profile-pic-1 {
    height: 100%;
    width: 100%;
    transition: all .3s ease;
}

.avatar-wrapper .profile-pic-1:after {
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
