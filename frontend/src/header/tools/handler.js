export const isWithoutSider = (pathname) => {
    const path = pathname.split('/')[1];
    switch (path) {
        case 'signin':
        case 'signup':
        case 'needsign':
        case 'finduser':
            return true;
        default:
            return false;
    }
};

export const isFullScreen = (pathname) => {
    const path = pathname.split('/')[1];
    switch (path) {
        case 'needsign':
        case 'finduser':
            return true;
        default:
            return false;
    }
};
