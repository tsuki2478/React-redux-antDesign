export const type = {
    SWITCH_MENU: 'SWITCH_MENU',
    CHECKED_MENU: 'CHECKED_MENU'
}


export const switchMenu = (menuName) => {
    return {
        type: type.SWITCH_MENU,
        menuName
    }
}


export const CHECKED_MENU_Success = (MENU) => {
    return {
        type: type.CHECKED_MENU,
        payload: MENU
    }
}

