<script setup>
import {useConfigStore} from "~/store/config.js";
import {useUserStore} from "~/store/user.js";

const props = defineProps({
    data: {
        type: Object,
        default: null
    }
});

const configStore = useConfigStore();
const userStore = useUserStore();

const user = computed(() => userStore.$state.user);

const listChaptersRef = ref();
const expanded = ref(false);

const handleFollow = () => {
    if (!user.value) {
        return configStore.setSwal({
            open: true,
            title: 'Oops...',
            text: 'Bạn cần đăng nhập để có thể lưu truyện này.',
            type: 'error'
        });
    }

    configStore.setSwal({
        open: true,
        title: 'Theo dõi truyện',
        text: 'Bạn muốn theo dõi truyện này?',
        type: 'info',
        onSubmit: async () => {
            try {
                configStore.setLoadingModal(true);
                await useNuxtApp().$api('/profile/story', {
                    method: "POST",
                    body: {
                        story: props.data?.slug,
                        type: 'bookmark'
                    }
                });
                configStore.setLoadingModal(false);
                return 'Đã lưu truyện này';
            } catch (e) {
                configStore.setLoadingModal(false);
                console.log("error", e?.response);
                return null;
            }
        }
    });
};

const report = () => {
    if (!user.value) {
        return configStore.setSwal({
            open: true,
            title: 'Oops...',
            text: 'Bạn cần đăng nhập để có thể báo cáo lỗi.',
            type: 'error'
        });
    }

    setTimeout(() => configStore.setReportModal(true), 100)
};

const reportError = () => {
    if (!user.value) {
        return configStore.setSwal({
            open: true,
            title: 'Oops...',
            text: 'Bạn cần đăng nhập để có thể báo cáo lỗi.',
            type: 'error'
        });
    }

    configStore.setStoryReportError(listChaptersRef.value?.data);
    setTimeout(() => configStore.setReportErrorModal(true), 100);
};
</script>

