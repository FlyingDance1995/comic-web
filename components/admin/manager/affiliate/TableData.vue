<script setup>
import {
    mappingAffiliateTable, filterAffiliateStatus
} from "~/utils/mapping.js";
import {optionsLocation} from "../../../../constants/options.js";
import {Image} from "view-ui-plus";

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
        title: 'Name',
        key: 'name',
        minWidth: 300,
    },
    {
        title: 'Banner',
        slot: 'banner',
        width: 300,
    },
    {
        title: 'Link',
        slot: 'link',
        width: 300,
    },
    {
        title: 'Vị trí',
        slot: 'location',
        width: 200
    },
    {
        title: 'Trạng thái',
        slot: 'enable',
        width: 150,
        filters: mappingAffiliateTable,
        filterMultiple: false,
        filterRemote: value => handleFilter('enable', value),
    },
    {
        title: "Thời điểm tạo",
        slot: "creation_time",
        width: 170,
        sortable: true
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

const modalUpdateRef = ref();
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

        const response = await $api('/admin/affiliate', {
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

const removeItem = (row) => {
    modalRemove.value = true;
    formItem.value = row;
};

const okRemove = async (row) => {
    try {
        loadingRemove.value = true;
        await useNuxtApp().$api(`admin/affiliate/${formItem?.value?.id}`, {
            method: "DELETE",
        });

        getData();
        loadingRemove.value = false;
        modalRemove.value = false;
        formItem.value = {
            type: "",
            last_chapter: "",
            name: "",
            description: "",
            category: []
        };
    } catch (e) {
        console.log("error", e);
        loadingRemove.value = false;
    }
};

const approvalItem = (row) => {
    modalApproval.value = true;
    formItem.value = row;
};

const okApproval = async () => {
    try {
        loadingApproval.value = true;
        await useNuxtApp().$api(`admin/affiliate/${formItem?.value?.id}`, {
            method: "PATCH",
            body: {
                "enable": !formItem?.value?.enable
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
    useNuxtApp().$emitter.on('add-affiliate', () => {
        getData()
    });
});

onUnmounted(() => {
    useNuxtApp().$emitter.off('add-affiliate');
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
        @on-sort-change="handleSort"
    >
        <template #stt="{ row }">
            {{row?.stt}}
        </template>

        <template #name="{ row }">
            {{row?.name}}
        </template>

        <template #banner="{ row }">
            <div class="py-2">
                <Image :src="row?.banner" preview fit="contain" height="100px" :preview-list="[row?.banner]"/>
            </div>
        </template>

        <template #link="{ row }">
            <NuxtLink :to="row?.link" target="_blank" external>
                {{row?.link}}
            </NuxtLink>
        </template>

        <template #location="{ row }">
            {{optionsLocation?.find(x => x?.value === row?.location)?.label || ''}}
        </template>

        <template #enable="{ row }">
            <span :style="{color: mappingUserStatus(row?.enable).color}">
                {{ mappingUserStatus(row?.enable).title }}
            </span>
        </template>

        <template #creation_time="{ row }">
            <span>{{ formattedDate(row?.creation_time) }}</span>
        </template>

        <template #action="{ row }">
            <Dropdown trigger="hover">
                <a href="javascript:void(0)">
                    <Icon type="ios-more" size="24" style="cursor: pointer" />
                </a>
                
                <template #list>
                    <DropdownMenu>
                        <DropdownItem @click="approvalItem(row)">
                            <span v-if="row?.enable" style="color: #fd3550">Hủy kích hoạt</span>
                            <span v-else style="color: blue">Kích hoạt</span>
                        </DropdownItem>
                        <DropdownItem @click="editItem(row)">Chỉnh sửa</DropdownItem>
                        <DropdownItem @click="removeItem(row)">
                            <span style="color: #fd3550">Xóa</span>
                        </DropdownItem>
                    </DropdownMenu>
                </template>
            </Dropdown>
        </template>
    </Table>

    <AdminManagerAffiliateCreateOrUpdateModal ref="modalUpdateRef"/>

    <Modal
        v-model="modalRemove"
        title="Xác nhận"
        :loading="loadingRemove"
        @on-ok="okRemove">
        <p>Bạn có muốn chắc chắn xóa "Affiliate" này</p>
    </Modal>

    <Modal
        v-model="modalApproval"
        title="Xác nhận"
        :loading="loadingApproval"
        @on-ok="okApproval">
        <p>{{ `Bạn có chắc chắn ${formItem?.enable ? '"Hủy kích hoạt"' : '"Kích hoạt"'} Affiliate này?` }}</p>
    </Modal>

    <Page class="mt-4 text-black" style="text-align: right" :modelValue="page" :total="total" show-total @on-change="handleChangePage"/>
</template>
