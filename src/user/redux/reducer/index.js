import { combineReducers } from "redux";
import { medicineReducer } from "./medicine.reducer";
import { cartReducer } from "./cart.reducer";
import { favouriteReducer } from "./favourite.reducer";
import { doctorsReducer } from "./doctors.reducer";
import { authReducer } from "./auth.reducer"
import AlertReducer from "../slice/Alert.slice";
import aptSlice from "../slice/AptSlice";
import departmentReducer from "../slice/DepartmentSlice";

export const rootReducer = combineReducers({
    medicines: medicineReducer,
    cart: cartReducer,
    favourites: favouriteReducer,
    doctors: doctorsReducer,
    department: departmentReducer,
    auth: authReducer,
    alert: AlertReducer,
    apt: aptSlice,
})