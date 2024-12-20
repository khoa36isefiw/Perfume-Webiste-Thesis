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
import { BrowserRouter as Router } from 'react-router-dom';
import i18n from './i18n';
import { SnackbarProvider } from 'notistack';
import { I18nextProvider } from 'react-i18next';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './contexts/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

const mergeTheme = {
    theme,
    ...unstable_createMuiStrictModeTheme(),
};

root.render(
    <React.StrictMode>
        <CssBaseline>
            <I18nextProvider i18n={i18n} defaultNS={'translation'}>
                <SnackbarProvider
                    maxSnack={8}
                    // position
                    autoHideDuration={3000}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <Provider store={store}>
                        <ThemeProvider theme={mergeTheme}>
                            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                                <Router>
                                    <AuthProvider>
                                        <App />
                                    </AuthProvider>
                                </Router>
                            </GoogleOAuthProvider>
                        </ThemeProvider>
                    </Provider>
                </SnackbarProvider>
            </I18nextProvider>
        </CssBaseline>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
