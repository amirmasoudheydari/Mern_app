import authSlice from "./features/authSlice";
import tourSlice from "./features/tourSlice";

const reducer = {
  auth: authSlice,
  tour: tourSlice
}


export default reducer