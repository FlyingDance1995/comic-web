import ViewUIPlus from "view-ui-plus";
// @ts-ignore
import locale from 'view-ui-plus/dist/locale/vi-VN';

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(ViewUIPlus, {transfer: true, locale: locale})
});
