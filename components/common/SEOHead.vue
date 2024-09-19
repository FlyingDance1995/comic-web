<script setup>
import {getMax250Chars} from "~/utils/formatName.js";

const { path } = useRoute();
const { info } = defineProps({ info: { type: Object, required: true } });

const runtimeConfig = useRuntimeConfig();

const {SITE_URL} = runtimeConfig.public;

const title = `${info?.name}`;
const canonical = `${SITE_URL}${path}`;
const siteName = process.env.SITE_TITLE ?? 'Phê truyện';

const img = useImage();
const imageURL = info?.avatar ?? '/images/logo/Logo.png';
const defaultImageSrc = img.getSizes(imageURL, { width: 300 }).src;
const twitterImageSrc = img.getSizes(imageURL, { width: 300 }).src;

const getFullImageURL = (url) => {
    return url?.replace("http://", "https://");
};

const defaultImage = getFullImageURL(defaultImageSrc);
const twitterImage = getFullImageURL(twitterImageSrc);
const description = getMax250Chars(info?.description || '');

useHead({
    title: `${info?.name}`,
    meta: [
        {
            name: 'title',
            content: `${info?.name} | Phê truyện`
        },
        {
            name: 'description',
            content: getMax250Chars(info?.description)
        },
        {
            name: "image",
            content: defaultImage
        }
    ],
});

useSeoMeta({
    title: `${info?.name}`,
    ogTitle: `${info?.name}`,
    description: getMax250Chars(info?.description),
    ogDescription: getMax250Chars(info?.description),
    ogImage: defaultImage,
});
</script>

<template>
    <Head>
        <Title>{{ title }}</Title>
        <Meta v-if="description" name="description" hid="description" :content="description" />
        <Meta name="image" hid="image" :content="defaultImage" />
        <Meta property="og:site_name" hid="og:site_name" :content="siteName" />
        <Meta property="og:url" hid="og:url" :content="canonical" />
        <Meta v-if="info.name" property="og:title" hid="og:title" :content="info.name" />
        <Meta v-if="description" property="og:description" hid="og:description" :content="description" />
        <Meta property="og:image" hid="og:image" :content="defaultImage" />
        <Meta name="twitter:card" hid="twitter:card" content="summary_large_image" />
        <Meta v-if="info.name" name="twitter:title" hid="twitter:title" :content="info.name" />
        <Meta v-if="description" name="twitter:description" hid="twitter:description" :content="description" />
        <Meta name="twitter:image" hid="twitter:image" :content="twitterImage" />
        <Meta name="twitter:url" hid="twitter:url" :content="canonical" />
        <Link rel="canonical" hid="canonical" :href="canonical" />
    </Head>
</template>
