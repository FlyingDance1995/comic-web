<script setup>

</script>

<template>
    <ClientOnly>
        <CommonDownloadApp />
    </ClientOnly>

    <HomeSectionRecomended/>

    <ClientOnly>
        <CommonAffHorizontal :location="2" class="container"/>
    </ClientOnly>

    <HomeSectionHotStories/>

    <HomeSectionNews/>

<!--    <HomeSectionCategories/>-->
</template>
