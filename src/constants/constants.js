
const generalColors = {
    // Black, Grey, & White
    WHITE: '#FFFFFF',
    LIGHT_GRAY: '#F2F2F2',
    GRAY: '#C0C0C0',
    DARK_GRAY: '#707070',
    LIGHT_BLACK: '#2b2b2b',
    BLACK: '#000000',
    // Greens
    DARKER_GREEN: '#0F8158',
    DARK_GREEN: '#4AA786',
    GREEN: '#41CA99',
    LIGHT_GREEN: '#80DCBB',
    LIGHTER_GREEN: '#BEEADA',
    // Reds
    ERROR_RED: '#FB1C1C',
    DISLIKE_RED: '#CA5A41',
};

const themeColors = {
    light: {
        FIRST: generalColors.LIGHT_GRAY,
        SECOND: generalColors.GRAY,
        THIRD: generalColors.DARK_GRAY,
        FOURTH: generalColors.LIGHT_BLACK
    },
    dark: {
        FIRST: '#363636',
        SECOND: '#222222',
        THIRD: '#1B1B1B',
        FOURTH: '#151515',
        ERROR: '#C97D7D'
    }
};

const constants = {
    colors: {
        light: themeColors.light,
        dark: themeColors.dark,
        ...generalColors
    },
    sizes: {
        HEADER_ICON_SIZE: 30,
        // Width & height for like, dislike, comment, and share icons
        ACTION_ICON: 27.5,
        ACTION_ICON_SMALL: 25,
        ACTION_ICON_SMALLER: 22.5,
        // Width & height for icons in the more options menu
        OPTIONS_ICON: 20,
        // Icons for bottom tab bar
        TAB_ICON: 35,
    }
};

module.exports = constants;