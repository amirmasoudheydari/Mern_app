import axios from 'axios'
const devEnv = process.env.NODE_ENV !== 'production'
const {REACT_APP_DEV_API, REACT_APP_PROD_URL} = process.env
const API = axios.create({
  baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_URL}`,
})
API.interceptors.request.use((req) => {
  if(localStorage.getItem('profile')){
    req.headers.authorization = JSON.parse(localStorage.getItem('profile')).token
  }
  return req
})
export const singIn = (formData) => API.post('/users/singin', formData) 
export const register = (formData) => API.post('/users/singup', formData)

export const createTour = (tourData) => API.post('/tour', tourData)
export const getTours = (page) => API.get(`/tour?page=${page}`)
export const getTour = (id) => API.get(`/tour/${id}`)
export const getToursByUser = (id) => API.get(`/tour/userTours/${id}`)
export const deleteTour = (id) => API.delete(`/tour/${id}`)
export const updateTour = (tourData,id) => API.patch(`/tour/${id}`,tourData) 
export const getTourBySearch = (searchQuery) => API.get(`/tour/search?searchQurey=${searchQuery}`)
export const getTourByTag = (tag) => API.get(`/tour/tag/${tag}`)
export const getRelatedTours = (tour) => API.post('/tour/relatedTours', tour)
export const likeTour = (id) => API.patch(`/tour/likes/${id}`)