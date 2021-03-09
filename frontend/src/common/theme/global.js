import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    typography: {
        fontFamily: "'Noto Sans KR', 'Roboto', sans-serif",
    },
    palette: {
        primary: {
            main: '#0ab07e',
            light: '#1bd89f',
            dark: '#099c6f',
        },
        secondary: {
            main: '#F12777',
        },
    },
});
