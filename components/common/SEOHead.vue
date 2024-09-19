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
</script>

<template>
    <Head>
        <Title>{{ title }}</Title>
        <Meta name="title" :content="title" />
        <Meta name="description" :content="description" />
        <Meta name="image" :content="defaultImage" />

        <Meta property="og:site_name" :content="siteName" />
        <Meta property="og:url" :content="canonical" />
        <Meta property="og:title" :content="info.name" />
        <Meta property="og:description" :content="description" />
        <Meta property="og:image" :content="defaultImage" />

        <Meta name="twitter:card" content="summary_large_image" />
        <Meta name="twitter:title" :content="info.name" />
        <Meta name="twitter:description" :content="description" />
        <Meta name="twitter:image" :content="twitterImage" />
        <Meta name="twitter:url" :content="canonical" />

        <Link rel="canonical" hid="canonical" :href="canonical" />
    </Head>
</template>
