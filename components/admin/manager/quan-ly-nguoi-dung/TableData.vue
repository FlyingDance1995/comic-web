<script setup>

import {
    mappingUserStatus,
    mappingManageUserTable,
    filterManageUserStatus,
    mappingStoryRecommendedTable
} from "~/utils/mapping.js";
import { Notice } from "view-ui-plus";

const { $api } = useNuxtApp();
const route = useRoute();
const router = useRouter();

const columns = [
    {
        title: 'STT',
        key: 'stt',
        slot: 'stt',
        width: 70,
    },
    {
        title: 'Name',
        key: 'fullname',
        minWidth: 200,
    },
    {
        title: 'Email',
        key: 'email',
        width: 300,
    },
    {
        title: 'Role',
        slot: 'role',
        width: 140,
    },
    {
        title: 'VIP',
        slot: 'is_vip',
        width: 120,
        filters: mappingStoryRecommendedTable,
        filterMultiple: false,
        filterRemote: value => handleFilter('is_vip', value),
    },
    {
        title: 'Số coin',
        slot: 'balance',
        width: 160,
    },
    {
        title: "Trạng thái",
        slot: "is_active",
        width: 150,
        filters: mappingManageUserTable,
        filterMultiple: false,
        filterRemote: value => handleFilter('is_active', value),
    },
    {
        title: "Thời điểm tạo",
        slot: "date_joined",
        width: 180,
        sortable: true
    },
    {
        title: "Lần đăng nhập gần nhất",
        slot: "last_login",
        width: 215,
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

const formItem = ref({
    fullname: "",
    avatar: "",
    role: "",
    type: "",
    last_chapter: "",
    name: "",
    description: "",
    category: []
});

const modalUpdateRef = ref();
const modalActive = ref(false);
const loadingActive = ref(false);


const modalChangePass = ref(false);
const loadingChangePass = ref(false);

const modalEdit = ref(false);
const loadingEdit = ref(false);


const getData = async () => {
    try {
        loading.value = true;
        let query = {
            ordering: '-date_joined',
            ...route.query
        }
        if (!query?.search) delete query.search;

        const response = await $api('/admin/users', {
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

const activeItem = (row) => {
    modalActive.value = true;
    formItem.value = row;
};

const okActive = async (row) => {
    try {
        loadingActive.value = true;
        await useNuxtApp().$api(`admin/users/${formItem?.value?.id}`, {
            method: "PATCH",
            body: {
                "is_active": !formItem?.value?.is_active
            }
        });

        await getData();
        loadingActive.value = false;
        modalActive.value = false;
        formItem.value = {
            fullname: "",
            avatar: "",
            role: "",
            type: "",
            last_chapter: "",
            name: "",
            description: "",
            category: []
        };
    } catch (e) {
        console.log("error", e);
        loadingActive.value = false;
    }
};

const changePassItem = (row) => {
    formItem.value = row;
    modalChangePass.value = true;
};

const okChangePass = async () => {
    try {
        loadingChangePass.value = true;
        await useNuxtApp().$api(`admin/users/${formItem?.value?.id}`, {
            method: "PATCH",
            body: {
                "password": formItem?.value?.password
            }
        });

        loadingChangePass.value = false;
        modalChangePass.value = false;
        success();
    } catch (e) {
        console.log("error", e);
        loadingChangePass.value = false;
        error();
    }
};

const editItem = (row) => {
    modalUpdateRef.value.open(row);
};

const okEditItem = async () => {
    try {
        loadingEdit.value = true;
        await useNuxtApp().$api(`admin/users/${formItem?.value?.id}`, {
            method: "PATCH",
            body: {
                fullname: formItem?.value?.fullname,
                avatar: formItem?.value?.avatar, // File
                role: formItem?.value?.role
            }
        });

        await getData();
        loadingEdit.value = false;
        loadingEdit.value = false;
        formItem.value = {
            fullname: "",
            avatar: "",
            role: "",
            type: "",
            last_chapter: "",
            name: "",
            description: "",
            category: []
        };
        success()
    } catch (e) {
        console.log("error", e);
        loadingEdit.value = false;
        Notice.error({
            title: 'Vui lòng thử lại với mật khẩu khác mạnh hơn',
        });
    }
};

watch(() => route?.query, (value, oldValue) => {
    if (value?.search !== oldValue?.search || value?.live !== oldValue?.live) {
        page.value = 1;
    }
    getData();
}, { immediate: true, deep: true });

const success = () => {
    Notice.success({
        title: 'Thành công',
    });
};

const error = () => {
    Notice.error({
        title: 'Thất bại',
    });
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

const formatVip = (row) => {
    if (row?.is_vip) {
        const now = new Date().getTime();
        if (row?.vip_expiry === -1 || row?.vip_expiry * 1000 > now) {
            return {
                text: "Có",
                color: "#2D2FFD"
            };
        }
        return {
            text: "Có - Hết hạn",
            color: "#FE3821"
        };
    }
    return {
        text: "Không",
        color: ""
    };
};

onMounted(() => {
    useNuxtApp().$emitter.on('add-user', () => {
        getData()
    });
});

onUnmounted(() => {
    useNuxtApp().$emitter.off('add-user');
});
</script>

<template>
    <Table class="flex-1 mt-4" ref="table" max-height="650" :columns="columns" :data="data" :loading="loading"
        @on-sort-change="handleSort">
        <template #stt="{ row }">
            {{ row?.stt }}
        </template>

        <template #team="{ row }">
            {{ row?.fullname }}
        </template>

        <template #email="{ row }">
            <span>{{ row?.email }}</span>
        </template>

        <template #balance="{ row }">
            <span>{{ row?.wallet?.balance }} coin</span>
        </template>

        <template #role="{ row }">
            <span class="text-capitalize">{{ row?.role }}</span>
        </template>

        <template #is_active="{ row }">
            <span :style="{ color: mappingUserStatus(row?.is_active).color }">
                {{ mappingUserStatus(row?.is_active).title }}
            </span>
        </template>

        <template #is_vip="{ row }">
            <span :style="{ color: formatVip(row).color }">
                {{ formatVip(row).text }}
            </span>
        </template>

        <template #date_joined="{ row }">
            <span>{{ formattedTime(row?.date_joined) }}</span>
        </template>

        <template #last_login="{ row }">
            <span>{{ timeAgo2(row?.last_login) }}</span>
        </template>

        <template #action="{ row }">
            <Dropdown trigger="hover">
                <a href="javascript:void(0)">
                    <Icon type="ios-more" size="24" style="cursor: pointer" />
                </a>

                <template #list>
                    <DropdownMenu>
                        <DropdownItem @click="activeItem(row)">
                            <span v-if="row?.is_active" style="color: #fd3550">Hủy kích hoạt</span>
                            <span v-else style="color: blue">Kích hoạt</span>
                        </DropdownItem>
                        <DropdownItem @click="changePassItem(row)">Đổi mật khẩu</DropdownItem>
                        <DropdownItem @click="editItem(row)">Chỉnh sửa</DropdownItem>
                    </DropdownMenu>
                </template>
            </Dropdown>
        </template>
    </Table>

    <Modal v-model="modalEdit" title="Chỉnh sửa thông tin người dùng" :loading="loadingEdit" width="800px"
        @on-ok="okEditItem">

        <Form :model="formItem" label-position="top">
            <FormItem label="Tên">
                <Input v-model="formItem.fullname" placeholder="Tên"></Input>
            </FormItem>

            <FormItem label="Email">
                <Input v-model="formItem.email" placeholder="Email"></Input>
            </FormItem>

            <FormItem label="Contact">
                <Input v-model="formItem.contact" placeholder="Contact"></Input>
            </FormItem>

            <FormItem label="Role">
                <Select v-model="formItem.role">
                    <Option value="user">User</Option>
                    <Option value="moderator">Moderator</Option>
                    <Option value="admin">Admin</Option>
                </Select>
            </FormItem>

            <FormItem label="Facebook">
                <Input v-model="formItem.fb" placeholder="Facebook"></Input>
            </FormItem>

            <FormItem label="Mô tả">
                <Input v-model="formItem.description" type="textarea" :autosize="{ minRows: 3, maxRows: 5 }"
                    placeholder="Mô tả"></Input>
            </FormItem>
        </Form>
    </Modal>

    <AdminManagerQuanLyNguoiDungCreateOrUpdateModal ref="modalUpdateRef" />

    <Modal v-model="modalActive" title="Xác nhận" :loading="loadingActive" @on-ok="okActive">
        <p>{{ `Bạn có muốn chắc chắn ${formItem?.is_active ? '"Hủy kích hoạt"' : '"Kích hoạt"'} người dùng này` }}</p>
    </Modal>

    <Modal v-model="modalChangePass" title="Đổi mật khẩu" :loading="loadingChangePass" @on-ok="okChangePass">

        <Form :model="formItem" label-position="top">
            <FormItem label="Mật khẩu mới" >
                <Input v-model="formItem.password" type="password" password placeholder="Password"></Input>
            </FormItem>
        </Form>
    </Modal>

    <Page class="mt-4 text-black" style="text-align: right" :modelValue="page" :total="total" show-total
        @on-change="handleChangePage" />
</template>
