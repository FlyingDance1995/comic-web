<script setup>
import {optionsStoryType} from "~/constants/options.js";
import {Option, Row, Col, Form, Modal, Button, Notice} from "view-ui-plus";

const openModal = ref(false);
const loading = ref(false);
const formRef= ref();
const optionsTeam = ref([]);
const optionsCategory = ref([]);
const dataEdit = ref(null);
const formItem = reactive({
    name: "",
    description: "",
    type: "",
    avatar: "",
    author: "",
    team: "",
    category: []
});

const getTeam = async () => {
    try {
        const response = await useNuxtApp().$api('/moderator/teams', {
            method: "GET",
            query: {
                size: 1000,
            }
        });
        optionsTeam.value = response?.results;
    } catch (e) {
        console.log(e?.response);
    }
};

const getCategory = async () => {
    try {
        const response = await useNuxtApp().$api('/category', {
            method: "GET",
            query: {
                size: 1000,
            }
        });
        optionsCategory.value = response?.results;
    } catch (e) {
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
                formData.append('author', formItem.author);
                formData.append('team', formItem.team);
                formData.append('category', formItem.category);
                formData.append('type', formItem.type);
                formData.append('description', formItem.description);
                formData.append('avatar', formItem.avatar);
                await useNuxtApp().$api(dataEdit.value ? `/moderator/story/${dataEdit?.value?.slug}` : '/moderator/story', {
                    method: dataEdit.value ? 'PATCH' : 'POST',
                    body: formData
                });
                useNuxtApp().$emitter.emit('add-story');
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

    if (data) {
        dataEdit.value = data;
        formItem.category = data?.category?.map(x => x?.id);
        formItem.name = data?.name;
        formItem.author = data?.author;
        formItem.avatar = data?.avatar;
        formItem.description = data?.description;
        formItem.type = data?.type;
        formItem.team = data?.team?.id;
    } else {
        const fileUpload = document.querySelector('.file-upload');
        const preview = document.querySelector('.profile-pic');
        if (preview) preview.src = '/no-image.png';
        if (fileUpload) fileUpload.value = null;
    }

    loading.value = false;
    openModal.value = true;
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

getTeam();
getCategory();

defineExpose({
    open
});
</script>

<template>
    <Modal
        v-model="openModal"
        :title="dataEdit ? 'Chỉnh sửa' : 'Tạo mới'"
        width="800px">
        <Form ref="formRef" :model="formItem" label-position="top">
            <Row :gutter="20">
                <Col flex="200px">
                    <div class="avatar-wrapper mb-3">
                        <img class="profile-pic" width="150" :src="formItem?.avatar || ''" alt=""
                             onerror="this.src='/no-image.png'">
                        <div class="upload-button" @click="onUpload">
                            <i class="bx bx-cloud-upload"></i>
                        </div>
                        <input class="file-upload" type="file" name="avatar" accept=".jpg, .jpeg, .gif, .png"
                               @change="handleChangeAvatar">
                    </div>
                </Col>

                <Col flex="auto">
                    <FormItem label="Tên truyện" prop="name" required>
                        <Input v-model="formItem.name" placeholder="Tên"/>
                    </FormItem>

                    <FormItem label="Mô tả" prop="description">
                        <Input v-model="formItem.description"
                               type="textarea"
                               :autosize="{minRows: 5,maxRows: 5}"
                               placeholder="Mô tả"/>
                    </FormItem>
                </Col>
            </Row>

            <Row :gutter="20">
                <Col span="10">
                    <FormItem label="Team" prop="team" required>
                        <Select v-model="formItem.team"
                                placeholder="Team" filterable>
                            <Option v-for="item in optionsTeam"
                                    :value="item.id"
                                    :key="item.id">
                                {{ item.name }}
                            </Option>
                        </Select>
                    </FormItem>
                </Col>

                <Col span="10" offset="4">
                    <FormItem label="Loại" prop="type" required>
                        <Select v-model="formItem.type"
                                placeholder="Loại">
                            <Option v-for="item in optionsStoryType"
                                    :value="item.value"
                                    :key="item.value">
                                {{ item.label }}
                            </Option>
                        </Select>
                    </FormItem>
                </Col>

                <Col span="10">
                    <FormItem label="Tên tác giả" prop="author" required>
                        <Input v-model="formItem.author" placeholder="Tác giả"/>
                    </FormItem>
                </Col>

                <Col span="10" offset="4">
                    <FormItem label="Thể loại" prop="category" required>
                        <Select v-model="formItem.category"
                                placeholder="Thể loại"
                                multiple
                                filterable>
                            <Option v-for="item in optionsCategory"
                                    :value="item.id"
                                    :key="item.id">
                                {{ item.name }}
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
                {{dataEdit ? 'Cập nhật' : 'Tạo mới'}}
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
