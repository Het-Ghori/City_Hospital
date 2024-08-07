import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs, doc, deleteDoc, setDoc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { db, storage } from '../../../firebase'

const initState = {
    apt: [],
    loading: false,
    error: null
}

export const addApt = createAsyncThunk(
    'appointment/add',
    async (data) => {
        let iData = { ...data }
        try {
            const rNum = Math.floor(Math.random() * 1000000);
            const precRef = ref(storage, 'prec/' + rNum + '_' + data.prec.name);

            await uploadBytes(precRef, data.prec).then(async (snapshot) => {
                await getDownloadURL(snapshot.ref)
                    .then(async (url) => {
                        iData = { ...data, prec: url }
                        const docRef = await addDoc(collection(db, "apt_user"), { ...iData, imgName: rNum + '_' + data.prec.name });
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

export const deleteApt = createAsyncThunk(
    'appointment/delete',
    async (data) => {
        try {
            const aptRef = ref(storage, 'prec/' + data.imgName);
            await deleteObject(aptRef).then(async () => {
                await deleteDoc(doc(db, "apt_user", data.id));
            });
        } catch (error) {
            console.error("Error deleting appointment: ", error);
        }
        return data.id;
    }
);

export const getApt = createAsyncThunk(
    'appointment/fetch',
    async () => {
        try {
            const data = []
            const querySnapshot = await getDocs(collection(db, "apt_user"));
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

export const updateApt = createAsyncThunk(
    'appointment/update',
    async (data) => {
        try {
            if (typeof data.prec === 'string') {
                const aptRef = doc(db, "apt_user", data.id);
                await updateDoc(aptRef, data);
                return data;
            } else {
                const desertRef = ref(storage, 'prec/' + data.imgName);
                let iData = { data }
                await deleteObject(desertRef).then(async () => {
                    const rNo = Math.floor(Math.random() * 1000000);

                    const storageRef = ref(storage, 'prec/' + rNo + '_' + data.prec.name);

                    await uploadBytes(storageRef, data.prec).then(async (snapshot) => {

                        await getDownloadURL(snapshot.ref)
                            .then(async (url) => {
                                iData = { ...data, prec: url, imgName: rNo + '_' + data.prec.name }
                                const aptRef = doc(db, "apt_user", data.id);

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

const onLoading = (state) => {
    state.loading = true
}
const onRejected = (state, action) => {
    state.loading = false
    state.error = action.error.message
}

export const aptSlice = createSlice({
    name: 'appointment',
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addApt.pending, onLoading)
            .addCase(addApt.fulfilled, (state, action) => {
                state.loading = false;
                state.apt = state.apt.concat(action.payload);
                state.error = null;
            })
            .addCase(addApt.rejected, onRejected)

            .addCase(getApt.pending, onLoading)
            .addCase(getApt.fulfilled, (state, action) => {
                state.loading = false;
                state.apt = action.payload;
                state.error = null;
            })
            .addCase(getApt.rejected, onRejected)

            .addCase(deleteApt.pending, onLoading)
            .addCase(deleteApt.fulfilled, (state, action) => {
                state.loading = false;
                state.apt = state.apt.filter((val) => val.id !== action.payload);
                state.error = null;
            })
            .addCase(deleteApt.rejected, onRejected)

            .addCase(updateApt.pending, onLoading)
            .addCase(updateApt.fulfilled, (state, action) => {
                state.loading = false;
                let updateData = state.apt.map((val) => {
                    if (val.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return val
                    }
                })
                state.apt = updateData;
                state.error = null;
            })
            .addCase(updateApt.rejected, onRejected)
    }
})

export default aptSlice.reducer;