<script setup>
import { Row, Col, Form, Modal, Button, Notice} from "view-ui-plus";

const openModal = ref(false);
const loading = ref(false);
const formRef = ref();
const dataEdit = ref(null);
const formItem = reactive({
    name: "",
    link: "",
});

const rules = {
    name: [
        { required: true, message: 'Vui lòng nhập tên affiliate', trigger: 'blur' }
    ],
    link: [
        { required: true, message: 'Vui lòng nhập link', trigger: 'blur' }
    ],
};

const submit = () => {
    formRef.value.validate(async valid => {
        if (valid) {
            try {
                loading.value = true;
                await useNuxtApp().$api(dataEdit.value ? `/admin/affiliate/${dataEdit?.value?.id}` : '/admin/affiliate', {
                    method: dataEdit.value ? 'PATCH' : 'POST',
                    body: {
                        ...formItem
                    }
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
        if (data) {
            dataEdit.value = data;
            formItem.name = data?.name;
            formItem.link = data?.link;
        } else {
            dataEdit.value = null;
        }

        loading.value = false;
        openModal.value = true;
    }, 100);
};

const close = () => {
    openModal.value = false;
}

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
