import { deleteRequest, getRequest, postRequest, putRequest } from "../request"

export const getMedicine = () => {
    return getRequest('medicines/')
}

export const postMedicine = (data) => {
    return postRequest('medicines/', data)
}

export const deleteMedicine = (id) => {
    return deleteRequest('medicines/', id)
}

export const updateMedicine = (data) => {
    return putRequest('medicines/', data)
}