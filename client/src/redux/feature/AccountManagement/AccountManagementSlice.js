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
        updateAccountInformation: (state, action) => {
            const updatedAccount = action.payload; // the new account details (could include email, password, and user image)
            // updatedAccount, an object can include:
            // updatedAccount: {userImage:'', firstName:'', lastName:''}

            // find the account by email (or use an ID if you have one)
            const accountIndex = state.listAccounts.findIndex(
                // check if the edited email is already exist in list?
                (acc) => acc.email === updatedAccount.email,
            );

            if (accountIndex !== -1) {
                // update the account details (you can use Object.assign or spread syntax)
                state.listAccounts[accountIndex] = {
                    ...state.listAccounts[accountIndex],
                    ...updatedAccount,
                };

                // If the updated account is the currently logged-in account, update that too
                if (state.loggedInAccount?.email === updatedAccount.email) {
                    state.loggedInAccount = {
                        ...state.loggedInAccount,
                        ...updatedAccount,
                    };
                }
            } else {
                console.log('Account not found');
            }
        },
    },
});

const { actions, reducer } = accountManagementSlice;
export const { signUpAccount, loginAccount, logoutAccount, updateAccountInformation } = actions; // named export
export default reducer; // export default
