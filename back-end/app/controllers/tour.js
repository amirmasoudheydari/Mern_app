const TourModal = require('../models/tour')

const createTour = async (req, res, next) => {
  const tour = req.body
  const newTour = new TourModal({
    ...tour,
    creator: req.userId,
    createAt: new Date().toISOString()
  })
  try {
    await newTour.save()
    res.status(201).send(newTour)
  } catch (error) {
    res.status(404).send({
      message: 'something went wrong'
    })
  }
}

const getTours = async (req, res, next) => {
  const {
    page
  } = req.query
  try {
    const limit = 6
    const startIndex = (Number(page) - 1) * limit
    const total = await TourModal.countDocuments({})
    const tours = await TourModal.find().limit(limit).skip(startIndex)
    res.send({
      data: tours,
      currentPage: Number(page),
      totalTours: total,
      numberOfPages: Math.ceil(total / limit)
    })
  } catch (error) {
    res.status(404).send({
      message: 'something went wrong'
    })
  }
}

const getTour = async (req, res, next) => {
  const {
    id
  } = req.params
  try {
    const tour = await TourModal.findById(id)
    res.status(200).send(tour)
  } catch (error) {
    res.status(400).send({
      message: 'somthing went wrong'
    })
  }
}

const getToursByUser = async (req, res, next) => {
  const {
    id
  } = req.params
  try {
    const tours = await TourModal.find({
      creator: id
    })
    res.status(200).send(tours)
  } catch (error) {
    res.status(404)
  }
}

const deleteTour = async (req, res) => {
  const {
    id
  } = req.params
  try {
    await TourModal.findByIdAndRemove(id)
    res.status(200).send({
      message: 'tour deleted successfully'
    })
  } catch (error) {
    res.status(404).send({
      message: 'error in valid data for tour'
    })
  }
}

const tourUpdate = async (req, res) => {
  const {
    id
  } = req.params
  const {
    title,
    description,
    creator,
    imageFile,
    tags
  } = req.body
  console.log(req.body)
  try {
    const updateTour = {
      creator,
      title,
      description,
      imageFile,
      tags,
      _id: id
    }
    await TourModal.findByIdAndUpdate(id, updateTour, {
      new: true
    })
    res.json(updateTour)
  } catch (error) {
    res.send({
      message: error
    })
  }
}

const getTourBySearch = async (req, res, next) => {
  const {
    searchQurey
  } = req.query
  try {
    const title = new RegExp(searchQurey, 'i')
    const tours = await TourModal.find({
      title
    })
    res.send(tours)
  } catch (error) {
    res.status(404).send({
      message: 'something went wrong'
    })
  }
}

const getTourByTag = async (req, res) => {
  const {
    tag
  } = req.params
  try {
    const tours = await TourModal.find({
      tags: {
        $in: tag
      }
    })
    res.send(tours)
  } catch (error) {
    req.status(404).send({
      message: 'something went wrong'
    })
  }
}
const getRelatedTours = async (req, res) => {
  const tag = req.body
  console.log(req.body)
  try {
    const tours = await TourModal.find({
      tags: {
        $in: tag
      }
    })
    res.send(tours)
  } catch (error) {
    res.status(404).send({
      message: 'something went wrong'
    })
  }
}

const likeTour = async (req, res) => {
  const {
    id
  } = req.params
  try {
    if (!req.userId) {
      return res.json({
        message: 'user is not authenticated'
      })
    }
    const tour = await TourModal.findById(id)
    const index = tour.likes.findIndex((id) => id === String(req.userId))
    console.log('req')
    if (index === -1) {
      tour.likes.push(req.userId)
    } else {
      tour.likes = tour.likes.filter(id => id !== String(req.userId))
    }
    const updatedTour = await TourModal.findByIdAndUpdate(id, tour, {
      new: true
    })
    res.status(200).send(updatedTour)
  } catch (error) {
    return res.status(404).send({
      message: 'something went error'
    })
  }
}
module.exports = {
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
}
