import { types } from "../types/types";

const initialState = {
    modalOpen: false,
    navProfileOpen: false,
    sidebarOpen: false,
}

export const uiReducer = ( state = initialState, action) => {
    switch (action.type) {
        case types.uiOpenModal:
            return {
                ...state,
                modalOpen: true
            }
        case types.uiCloseModal:
            return {
                ...state,
                modalOpen: false
            }
        case types.uiToggleNavProfile:
            return {
                ...state,
                navProfileOpen: action.isOpen
            }
        case types.uiToggleSidebar:
            return {
                ...state,
                sidebarOpen: action.isOpen
            }
        case types.uiClear:
            return{
                ...initialState
            }
        default:
            return state;
    }
}