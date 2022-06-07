import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTours, searchTours, setCurrentPage } from '../redux/features/tourSlice'
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from 'mdb-react-ui-kit'
import CardTour from '../components/CardTour'
import Spinner from '../components/Spinner'
import Pagination from '../components/Pagination'
import { useLocation, useSearchParams } from 'react-router-dom'


const Home = () => {
  const { tours, loading, currentPage, numberOfPage } = useSelector(state => ({ ...state.tour }))
  const dispatch = useDispatch()
  const [params] = useSearchParams()
  const qurey = params.get('searchQurey')
  const location = useLocation()

  useEffect(() => {
    if (!qurey) {
      dispatch(getTours(currentPage))
    } else {
      dispatch(searchTours(qurey))
    }
  }, [currentPage, dispatch, qurey])


  if (loading) {
    return (
      <MDBContainer style={{ width: '400px', textAlign: 'center' }}>
        <Spinner />
      </MDBContainer>
    )
  }

  return (
    <div
      style={{
        margin: 'auto',
        padding: '15px',
        maxWidth: '1000px',
        alignContent: 'center'
      }}
    >
      <MDBRow className='mt-5'>
        {tours.length === 0 && location.pathname === '/' && (
          <MDBTypography className='text-center mb-0' tag='h2'>
            no tours found
          </MDBTypography>
        )}
        {tours.length === 0 && location.pathname !== '/' && (
          <MDBTypography className='text-center mb-0' tag='h2'>
            we couldn't find any matches for {qurey}
          </MDBTypography>
        )}

        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-md-3 g-2">
              {tours && tours.map((tour, index) => (
                <CardTour key={index} cardData={tour} />
              ))}
            </MDBRow>
            {tours.length ? (
              <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} numberOfPages={numberOfPage} />
            ) : ''}
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </div>
  )
}

export default Home