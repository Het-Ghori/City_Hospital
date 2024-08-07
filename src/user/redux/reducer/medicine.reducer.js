import * as ActionType from '../Actiontype';

const initState = {
    medicines: [],
    loading: false,
    error: null
}

export const medicineReducer = (state = initState, action) => {
    switch (action.type) {
        case ActionType.MEDICINE_lOADING:
            return {
                medicines: [],
                loading: true,
                error: null
            }
        case ActionType.MEDICINE_ERROR:
            return {
                medicines: [],
                loading: false,
                error: action.payload,
            }
        case ActionType.MEDICINE_SUCCESS:
            return {
                medicines: action.payload,
                loading: false,
                error: null
            }
        case ActionType.MEDICINE_ADD:
            return {
                ...state,
                medicines: state.medicines.concat(action.payload)
            }
        case ActionType.MEDICINE_DELETE:
            return {
                ...state,
                medicines: state.medicines.filter((val) => val.id !== action.payload)
            }
        case ActionType.MEDICINE_UPDATE:
            return {
                ...state,
                medicines: state.medicines.map((val) => {
                    if (val.id === action.payload.id) {
                        return action.payload
                    } else {
                        return val
                    }
                })
            }
        default:
            return state
    }
}