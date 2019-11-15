import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font-family: 'Poppins', sans-serif;
        font-size: 16px;
        background-color: ${props => props.theme.colors.primaryBackground};
        color: ${props => props.theme.colors.primaryText}
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
    .notification-default {
        border-left: 8px solid ${props => props.theme.colors.primaryDark} !important;
        background: ${props => props.theme.colors.primary} !important;

        .timer {
            background: ${props => props.theme.colors.primaryDark} !important;
        }
    }

    .twitter-picker {
        position: absolute !important;
        /* top: calc(50% + 5px); */
        top: calc(100% + 5px);
        left: calc(-50% + 12px);
        border-radius: 0.5rem !important;
        box-shadow: 2px 4px 36px 0 rgba(46,61,73,.3) !important;
        z-index: 5000 !important;
    }
`