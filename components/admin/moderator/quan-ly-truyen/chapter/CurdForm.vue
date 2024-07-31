<script setup>
import {Form, Notice, Col, Row, InputNumber, Select, Option, Input, Button} from "view-ui-plus";
import {optionsChapterType} from "~/constants/options.js";
import {QuillEditor} from '@vueup/vue-quill'
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
    ['bold', 'italic', 'underline', 'strike'],

    [{'list': 'ordered'}, {'list': 'bullet'}, {'list': 'check'}],
    [{'indent': '-1'}, {'indent': '+1'}],

    [{'color': []}],
];

const validateChapterNumber = (rule, value, callback) => {
    if (!value && value !== 0) {
        return callback(new Error('Vui lòng nhập số chương'));
    }
    callback()
};

const rules = {
    name: [
        {required: true, message: 'Vui lòng nhập tên', trigger: 'blur'}
    ],
    chapter_number: [
        {required: true, validator: validateChapterNumber, trigger: 'blur'}
    ],
    type: [
        {required: true, message: 'Vui lòng chọn loại', trigger: 'change'}
    ],
    content: [
        {required: true, message: 'Vui lòng nhập nội dung', trigger: 'blur'}
    ],
};

const status = ref('add');
const formRef = ref();
const loading = ref(false);
const formItem = reactive({
    name: "",
    chapter_number: null,
    type: "",
    content: ""
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
        await useNuxtApp().$api(`moderator/story/${props?.story?.slug}/chapter/${props?.dataDetail?.slug}`, {
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
        await useNuxtApp().$api(`moderator/story/${props?.story?.slug}/chapter/${props?.dataDetail?.slug}`, {
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
                    ? `moderator/story/${props?.story?.slug}/chapter/${props?.dataDetail?.slug}`
                    : `moderator/story/${props?.story?.slug}/chapter`, {
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
        loading.value = false;
    }
});

watch(() => props.dataDetail, () => {
    if (status.value === 'detail') {
        formRef.value.resetFields();

        formItem.name = props.dataDetail?.name;
        formItem.type = props.dataDetail?.type;
        formItem.content = props.dataDetail?.content;
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
    <div class="w-50 h-100">
        <div class="w-100 d-flex flex-wrap gap-2 justify-content-between align-items-center">
            <h4>{{ title }}</h4>

            <Dropdown v-if="status === 'detail' || status === 'edit'"
                      trigger="hover">
                <a href="javascript:void(0)" style="margin-bottom: .5rem">
                    <Icon type="ios-more" size="24" style="cursor: pointer"/>
                </a>

                <template #list>
                    <DropdownMenu>
                        <DropdownItem @click="handleDelete">
                            <span style="color: red">Xóa</span>
                        </DropdownItem>
                        <DropdownItem @click="handlePost">
                            <span style="color: blue">Đăng bài</span>
                        </DropdownItem>
                        <DropdownItem @click="status = 'edit'">Chỉnh sửa</DropdownItem>
                    </DropdownMenu>
                </template>
            </Dropdown>
        </div>

        <Form ref="formRef"
              :model="formItem"
              :rules="rules"
              label-position="top">
            <Row :gutter="20">
                <Col span="10">
                    <FormItem label="Loại" prop="type">
                        <Select v-if="status !== 'detail'"
                                v-model="formItem.type"
                                placeholder="Loại">
                            <Option v-for="item in optionsChapterType"
                                    :value="item.value"
                                    :key="item.value">
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
                        <InputNumber v-if="status !== 'detail'"
                                     v-model="formItem.chapter_number" placeholder="Số chương" class="w-100"
                                     :min="0"
                                     :readonly="status === 'detail'"/>

                        <span v-else>
                            {{ formItem.chapter_number }}
                        </span>
                    </FormItem>
                </Col>
            </Row>

            <FormItem label="Tên" prop="name">
                <Input v-if="status !== 'detail'"
                       v-model="formItem.name"
                       placeholder="Tên" :readonly="status === 'detail'"/>

                <span v-else>
                    {{ formItem.chapter_number }}
                </span>
            </FormItem>

            <FormItem label="Nội dung" prop="content">
                <QuillEditor v-if="status !== 'detail'"
                             v-model:content="formItem.content"
                             :toolbar="toolbarOptions"
                             theme="snow"
                             content-type="html"
                             style="width: 100%; height: 500px; overflow: auto"/>

                <QuillEditor v-else
                             :content="formItem.content"
                             theme="bubble"
                             content-type="html"
                             read-only
                             :enable="false"
                             class="custom-quill"
                             style="width: 100%; overflow: auto"/>
            </FormItem>
        </Form>

        <div v-if="status === 'add' || status === 'edit'"
             class="mt-4"
             style="text-align: right">
            <Button type="primary" @click="submit" :loading="loading">
                {{ status === 'edit' ? 'Cập nhật' : 'Tạo mới' }}
            </Button>
        </div>
    </div>
</template>

<style lang="less">
.custom-quill {
    font-size: 14px !important;
    font-family: Roboto, sans-serif;
}
</style>
