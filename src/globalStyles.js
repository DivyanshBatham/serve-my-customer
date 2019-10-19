import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400|Poppins:400,500&display=swap');

    body {
        margin: 0;
        padding: 0;
        font-family: 'Poppins', sans-serif;
        /* font-family: 'Open Sans', sans-serif; */
        font-size: 16px;
        background-color: ${props => props.theme.colors.offWhite}
    }

    * {
        font-family: 'Poppins', sans-serif;
        color: ${props => props.theme.colors.black}
    }
`