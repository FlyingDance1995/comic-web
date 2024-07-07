import axios from 'axios'

export default defineSitemapEventHandler(async () => {
    try {
        const { data } = await axios.get(`http://103.176.146.159:8498/api/category`, {
            params: {
                limit: 70,
                offset: 0
            }
        })

        return data?.data?.map((p: any) => {
            return {
                loc: `/${p?.name}`,
                lastmod: new Date(),
            }
        });
    } catch (e) {
        console.log("error", e);
        return [];
    }
});
