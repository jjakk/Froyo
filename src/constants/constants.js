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

const flavorColors = {
    mint: {
        DARKER: generalColors.DARKER_GREEN,
        DARK: generalColors.DARK_GREEN,
        MAIN: generalColors.GREEN,
        LIGHT: generalColors.LIGHT_GREEN,
        LIGHTER: generalColors.LIGHTER_GREEN
    },
    coffee: {
        DARKER: '#9C5706',
        DARK: '#AE6B1D',
        MAIN: '#CA8B41',
        LIGHT: '#DCA564',
        LIGHTER: '#E9C08F'
    },
    strawberry: {
        DARKER: '#9B0F06',
        DARK: '#B5261D',
        MAIN: '#CA4941',
        LIGHT: '#D97C76',
        LIGHTER: '#E7AFAB'
    },
    blueberry: {
        DARKER: '#257C98',
        DARK: '#1979BE',
        MAIN: '#4190CA',
        LIGHT: '#82B7DE',
        LIGHTER: '#ABD1ED'
    },
    mango: {
        DARKER: '#B09F05',
        DARK: '#BFAE16',
        MAIN: '#CABC41',
        LIGHT: '#D8CE77',
        LIGHTER: '#E8E2AD'
    }
};

const constants = {
    colors: {
        light: themeColors.light,
        dark: themeColors.dark,
        primary: flavorColors.mint,
        flavors: flavorColors,
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