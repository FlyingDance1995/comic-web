<script setup>
import {Form, Notice, Col, Row, InputNumber, Select, Option, Input, Button, Space, Switch} from "view-ui-plus";
import { optionsChapterType } from "~/constants/options.js";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const props = defineProps({
    story: {
        type: Object,
        default: null
    },
    dataDetail: {
        type: Object,
        default: null
    }
});

const emit = defineEmits(['on-success'])

const toolbarOptions = [
    ['bold', 'italic', 'underline'],        // toggled buttons

    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'align': [] }],
];


const validateChapterNumber = (rule, value, callback) => {
    if (!value && value !== 0) {
        return callback(new Error('Vui lòng nhập số chương'));
    }
    callback()
};

const rules = {
    name: [
        { required: false, message: 'Vui lòng nhập tên', trigger: 'blur' }
    ],
    chapter_number: [
        { required: true, validator: validateChapterNumber, trigger: 'blur' }
    ],
    type: [
        { required: true, message: 'Vui lòng chọn loại', trigger: 'change' }
    ],
    content: [
        { required: true, message: 'Vui lòng nhập nội dung', trigger: 'blur' }
    ],
};

const status = ref('add');
const formRef = ref();
const loading = ref(false);
const formItem = reactive({
    name: null,
    chapter_number: null,
    type: "",
    content: "",
    is_lock: false,
    price: null
});

const title = computed(() => {
    const mapping = {
        'add': 'Tạo mới',
        'edit': 'Chỉnh sửa',
        'detail': 'Chi tiết',
    }

    return mapping[status.value];
});

const handleDelete = async () => {
    try {
        await useNuxtApp().$api(`admin/story/${props?.story?.slug}/chapter/${props?.dataDetail?.slug}`, {
            method: "DELETE",
        });

        emit('on-success');
        useNuxtApp().$emitter.emit('add-chapter');
        Notice.success({
            title: `Xóa thành công`,
        });
    } catch (e) {
        console.log("error", e);
        Notice.success({
            title: `Xóa thất bại`,
        });
    }
};

const handlePost = async () => {
    try {
        await useNuxtApp().$api(`admin/story/${props?.story?.slug}/chapter/${props?.dataDetail?.slug}`, {
            method: "PATCH",
            body: {
                "draft": false
            }
        });

        emit('on-success');
        useNuxtApp().$emitter.emit('add-chapter');
        Notice.success({
            title: `Đăng bài thành công`,
        });
    } catch (e) {
        console.log("error", e);
        Notice.success({
            title: `Đăng bài thất bại`,
        });
    }
};

const submit = async () => {
    formRef.value.validate(async valid => {
        if (valid) {
            try {
                console.log(status.value)
                loading.value = true;
                await useNuxtApp().$api(status.value === 'edit'
                    ? `admin/story/${props?.story?.slug}/chapter/${props?.dataDetail?.slug}`
                    : `admin/story/${props?.story?.slug}/chapter`, {
                    method: status.value === 'edit' ? 'PATCH' : 'POST',
                    body: {
                        ...formItem
                    }
                });
                Notice.success({
                    title: `${status.value === 'edit' ? 'Cập nhật' : 'Tạo mới'} thành công`,
                });
                emit('on-success');
                useNuxtApp().$emitter.emit('add-chapter');
                loading.value = false;
            } catch (e) {
                Notice.error({
                    title: `${status.value === 'edit' ? 'Cập nhật' : 'Tạo mới'} thất bại`,
                });
                loading.value = false;
                console.log(e?.response);
            }
        }
    });
};

watch(status, () => {
    if (status.value === 'add') {
        formRef.value.resetFields();
        formItem.content = "<p></p>";
        loading.value = false;
    }
});

watch(() => props.dataDetail, () => {
    if (status.value === 'detail') {
        formRef.value.resetFields();

        formItem.name = props.dataDetail?.name;
        formItem.type = props.dataDetail?.type;
        formItem.content = props.dataDetail?.content || "<p></p>";
        formItem.chapter_number = props.dataDetail?.chapter_number;
    }
}, {
    deep: true
});

