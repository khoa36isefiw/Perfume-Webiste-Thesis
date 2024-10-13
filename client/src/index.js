import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material';
import { unstable_createMuiStrictModeTheme } from '@mui/material/styles';
import { theme } from './Theme/Theme';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
const root = ReactDOM.createRoot(document.getElementById('root'));

const mergeTheme = {
    theme,
    ...unstable_createMuiStrictModeTheme(),
};

const initialOptions = {
    clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
    currency: 'USD',
    intent: 'capture',
};
root.render(
    <React.StrictMode>
        <CssBaseline>
            <PayPalScriptProvider options={initialOptions}>
                <Provider store={store}>
                    <ThemeProvider theme={mergeTheme}>
                        <App />
                    </ThemeProvider>
                </Provider>
            </PayPalScriptProvider>
        </CssBaseline>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
