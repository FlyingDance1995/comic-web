<script setup>
import {Option, Row, Col, Form, Modal, Button, Notice} from "view-ui-plus";

const openModal = ref(false);
const loading = ref(false);
const formRef = ref();
const optionsUser = ref([]);
const dataEdit = ref(null);
const formItem = reactive({
    name: "",
    description: "",
    member: [],
    avatar: "",
});
const previewImg = ref('');
const loadingSelect = ref(false);

const rules = {
    name: [
        { required: true, message: 'Vui lòng nhập tên team', trigger: 'blur' }
    ],
};

const getUser = async (search) => {
    try {
        const query = {
            search: search
        }

        if (!query.search) delete query.search;

        loadingSelect.value = true;
        const response = await useNuxtApp().$api('/moderator/user', {
            method: "GET",
            query: {
                size: 100,
                ...query
            }
        });
        optionsUser.value = response?.results?.map(item => {
            return {
                ...item,
                value: item?.id,
                label: item?.fullname
            }
        });
        loadingSelect.value = false;
    } catch (e) {
        loadingSelect.value = false;
        console.log(e?.response);
    }
};

const submit = () => {
    formRef.value.validate(async valid => {
        if (valid) {
            try {
                loading.value = true;
                const formData = new FormData();
                formData.append('name', formItem.name);
                formData.append('member', formItem.member);
                formData.append('description', formItem.description);
                if (formItem.avatar && dataEdit.value) {
                    formData.append('avatar', formItem.avatar);
                } else if (!dataEdit.value) {
                    if (!formItem.avatar) {
                        Notice.error({
                            title: `Hãy chọn ảnh cho team`,
                        });
                        return loading.value = false;
                    } else {
                        formData.append('avatar', formItem.avatar);
                    }
                }
                await useNuxtApp().$api(dataEdit.value ? `/moderator/teams/${dataEdit?.value?.slug}` : '/moderator/teams', {
                    method: dataEdit.value ? 'PATCH' : 'POST',
                    body: formData
                });
                useNuxtApp().$emitter.emit('add-team');
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
    getUser();
    await formRef.value.resetFields();

    setTimeout(() => {
        const fileUpload = document.querySelector('.file-upload');
        const preview = document.querySelector('.profile-pic');
        if (fileUpload) fileUpload.value = null;

        if (data) {
            dataEdit.value = data;
            optionsUser.value = uniqByKeepFirst([...data?.member?.map(x => {
                return {
                    ...x,
                    value: x?.id,
                    label: x?.fullname
                }
            }), ...optionsUser.value], (i) => i?.id);
            formItem.member = data?.member?.map(x => x?.id);
            formItem.name = data?.name;
            formItem.description = data?.description;
            previewImg.value = data?.avatar;
            if (preview) preview.src = data?.avatar || '/no-image.png';
        } else {
            dataEdit.value = null;
            previewImg.value = '/no-image.png';
            if (preview) preview.src = '/no-image.png';
        }

        loading.value = false;
        openModal.value = true;
    }, 100);
};

const close = () => {
    openModal.value = false;
}

const onUpload = () => {
    document.querySelector('.file-upload').click();
};

const handleChangeAvatar = (event) => {
    const preview = document.querySelector('.profile-pic');

    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.src = e.target.result;
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
                        <img class="profile-pic" width="150" :src="previewImg || ''" alt=""
                             onerror="this.src='/no-image.png'">
                        <div class="upload-button" @click="onUpload">
                            <i class="bx bx-cloud-upload"></i>
                        </div>
                        <input class="file-upload" type="file" name="avatar" accept=".jpg, .jpeg, .gif, .png"
                               @change="handleChangeAvatar">
                    </div>
                </Col>

                <Col flex="auto">
                    <FormItem label="Tên team" prop="name">
                        <Input v-model="formItem.name" placeholder="Tên"/>
                    </FormItem>

                    <FormItem label="Thành viên" prop="member">
                        <Select v-model="formItem.member"
                                placeholder="Thành viên"
                                filterable
                                multiple
                                @on-query-change="getUser"
                                :loading="loadingSelect"
                                :not-found-text="''">
                            <template v-if="!loadingSelect">
                                <Option v-for="item in optionsUser"
                                        :value="item.id"
                                        :label="item.fullname"
                                        :key="item.fullname">
                                    {{ item.label }}
                                </Option>
                            </template>
                        </Select>
                    </FormItem>

                    <FormItem label="Mô tả" prop="description">
                        <Input v-model="formItem.description"
                               type="textarea"
                               :autosize="{minRows: 3,maxRows: 3}"
                               placeholder="Mô tả"/>
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
    width: 200px;
    overflow: hidden;
    box-shadow: 0 0 8px 0 #757575;
    transition: all .3s ease;
}

.avatar-wrapper:hover {
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
