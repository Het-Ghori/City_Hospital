import { deleteRequest, getRequest, postRequest, putRequest } from "../request"

export const getDepartmentData = () => {
    return getRequest('department/')
}

export const addDepartmentData = (data) => {
    return postRequest('department/', data)
}

export const deleteDepartmentData = (id) => {
    return deleteRequest('department/', id)
}

export const updateDepartmentData = (data) => {
    return putRequest('department/', data)
}