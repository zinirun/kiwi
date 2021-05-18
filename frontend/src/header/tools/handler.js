export const isPublic = (pathname) => {
    const path = pathname.split('/')[1];
    switch (path) {
        case 'signin':
        case 'signup':
        case 'needsign':
        case 'finduser':
        case 'emailauth':
            return true;
        default:
            return false;
    }
};

export const isFullScreen = (pathname) => {
    const path = pathname.split('/')[1];
    switch (path) {
        case 'needsign':
            return true;
        default:
            return false;
    }
};

export const isNotPublicAndFullScreen = (pathname) => {
    const path = pathname.split('/')[1];
    switch (path) {
        case 'admin':
            return true;
        default:
            return false;
    }
};
