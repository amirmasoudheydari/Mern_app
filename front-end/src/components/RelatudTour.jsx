import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBRow } from 'mdb-react-ui-kit'
import React from 'react'
import { Link } from 'react-router-dom'

const RelatudTour = ({ reletedTours, tourId }) => {
  const excerpt = (text, length) => {
    if (text?.length > 45) {
      text = text.substring(0, length)
    }
    return text
  }
  return (
    <>
      
      {reletedTours.length > 1 && <h4 style={{textAlign:'center'}}>related tours</h4>}

      <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
        {reletedTours.filter(tour => tour._id !== tourId).splice(0, 3).map(tour => (
          <MDBCol>
            <MDBCard className='h-100'>
              <Link to={`/tour/${tour._id}`}>
                <MDBCardImage
                  src={tour.imageFile}
                  alt={tour.title}
                  position='top'
                />
              </Link>
              <span className="text-start tag-card">
                {tour.tags.map(tag => (
                  <Link to={`/tours/tag/${tag}`}> #{tag} </Link>
                ))}
              </span>
              <MDBCardBody>
                <MDBCardTitle>
                  {tour.title}
                </MDBCardTitle>
                <MDBCardText>{excerpt(tour.descrip, 40)}</MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))
      }
      </MDBRow>
    </>
  )
}

export default RelatudTour