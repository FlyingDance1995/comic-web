<script setup>

import {
    mappingStoryStatus, mappingStoryStatusTable, mappingStoryTypeTable,
    filterStoryStatus, filterStoryType, mappingStoryRecommendedTable,
    filterStoryRecommended, mappingStoryType
} from "~/utils/mapping.js";
import {Notice, Table} from "view-ui-plus";

const { $api } = useNuxtApp();
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
        title: 'Người dùng',
        key: 'user',
        slot: 'user',
        minWidth: 300,
    },
    {
        title: 'Số tiền',
        key: 'amount',
        minWidth: 120,
    },
    {
        title: 'Code',
        key: 'code',
        minWidth: 120,
    },
    {
        title: 'Trạng thái',
        slot: 'status',
        width: 150,
        filters: mappingTransactionStatusTable,
        filterMultiple: false,
        filterRemote: value => handleFilter('status', value),
    },
    {
        title: "Thời gian tạo",
        slot: "creation_time",
        width: 180,
        sortable: true,
    },
    {
        title: "Thời gian cập nhật",
        slot: "modification_time",
        width: 180,
        sortable: true,
    },
    {
        title: " ",
        slot: "action",
        width: 60,
        fixed: 'right'
    }
];

const data = ref([]);
const loading = ref(false);
const page = ref(Number(route.query?.page) || 1);
const total = ref(0);

const openModal = ref(false);
const loadingModal = ref(true);
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
            ordering: '-modification_time',
            ...route.query
        }
        if (!query?.search) delete query.search;

        const response = await $api('/admin/transaction', {
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

const removeItem = async (row) => {
    modalRemove.value = true;
    formItem.value = row;
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
    } catch (e) {
        console.log("error", e);
        loadingRemove.value = false;
    }
};

const handleStatusTransactionItem = async (row, status) => {
    try {
        loading.value = true;
        await useNuxtApp().$api(`admin/transaction/${row?.id}`, {
            method: "PUT",
            body: {
                status: status
            }
        });

        await getData();
        Notice.success({
            title: 'Xử lý thành công',
        });
    } catch (e) {
        loading.value = false;
        Notice.error({
            title: 'Xử lý thất bại',
        });
        console.log("error", e);
    }
};

const deputeItem = async (row) => {
    try {
        loading.value = true;
        await useNuxtApp().$api(`admin/story/${row?.slug}`, {
            method: "PATCH",
            body: {
                recommended: !row?.recommended
            }
        });

        await getData();
        Notice.success({
            title: 'Đề cử thành công',
        });
    } catch (e) {
        loading.value = false;
        Notice.error({
            title: 'Đề cử thất bại',
        });
        console.log("error", e);
    }
};

const editItem = (row) => {
    openModal.value = true;
    formItem.value = row;
};

const asyncOK = () => {
    loadingModal.value = true;

    getData();
    openModal.value = false;
    loadingModal.value = false;
    formItem.value = {
        type: "",
        last_chapter: "",
        name: "",
        description: "",
        category: []
    };
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

const handleClickRow = (row) => {
    router.push(`/admin/quan-ly-truyen/${row?.slug}`);
};

watch(() => route?.query, (value, oldValue) => {
    if (value?.search !== oldValue?.search || value?.live !== oldValue?.live) {
        page.value = 1;
    }

    getData();
}, { immediate: true, deep: true });
</script>

<template>
    <Table class="flex-1 mt-4" ref="table" max-height="650" :columns="columns" :data="data" :loading="loading"
           :row-class-name="() => 'cursor-pointer'"
           @on-sort-change="handleSort">
        <template #stt="{ row }">
            {{ row?.stt }}
        </template>

        <template #user="{ row }">
            {{ row?.user?.fullname }}
        </template>

        <template #status="{ row }">
            <span :style="{ color: mappingTransactionStatus(row?.status).color }">
                {{ mappingTransactionStatus(row?.status).title }}
            </span>
        </template>

        <template #creation_time="{ row }">
            <span>{{ formattedDate(row?.creation_time) }}</span>
        </template>
        
        <template #modification_time="{ row }">
            <span>{{ formattedDate(row?.modification_time) }}</span>
        </template>

        <template #action="{ row }">
            <Dropdown trigger="hover">
                <a href="javascript:void(0)">
                    <Icon type="ios-more" size="24" style="cursor: pointer" />
                </a>

                <template #list>
                    <DropdownMenu>
                        <DropdownItem @click="handleStatusTransactionItem(row, 'success')">
                            <span style="color: blue">Thành công</span>
                        </DropdownItem>
                        <DropdownItem @click="handleStatusTransactionItem(row, 'failed')">
                            <span style="color: red">Thất bại</span>
                        </DropdownItem>
                    </DropdownMenu>
                </template>
            </Dropdown>
        </template>
    </Table>

    <Modal v-model="openModal" title="Chỉnh sửa truyện" :loading="loadingModal" width="800px" @on-ok="asyncOK">
        <Form :model="formItem" label-position="top">
            <FormItem label="Loại">
                <Select v-model="formItem.type">
                    <div v-for="item in formItem.category" :key="item.id">
                        <Option :value="item.slug">{{ item.name }}</Option>
                    </div>
                </Select>
            </FormItem>

            <FormItem label="Số chương">
                <Select v-model="formItem.last_chapter">
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                </Select>
            </FormItem>

            <FormItem label="Tên">
                <Input v-model="formItem.name" placeholder="Tên"></Input>
            </FormItem>

            <FormItem label="Nội dung">
                <Input v-model="formItem.description" type="textarea" :autosize="{ minRows: 3, maxRows: 5 }"
                    placeholder="Nội dung"></Input>
            </FormItem>
        </Form>
    </Modal>

    <Modal v-model="modalRemove" title="Xác nhận" :loading="loadingRemove" @on-ok="okRemove">
        <p>Bạn có muốn chắc chắn xóa truyện này</p>
    </Modal>

    <Page class="mt-4 text-black" style="text-align: right" :modelValue="page" :total="total" show-total
        @on-change="handleChangePage" />
</template>
