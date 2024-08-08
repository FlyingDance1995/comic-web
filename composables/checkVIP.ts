export const useCheckVIP = (user: any) => {
    if (user?.is_vip) {
        const now = new Date().getTime();
        if (user?.vip_expiry === -1 || user?.vip_expiry * 1000 > now) {
            return true;
        }
        return false;
    }
    return false;
}
