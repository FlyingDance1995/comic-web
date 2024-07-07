<script setup>
    import { useCategoryStore } from '@/store/category'

    const isExpand = ref(true);
    const categoryStore = useCategoryStore()

    onMounted(() => {
        categoryStore.fetchCategory()
    })

    const { category, loading, error } = storeToRefs(categoryStore);

    function handleExpand(value) {
        isExpand.value = !value;
    }
</script>

<template>
    <section class="section-categories">
        <div class="container">
            <div class="list-story-categories">
                <div class="clear">
                    <div class="blog-heading fl">Thể Loại</div>
                    <a class="btn btn-genres icon ion-md-arrow-dropdown fr" @click="handleExpand(isExpand)"></a>
                </div>

                <div v-if="isExpand" class="show-list-categories active">
                    <div class="row">
                        <div v-for="(item, index) in category" :key="index" 
                                class="col-6 col-sm-4 col-md-3">
                            <h4 class="item-category">
                                <a :href="`http://localhost:3000/the-loai/${item.slug}.html`">
                                    <i class="bx bx-caret-right"></i> {{ item.name }} 
                                </a>
                            </h4>
                        </div>
                        
                        <div v-if="loading" class="d-flex justify-content-center align-items-center" style="height: 350px;">
                            Loading...
                        </div>

                        <div v-if="error" class="d-flex justify-content-center align-items-center" style="height: 350px;">
                            {{ error }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>