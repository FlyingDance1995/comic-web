<script setup>

</script>

<template>
    <CommonDownloadApp />

    <HomeSectionRecomended/>

    <ClientOnly>
        <CommonAffHorizontal :location="2" class="container"/>
    </ClientOnly>

    <HomeSectionHotStories/>

    <HomeSectionNews/>

<!--    <HomeSectionCategories/>-->
</template>
