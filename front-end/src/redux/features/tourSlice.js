import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue
} from '@reduxjs/toolkit'
import {
  toast
} from 'react-toastify'
import * as api from '../../api/client'
const initialState = {
  loading: false,
  currentPage: 1,
  numberOfPage: null,
  totalTours: null,
  error: '',
  tour: {},
  tours: [],
  userTour: [],
  tagTours: [],
  relatedTours:[]
}
export const addTour = createAsyncThunk('tour/addTour', async ({
  updateTourData: tourData,
  navigate
}, {
  rejectWithValue
}) => {
  try {
    const response = await api.createTour(tourData)
    toast.success('tour add successfully')
    navigate('/')
    return response.data
  } catch (err) {
    return rejectWithValue(err.response.data.message)
  }
})

export const getTours = createAsyncThunk('tour/getTours', async (currentPage, {
  rejectWithValue
}) => {
  try {
    const response = await api.getTours(currentPage)
    return response.data
  } catch (err) {
    return isRejectedWithValue(err)
  }
},
)

export const getTour = createAsyncThunk('tour/getTour', async (id, {
  rejectWithValue
}) => {
  try {
    const response = await api.getTour(id)
    return response.data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const getToursByUser = createAsyncThunk('tour/getTourByUser', async (id, {
  rejectWithValue
}) => {
  try {
    const response = await api.getToursByUser(id)
    return response.data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const deleteTour = createAsyncThunk('tour/deleteTour', async (id, {
  rejectWithValue
}) => {
  try {
    await api.deleteTour(id)
    toast.success('delete tour successfully')
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const tourUpdate = createAsyncThunk('tour/updateTour', async ({
  updateTourData,
  navigate,
  id
}, {
  rejectWithValue
}) => {
  try {
    const res = await api.updateTour(updateTourData, id)
    toast.success('updated tour successfully')
    navigate('/')
    return res.data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const searchTours = createAsyncThunk('tour/searchTours', async (searchQurey, {
  rejectWithValue
}) => {
  try {
    const res = await api.getTourBySearch(searchQurey)
    return res.data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const getTourByTag = createAsyncThunk('tour/getTourByTag', async (tag, {
  rejectWithValue
}) => {
  try {
    const res = await api.getTourByTag(tag)
    return res.data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const getRelatudTours = createAsyncThunk(
  'tour/getRelatedTousr',
  async (tour, {rejectWithValue}) => {
    try {
      const res = await api.getRelatedTours(tour)
      return res.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const likeTour = createAsyncThunk(
  'tour/likeTour',
  async (id, {rejectWithValue}) => {
    try {
      const res = await api.likeTour(id)
      return res.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)


const tourSlice = createSlice({
  name: 'tour',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    }
  },
  extraReducers: {
    [addTour.pending]: (state, action) => {
      state.loading = true
    },
    [addTour.fulfilled]: (state, action) => {
      state.loading = false
    },
    [addTour.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    [getTours.pending]: (state, action) => {
      state.loading = true
    },
    [getTours.fulfilled]: (state, action) => {
      state.loading = false
      const { data, numberOfPages, currentPage, totalTours} = action.payload
      state.tours = data
      state.numberOfPage = numberOfPages
      state.currentPage = currentPage
      state.totalTours = totalTours
    },
    [getTours.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [getTour.pending]: (state, action) => {
      state.loading = true
    },
    [getTour.fulfilled]: (state, action) => {
      state.loading = false
      state.tour = {
        ...action.payload
      }
    },
    [getTour.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [getToursByUser.pending]: (state, action) => {
      state.loading = true
    },
    [getToursByUser.fulfilled]: (state, action) => {
      state.loading = false
      state.userTour = action.payload
    },
    [getToursByUser.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [deleteTour.pending]: (state, action) => {
      state.loading = true
    },
    [deleteTour.fulfilled]: (state, action) => {
      state.loading = false
      const {
        arg
      } = action.meta
      if (arg) {
        state.userTour = state.userTour.filter(item => item._id !== arg)
        state.tours = state.tours.filter(item => item._id !== arg)
      }
    },
    [deleteTour.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [tourUpdate.pending]: (state, action) => {
      state.loading = true
    },
    [tourUpdate.fulfilled]: (state, action) => {
      state.loading = false
      const {
        id
      } = action.meta.arg
      state.userTour = state.userTour.map(tour => tour._id === id ? action.payload : tour)
      state.tours = state.tours.map(tour => tour._id === id ? action.payload : tour)
    },
    [tourUpdate.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [searchTours.pending]: (state, action) => {
      state.loading = true
    },
    [searchTours.fulfilled]: (state, action) => {
      state.loading = false
      state.tours = action.payload
    },
    [searchTours.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [getTourByTag.pending]: (state, action) => {
      state.loading = true
    },
    [getTourByTag.fulfilled]: (state, action) => {
      state.loading = false
      state.tagTours = action.payload
    },
    [getTourByTag.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [getRelatudTours.pending]: (state, action) => {
      state.loading = true
    },
    [getRelatudTours.fulfilled]: (state, action) => {
      state.loading = false
      state.relatedTours = action.payload
    },
    [getRelatudTours.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [likeTour.pending]: (state, action) => {},
    [likeTour.fulfilled]: (state, action) => {
      state.loading = false
      const { arg: id } = action.meta
      if(id) {
        state.tours = state.tours.map(item => item._id === id ? action.payload : item )
      }
    },
    [likeTour.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    }
  }
})

export const auth = (state) => ({...state.auth})

export const {
  setCurrentPage
} = tourSlice.actions
export default tourSlice.reducer