<script setup>

import {mappingChapterStatus, mappingStoryStatus, mappingStoryType} from "~/utils/mapping.js";
import {Notice, Table} from "view-ui-plus";

const props = defineProps({
    story: {
        type: Object,
        default: null
    }
});

const emit = defineEmits(['onDetailOrUpdate'])

const {$api} = useNuxtApp();
const route = useRoute();
const router = useRouter();

const columns = [
    {
        title: 'STT',
        key: 'stt',
        slot: 'stt',
        width: 80,
    },
    {
        title: 'Tên',
        slot: 'name',
        minWidth: 300,
    },
    {
        title: 'Trạng thái',
        slot: 'draft',
        width: 150,
        filters: [
            {
                label: 'Đã đăng',
                value: false
            },
            {
                label: 'Nháp',
                value: true
            },
        ],
        filterMultiple: false,
        filterRemote: value => handleFilter('draft', value),
    },
    {
        title: "Ngày tạo",
        slot: "creation_time",
        width: 170,
        sortable: true,
    },
];

const slug = route?.params?.slug || '';

const data = ref([]);
const loading = ref(false);
const page = ref(Number(route.query?.page) || 1);
const total = ref(0);
const formItem = ref({
    type: "",
    last_chapter: "",
    name: "",
    description: "",
    category: []
});

const modalRemove = ref(false);
const loadingRemove = ref(false);

const getData = async () => {
    try {
        loading.value = true;
        let query = {
            ordering: '-creation_time',
            ...route.query
        }
        if (!query?.search) delete query.search;

        const response = await $api(`/admin/story/${slug}/chapter`, {
            query: {
                ...query,
                size: 10
            }
        });

        data.value = response?.results?.map((item, index) => {
            return {
                ...item,
                stt: (10 * (page.value - 1)) + index + 1
            }
        }) || [];
        total.value = response?.count || 0;
        loading.value = false;
    } catch (e) {
        loading.value = false;
        console.log("error", e);
    }
};

const handleChangePage = (value) => {
    page.value = value;
    const query = {
        ...route.query,
        page: value
    };
    delete query.sportType;
    if (query.page === 1) delete query.page;

    router.push({
        query: query
    });
};

const okRemove = async () => {
    try {
        loadingRemove.value = true;
        await useNuxtApp().$api(`admin/story/${formItem?.value?.slug}`, {
            method: "DELETE",
        });

        await getData();
        loadingRemove.value = false;
        modalRemove.value = false;
        Notice.success({
            title: 'Xóa thành công',
        });
    } catch (e) {
        Notice.error({
            title: 'Xóa thất bại',
        });
        console.log("error", e);
        loadingRemove.value = false;
    }
};

const handleClickRow = (row) => {
    emit('onDetailOrUpdate', row);
};

const handleSort = ({column, order}) => {
    const type = column.slot || column.key;
    const query = {
        ...route.query,
    };

    if (order === 'normal') {
        if (query.ordering) {
            delete query.ordering;
        }
    } else if (order === 'asc') {
        query.ordering = type;
    } else {
        query.ordering = `-${type}`;
    }

    delete query.page;
    router.push({
        query,
    });
};

const handleFilter = (type, value) => {
    const query = {
        ...route.query,
    };

    if (value.length > 0) {
        query[type] = value.join(',');
    } else {
        delete query[type];
    }

    delete query.page;

    router.push({
        query,
    });
};

watch(() => route?.query, (value, oldValue) => {
    if (value?.search !== oldValue?.search) {
        page.value = 1;
    }

    getData();
}, {immediate: true, deep: true});

onMounted(() => {
    useNuxtApp().$emitter.on('add-chapter', () => {
        getData()
    });
});

onUnmounted(() => {
    useNuxtApp().$emitter.off('add-chapter');
});
</script>

<template>
    <div class="w-100 h-100">
        <Table
            class="flex-1 mt-4"
            ref="table"
            max-height="650"
            :columns="columns"
            :data="data"
            :loading="loading"
            :row-class-name="() => 'cursor-pointer'"
            @on-row-click="handleClickRow"
            @on-sort-change="handleSort"
        >
            <template #stt="{ row }">
                {{ row?.stt }}
            </template>

            <template #name="{ row }">
                {{ formattedNameChaper(row?.type) }} {{ row?.chapter_number || '' }}: {{ row?.name || '' }}
            </template>

            <template #draft="{ row }">
            <span :style="{color: mappingChapterStatus(row?.draft).color}">
                {{ mappingChapterStatus(row?.draft).title }}
            </span>
            </template>

            <template #creation_time="{ row }">
                <span>{{ formattedDate(row?.creation_time) }}</span>
            </template>
        </Table>

        <Modal
            v-model="modalRemove"
            title="Xác nhận"
            :loading="loadingRemove"
            @on-ok="okRemove">
            <p>Bạn có muốn chắc chắn xóa truyện này</p>
        </Modal>

        <Page class="mt-4" style="text-align: right" :modelValue="page" :total="total" show-total
              @on-change="handleChangePage"/>
    </div>
</template>
