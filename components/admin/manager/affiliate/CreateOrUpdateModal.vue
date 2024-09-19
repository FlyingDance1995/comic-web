<script setup>
import {Row, Col, Form, Modal, Button, Notice, Option} from "view-ui-plus";
import {optionsLocation} from "~/constants/options.js";

const openModal = ref(false);
const loading = ref(false);
const formRef = ref();
const dataEdit = ref(null);
const formItem = reactive({
    name: "",
    link: "",
    banner: "",
    location: null
});
const previewImg = ref('');
const uploadRef = ref();

const validateSelectLocation = (rule, value, callback) => {
    if (!value || value?.length === 0) {
        return callback(new Error('Vui lòng chọn vị trí'));
    }
    callback()
};

const rules = {
    name: [
        { required: true, message: 'Vui lòng nhập tên affiliate', trigger: 'blur' }
    ],
    link: [
        { required: true, message: 'Vui lòng nhập link', trigger: 'blur' }
    ],
    location: [
        {required: true, validator: validateSelectLocation, trigger: 'change'}
    ],
};

const submit = () => {
    formRef.value.validate(async valid => {
        if (valid) {
            try {
                loading.value = true;
                const formData = new FormData();
                formData.append('name', formItem.name);
                formData.append('link', formItem.link);
                formData.append('location', formItem.location);
                if (formItem.banner && dataEdit.value) {
                    formData.append('banner', formItem.banner);
                } else if (!dataEdit.value) {
                    if (!formItem.banner) {
                        Notice.error({
                            title: `Hãy chọn ảnh banner`,
                        });
                        return loading.value = false;
                    } else {
                        formData.append('banner', formItem.banner);
                    }
                }
                await useNuxtApp().$api(dataEdit.value ? `/admin/affiliate/${dataEdit?.value?.id}` : '/admin/affiliate', {
                    method: dataEdit.value ? 'PATCH' : 'POST',
                    body: formData
                });
                useNuxtApp().$emitter.emit('add-affiliate');
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
        const previews = document.querySelectorAll('.profile-pic-5');
        if (uploadRef.value) uploadRef.value.value = null;

        if (data) {
            dataEdit.value = data;
            formItem.name = data?.name;
            formItem.link = data?.link;
            formItem.location = data?.location;
            previewImg.value = data?.banner;
            if (previews) {
                previews.forEach(x => {
                    x.src = data?.banner || '';
                })
            }
        } else {
            dataEdit.value = null;
            previewImg.value = '';
            if (previews) {
                previews.forEach(x => {
                    x.src = data?.banner || '';
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

const handleChangeBanner = (event) => {
    const previews = document.querySelectorAll('.profile-pic-5');

    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previews.forEach(x => {
                x.src = e.target.result;
            })
        };
        reader.readAsDataURL(file);
        formItem.banner = file;
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
                <Col flex="auto">
                    <FormItem label="Tên" prop="name">
                        <Input v-model="formItem.name" placeholder="Tên"></Input>
                    </FormItem>

                    <FormItem label="Link" prop="link">
                        <Input v-model="formItem.link" placeholder="Link"></Input>
                    </FormItem>

                    <FormItem label="Banner" prop="banner">
                        <div class="avatar-wrapper mb-3">
                            <img class="profile-pic-5" height="220" :src="previewImg || ''" alt="">
                            <div class="upload-button" @click="onUpload">
                                <i class="bx bx-cloud-upload"></i>
                            </div>
                            <input ref="uploadRef"
                                   class="file-upload-5" type="file" name="banner" accept=".jpg, .jpeg, .gif, .png, .jfif"
                                   @change="handleChangeBanner">
                        </div>
                    </FormItem>

                    <FormItem label="Vị trí" prop="location">
                        <Select v-model="formItem.location">
                            <Option v-for="item in optionsLocation"
                                    :value="item.value"
                                    :key="item.value">
                                {{ item.label }}
                            </Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
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
    overflow: hidden;
    transition: all .3s ease;
}

.avatar-wrapper:hover {
    cursor: pointer;
}

.avatar-wrapper:hover .profile-pic-5 {
    opacity: .5;
}

.avatar-wrapper .profile-pic-5 {
    height: 100%;
    //width: 100%;
    transition: all .3s ease;
    margin: 0 auto;
    display: block;
}

.avatar-wrapper .profile-pic-5:after {
    content: "";
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
    opacity: 1;
}
</style>
