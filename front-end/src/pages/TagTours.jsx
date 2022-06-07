import { MDBBtn, MDBCard, MDBCardBody, MDBCardGroup, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBRow, MDBTypography } from 'mdb-react-ui-kit'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTourByTag } from '../redux/features/tourSlice'
const TagTours = () => {
  const { tag } = useParams()
  const { tagTours } = useSelector(state => ({ ...state.tour }))
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getTourByTag(tag))
  }, [dispatch, tag])
   const excerpt = (text, length) => {
    if (text.length > 45) {
      text = text.substring(0, length)
    }
    return text
  }
  return (
    <MDBContainer style={{ marginTop: '80px', textAlign: 'center' }}>
      <MDBTypography tag='h3'>Tours width tag:{tag}</MDBTypography>
      <hr style={{ maxWidth: '500px', margin: 'auto', marginTop: '14px' }} />
      {
        tagTours && tagTours.map(tour => (
          <MDBCardGroup>
            <MDBCard key={tour._id} style={{ margin: 'auto', marginTop: '20px', maxWidth: '600px' }}>
              <MDBRow className='g-0'>
                <MDBCol md={4}>
                  <MDBCardImage
                    src={tour.imageFile}
                    alt={tour.title}
                    className='rounded'
                    fluid
                  />
                </MDBCol>
                <MDBCol md={8} style={{margin:'auto'}} >
                  <MDBCardBody className='text-start'>
                    <MDBCardTitle>{tour.title}</MDBCardTitle>
                    <MDBCardText>{excerpt(tour.description, 40)}</MDBCardText>
                    <div style={{marginBottom:'10px', float:'left'}}>
                      <MDBBtn size='sm' rounded color='info' onClick={() => navigate(`/tour/${tour._id}`)}>
                        Read more
                      </MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCardGroup>
        ))
      }
    </MDBContainer>
  )
}

export default TagTours