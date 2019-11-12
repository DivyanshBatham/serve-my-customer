import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
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

    #root {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }

    .notification-item {
        border-radius: 8px !important;
        box-shadow: ${props => props.theme.shadows.normal} !important;
        
        &:hover {
            box-shadow: ${props => props.theme.shadows.hover} !important,
        }
        .notification-message {
            max-width: 100% !important;
        }
    }
    .notification-default{
        border-left: 8px solid ${props => props.theme.colors.darkBlue} !important;
        background: ${props => props.theme.colors.primary} !important;
    }
`