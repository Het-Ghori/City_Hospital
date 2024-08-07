import * as ActionType from '../Actiontype';

const initState = {
    department: [],
    loading: false,
    error: null
}

export const departmentReducer = (state = initState, action) => {
    switch (action.type) {
        case ActionType.DEPARTMENT_LOADING:
            return {
                department: [],
                loading: true,
                error: null
            }
        case ActionType.DEPARTMENT_ERROR:
            return {
                department: [],
                loading: false,
                error: action.payload
            }
        case ActionType.DEPARTMENT_GET:
            return {
                error: null,
                loading: false,
                department: action.payload
            }
        case ActionType.DEPARTMENT_ADD:
            return {
                ...state,
                department: state.department.concat(action.payload)
            }
        case ActionType.DEPARTMENT_DELETE:
            return {
                ...state,
                department: state.department.filter((v) => v.id !== action.payload)
            }
        case ActionType.DEPARTMENT_UPDATE:
            return {
                ...state,
                department: state.department.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return v;
                    }
                })
            }
        default:
            return state;
    }
}