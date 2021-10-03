export const getAuthState = store => store.auth

export const getAuthLoggedIn = store => getAuthState(store).LoggedIn
export const getAuthToken = store => getAuthState(store).Token
export const getAuthUsername = store => getAuthState(store).Username
