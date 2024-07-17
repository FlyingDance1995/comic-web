<script setup>
const route = useRoute();

const slug = route?.params?.slug;
const chapter = route?.params?.chapter;

const data = ref(null);

const getData = async () => {
    try {
        const { data: story } = await useAPI(`/story/${slug}/chapter/${chapter}`);
        data.value = story?.value;
    } catch (error) {
        console.log("error", error);
    }
};

if (slug && chapter) getData();
</script>

<template>
    <div class="container page-chapter-detail">
        <!--breadcrumb-->
        <CommonBreadCrumb :name="`Chương ${data?.chapter_number}`">
            <li class="breadcrumb-item">
                <NuxtLink :to="`/${data?.story?.slug}`">{{data?.story?.name}}</NuxtLink>
            </li>
        </CommonBreadCrumb>
        <!--end breadcrumb-->

        <div class="card">
            <div class="card-body">
                <h1 class="card-title">{{data?.name}} - Chương {{data?.chapter_number}}</h1>

                <p class="bg-light-info p-3 radius-10 mt-3">
                    Cập nhật lúc: {{ formattedFullDate(data?.list_chapter?.find(x => x?.chapter_number === data?.chapter_number)?.modification_time)}}<br>
                    Lượt xem: 54
                </p>


                <div class="chapter-content">
                    <div class="content-container mt-4" id="chapter-content-render"
                         style="font-family: Roboto, sans-serif; font-size: 18px; line-height: 140%;"
                         v-html="data?.content">
                    </div>
                </div>

                <!--                <div class="my-3 mx-lg-4 mx-2">-->
                <!--                    <a href="https://goeco.mobi/lUtqaGcJ" target="_blank">-->
                <!--                        <img src="https://monkeyd.vn/images/banner/lazada-1.jpg" alt="" style="width: 100%; max-width: 500px; display: block; margin: 0 auto; border-radius: 5px;">-->
                <!--                    </a>-->
                <!--                </div>-->

                <div class="my-3 text-center">
                    <button type="button" class="btn btn-danger"
                            onclick="if (!window.__cfRLUnblockHandlers) return false; report(1944)">
                        Báo cáo nội dung vi phạm
                    </button>
                </div>
            </div>
        </div>

        <div class="card mt-5">
            <div class="card-body">
                <h5 class="mb-0 text-uppercase text-primary">Bình luận</h5>
                <hr>
                <div class="comment-static">
                    <div class="ajax_load_cmt">
                        <div class="clear comment-website">
                            <div class="cm-based">
                                <p class="comment-count">0 bình luận</p>
                                <div id="comment_loading" style="display:none; text-align:center;">
                                    <img alt="Please Wait" src="https://monkeyd.vn/img/loading.gif">
                                </div>
                                <form name="frmContact" id="frmContact"
                                      onsubmit="if (!window.__cfRLUnblockHandlers) return false; comment(1944,'',10); return false"
                                      method="POST">
                                    <input type="hidden" name="_token" value="nm4jEABAkXmcbQ6Hma9rsCPrKHG0bAbhwjdQuBRI">
                                    <div class="form row">
                                        <div class="form-group col-md-10 comment-text">
                                            <textarea name="txtContent" id="txtContent" class="form-control"
                                                      placeholder="Vui lòng bình luận bằng tiếng việt có dấu. Spam, chửi bậy, đưa link web khác sẽ bị ban nick"></textarea>
                                        </div>
                                        <div class="form-group col-md-2">
                                            <button type="submit" class="btn btn-read btn-lg btn-block"
                                                    name="btnComment" id="btnComment">
                                                <i class="bx bx-check"></i>
                                            </button>
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                </form>
                                <div id="comment-done" class="blog-comment">
                                    <ul class="comments"></ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <ReadStoryChapterFooter :chapter="chapter" :list-chapter="data?.list_chapter" :slug="slug" :chapter_number="data?.chapter_number"/>
</template>
