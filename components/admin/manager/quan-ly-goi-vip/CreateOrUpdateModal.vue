<script setup>
import {Button, Form, Input, InputNumber, Modal, Notice, Switch} from "view-ui-plus";

const openModal = ref(false);
const loading = ref(false);
const formRef = ref();
const dataEdit = ref(null);
const formItem = reactive({
    name: "",
    price: 1,
    duration_days: 1,
    enable: false,
});


const rules = {
    name: [
        {required: true, message: 'Vui lòng nhập tên gói', trigger: 'blur'}
    ],
};

const submit = () => {
    formRef.value.validate(async valid => {
        if (valid) {
            try {
                loading.value = true;

                const formData = new FormData();
                formData.append('name', formItem.name || '');
                formData.append('price', formItem.price || 1);
                formData.append('duration_days', formItem.duration_days || 1);
                formData.append('enable', formItem.enable || false);

                await useNuxtApp().$api(dataEdit.value ? `/admin/package-vip/${dataEdit?.value?.id}` : '/admin/package-vip', {
                    method: dataEdit.value ? 'PATCH' : 'POST',
                    body: formData
                });

                useNuxtApp().$emitter.emit('add-package-vip');
                Notice.success({
                    title: `${dataEdit.value ? 'Cập nhật' : 'Tạo mới'} gói VIP thành công`,
                });

                loading.value = false;
                close();
            } catch (e) {
                Notice.error({
                    title: `${dataEdit.value ? 'Cập nhật' : 'Tạo mới'} gói VIP thất bại`,
                });

                loading.value = false;
                console.log(e);
            }
        }
    });
};

const open = async (data = null) => {
    await formRef.value.resetFields();

    setTimeout(() => {
        dataEdit.value = data;
        formItem.name = data?.name;
        formItem.price = data?.price;
        formItem.duration_days = data?.duration_days;
        formItem.enable = data?.enable;

        loading.value = false;
        openModal.value = true;
    }, 100);
};

const close = () => {
    openModal.value = false;
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
            <FormItem label="Tên gói" prop="name">
                <Input v-model="formItem.name" placeholder="Tên gói"/>
            </FormItem>

            <FormItem label="Số tiền" prop="price">
                <InputNumber v-model="formItem.price" placeholder="Số tiền" class="w-100" :min="0"/>
            </FormItem>

            <FormItem label="Số ngày hết hạn" prop="duration_days">
                <InputNumber v-model="formItem.duration_days" placeholder="Số ngày hết hạn" class="w-100" :min="0"/>
            </FormItem>

            <FormItem label="Trạng thái" prop="enable">
                <Switch v-model="formItem.enable"/>
            </FormItem>
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
