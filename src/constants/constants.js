
const generalColors = {
    // Black, Grey, & White
    WHITE: '#FFFFFF',
    LIGHT_GREY: '#F2F2F2',
    GREY: '#C0C0C0',
    DARK_GREY: '#707070',
    LIGHT_BLACK: '#2b2b2b',
    BLACK: '#000000',
    // Greens
    GREEN_DARKER: '#0F8158',
    GREEN_DARK: '#4AA786',
    GREEN: '#41CA99',
    GREEN_LIGHT: '#0DCBB',
    GREEN_LIGHTER: '#C0EDDD',
    // Reds
    ERROR_RED: '#FB1C1C',
    DISLIKE_RED: '#CA5A41',
};

const themeColors = {
    light: {
        FIRST: generalColors.LIGHT_GREY,
        SECOND: generalColors.GREY,
        THIRD: generalColors.DARK_GREY,
        FOURTH: generalColors.LIGHT_BLACK
    },
    dark: {
        FIRST: '#363636',
        SECOND: '#222222',
        THIRD: '#1B1B1B',
        FOURTH: '#0A0A0A'
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
    }
};

module.exports = constants;