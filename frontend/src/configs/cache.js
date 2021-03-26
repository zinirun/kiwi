export const initialState = {
    unreadCount: 0,
    isAdmin: false,
};

export const mutations = {
    updateLocalUnreadCount: (_, variables, { cache }) => {
        cache.writeData({
            data: { unreadCount: variables.count },
        });
        return null;
    },
    updateLocalIsAdmin: (_, variables, { cache }) => {
        cache.writeData({
            data: { isAdmin: true },
        });
        return null;
    },
};