defineExpose({
    status
});
</script>

<template>
    <div class="w-50 h-100 flex-column" :class="{'d-flex': dataDetail}">
        <div class="w-100 d-flex flex-wrap gap-2 justify-content-between align-items-center">
            <h4 class="text-black-50">{{ title }}</h4>

            <Dropdown v-if="status === 'detail' || status === 'edit'" trigger="hover">
                <a href="javascript:void(0)" style="margin-bottom: .5rem">
                    <Icon type="ios-more" size="24" style="cursor: pointer" />
                </a>

                <template #list>
                    <DropdownMenu>
                        <DropdownItem @click="handleDelete">
                            <span style="color: red">Xóa</span>
                        </DropdownItem>
<!--                        <DropdownItem @click="handlePost">-->
<!--                            <span style="color: blue">Đăng bài</span>-->
<!--                        </DropdownItem>-->
<!--                        <DropdownItem @click="status = 'edit'">Chỉnh sửa</DropdownItem>-->
                    </DropdownMenu>
                </template>
            </Dropdown>
        </div>

        <Form ref="formRef" :model="formItem" :rules="rules" label-position="top"
              style="flex: 1; overflow-y: auto; overflow-x: hidden">
            <Row :gutter="20">
                <Col span="10">
                <FormItem label="Loại" prop="type">
                    <Select v-if="status !== 'detail'" v-model="formItem.type" placeholder="Loại">
                        <Option v-for="item in optionsChapterType" :value="item.value" :key="item.value">
                            {{ item.label }}
                        </Option>
                    </Select>

                    <span v-else>
                        {{ optionsChapterType.find(x => x.value === formItem.type)?.label || '' }}
                    </span>
                </FormItem>
                </Col>

                <Col span="10" offset="4">
                <FormItem label="Số chương" prop="chapter_number">
                    <InputNumber v-if="status !== 'detail'" v-model="formItem.chapter_number" placeholder="Số chương"
                        class="w-100" :min="0" :readonly="status === 'detail'" />

                    <span v-else>
                        {{ formItem.chapter_number }}
                    </span>
                </FormItem>
                </Col>
            </Row>

            <FormItem label="Tên" prop="name">
                <Input v-if="status !== 'detail'" v-model="formItem.name" placeholder="Tên"
                    :readonly="status === 'detail'" />

                <span v-else>
                    {{ formItem.chapter_number }}
                </span>
            </FormItem>

            <Row :gutter="20">
                <Col span="10">
                    <FormItem label="Khóa">
                        <Switch v-model="formItem.is_lock" :disabled="status === 'detail'"/>
                    </FormItem>
                </Col>

                <Col v-if="formItem.is_lock" span="10" offset="4">
                    <FormItem label="Giá">
                        <InputNumber v-if="status !== 'detail'" v-model="formItem.price" placeholder="Số tiền"
                                     class="w-100" :min="0" :readonly="status === 'detail'" />

                        <span v-else>
                            {{ formItem.price }}
                        </span>
                    </FormItem>
                </Col>
            </Row>

            <FormItem label="Nội dung" prop="content">
                <QuillEditor v-if="status !== 'detail'" v-model:content="formItem.content" :toolbar="toolbarOptions"
                             theme="snow" content-type="html" style="width: 100%; height: 370px; overflow: auto" />

                <QuillEditor v-else :content="formItem.content" theme="bubble" content-type="html" read-only
                    :enable="false" class="custom-quill" style="width: 100%; overflow: auto" />
            </FormItem>
        </Form>

        <div class="mt-4" style="text-align: right">
            <Space>
                <Button @click="$emit('on-success')">
                    Đóng
                </Button>

                <template v-if="status === 'add' || status === 'edit'" >
                    <Button type="primary" @click="submit" :loading="loading">
                        {{ status === 'edit' ? 'Cập nhật' : 'Tạo mới' }}
                    </Button>
                </template>
            </Space>
        </div>
    </div>
</template>

<style lang="less">
.custom-quill {
    font-size: 14px !important;
    font-family: Roboto, sans-serif;
}
</style>
