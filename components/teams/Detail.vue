<script setup>
import {useConfigStore} from "~/store/config.js";

const route = useRoute();
const configStore = useConfigStore();

const slug = route?.params?.slug;
const page = +route?.query?.page || 1;
const query = {
    page: page,
    size: 20,
};

const data = ref(null);
const storys = ref([]);
const total = ref(0);

const getData = async () => {
    const {data: team} = await useAPI(`/teams/${slug}`);
    data.value = team?.value;
    if (team.value === null) {
        throw createError({
            statusCode: 404,
            fatal: true,
            statusMessage: 'Page Not Found'
        });
    }
};

const getStory = async () => {
    try {
        const {data: items} = await useAPI(`/story`, {
            query: {
                ...query,
                // team: slug.replaceAll('-', ' ')
                team: data?.value?.id
            }
        });
        storys.value = items?.value?.results;
        total.value = items?.value?.count;
    } catch (error) {
        console.log("error", error);
    }
};

if (slug) {
    await getData();
    await getStory();
}

const handleFollow = () => {
    const user = JSON.parse(localStorage.getItem('user') || null);

    if (!user) {
        return configStore.setSwal({
            open: true,
            title: 'Oops...',
            text: 'Bạn cần đăng nhập để có thể theo dõi người này.',
            type: 'error'
        });
    }

    configStore.setSwal({
        open: true,
        title: 'Theo dõi',
        text: 'Bạn muốn theo dõi người này?',
        type: 'info',
        onSubmit: async () => {
            try {
                configStore.setLoadingModal(true);
                await useNuxtApp().$api('/profile/team', {
                    method: "POST",
                    body: {
                        team: slug,
                        type: 'follow'
                    }
                });
                configStore.setLoadingModal(false);
                return 'Theo dõi thành công';
            } catch (e) {
                configStore.setLoadingModal(false);
                console.log("error", e?.response);
                return null;
            }
        }
    });
};
</script>

<template>
    <Head>
      <Title>{{ data?.name }}</Title>
    </Head>
    <div class="container">
        <div class="card">
            <div class="card-body">
                <div class="row g-0">
                    <div class="col-md-2">
                        <div class="m-2 text-center">
                            <img :src="data?.avatar || ''"
                                 class="img-fluid"
                                 :alt="data?.name"
                                 style="border: 3px solid #ccc; width: 100px; border-radius: 50%; height: 100px; object-fit: cover"
                                 onerror="this.src='/no-image.png'">
                        </div>
                    </div>

                    <div class="col-md-10">
                        <div class="position-relative">
                            <h1 class="card-title">{{ data?.name }}</h1>
                            <div class="mt-3 card-text fs-6 description">
                                {{ data?.description }}
                            </div>
                            <div class="more-info">
                                <div class="mb-1"><b>Lượt theo dõi:</b>
                                    {{ data?.statistics?.total_follow?.toLocaleString()?.replaceAll('.', ',') }}
                                </div>
                                <div class="mb-1"><b>Lượt xem:</b>
                                    {{ data?.statistics?.total_watched?.toLocaleString()?.replaceAll('.', ',') }}
                                </div>
                                <div class="mb-1"><b>Số truyện:</b>
                                    {{ data?.statistics?.total_story?.toLocaleString()?.replaceAll('.', ',') }}
                                </div>
                            </div>

                            <div class="d-flex gap-3 mt-3 flex-wrap">
                                <button class="btn btn-sm btn-danger px-3 radius-30" onclick="donate()">
                                    <i class="bx bx-dollar-circle"></i>Donate
                                </button>

                                <button type="button" id="btnBookmarkDetail" @click="handleFollow"
                                        class="btn btn-primary btn-sm px-3 radius-30">
                                    <i class="bx bx-bookmark-alt font-18 me-1"></i>Theo dõi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="position-relative mt-4">
                    <h4 class="text-uppercase" style="font-size: 20px">Danh sách truyện</h4>
                </div>

                <hr>
                <div class="list-stories">
                    <div class="row product-grid">
                        <LazyHomeProductItem v-for="(item, index) in storys"
                                             :key="index"
                                             :item="item"/>
                    </div>
                    <!--end row-->
                    <div class="pagination mt-4 justify-content-center">
                        <!-- Pagination -->
                        <HomePagination :total="total"
                                        :page="page"
                                        :size="query.size"
                                        :type="`nhom-dich/${slug}`"/>
                        <!-- Pagination -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
