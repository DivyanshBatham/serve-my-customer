const colors = {
    black: '#000e1a',
    white: '#fff',
    blue: '#3464E0',
    lightBlue: '#87D3F3',
    darkBlue: '#1A44AA',
    offWhite: '#F1F4F9',
};

// Set Primary Theme:
colors.primary = colors.blue;

export default {
    colors,
    fonts: {
        poppins: "'Poppins', sans-serif",
        openSans: "'Open Sans', sans-serif"
    },
    fontWeights: {
        light: 300,
        regular: 400,
        medium: 500,
    },
    transition: "all .3s ease",
    shadows: {
        normal: "5px 5px 25px 0 rgba(46,61,73,.2)",
        hover: "2px 4px 8px 0 rgba(46,61,73,.2)",
    },
};