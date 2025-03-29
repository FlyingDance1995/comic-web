<script setup>

</script>

<template>
    <ClientOnly>
        <CommonDownloadApp />
    </ClientOnly>

    <HomeSectionRecomended/>

    <CommonAffHorizontal :location="2" class="container"/>

    <HomeSectionHotStories/>

    <HomeSectionNews/>

<!--    <HomeSectionCategories/>-->
</template>
