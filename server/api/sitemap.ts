import axios from 'axios'

export default defineSitemapEventHandler(async () => {
    try {
        const { data } = await axios.get(`${process.env.NUXT_PUBLIC_API_URL}/story`, {
            params: {
                limit: 100,
                offset: 0
            }
        });

        return data?.results?.map((p: any) => {
            return {
                loc: `/${p?.slug}`,
                lastmod: new Date(),
            }
        });
    } catch (e) {
        console.log("error", e);
        return [];
    }
});
