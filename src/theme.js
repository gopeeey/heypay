import { createMuiTheme } from '@material-ui/core/styles';
import * as fonts from './fonts';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#00A205'
        },
        secondary: {
            main: '#ffffff'
        },
        transPrimary: {
            main: 'rgba(0, 162, 5, 0.7)',
            light: 'rgb(0, 162, 5, 0.4)',
            dark: 'rgb(0, 162, 5, 0.849567)'
        },
        transSecondary: {
            main: 'rgba(250, 250, 250, 0.8)',
            light: 'rgba(250, 250, 250, 0.4)',
            dark: 'rgba(250, 250, 250, 0.849567)'
        },
        link: {
            main: '#0d81b6',
        }
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': [
                    fonts.OSBold,
                    fonts.OSBoldItalic,
                    fonts.OSExtraBold,
                    fonts.OSExtraBoldItalic,
                    fonts.OSItalic,
                    fonts.OSLight,
                    fonts.OSLightItalic,
                    fonts.OSRegular,
                    fonts.OSSemiBold,
                    fonts.OSSemiBoldItalic
                ],
            },
        },
    },
    typography: {
        fontFamily: 'OS_Regular, Arial',
        h1: {
            fontFamily: 'OS_Light, Arial'
        },
        h2: {
            fontFamily: 'OS_Light, Arial'
        },
        h3: {
            fontFamily: 'OS_Light, Arial'
        },
        button: {
            fontFamily: 'OS_Bold, Arial'
        },
        bold: {
            fontFamily: 'OS_Bold, Arial'
        },
        extraBold: {
            fontFamily: 'OS_Extra_Bold, Arial'
        },
        boldItalic: {
            fontFamily: 'OS_Bold_Italic, Arial'
        },
        extraBoldItalic: {
            fontFamily: 'OS_Extra_Bold_Italic, Arial'
        },
        italic: {
            fontFamily: 'OS_Italic, Arial'
        },
        light: {
            fontFamily: 'OS_Light, Arial'
        },
        lightItalic: {
            fontFamily: 'OS_Light_Italic, Arial'
        },
        semiBold: {
            fontFamily: 'OS_Semi_Bold, Arial'
        },
        semiBoldItalic: {
            fontFamily: 'OS_Semi_Bold_Italic, Arial'
        },

    }
});

export default theme;