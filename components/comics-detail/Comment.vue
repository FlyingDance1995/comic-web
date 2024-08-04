<script setup>
import {useConfigStore} from "~/store/config.js";
import {useUserStore} from "~/store/user.js";

const route = useRoute();
const userStore = useUserStore();

const user = computed(() => userStore.$state.user);
const configStore = useConfigStore();

const data = ref();
const query = reactive({
    page: 1,
    size: 10
});
const textReply = ref('');

const getData = async () => {
    try {
        const response = await useNuxtApp().$api(`/story/${route?.params?.slug}/comment`, {
            query: {
                ordering: '-creation_time',
                ...query
            }
        });
        if (data.value) {
            data.value.next = response?.next;
            data.value.results = uniqByKeepLast([...data.value.results, ...response?.results], (i) => i.id);
        } else {
            data.value = response;
        }
    } catch (error) {
        console.log("error", error);
    }
};

const handleRemove = (item) => {
    if (!item['text_reply']) {
        item['open_reply'] = false;
    }
};

const openReply = (item) => {
    if (user.value) {
        item['open_reply'] = true;

        setTimeout(() => {
            document.querySelector('#txtReply').focus();
        }, 100);
    } else {
        configStore.setSwal({
            open: true,
            title: 'Oops...',
            text: 'Bạn cần đăng nhập để có thể tham gia bình luận.',
            type: 'error'
        });
    }
};

const loadMore = async () => {
    query.page += 1;
    configStore.setLoadingModal(true);
    await getData();
    configStore.setLoadingModal(false);
};

const submitComment = async (item) => {
    try {
        configStore.setLoadingModal(true);
        const response = await useNuxtApp().$api(`/story/${route?.params?.slug}/comment`, {
            method: "POST",
            body: {
                reply: item.id,
                contents: item['text_reply']
            }
        });
        item['text_reply'] = "";
        item['open_reply'] = false;
        item.reply_5_comment.count += 1;
        item.reply_5_comment.top_comment = uniqByKeepLast([...item.reply_5_comment.top_comment, response], (i) => i.id);
        item.reply_5_comment.top_comment = item.reply_5_comment.top_comment.sort((a, b) => a.creation_time - b.creation_time);
        configStore.setLoadingModal(false);
    } catch (error) {
        configStore.setLoadingModal(false);
        if (error?.response?._data?.error) {
            configStore.setSwal({
                open: true,
                title: 'Oops...',
                text: 'Bình luận không được để trống.',
                type: 'error'
            });
        }
        console.log("error", error?.response);
    }
};

const handleSubmit = async () => {
    if (user.value) {
        if (!textReply.value) {
            document.querySelector('#txtContent').focus();
        } else {
            try {
                configStore.setLoadingModal(true);
                const response = await useNuxtApp().$api(`/story/${route?.params?.slug}/comment`, {
                    method: "POST",
                    body: {
                        contents: textReply.value
                    }
                });
                textReply.value = "";
                data.value.count += 1;
                data.value.results = uniqByKeepLast([response, ...data.value.results], (i) => i.id);
                configStore.setLoadingModal(false);
            } catch (error) {
                configStore.setLoadingModal(false);
                if (error?.response?._data?.error) {
                    configStore.setSwal({
                        open: true,
                        title: 'Oops...',
                        text: 'Bình luận không được để trống.',
                        type: 'error'
                    });
                }
                console.log("error", error?.response);
            }
        }
    } else {
        configStore.setSwal({
            open: true,
            title: 'Oops...',
            text: 'Bạn cần đăng nhập để có thể tham gia bình luận.',
            type: 'error'
        });
    }
};

const loadMoreReply = async (item) => {
    try {
        configStore.setLoadingModal(true);
        if (!item.reply_5_comment['page']) item.reply_5_comment['page'] = 2;
        const response = await useNuxtApp().$api(`/story/${route?.params?.slug}/comment`, {
            query: {
                reply: item?.id,
                size: 5,
                page: item.reply_5_comment['page']
            }
        });
        item.reply_5_comment['next'] = response?.next || 'over';
        item.reply_5_comment['page'] += 1;
        item.reply_5_comment.count += 1;
        item.reply_5_comment.top_comment = uniqByKeepLast([...item.reply_5_comment.top_comment, ...response.results], (i) => i.id);
        item.reply_5_comment.top_comment = item.reply_5_comment.top_comment.sort((a, b) => a.creation_time - b.creation_time);
        configStore.setLoadingModal(false);
    } catch (error) {
        console.log("error", error);
        configStore.setLoadingModal(false);
    }
};

const getAvatar = (item) => {
    const domain = process.env.NODE_ENV === "development" ? 'https://hoannq.click' : window.location.origin;
    return item?.owner?.avatar?.includes('://') ? item?.owner?.avatar : domain + item?.owner?.avatar;
};

