import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getRelatudTours, getTour } from '../redux/features/tourSlice'
import moment from 'moment'
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBContainer, MDBIcon } from 'mdb-react-ui-kit'
import RelatudTor from '../components/RelatudTour'

const SingleTour = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { tour, relatedTours } = useSelector(state => ({ ...state.tour }))
  const tags = tour?.tags
  useEffect(() => {
    tags && dispatch(getRelatudTours(tags))
  }, [dispatch, tags])

  useEffect(() => {
    if (id) {
      dispatch(getTour(id))
    }
  }, [dispatch, id])
  return (
    <MDBContainer>
      <MDBCard className='mb-3 mt-2'>
        <MDBCardImage
          src={tour?.imageFile}
          position='top'
          style={{ width: '100%', maxHeight: '600px' }}
          alt={tour?.title}
        />
        <MDBCardBody>
          <h3>{tour?.titile}</h3>
          <span>
            <p className='text-start tourName'>
              Created By : {tour?.name}
            </p>
          </span>
          <div style={{ float: 'left' }}>
            <span className='text-start'>
              {tour?.tags?.map(item => `#${item}`)}
            </span>
          </div>
          <br />
          <MDBCardText className='text-start mt-2'>
            <MDBIcon
              style={{ float: 'left', margin: '5px' }}
              far
              icon='calender-alt'
              size='lg'
            />
            <small className="text-muted">
              {moment(tour?.createdAt).fromNow()}
            </small>
          </MDBCardText>
          <MDBCardText className='lead mb-0 text-start'>
            {tour?.description}
          </MDBCardText>
        </MDBCardBody>
        <RelatudTor reletedTours={relatedTours} tourId={id} />
      </MDBCard>
    </MDBContainer>
  )
}

export default SingleTour