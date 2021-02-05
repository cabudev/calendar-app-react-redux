import { types } from "../types/types"

export const uiOpenModal = () => ({ type: types.uiOpenModal });

export const uiCloseModal = () => ({ type: types.uiCloseModal });

export const uiToggleNavProfile = (isOpen) => ({ 
    type: types.uiToggleNavProfile,
    isOpen: isOpen    
    }
);

export const uiToggleSidebar = (isOpen) => ({ 
    type: types.uiToggleSidebar,
    isOpen: isOpen    
    }
);
