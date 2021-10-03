export const Actions = {
    setLoggedIn: "[Authentication] LoggedIn",
    setToken: "[Authentication] Token",
    setUsername: "[Authentication] Username"
}

export const setLoggedIn = (loggedIn) => ({
    type: Actions.setLoggedIn,
    payload: {
        loggedIn
    }
})

export const setToken = (Token) => ({
    type: Actions.setToken,
        payload: {Token}
})

export const setUsername = (Username) => ({
    type: Actions.setUsername,
    payload: {
        Username
    }
})