import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTour, getToursByUser } from '../redux/features/tourSlice'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBIcon, MDBRow } from 'mdb-react-ui-kit'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner'
const Dashboard = () => {
  const { user } = useSelector(state => ({ ...state.auth }))
  const { userTour, loading } = useSelector(state => ({ ...state.tour }))
  const userId = user?.result?._id
  const dispatch = useDispatch()

  const handelDeleteTour = (id) => {
    if (window.confirm('Are you sure you want to delete this tour ?')) {
      dispatch(deleteTour(id))
    }
  }

  const excerpt = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 45) + '...'
    }
    return str
  }

  useEffect(() => {
    if (userId) {
      dispatch(getToursByUser(userId))
    }
  }, [dispatch, userId])

  if (loading) {
    return (
      <Spinner />
    )
  }
  return (
    <div
      style={{
        margin: 'auto',
        padding: '120px',
        maxWidth: '900px',
        alignContent: 'center'
      }}
    >
      {userTour.length > 0 ? (
        <>
          <h4 className='text-center'>Dashboard: {user?.result?.name}</h4>
          <hr style={{ maxWidth: '570px' }}></hr>
        </>
      ) 
      : 
      (
        <h4>no tour available with the user : {user?.result?.name}</h4>
      )
    }
      {userTour?.map(item => (
        <MDBCard key={item._id} style={{ maxWidth: '600px', marginTop: '30px' }}>
          <MDBRow className='g-0'>
            <MDBCol md={4}>
              <MDBCardImage
                className='rounded'
                src={item.imageFile}
                alt={item.title}
                fluid
              />
            </MDBCol>
            <MDBCol md={8}>
              <MDBCardBody>
                <MDBCardTitle className='text-start'>
                  {item.title}
                </MDBCardTitle>
                <MDBCardText className='text-start'>
                  <small className='text-muted'>
                    {excerpt(item.description)}
                  </small>
                </MDBCardText>
                <div style={{
                  marginLeft: '5px',
                  float: 'right',
                  marginTop: '-60px'
                }}>
                  <MDBBtn className='mt-1' tag='a' color='none' onClick={() => handelDeleteTour(item._id)}>
                    <MDBIcon
                      fas
                      icon='trash'
                      style={{ color: '#dd4b39' }}
                      size='lg'
                    />
                  </MDBBtn>
                  <MDBBtn className='mt-1' color='none' style={{ border: 'none', backgroundColor: 'inherit' }}>
                    <Link to={`/editTour/${item._id}`} >
                      <MDBIcon
                        fas
                        icon='edit'
                        style={{ color: '#55acee', marginLeft: '10px' }}
                        size='lg'
                      />
                    </Link>
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      ))}
    </div>
  )
}

export default Dashboard