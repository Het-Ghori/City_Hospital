import { addDoctorsData, deleteDoctorData, getDoctorsData, updateDoctorData } from '../../../common/api/doctors.api';
import * as ActionType from '../Actiontype';

export const getDoctors = () => (dispatch) => {
    try {
        dispatch(loadingDoctorsData(true));
        getDoctorsData()
            .then((response) => dispatch({ type: ActionType.DOCTORS_SUCCESS, payload: response.data }))
            .catch((error) => dispatch(getError(error.message)))
    } catch (error) {
        dispatch(getError(error.message));
    }
};

export const addDoctor = (data) => (dispatch) => {
    try {
        addDoctorsData(data)
            .then((response) => dispatch({ type: ActionType.DOCTORS_ADD, payload: response.data }))
            .catch((error) => console.log(error))
    } catch (error) {
        console.log(error);
    }
}

export const deleteDoctor = (id) => (dispatch) => {
    try {
        deleteDoctorData(id)
            .then(dispatch({ type: ActionType.DOCTORS_DELETE, payload: id }))
            .catch((error) => console.log(error))
    } catch (error) {
        console.log(error);
    }
}

export const updateDoctor = (data) => (dispatch) => {
    try {
        updateDoctorData(data)
            .then((response) => dispatch({ type: ActionType.DOCTORS_UPDATE, payload: response.data }))
            .catch((error) => console.log(error))
    } catch (error) {
        console.log(error);
    }
}

export const loadingDoctorsData = (status) => (dispatch) => {
    dispatch({ type: ActionType.DOCTORS_lOADING, payload: status })
}

export const getError = (error) => (dispatch) => {
    dispatch({ type: ActionType.DOCTORS_ERROR, payload: error })
}