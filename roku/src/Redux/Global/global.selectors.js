export const getGlobalState = store => store.global

export const getGlobalApi = store => getGlobalState(store).api;
export const getGlobalDarkmode = store => getGlobalState(store).darkmode;