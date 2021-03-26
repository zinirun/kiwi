export const initialState = {
    unreadCount: 0,
    isAdmin: false,
    isSpecialType: false,
};

export const mutations = {
    updateLocalUnreadCount: (_, variables, { cache }) => {
        cache.writeData({
            data: { unreadCount: variables.count },
        });
        return null;
    },
    updateLocalIsAdmin: (_, _variables, { cache }) => {
        cache.writeData({
            data: { isAdmin: true },
        });
        return null;
    },
    updateLocalIsSpecialType: (_, _variables, { cache }) => {
        cache.writeData({
            data: { isSpecialType: true },
        });
        return null;
    },
};
