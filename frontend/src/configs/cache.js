export const initialState = {
    unreadCount: 0,
};

export const mutations = {
    updateLocalUnreadCount: (_, variables, { cache }) => {
        cache.writeData({
            data: { unreadCount: variables.count },
        });

        return null;
    },
};
