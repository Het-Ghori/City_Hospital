import { deleteMedicine, getMedicine, postMedicine, updateMedicine } from '../../../common/api/medicine.api';
import { db } from '../../../firebase';
import * as ActionType from '../Actiontype';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";

export const getMedicineData = () => (dispatch) => {
    try {
        dispatch(loadingMedicineData())
        setTimeout(async function () {
            let data = []
            const querySnapshot = await getDocs(collection(db, "medicine"));
            querySnapshot.forEach((doc) => {
                data.push({ id: doc.id, ...doc.data() })

                dispatch({ type: ActionType.MEDICINE_SUCCESS, payload: data })
            });
        }, 1000)

    } catch (error) {
        dispatch(errorMedicineData(error.message))
    }
}

export const addMedicineData = (data) => async (dispatch) => {
    try {
        const docRef = await addDoc(collection(db, "medicine"), data);
        dispatch({ type: ActionType.MEDICINE_ADD, payload: { id: docRef.id, ...data } })
    } catch (error) {
        console.log(error)
    }
}

export const deleteMedicineData = (id) => async (dispatch) => {
    try {
        await deleteDoc(doc(db, "medicine", id));
        dispatch({ type: ActionType.MEDICINE_DELETE, payload: id })
    } catch (error) {
        console.log(error)
    }
}

export const updateMedicineData = (data) => async (dispatch) => {
    try {

        const washingtonRef = doc(db, "medicine", data.id);

        await updateDoc(washingtonRef, data);
        dispatch({ type: ActionType.MEDICINE_UPDATE, payload: data })

    } catch (error) {
        console.log(error)
    }
}

export const loadingMedicineData = (status) => (dispatch) => {
    dispatch({ type: ActionType.MEDICINE_lOADING, payload: status })
}

export const errorMedicineData = (error) => (dispatch) => {
    dispatch({ type: ActionType.MEDICINE_ERROR, payload: error })
}