const handleDelete = (item) => {
    configStore.setSwal({
        open: true,
        title: 'Xóa bình luận',
        text: 'Bạn muốn xóa bình luận này?',
        type: 'info',
        onSubmit: async () => {
            try {
                configStore.setLoadingModal(true);
                await useNuxtApp().$api(`/story/${route?.params?.slug}/comment/${item?.id}`, {
                    method: "DELETE",
                });
                data.value.results = data.value.results.filter(cmt => {
                    if (cmt?.id === item?.id) {
                        return false;
                    }

                    if (cmt?.reply_5_comment?.top_comment?.length > 0) {
                        cmt.reply_5_comment.top_comment = cmt.reply_5_comment.top_comment.filter(reply_cmt => reply_cmt?.id !== item?.id);
                    }

                    return true;
                });
                configStore.setLoadingModal(false);
                return 'Đã xóa bình luận này';
            } catch (e) {
                configStore.setLoadingModal(false);
                console.log("error", e?.response);
                return null;
            }
        }
    });
};

watch(() => route?.params, () => {
    if (route?.params?.slug) getData();
}, {immediate: true, deep: true})
</script>

<template>
    <div class="comment-static">
        <div class="ajax_load_cmt">
            <div class="clear comment-website">
                <div class="cm-based">
                    <p class="comment-count">{{ data?.count || 0 }} bình luận</p>
                    <form name="frmContact" id="frmContact" @submit.prevent="handleSubmit"
                          method="POST">
                        <div class="form row">
                            <div class="form-group col-md-10 comment-text">
                                <textarea v-model="textReply"
                                          name="txtContent" id="txtContent" class="form-control"
                                          placeholder="Vui lòng bình luận bằng tiếng việt có dấu. Spam, chửi bậy, đưa link web khác sẽ bị ban nick"></textarea>
                            </div>

                            <div class="form-group col-md-2">
                                <button type="submit" class="btn btn-read btn-lg btn-block" name="btnComment"
                                        id="btnComment">
                                    <i class="bx bx-check"></i>
                                </button>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                    </form>

                    <div id="comment-done" class="blog-comment">
                        <ul class="comments">
                            <li v-for="item in data?.results"
                                :key="item?.id">
                                <div class="avt_user">
                                    <img :src="item?.owner?.avatar || ''"
                                         alt=""
                                         onerror="this.src='/images/avata.png'">
                                </div>

                                <div class="post-comments">
                                    <p>{{ item?.contents }}</p>
                                    <p class="meta-2">
                                        <a href="javascript:void(0)">
                                            <abbr title="Thành viên">{{ item?.owner?.fullname }}</abbr>
                                        </a>

                                        <small class="pull-right">
                                            {{ timeAgo(item?.creation_time) }}
                                            ·
                                            <a href="javascript:void(0)" @click="openReply(item)">Trả lời</a>
                                            <template v-if="item?.is_edit">
                                                ·
                                                <a href="javascript:void(0)" @click="handleDelete(item)">Xóa</a>
                                            </template>
                                        </small>
                                    </p>
                                </div>

                                <ul v-if="item?.reply_5_comment">
                                    <li v-for="i in item?.reply_5_comment?.top_comment"
                                        :key="i?.id">
                                        <div class="avt_user">
                                            <img :src="getAvatar(i)"
                                                 alt=""
                                                 onerror="this.src='/images/avata.png'">
                                        </div>
                                        <div class="post-comments">
                                            <p>{{ i?.contents }}</p>
                                            <p class="meta-2">
                                                <a href="javascript:void(0)"><abbr
                                                    title="Thành viên">{{ i?.owner?.fullname }}</abbr></a>
                                                <small class="pull-right">{{ timeAgo(i?.creation_time) }} · <a
                                                    href="javascript:void(0)" @click="openReply(item)">Trả
                                                    lời</a>
                                                    <template v-if="i?.is_edit">
                                                        ·
                                                        <a href="javascript:void(0)" @click="handleDelete(i)">Xóa</a>
                                                    </template>
                                                </small>
                                            </p>
                                        </div>
                                    </li>
                                </ul>

                                <div v-if="item?.reply_5_comment?.count > 5 && item?.reply_5_comment['next'] !== 'over'"
                                     class="paging text-center mt-2">
                                    <button class="btn btn-sm btn-lg btn-success" @click="loadMoreReply(item)">
                                        Xem thêm 5 bình luận
                                    </button>
                                </div>

                                <ul v-if="item['open_reply']"
                                    class="reply2">
                                    <li class="clearfix">
                                        <div class="avt_user">
                                            <img :src="user?.avatar || ''"
                                                 class="avatar"
                                                 width="32" alt=""
                                                 onerror="this.src='/images/avata.png'">
                                        </div>

                                        <div class="post-comments">
                                            <p class="meta">
                                                <textarea v-model="item['text_reply']"
                                                          id="txtReply"
                                                          class="form-control"
                                                          style="width:100%"
                                                          @blur="handleRemove(item)"
                                                          placeholder="Viết bình luận"
                                                          spellcheck="false"></textarea>
                                            </p>
                                            <p class="buttons">
                                                <button type="submit" class="btn btn-read" name="btnComment"
                                                        id="btnComment" @click="submitComment(item)">
                                                    Đăng
                                                </button>
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>

                        <div v-if="data?.next" class="paging text-center">
                            <button class="btn btn-sm btn-lg btn-success" @click="loadMore">
                                Xem thêm 10 bình luận
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
