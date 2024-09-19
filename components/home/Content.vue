<script setup>

</script>

<template>
    <HomeSectionRecomended/>

    <ClientOnly>
        <CommonAffHorizontal :location="2" class="container"/>
    </ClientOnly>

    <HomeSectionHotStories/>

    <HomeSectionNews/>

<!--    <HomeSectionCategories/>-->
</template>
