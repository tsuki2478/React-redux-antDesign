import { type } from '../action/menu';

const Data = (state, action) => {
      console.log(state,'state')
      console.log(action,'action')
    switch (action.type) {
        case type.CHECKED_MENU:
            return {
                ...state,
                menu:action
            };
        default:
            return {...state};
    }
};

export default Data;
