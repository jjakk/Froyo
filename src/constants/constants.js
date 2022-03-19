
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
    DISLIKE_RED: '#CA5A41',
};

const flavorColors = {
    mint: {
        DARKER: generalColors.DARKER_GREEN,
        DARK: generalColors.DARK_GREEN,
        MAIN: generalColors.GREEN,
        LIGHT: generalColors.LIGHT_GREEN,
        LIGHTER: generalColors.LIGHTER_GREEN
    },
    coffee: {
        DARKER: '#A67A37',
        DARK: '#BA9357',
        MAIN: '#BC9E70',
        LIGHT: '#D8B682',
        LIGHTER: '#F0D3A5'
    },
    strawberry: {
        DARKER: '#B2403E',
        DARK: '#C36D6C',
        MAIN: '#C89493',
        LIGHT: '#E1B8B7',
        LIGHTER: '#F2D2D1'
    },
    blueberry: {
        DARKER: '#257C98',
        DARK: '#549AB0',
        MAIN: '#85B0BE',
        LIGHT: '#ADCDD8',
        LIGHTER: '#CDE4EC'
    },
    mango: {
        DARKER: '#B29122',
        DARK: '#CBAC43',
        MAIN: '#DFC56E',
        LIGHT: '#E4D294',
        LIGHTER: '#ECE1BA'
    }
};

const themeColors = {
    light: {
        FIRST: generalColors.LIGHT_GRAY,
        SECOND: generalColors.GRAY,
        THIRD: generalColors.DARK_GRAY,
        FOURTH: generalColors.LIGHT_BLACK,
        RED: '#E86245'
    },
    dark: {
        FIRST: '#363636',
        SECOND: '#222222',
        THIRD: '#1B1B1B',
        FOURTH: '#151515',
        RED: '#CA7664'
    }
};

const constants = {
    colors: {
        light: themeColors.light,
        dark: themeColors.dark,
        primary: flavorColors.mint,
        ...generalColors
    },
    sizes: {
        HEADER_ICON_SIZE: 35,
        // Width & height for like, dislike, comment, and share icons
        ACTION_ICON: 27.5,
        ACTION_ICON_SMALL: 25,
        ACTION_ICON_SMALLER: 22.5,
        // Width & height for icons in the more options menu
        OPTIONS_ICON: 20,
        // Icons for bottom tab bar
        TAB_ICON: 35,
    },
    BASE_URL: 'https://api.froyo.social'
};

module.exports = constants;