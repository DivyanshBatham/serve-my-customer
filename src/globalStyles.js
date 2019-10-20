import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    /* family=Pacifico&display=swap' */
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400|Poppins:400,500|Pacifico&display=swap');

    body {
        margin: 0;
        padding: 0;
        font-family: 'Poppins', sans-serif;
        font-size: 16px;
        background-color: ${props => props.theme.colors.offWhite};
        color: ${props => props.theme.colors.black}
    }

    * {
        font-family: 'Poppins', sans-serif;
    }

    h1,h2,h3,h4,h5,h6 {
        margin: 0;
    }
`