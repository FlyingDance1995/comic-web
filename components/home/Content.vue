<script setup>
    import { useStoryStore } from '@/store/storys'

    const storyStore = useStoryStore()

    onMounted(() => {
        storyStore.fetchStorys()
    })

    const { storys, loading, error } = storeToRefs(storyStore)
</script>

<template>
    <HomeSectionRecomended/>

    <HomeSectionNews/>

    <HomeSectionCategories/>
</template>
~/components/home/store/storys~/public/store/storys