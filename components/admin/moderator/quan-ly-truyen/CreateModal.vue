<script setup>
const openModal = ref(false);
const loadingModal = ref(false);
const formItem = reactive({
    name: "",
    description: ""
});

const submit = async () => {

};

const open = () => {
    openModal.value = true;
};

defineExpose({
    open
})
</script>

<template>
    <Modal
        v-model="openModal"
        title="Tạo mới"
        :loading="loadingModal"
        width="800px"
        @on-ok="submit">
        <Form :model="formItem" label-position="top">
            <FormItem label="Tên truyện" required>
                <Input v-model="formItem.name" placeholder="Tên"/>
            </FormItem>

            <FormItem label="Mô tả">
                <Input v-model="formItem.description"
                       type="textarea"
                       :autosize="{minRows: 3,maxRows: 5}"
                       placeholder="Mô tả"/>
            </FormItem>
        </Form>
    </Modal>
</template>
