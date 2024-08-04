<script setup>

import {mappingStoryStatus, mappingStoryType} from "~/utils/mapping.js";
import {Notice, Table} from "view-ui-plus";
import {optionsStoryStatus, optionsStoryType} from "~/constants/options.js";

const { $api } = useNuxtApp();
const route = useRoute();
const router = useRouter();

const optionsTeam = ref([]);
const getTeam = async () => {
    try {
        const response = await useNuxtApp().$api('/moderator/teams', {
            method: "GET",
            query: {
                size: 1000,
            }
        });
        optionsTeam.value = response?.results?.map(item => {
            return {
                ...item,
                value: item?.id,
                label: item?.name
            }
        });
    } catch (e) {
        console.log(e?.response);
    }
};

await getTeam();

const columns = [
    {
        title: 'STT',
        key: 'stt',
        slot: 'stt',
        width: 80,
    },
    {
        title: 'Tên truyện',
        key: 'name',
        minWidth: 300,
    },
    {
        title: 'Trạng thái',
        slot: 'status',
        width: 150,
        filters: optionsStoryStatus,
        filterMultiple: false,
        filterRemote: value => handleFilter('status', value),
    },
    {
        title: 'Loại',
        slot: 'type',
        width: 150,
        filters: optionsStoryType,
        filterMultiple: false,
        filterRemote: value => handleFilter('type', value),
    },
    {
        title: "Team",
        slot: "team",
        width: 270,
        filters: optionsTeam.value,
        filterMultiple: false,
        filterRemote: value => handleFilter('team', value),
    },
    {
        title: "Thời gian cập nhật",
        slot: "modification_time",
        width: 180,
        sortable: true,
    },
    {
        title: "Đề cử",
        slot: "recommended",
        width: 80,
    },
    {
        title: "Số chương",
        slot: "last_chapter",
        width: 110,
    },
    {
        title: "Lượt xem",
        slot: "total_watched",
        width: 100,
    },
    {
        title: "Theo dõi",
        slot: "total_follow",
        width: 100,
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
const modalUpdateRef = ref();
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

        const response = await $api('/moderator/story', {
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
        await useNuxtApp().$api(`moderator/story/${formItem?.value?.slug}`, {
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

const approvalItem = async (row) => {
    try {
        if (row?.status !== 'draft') return;

        loading.value = true;
        await useNuxtApp().$api(`moderator/story/${row?.slug}`, {
            method: "PATCH",
            body: {
                status: 'awaiting'
            }
        });

        await getData();
        loading.value = false;
        Notice.success({
            title: 'Yêu cầu phê duyệt thành công',
        });
    } catch (e) {
        Notice.error({
            title: 'Yêu cầu phê duyệt thất bại',
        });
        console.log("error", e);
        loading.value = false;
    }
};

const finishItem = async (row) => {
    try {
        if (row?.status !== 'processing') return;

        loading.value = true;
        await useNuxtApp().$api(`moderator/story/${row?.slug}`, {
            method: "PATCH",
            body: {
                status: 'finish'
            }
        });

        await getData();
        loading.value = false;
        Notice.success({
            title: 'Cập nhât thành công',
        });
    } catch (e) {
        Notice.error({
            title: 'Cập nhật thất bại',
        });
        console.log("error", e);
        loading.value = false;
    }
};

const editItem = (row) => {
    modalUpdateRef.value.open(row);
};

const handleClickRow = (row) => {
    router.push(`/dang-truyen/quan-ly-truyen/${row?.slug}`);
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
    if (value?.search !== oldValue?.search || value?.live !== oldValue?.live) {
        page.value = 1;
    }

    getData();
}, {immediate: true, deep: true});

onMounted(() => {
    useNuxtApp().$emitter.on('add-story', () => {
        getData()
    });
});

onUnmounted(() => {
    useNuxtApp().$emitter.off('add-story');
});

</script>

<template>
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
            {{row?.stt}}
        </template>

        <template #team="{ row }">
            {{row?.team?.name}}
        </template>

        <template #status="{ row }">
            <span :style="{color: mappingStoryStatus(row?.status).color}">
                {{mappingStoryStatus(row?.status).title}}
            </span>
        </template>

        <template #type="{ row }">
            {{mappingStoryType(row?.type)}}
        </template>

        <template #modification_time="{ row }">
            <span>{{ formattedDate(row?.modification_time) }}</span>
        </template>

        <template #recommended="{ row }">
            <span>{{ row?.recommended ? "Có" : "Không" }}</span>
        </template>

        <template #last_chapter="{ row }">
            <span>{{ row?.last_chapter?.chapter_number || 0 }}</span>
        </template>

        <template #total_watched="{ row }">
            <span>{{ row?.statistics?.total_watched?.toLocaleString()?.replaceAll('.', ',') || 0 }}</span>
        </template>

        <template #total_follow="{ row }">
            <span>{{ row?.statistics?.total_follow?.toLocaleString()?.replaceAll('.', ',') || 0 }}</span>
        </template>

        <template #action="{ row }">
            <Dropdown trigger="hover">
                <a href="javascript:void(0)">
                    <Icon type="ios-more" size="24" style="cursor: pointer" />
                </a>
                
                <template #list>
                    <DropdownMenu>
                        <DropdownItem @click="removeItem(row)"><span style="color: red">Xóa</span></DropdownItem>
                        <DropdownItem @click="approvalItem(row)"
                                      :disabled="row?.status !== 'draft'">
                            <span :style="{color: row?.status === 'draft' && 'blue'}">Yêu cầu phê duyệt</span>
                        </DropdownItem>
                        <DropdownItem @click="finishItem(row)"
                                      :disabled="row?.status !== 'processing'">Hoàn thành</DropdownItem>
                        <DropdownItem @click="editItem(row)">Chỉnh sửa</DropdownItem>
                    </DropdownMenu>
                </template>
            </Dropdown>
        </template>
    </Table>

    <AdminModeratorQuanLyTruyenCreateOrUpdateModal ref="modalUpdateRef"/>

    <Modal
        v-model="modalRemove"
        title="Xác nhận"
        :loading="loadingRemove"
        @on-ok="okRemove">
        <p>Bạn có muốn chắc chắn xóa truyện này</p>
    </Modal>

    <Page class="mt-4" style="text-align: right" :modelValue="page" :total="total" show-total @on-change="handleChangePage"/>
</template>

<style>
.cursor-pointer {
    cursor: pointer;
}
</style>
