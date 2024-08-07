import * as ActionType from '../ActionType';

export const ThemeReducer = (state, action) => {
    switch (action.type) {
        case ActionType.TOGGLE_THEME:
            return {
                theme: action.payload
            };
        default:
            return state;
    }
};