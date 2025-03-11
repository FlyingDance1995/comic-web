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
        title: 'Tên gói',
        key: 'name',
        minWidth: 250,
    },
    {
        title: 'Số tiền',
        key: 'price',
        slot: 'price',
        minWidth: 200,
    },
    {
        title: 'Trạng thái',
        slot: 'enable',
        key: 'enable',
        width: 150,
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
const modalRef = ref(null);

const getData = async () => {
    try {
        loading.value = true;
        let query = {
            ordering: '-modification_time',
            ...route.query
        }
        if (!query?.search) delete query.search;

        const response = await $api('/admin/package-vip', {
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

const handleStatusPackageVipItem = async (row, status) => {
    try {
        if(status === 'delete') {
            loading.value = true;
        await useNuxtApp().$api(`admin/package-vip/${row?.id}`, {
            method: "DELETE",
        });

        await getData();
        Notice.success({
            title: 'Xóa gói VIP thành công',
        });
        } else {
            modalRef.value.open(row);
        }
    } catch (e) {
        loading.value = false;
        Notice.error({
            title: 'Xử lý thất bại',
        });
        console.log("error", e);
    }
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

watch(() => route?.query, (value, oldValue) => {
    if (value?.search !== oldValue?.search || value?.live !== oldValue?.live) {
        page.value = 1;
    }

    getData();
}, { immediate: true, deep: true });


onMounted(() => {
    useNuxtApp().$emitter.on('add-package-vip', async () => {
        await getData()
    });
});

onUnmounted(() => {
    useNuxtApp().$emitter.off('add-package-vip');
});
</script>

<template>
    <AdminManagerQuanLyGoiVipCreateOrUpdateModal ref="modalRef"/>

    <Table class="flex-1 mt-4" ref="table" max-height="650" :columns="columns" :data="data" :loading="loading"
           @on-sort-change="handleSort">
        <template #stt="{ row }">
            {{ row?.stt }}
        </template>

        <template #enable="{ row }">
            <span :style="{ color: row?.enable ? '#2D2FFD' : '#e4e5e6' }">
                {{ row?.enable ? 'Active' : 'InActive' }}
            </span>
        </template>

        <template #creation_time="{ row }">
            <span>{{ formattedDate(row?.creation_time) }}</span>
        </template>
        
        <template #modification_time="{ row }">
            <span>{{ formattedDate(row?.modification_time) }}</span>
        </template>

        <template #price="{ row }">
            {{Number(row?.price)?.toLocaleString()?.replaceAll('.', ',')}} VNĐ
        </template>

        <template #action="{ row }">
            <Dropdown trigger="hover">
                <a href="javascript:void(0)">
                    <Icon type="ios-more" size="24" style="cursor: pointer" />
                </a>

                <template #list>
                    <DropdownMenu>
                        <DropdownItem @click="handleStatusPackageVipItem(row, 'update')">
                            <span>Cập nhật</span>
                        </DropdownItem>
                        <DropdownItem @click="handleStatusPackageVipItem(row, 'delete')">
                            <span style="color: red">Xóa</span>
                        </DropdownItem>
                    </DropdownMenu>
                </template>
            </Dropdown>
        </template>
    </Table>

    <Page class="mt-4 text-black" style="text-align: right" :modelValue="page" :total="total" show-total
        @on-change="handleChangePage" />
</template>
