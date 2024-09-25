import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    listAccounts: [], // list account registered
    loggedInAccount: null, // the current account is logged in
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
            const updatedAccount = action.payload; // the account details (could include email, password, and user image)
            // updatedAccount, an object can include:
            // updatedAccount: {userImage:'', firstName:'', lastName:''}

            // find the account by email (or use an ID if you have one)
            const accountIndex = state.listAccounts.findIndex(
                // check if the edited email is already exist in list?
                (acc) => acc.email === updatedAccount.email,
            );

            if (accountIndex !== -1) {
                // exist
                // update the account details (you can use Object.assign or spread syntax)
                state.listAccounts[accountIndex] = {
                    ...state.listAccounts[accountIndex], // get the old value of user is edited
                    ...updatedAccount, // new value of user is edited overwrite
                };

                // If the updated account is the currently logged-in account, update that too
                if (state.loggedInAccount?.email === updatedAccount.email) {
                    state.loggedInAccount = {
                        // update user is edited to list current user
                        ...state.loggedInAccount,
                        ...updatedAccount,
                    };
                }
            } else {
                console.log('Account not found');
            }
        },
        changePassword: (state, action) => {
            const updatedAccount = action.payload;
            const accountIndex = state.listAccounts.findIndex(
                // check if the edited email is already exist in list?
                (acc) => acc.email === updatedAccount.email,
            );
            if (accountIndex !== -1) {
                // exist
                // update the account details (you can use Object.assign or spread syntax)
                state.listAccounts[accountIndex] = {
                    ...state.listAccounts[accountIndex], // get the old value of user is edited
                    // overwrite password with new password
                    password: updatedAccount.password,
                };
            } else {
                console.log('Account not found');
            }
        },
    },
});

const { actions, reducer } = accountManagementSlice;
export const {
    signUpAccount,
    loginAccount,
    logoutAccount,
    updateAccountInformation,
    changePassword,
} = actions; // named export
export default reducer; // export default
