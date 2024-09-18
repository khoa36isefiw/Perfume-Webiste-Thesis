import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    listAccounts: [],
    loggedInAccount: null,
};

export const accountManagementSlice = createSlice({
    name: 'acountManagement',
    initialState,

    reducers: {
        signUpAccount: (state, action) => {
            const account = action.payload;
            state.listAccounts.push(account);
        },
        loginAccount: (state, action) => {
            const { email, password } = action.payload;
            const account = state.listAccounts.find(
                (acc) => acc.email === email && acc.password === password,
            );
            if (account) {
                state.loggedInAccount = account;
            } else {
                console.log('Invalid credentials');
            }
        },
        logoutAccount: (state) => {
            state.loggedInAccount = null;
        },
    },
});

const { actions, reducer } = accountManagementSlice;
export const { signUpAccount, loginAccount, logoutAccount } = actions; // named export
export default reducer; // export default