<template>
    <div class="card">
        <div class="row g-0">
            <div class="col-md-3">
                <div class="m-3 text-center">
                    <img :src="data?.avatar || ''" class="img-fluid" :alt="data?.name" style="width: 100%;"
                         onerror="this.src='/no-image.png'">
                </div>
            </div>

            <div class="col-md-9">
                <div class="card-body">
                    <h1 class="card-title">{{ data?.name }}</h1>
                    <dl class="row">
                        <dt class="col-sm-3">Cập nhật</dt>
                        <dd class="col-sm-9">{{ timeAgo(data?.modification_time) }}</dd>
                        <dt class="col-sm-3">Loại</dt>
                        <dd class="col-sm-9">
                            <span class="btn btn-sm btn-primary px-3 radius-30">
                                Truyện Chữ
                            </span>
                        </dd>

                        <dt class="col-sm-3">Tác giả</dt>
                        <dd class="col-sm-9">{{ data?.author }}</dd>

                        <dt class="col-sm-3">Thể loại</dt>
                        <dd class="col-sm-9">
                            <NuxtLink v-for="item in data?.category"
                                      :key="item?.id"
                                      class="cate-item"
                                      :to="`/the-loai/${item?.slug}`">
                                {{ item?.name }}
                            </NuxtLink>
                        </dd>

                        <dt class="col-sm-3">Lượt xem</dt>
                        <dd class="col-sm-9">{{
                                data?.statistics?.total_watched?.toLocaleString()?.replaceAll('.', ',')
                            }}
                        </dd>

                        <dt class="col-sm-3">Team</dt>
                        <dd class="col-sm-9">
                            <NuxtLink :to="`/nhom-dich/${data?.team?.slug}`" class="btn btn-sm btn-info px-3 radius-30">
                                {{ data?.team?.name }}
                            </NuxtLink>
                        </dd>

                        <dt class="col-sm-3">Lượt theo dõi</dt>
                        <dd class="col-sm-9">{{
                                data?.statistics?.total_follow?.toLocaleString()?.replaceAll('.', ',')
                            }}
                        </dd>

                        <dt class="col-sm-3">Trạng thái</dt>
                        <dd class="col-sm-9">{{ data?.status === 'finish' ? 'Hoàn thành' : 'Đang phát hành' }}</dd>
                    </dl>
                    <hr>

                    <!-- <div class="social_single_news clear overflow-hidden"> -->
                    <!--this socail single new-->
                    <!-- <ul class="social_like_single clear mt-3 p-0"> -->
                    <!-- <li class="fb_btn fb-like-tbn" style="list-style-type: none"> -->
                    <!-- Your like button code -->

                    <!-- <div class="fb-like fb_iframe_widget" data-href="https://Phê Truyện.vn/dong-chi.html" -->
                    <!-- data-width="" data-layout="standard" data-action="like" data-size="small" -->
                    <!-- data-share="true" fb-xfbml-state="rendered" -->
                    <!-- fb-iframe-plugin-query="action=like&amp;app_id=439215208546321&amp;container_width=805&amp;href=https%3A%2F%2FPhê Truyện.vn%2Fdong-chi.html&amp;layout=standard&amp;locale=vi_VN&amp;sdk=joey&amp;share=true&amp;size=small&amp;width="> -->
                    <!-- <span style="vertical-align: bottom; width: 450px; height: 28px;"><iframe -->
                    <!-- name="fdf041c52b2f23840" width="1000px" height="1000px" -->
                    <!-- data-testid="fb:like Facebook Social Plugin" -->
                    <!-- title="fb:like Facebook Social Plugin" frameborder="0" allowtransparency="true" -->
                    <!-- allowfullscreen="true" scrolling="no" allow="encrypted-media" -->
                    <!-- src="https://www.facebook.com/v9.0/plugins/like.php?action=like&amp;app_id=439215208546321&amp;channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Dff7bfd502d0eb1205%26domain%3DPhê Truyện.vn%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252FPhê Truyện.vn%252Ff8494ddd5c0a6b3e4%26relation%3Dparent.parent&amp;container_width=805&amp;href=https%3A%2F%2FPhê Truyện.vn%2Fdong-chi.html&amp;layout=standard&amp;locale=vi_VN&amp;sdk=joey&amp;share=true&amp;size=small&amp;width=" -->
                    <!-- style="border: none; visibility: visible; width: 450px; height: 28px;" -->
                    <!-- class=""></iframe></span></div> -->
                    <!-- </li> -->
                    <!-- </ul>social_tbl_like_group -->
                    <!-- </div> -->
                    <!--social_single_news-->

                    <div class="d-flex gap-3 mt-3 flex-wrap">
                        <button class="btn btn-sm btn-danger px-3 radius-30" onclick="donate()">
                            <i class="bx bx-dollar-circle"></i>Donate
                        </button>
                        <NuxtLink :to="`/${data?.slug}/${data?.first_chapter?.slug}`"
                                  class="btn btn-sm btn-warning px-3 radius-30">
                            <i class="bx bx-book-open"></i>Đọc từ đầu
                        </NuxtLink>
                        <NuxtLink :to="`/${data?.slug}/${data?.last_chapter?.slug}`"
                                  class="btn btn-sm btn-success px-3 radius-30">
                            <i class="bx bx-star"></i>Đọc tập mới
                        </NuxtLink>
                        <button type="button" id="btnBookmarkDetail" @click="handleFollow"
                                class="btn btn-primary btn-sm px-3 radius-30">
                            <i class="bx bx-bookmark-alt font-18 me-1"></i>Theo dõi
                        </button>
                        <button type="button" @click.prevent="reportError" class="btn btn-dark btn-sm px-3 radius-30">
                            <i class="bx bx-error-circle font-18 me-1"></i>Báo lỗi
                        </button>
                    </div>

                    <div class="d-flex gap-3 mt-3 flex-wrap">
                        <button type="button" class="btn btn-sm btn-danger radius-30 px-3" @click.prevent="report">
                            Báo cáo vi phạm bản quyền
                        </button>
                    </div>

                    <div class="mt-3 card-text fs-6 story-description">
                        <div class="ql-editor inner p-0"
                             :class="{'expanded': expanded}"
                        >
                            <p>{{ data?.description }}</p>
                        </div>

                        <span class="more cursor-pointer text-primary"
                              @click="expanded = !expanded">
                            {{expanded ? 'Thu gọn' : 'Xem thêm'}}
                        </span>
                    </div>

                    <!-- <div class="mt-3 mx-lg-4 mx-0">
                        <a href="https://goeco.mobi/lUtqaGcJ" target="_blank">
                            <img src="https://Phê Truyện.vn/images/banner/lazada-1.jpg" alt=""
                                 style="width: 100%; max-width: 500px; display: block; margin: 0 auto; border-radius: 5px;">
                        </a>
                    </div> -->
                </div>
            </div>
        </div>

        <ClientOnly>
            <CommonAffHorizontal :location="3" style="margin: 15px"/>
        </ClientOnly>

        <div class="card-body  mt-4 ">
            <h5 class="mb-0 text-uppercase text-primary">Danh sách chương</h5>
            <hr>
            <ClientOnly>
                <ComicsDetailListChapters ref="listChaptersRef"/>
            </ClientOnly>
            <h5 class="mb-0 text-uppercase mt-5 text-primary">Bình luận</h5>
            <hr>
            <ClientOnly>
                <ComicsDetailComment/>
            </ClientOnly>
        </div>
    </div>
</template>
