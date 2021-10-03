export const Actions ={
    setApi: "[Global] Api",
    setDarkmode: "[Global] Darkmode"
}

export const setApi = (api) => ({
    type: Actions.setApi,
    payload: {
        api
    }
})


export  const setDarkmode = (darkmode) => {
    return function (dispatch) {
        dispatch(setDarkmodeInternal(darkmode))
    }
}

const setDarkmodeInternal = (darkmode) => ({
  type: Actions.setDarkmode,
    payload: {
      darkmode
    }
})