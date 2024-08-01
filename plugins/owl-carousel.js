import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel'
import $ from 'jquery'

export default defineNuxtPlugin(() => {
    return {
        provide: {
            $
        }
    }
});
