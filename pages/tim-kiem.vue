<script setup>
const route = useRoute();
const page = +route?.query?.page || 1;
const query = {
    page: page,
    size: 20
};

const categories = ref([]);
const stories = ref([]);
const total = ref(0);

const form = reactive({
    search: route?.query?.search || null,
    category: route?.query?.category || null,
    status: route?.query?.status || null,
});

try {
    const {data} = await useAPI('/category?page=1&size=300');
    categories.value = data.value?.results;
} catch (error) {
    console.log("error", error);
}

try {
    const {data} = await useAPI('/story', {
        query: {
            ...query,
            ...form
        }
    });
    stories.value = data.value?.results;
    total.value = data.value?.count;
} catch (error) {
    console.log("error", error);
}

const handleChangeCheckbox = () => {
    const checkboxes = document.querySelectorAll('.cate-select');
    const selectedValues = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
    form.category = selectedValues.join(',');
};

onMounted(() => {
    const selectedValues = form.category?.split(',') || [];
    selectedValues.forEach(slug => {
        const checkbox = document.getElementById(`cate-select-${slug}`);
        if (checkbox) {
            checkbox.checked = true;
        }
    });
});
</script>

<template>
    <Head>
        <Title>Tìm kiếm: {{form.search}}</Title>
    </Head>

    <div class="container">
        <div class="row">
            <div class="col-lg-3 col-md-3 col-12">
                <div class="mobile">
                    <div class="alert alert-info border-0 bg-info alert-dismissible fade show py-2 mb-3">
                        Tìm thấy <b>1</b> truyện
                    </div>
                </div>

                <form action="/tim-kiem" method="GET">
                    <div class="input-group mb-3">
                        <input v-model="form.search"
                               type="text"
                               class="form-control"
                               placeholder="Từ khoá cần tìm"
                               aria-label="Từ khoá cần tìm"
                               aria-describedby="button-addon2"
                               name="search">
                        <button class="btn btn-primary" type="submit" id="button-addon2">Tìm kiếm</button>
                    </div>

                    <!--                    <div class="mb-3">-->
                    <!--                        <h6><i class="bx bx-caret-right-circle"></i>Số chương</h6>-->
                    <!--                        <div class="d-flex align-items-center gap-3">-->
                    <!--                            <div class="form-check form-check-success">-->
                    <!--                                <input class="form-check-input"-->
                    <!--                                       type="radio"-->
                    <!--                                       name="total_chapter"-->
                    <!--                                       id="total_chapter1" value="<10">-->
                    <!--                                <label class="form-check-label" for="total_chapter1">-->
                    <!--                                    &lt;10-->
                    <!--                                </label>-->
                    <!--                            </div>-->

                    <!--                            <div class="form-check form-check-success">-->
                    <!--                                <input class="form-check-input"-->
                    <!--                                       type="radio"-->
                    <!--                                       name="total_chapter"-->
                    <!--                                       id="total_chapter2" value="11-50">-->
                    <!--                                <label class="form-check-label" for="total_chapter2">-->
                    <!--                                    11-50-->
                    <!--                                </label>-->
                    <!--                            </div>-->
                    <!--                            <div class="form-check form-check-success">-->
                    <!--                                <input class="form-check-input"-->
                    <!--                                       type="radio"-->
                    <!--                                       name="total_chapter"-->
                    <!--                                       id="total_chapter3" value="50-100">-->
                    <!--                                <label class="form-check-label" for="total_chapter3">-->
                    <!--                                    50-100-->
                    <!--                                </label>-->
                    <!--                            </div>-->
                    <!--                            <div class="form-check form-check-success">-->
                    <!--                                <input class="form-check-input"-->
                    <!--                                       type="radio"-->
                    <!--                                       name="total_chapter"-->
                    <!--                                       id="total_chapter4" value="100+">-->
                    <!--                                <label class="form-check-label" for="total_chapter4">-->
                    <!--                                    100+-->
                    <!--                                </label>-->
                    <!--                            </div>-->
                    <!--                        </div>-->
                    <!--                    </div>-->

                    <div class="mb-3">
                        <h6><i class="bx bx-caret-right-circle"></i>Tình trạng truyện</h6>
                        <select v-model="form.status" name="status" id="status" class="form-control">
                            <option :value="null">Tất cả</option>
                            <option value="finish">
                                Hoàn thành
                            </option>
                            <option value="processing">
                                Đang cập nhật
                            </option>
                        </select>
                    </div>

                    <div class="mb-3 list-filter-cate">
                        <h6><i class="bx bx-caret-right-circle"></i>Thể loại</h6>
                        <input v-model="form.category" type="hidden" name="category" id="category">
                        <div class="list-chapters">
                            <div class="d-flex flex-wrap">
                                <div v-for="item in categories"
                                     :key="item?.id"
                                     class="filter-cate">
                                    <div class="form-check form-check-success">
                                        <input class="form-check-input cate-select" type="checkbox"
                                               :value="item?.slug" :id="`cate-select-${item?.slug}`"
                                               @change="handleChangeCheckbox">
                                        <label class="form-check-label" :for="`cate-select-${item?.slug}`">
                                            {{ item?.name }}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mb-4 text-center">
                        <button type="submit" class="btn btn-sm btn-primary">
                            <i class="fadeIn animated bx bx-search"></i>
                            Tìm kiếm
                        </button>
                    </div>
                </form>
            </div>

            <div class="col-lg-9 col-md-9 col-12">
                <div class="pc">
                    <div class="alert alert-info border-0 bg-info alert-dismissible fade show py-2">
                        Tìm thấy <b>{{ total }}</b> truyện
                    </div>
                </div>

                <div class="row product-grid">
<!--                    <div class="col-md-3 col-6">-->
                        <LazyHomeProductItem v-for="(item, index) in stories"
                                             :key="index"
                                             :item="item"/>
<!--                    </div>-->
                </div>

                <div class="pagination mt-4 justify-content-center">
                    <!-- Pagination -->
                    <HomePagination :total="total"
                                    :page="page"
                                    :size="query.size"
                                    :type="`tim-kiem`"
                                    :query="`&search=${form.search || ''}&status=${form.status || ''}&category=${form.category || ''}`"/>
                    <!-- Pagination -->
                </div>
            </div>
        </div>
    </div>
</template>
