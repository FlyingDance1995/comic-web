<script setup lang="ts">
import {Layout, Header, Menu, MenuItem, Sider, Breadcrumb, BreadcrumbItem, Content, Icon, Poptip} from "view-ui-plus";
import menu from "@/constants/menu.js";
import menuModerator from "~/constants/menuModerator";
import {useUserStore} from "~/store/user";

const {$api} = useNuxtApp();
const route = useRoute();
const router = useRouter();

const userStore = useUserStore();

const user = computed(() => userStore.$state.user);

const isCollapsed = ref(false);
const activeTab = ref(0);
const tabName = ref("");
const styles = useCssModule();

const menuitemClasses = computed(() => ['h-full', styles.menuItem, isCollapsed.value ? styles.collapsedMenu : '']);

const handleLogout = async () => {
    await router.push('/login');
};

watch(() => route.path, () => {
    if (route?.path) {
        menu.forEach((item) => {
            if (item.path === route.path) {
                activeTab.value = item.path;
                tabName.value = item.title;
            }
        });

        menuModerator.forEach((item) => {
            if (item.path === route.path) {
                activeTab.value = item.path;
                tabName.value = item.title;
            }
        });
    }
}, {immediate: true, deep: true});
</script>

<template>
    <div :class="$style.layout" class="w-100 vh-100">
        <Layout class="w-100 h-100">
            <Header style="padding: 0; background: #00554A29">
                <Menu mode="horizontal" theme="light" style="background: transparent; height: 100%; z-index: 999">
                    <NuxtLink to="/" :class="$style.layoutLogo">
                        <img
                            src="/images/logo/Logo.png"
                            height="100%"
                            alt="">
                    </NuxtLink>

<!--                    <Poptip-->
<!--                        class="float-end me-4"-->
<!--                        confirm-->
<!--                        title="Bạn có chắc muốn đăng xuất không?"-->
<!--                        placement="bottom-end"-->
<!--                        @on-ok="handleLogout"-->
<!--                        ok-text="Có"-->
<!--                        cancel-text="Không">-->
<!--                        <Button type="error">-->
<!--                            Đăng xuất-->
<!--                        </Button>-->
<!--                    </Poptip>-->

                    <div class="float-end me-4 custom-box d-flex topbar" style="background: #cedddd;">
                        <div class="top-menu ms-auto">
                            <CommonNotify/>
                        </div>
                        <CommonUserBox/>
                    </div>

                </Menu>
            </Header>

            <Layout style="height: calc(100dvh - 64px)">
                <Sider v-model="isCollapsed"
                       collapsible
                       :collapsed-width="85"
                       breakpoint="md"
                       :style="{background: '#F0F1FA', minWidth: '220px', width: '220px'}">
                    <Menu :class="menuitemClasses" :active-name="activeTab" theme="light"
                             width="auto" style="background: #F0F1FA">
                        <template v-if="user && user?.role !== 'user'">
                            <div class="my-2 mx-2">ĐĂNG TRUYỆN</div>
                            <MenuItem v-for="item in menuModerator"
                                      :key="item?.path"
                                      :name="item?.path"
                                      @click="router.push(item.path)">
                                <Icon :type="item.icon"></Icon>
                                <span>{{ item.title }}</span>
                            </MenuItem>
                        </template>

                        <template v-if="user && user?.role === 'admin'">
                            <div class="my-2 mx-2">QUẢN TRỊ</div>
                            <MenuItem v-for="(item) in menu"
                                      :key="item?.path"
                                      :name="item?.path"
                                      @click="router.push(item.path)">
                                <Icon :type="item.icon"></Icon>
                                <span>{{ item.title }}</span>
                            </MenuItem>
                        </template>
                    </Menu>
                </Sider>

                <Layout>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        <slot/>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>

<style module>
.layout {
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
}

.layoutLogo {
    width: 200px;
    height: 45px;
    border-radius: 3px;
    float: left;
    position: relative;
    left: 20px;
    top: 0;
    margin: auto 0;
}

.menuItem {
    span {
        display: inline-block;
        overflow: hidden;
        width: 140px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }

    i {
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
}

.collapsedMenu {
    span {
        width: 0;
        transition: width .2s ease;
    }

    i {
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
}
</style>
