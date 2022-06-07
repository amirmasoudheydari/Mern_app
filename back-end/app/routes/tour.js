const express = require('express')
const auth = require('../middlewares/auth')

const router = express.Router()
const {
  createTour,
  getTours,
  getTour,
  getToursByUser,
  deleteTour,
  tourUpdate,
  getTourBySearch,
  getTourByTag,
  getRelatedTours,
  likeTour
} = require('../controllers/tour')

router.get('/search', getTourBySearch)
router.get('/', getTours)
router.post('/relatedTours', getRelatedTours)
router.get('/:id', getTour)
router.get('/userTours/:id', auth, getToursByUser)
router.get('/tag/:tag', getTourByTag)
router.patch('/likes/:id', auth, likeTour)

router.delete('/:id', auth, deleteTour)
router.post('/', auth, createTour)
router.patch('/:id', auth, tourUpdate)

module.exports = router
