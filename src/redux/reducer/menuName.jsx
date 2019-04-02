import { type } from '../action/menu';

const Data = (state, action) => {
    console.log(state,'state')
    console.log(action,'action')
    switch (action.type) {
        case type.SWITCH_MENU:
            return {
                ...state,
                menuName:action.menuName
            };
        default:
            return {...state};
    }
};

export default Data;
