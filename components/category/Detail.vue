<script setup>
const route = useRoute();

const slug = route?.params?.slug;
const page = +route?.query?.page || 1;
const params = {
    ordering: "-modification_time",
    page: page,
    size: 20
};

const storys = ref(null);
const category = ref(null);
const categories = ref(null);
const total = ref(0);
const isExpand = ref(false);

const handleExpand = (value) => {
    isExpand.value = !value;
};

const getData = async () => {
    try {
        const {data} = await useAPI(`/story`, {
            query: {
                ...params,
                category: slug
            }
        });
        storys.value = data?.value?.results;
        total.value = data?.value?.count;
    } catch (error) {
        console.log("error", error);
    }
};

const getCategory = async () => {
    const {data} = await useAPI(`/category/${slug}`);
    category.value = data?.value;
    if (data.value === null) {
        throw createError({
            statusCode: 404,
            fatal: true,
            statusMessage: 'Page Not Found'
        });
    }
};

const getCategories = async () => {
    try {
        const {data} = await useAPI(`/category`, {
            query: {
                size: 500,
                page: 1
            }
        });
        categories.value = data?.value?.results;
    } catch (error) {
        console.log("error", error);
    }
};

if (slug) {
    await getCategory();
    await getData();
    await getCategories();
}
</script>

<template>
    <div class="container">
        <h1 class="mb-0 text-uppercase">Truyện {{ category?.name }}</h1>
        <hr>
        <div class="list-story-categories mb-3">
            <div class="clear">
                <div class="blog-heading fl">Thể Loại</div>
                <a class="btn btn-genres icon ion-md-arrow-dropdown fr" @click="handleExpand(isExpand)"></a>
            </div>

            <div v-if="isExpand" class="show-list-categories active">
                <div class="row">
                    <div v-for="(item, index) in categories"
                         :key="index"
                         class="col-6 col-sm-4 col-md-3">
                        <h4 class="item-category">
                            <NuxtLink :to="`/the-loai/${item.slug}`">
                                <i class="bx bx-caret-right"></i>
                                {{ item?.name }}
                            </NuxtLink>
                        </h4>
                    </div>
                </div>
            </div>

            <div class="show-list-categories">
                <div class="row">
                    <div class="col-6 col-sm-4 col-md-2">
                        <h4 class="item-category">
                            <NuxtLink :to="`/the-loai/${category?.name}`">
                                <i class="bx bx-caret-right"></i> {{ category?.name }}
                            </NuxtLink>
                        </h4>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-9 col-md-9 col-12">
                <!--row-->
                <div class="row product-grid">
                    <HomeProductItem v-for="(item, index) in storys"
                                         :key="index"
                                         :item="item"/>
                </div>
                <!--end row-->

                <div class="pagination mt-4 justify-content-center">
                    <HomePagination :total="total"
                                    :page="page"
                                    :size="params.size"
                                    :type="`the-loai/${slug}`"/>
                </div>
            </div>

            <HomeWidgetFanpage/>
        </div>
    </div>
</template>
