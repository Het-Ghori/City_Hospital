import { deleteRequest, getRequest, postRequest, putRequest } from "../request"

export const getDoctorsData = () => {
    return getRequest('doctors')
}

export const addDoctorsData = (data) => {
    return postRequest('doctors', data)
}

export const deleteDoctorData = (id) => {
    return deleteRequest('doctors/', id)
}

export const updateDoctorData = (data) => {
    return putRequest('doctors/', data)
}