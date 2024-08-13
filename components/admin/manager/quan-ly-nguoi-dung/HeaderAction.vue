<script setup>
import _ from "lodash";

const route = useRoute();
const router = useRouter();

const modalRef = ref(null);
const query = reactive({
    search: route.query?.search || "",
});

const handleSearch = _.debounce(() => {
    const qr = {...query};
    if (!qr.search) delete qr.search;

    router.push({
        query: qr
    });
}, 500);

const handleAdd = () => {
    modalRef.value.open();
};
</script>

<template>
    <div class="w-100 d-flex flex-wrap gap-2 justify-content-between">
        <h4 class="text-black-50">
           Quản lý người dùng
        </h4>

        <div class="d-flex align-items-center">
            <span class="me-2 text-black">Tìm kiếm</span>
            <Input
                v-model="query.search"
                search
                clearable
                placeholder="Nhập từ khóa tìm kiếm"
                class="input-search"
                @on-clear="handleSearch"
                @on-change="handleSearch"
                style="flex: 1"
            />

            <Button type="success" class="ms-3" @click="handleAdd">
                Tạo mới
            </Button>
        </div>
    </div>

    <AdminManagerQuanLyNguoiDungCreateOrUpdateModal ref="modalRef"/>
</template>
