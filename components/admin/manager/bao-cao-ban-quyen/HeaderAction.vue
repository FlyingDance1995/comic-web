<script setup>
import _ from "lodash";

const route = useRoute();
const router = useRouter();

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
</script>

<template>
    <div class="w-100 d-flex flex-wrap gap-2 justify-content-between">
        <h4 class="text-black-50">
           Báo cáo bản quyền
        </h4>

        <div class="d-flex align-items-center">
            <span class="me-2" style="width: 90px">Tìm kiếm</span>
            <Input
                v-model="query.search"
                search
                clearable
                placeholder="Nhập từ khóa tìm kiếm"
                class="input-search"
                @on-clear="handleSearch"
                @on-change="handleSearch"
            />
        </div>
    </div>
</template>
