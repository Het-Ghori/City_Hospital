import * as ActionType from "../Actiontype";

const initState = {
    doctors: [],
    loading: false,
    error: null,
};

export const doctorsReducer = (state = initState, action) => {
    switch (action.type) {
        case ActionType.DOCTORS_lOADING:
            return {
                doctors: [],
                loading: action.payload,
                error: null
            }
        case ActionType.DOCTORS_ERROR:
            return {
                doctors: [],
                loading: false,
                error: action.payload
            }
        case ActionType.DOCTORS_SUCCESS:
            return {
                doctors: action.payload,
                loading: false,
                error: null
            }
        case ActionType.DOCTORS_ADD:
            return {
                ...state,
                doctors: state.doctors.concat(action.payload)
            }
        case ActionType.DOCTORS_DELETE:
            return {
                ...state,
                doctors: state.doctors.filter((v) => v.id !== action.payload)
            }
        case ActionType.DOCTORS_UPDATE:
            return {
                ...state,
                doctors: state.doctors.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload
                    } else {
                        return v
                    }
                })
            }
        default:
            return state;
    }
};