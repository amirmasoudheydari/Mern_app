import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import * as api from '../../api/client'
const initialState = {
  user: {},
  error: '',
  loading: false
}
export const LoginUser = createAsyncThunk('auth/login', async ({ formValue, navigate }, {rejectWithValue}) => {
  try{
    const response = await api.singIn(formValue)
    toast.success('login successfuly')
    navigate('/')
    return response.data
  } catch (err) {
    return rejectWithValue(err.response.data.message)
  }
})

export const register = createAsyncThunk('auth/register', async ({ formValue, navigate },{rejectWithValue}) => {
  try { 
    const response = await api.register(formValue) 
    toast.success('user complete adding')
    navigate('/')
    return response.data
  } catch(err) {
    return rejectWithValue(err.response.data.message)
  }
  
})


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError : (state) => {
      state.error = ''
    } ,
    AddUser: (state, action) => {
      state.user = action.payload
    },
    setLogut: (state, action) => {
      state.user = ''
      localStorage.clear()
    }
  },  
  extraReducers: {
    [LoginUser.pending]: (state, action) => {
      state.loading= true
    },
    [LoginUser.fulfilled]: (state, action) => {
      state.loading = false
      localStorage.setItem("profile", JSON.stringify({...action.payload}))
      state.user = action.payload
    },
    [LoginUser.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    [register.pending]: (state, action) => {
      state.loading = true
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false
      state.user = action.payload
      localStorage.setItem('profile', JSON.stringify(action.payload))
    },
    [register.rejected]: (state, action) => {
      state.error = action.payload
      state.loading =false
    }
  }
})

export const {
  clearError,
  AddUser,
  setLogut
} = authSlice.actions
export default authSlice.reducer
