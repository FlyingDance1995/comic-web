<script setup>

import { mappingTeamStatus } from "~/utils/mapping.js";
import { optionsTeamStatus } from "~/constants/options.js";
import { Table } from "view-ui-plus";

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
        title: 'Tên',
        key: 'name',
        minWidth: 300,
    },
    {
        title: 'Trạng thái',
        slot: 'status',
        width: 150,
        filters: optionsTeamStatus,
        filterMultiple: false,
        filterRemote: value => handleFilter('status', value),
    },
    {
        title: "Trưởng nhóm",
        slot: "leader",
        width: 270,
    },
    {
        title: "Thời gian tạo",
        slot: "creation_time",
        width: 170,
        sortable: true,
    },
    {
        title: "Thành viên",
        slot: "member",
        width: 120,
    },
    {
        title: "Số truyện",
        slot: "total_story",
        width: 120,
    },
    {
        title: "Lượt xem",
        slot: "total_watched",
        width: 120,
    },
    {
        title: "Theo dõi",
        slot: "total_follow",
        width: 120,
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
const modalApproval = ref(false);
const loadingApproval = ref(false);

const getData = async () => {
    try {
        loading.value = true;
        let query = {
            ordering: '-creation_time',
            ...route.query
        }
        if (!query?.search) delete query.search;

        const response = await $api('/moderator/teams', {
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
        data.value = [];
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

const removeItem = (row) => {
    modalRemove.value = true;
    formItem.value = row;
};

const okRemove = async () => {
    try {
        loadingRemove.value = true;
        await useNuxtApp().$api(`moderator/teams/${formItem?.value?.slug}`, {
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

const approvalItem = (row) => {
    if (row?.status !== 'init') return;

    modalApproval.value = true;
    formItem.value = row;
};

const okApproval = async () => {
    try {
        loadingApproval.value = true;
        await useNuxtApp().$api(`moderator/teams/${formItem?.value?.slug}`, {
            method: "PATCH",
            body: {
                "status": 'awaiting'
            }
        });

        await getData();
        loadingApproval.value = false;
        modalApproval.value = false;
    } catch (e) {
        console.log("error", e);
        loadingApproval.value = false;
    }
};

const editItem = (row) => {
    modalUpdateRef.value.open(row);
};

const handleSort = ({ column, order }) => {
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
}, { immediate: true, deep: true });

onMounted(() => {
    useNuxtApp().$emitter.on('add-team', () => {
        getData()
    });
});

onUnmounted(() => {
    useNuxtApp().$emitter.off('add-team');
});

</script>

<template>
    <Table class="flex-1 mt-4" ref="table" max-height="650" :columns="columns" :data="data" :loading="loading"
        @on-sort-change="handleSort">
        <template #stt="{ row }">
            {{ row?.stt }}
        </template>

        <template #name="{ row }">
            {{ row?.name }}
        </template>

        <template #status="{ row }">
            <span :style="{ color: mappingTeamStatus(row?.status).color }">
                {{ mappingTeamStatus(row?.status).title }}
            </span>
        </template>

        <template #leader="{ row }">
<!--            <NuxtLink :to="`/admin/quan-ly-nguoi-dung?search=${row?.leader?.email || ''}`">-->
                {{ row?.leader?.fullname }}
<!--            </NuxtLink>-->
        </template>

        <template #creation_time="{ row }">
            <span>{{ formattedDate(row?.creation_time) }}</span>
        </template>

        <template #member="{ row }">
            <span>{{ row?.member?.length || 0 }}</span>
        </template>

        <template #total_story="{ row }">
            <span>{{ row?.statistics?.total_story?.toLocaleString()?.replaceAll('.', ',') || 0 }}</span>
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
                        <DropdownItem @click="removeItem(row)">
                            <span style="color: red">Xóa</span>
                        </DropdownItem>
                        <DropdownItem @click="approvalItem(row)"
                                      :disabled="row?.status !== 'init'">Yêu cầu phê duyệt</DropdownItem>
                        <DropdownItem @click="editItem(row)">Chỉnh sửa</DropdownItem>
                    </DropdownMenu>
                </template>
            </Dropdown>
        </template>
    </Table>

    <AdminModeratorQuanLyTeamCreateOrUpdateModal ref="modalUpdateRef" />

    <Modal v-model="modalRemove" title="Xác nhận" :loading="loadingRemove" @on-ok="okRemove">
        <p>Bạn có muốn chắc chắn xóa team này</p>
    </Modal>

    <Modal v-model="modalApproval" title="Yêu cầu phê duyệt" :loading="loadingApproval" @on-ok="okApproval">
        <p>Bạn có muốn phê duyệt team này</p>
    </Modal>

    <Page class="mt-4 text-black" style="text-align: right" :modelValue="page" :total="total" show-total
        @on-change="handleChangePage" />
</template>
