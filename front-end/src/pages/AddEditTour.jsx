import React, { useEffect, useState } from 'react'
import { MDBCard, MDBCardBody, MDBValidation, MDBBtn, MDBInput, MDBTextArea } from 'mdb-react-ui-kit'
import ChipInput from 'material-ui-chip-input'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import FileBase64 from 'react-file-base64';
import { addTour, tourUpdate } from '../redux/features/tourSlice';
import { useNavigate, useParams } from 'react-router-dom'

const initialTourData = {
  title: '',
  description: '',
  tags: [],
}

const AddEditTour = () => {
  const [tourData, setTourData] = useState(initialTourData)
  const [emptiyTag, setEmptiyTag] = useState(null)
  const { title, description, tags } = tourData
  const { error, userTour } = useSelector(state => ({ ...state.tour }))
  const { user } = useSelector(state => ({ ...state.auth }))
  const { id } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    error && toast.error(error)
  }, [error])

  useEffect(() => {
    const tour = userTour.find(tour => tour._id === id)
    if (tour) {
      setTourData({
        ...tour
      })
    }
  }, [id, userTour])

  const handelSubmit = e => {
    e.preventDefault()
    if(!tourData.tags.length){
      setEmptiyTag('emptiy tag required')
    }
    if (title && description && tags) {
      const updateTourData = { ...tourData, name: user?.result?.name }
      if(!id){
        dispatch(addTour({ updateTourData, navigate }))
      }else{
        dispatch(tourUpdate({updateTourData, navigate, id}))
      }
      handelClear()
    }
  }
  const onInputChange = (e) => {
    const { name, value } = e.target
    setTourData({ ...tourData, [name]: value })
  }

  const handelAddTag = (tag) => {
    setTourData({ ...tourData, tags: [...tourData.tags, tag] })
  }

  const handelDeleteTag = (deleteTag) => {
    setTourData({ ...tourData, tags: tourData.tags.filter(tag => tag !== deleteTag) })
  }

  const handelClear = () => {
    setTourData(initialTourData)
  }
  return (
    <div
      style={{
        margin: 'auto',
        padding: '15px',
        maxWidth: '450px',
        alignContent: 'center',
        marginTop: '120px'
      }}
      className='container'
    >
      <MDBCard alignment='center'>
        <h5>{id ? 'Edit tour' : 'Add tour'}</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handelSubmit} className='row g-3'>
            <div className="col-md-12">
              <MDBInput
                label='Enter Title'
                type="text"
                value={title}
                name='title'
                onChange={onInputChange}
                className='form-control'
                required
                invalid='true'
                validation='please provide title'
              />
            </div>
            <div className="col-md-12">
              <MDBTextArea
                label='Enter Description'
                rows={5}
                value={description}
                name='description'
                onChange={onInputChange}
                className='form-control'
                required
                invalid='true'
                validation='please provide description'
              />
            </div>
            <div className="col-md-12">
              <ChipInput
                style={{ width: '100%' }}
                name='tags'
                variant='outlined'
                placeholder='Enter Tag'
                value={tags}
                onAdd={(tag) => handelAddTag(tag)}
                onDelete={(tag) => handelDeleteTag(tag)}
              />
              {emptiyTag && (
                <div className='tagEmpity' >{emptiyTag}</div>
              )}
            </div>
            <div className="d-flex">
              <FileBase64
                multiple={false}
                onDone={
                  (file) => {
                    setTourData({ ...tourData, imageFile: file.base64 })
                  }
                }
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: '100%' }}>
                {id ? 'Edit' : 'Submit'}
              </MDBBtn>
              <MDBBtn style={{ width: '100%' }} className="mt-2" color='danger' onClick={handelClear}>Clear</MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  )
}

export default AddEditTour