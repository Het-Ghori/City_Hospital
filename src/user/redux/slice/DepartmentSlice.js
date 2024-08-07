import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { collection, addDoc, getDocs, doc, deleteDoc, setDoc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { db, storage } from '../../../firebase'

const initState = {
    department: [],
    loading: false,
    error: null
}

export const fetchDepartment = createAsyncThunk(
    'department/fetch',

    async () => {
        try {
            const data = []
            const querySnapshot = await getDocs(collection(db, "departments"));
            querySnapshot.forEach((doc) => {
                data.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            return data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const addDepartment = createAsyncThunk(
    'department/add',

    async (data) => {
        let iData = { ...data }
        try {
            const rNum = Math.floor(Math.random() * 1000000);
            const precRef = ref(storage, 'depart_prec/' + rNum + '_' + data.prec.name);

            await uploadBytes(precRef, data.prec).then(async (snapshot) => {
                await getDownloadURL(snapshot.ref)
                    .then(async (url) => {
                        iData = { ...data, prec: url }
                        const docRef = await addDoc(collection(db, "departments"), { ...iData, imgName: rNum + '_' + data.prec.name });
                        iData = {
                            id: docRef.id,
                            ...data,
                            prec: url,
                        }
                    });
            });
            return iData;
        } catch (error) {
            console.log(error)
        }
    }
)

export const deleteDepartment = createAsyncThunk(
    'department/delete',

    async (data) => {
        try {
            const aptRef = ref(storage, 'depart_prec/' + data.imgName);
            await deleteObject(aptRef).then(async () => {
                await deleteDoc(doc(db, "departments", data.id));
            });
        } catch (error) {
            console.error("Error deleting departments: ", error);
        }
        return data.id;
    }
)

export const updateDepartment = createAsyncThunk(
    'department/update',

    async (data) => {
        try {
            if (typeof data.prec === 'string') {
                const aptRef = doc(db, "departments", data.id);
                await updateDoc(aptRef, data);
                return data;
            } else {
                const desertRef = ref(storage, 'depart_prec/' + data.imgName);
                let iData = { data }
                await deleteObject(desertRef).then(async () => {
                    const rNo = Math.floor(Math.random() * 1000000);

                    const storageRef = ref(storage, 'depart_prec/' + rNo + '_' + data.prec.name);

                    await uploadBytes(storageRef, data.prec).then(async (snapshot) => {

                        await getDownloadURL(snapshot.ref)
                            .then(async (url) => {
                                iData = { ...data, prec: url, imgName: rNo + '_' + data.prec.name }
                                const aptRef = doc(db, "departments", data.id);

                                await updateDoc(aptRef, iData);

                                iData = {
                                    ...data,
                                    prec: url,
                                    imgName: rNo + '_' + data.prec.name
                                }
                            })
                    });
                }).catch((error) => {
                    console.log(error)
                });
                return iData
            }
        } catch (error) {
            console.log(error);
        }
    }
)

const onLoading = (state, action) => {
    state.loading = true
}
const onRejected = (state, action) => {
    state.loading = false
    state.error = action.error.message
}

export const departmentSlice = createSlice({
    name: 'department',
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDepartment.pending, onLoading)
            .addCase(fetchDepartment.fulfilled, (state, action) => {
                state.loading = false;
                state.department = action.payload;
                state.error = null;
            })
            .addCase(fetchDepartment.rejected, onRejected)
            .addCase(addDepartment.fulfilled, (state, action) => {
                state.department = state.department.concat(action.payload)
            })
            .addCase(deleteDepartment.fulfilled, (state, action) => {
                state.department = state.department.filter((data) => data.id !== action.payload);
            })
            .addCase(updateDepartment.fulfilled, (state, action) => {
                let index = state.department.findIndex((val) => val.id === action.payload.id);
                if (index) {
                    state.department[index] = action.payload
                }
            })
    }
})

export default departmentSlice.reducer;