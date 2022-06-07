import { MDBBtn, MDBCard, MDBCardBody, MDBCardGroup, MDBCardImage, MDBCardText, MDBCardTitle, MDBIcon, MDBTooltip } from 'mdb-react-ui-kit'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { auth, likeTour } from '../redux/features/tourSlice'
const CardTour = ({ cardData }) => {
  const { imageFile, description, title, tags, _id, name, likes } = cardData
  const dispatch = useDispatch()
  const { user } = useSelector(state => auth(state))
  const userId = user?.result?._id

  const excerpt = (str) => {
    if (str?.length > 45) {
      str = str.substring(0, 45) + '...'
    }
    return str
  }
  const Likes = () => {
    if (likes.length > 0) {
      return likes.find(like => like === userId) ? (
        <>
          <MDBIcon fas icon='thumbs-up' />
          &nbsp;
          {
            likes.length > 2 ? (
              <MDBTooltip tag='a' title={`you and ${likes.length - 1} other likes`} >
                {likes.length} likes
              </MDBTooltip>
            ) : (
              `${likes.length} like${likes.length > 1 ? 's' : ''}`
            )
          }
        </>
      ) : (
        <>
          <MDBIcon far icon='thumbs-up' />
          &nbsp; {likes.length} {likes.length === 1 ? 'like' : 'likes'}
        </>
      )
    }
    return (
      <>
        <MDBIcon far icon='thumbs-up' />
        &nbsp;like
      </>
    )
  }
  const handelLike = () => {
    dispatch(likeTour(_id))
  }
  return (
    <MDBCardGroup>
      <MDBCard className='h-100 mt-2 d-sm-flex' style={{ maxWidth: '20rem' }}>
        <MDBCardImage
          src={imageFile}
          alt={title}
          position="top"
          style={{ maxWidth: '100%', height: '180px' }}
        />
        <div className="top-left">{name}</div>
        <span className="text-start tag-card">
          {tags?.map(item => (<Link key={item} to={`/tours/tag/${item}`} > #{item}</Link>))}
          <MDBBtn
            style={{ float: 'right' }}
            tag='a' color='none'
            onClick={user?.result?._id ? handelLike : null}>
            {
              user === null ? (
                <MDBTooltip title="please login to like" tag='p'>
                  <Likes />
                </MDBTooltip>
              ) : (
                <Likes />
              )
            }
          </MDBBtn>
        </span>
        <MDBCardBody>
          <MDBCardTitle className='text-start'>{title}</MDBCardTitle>
          <MDBCardText className='text-start'>{excerpt(description)}</MDBCardText>
          <Link to={`/tour/${_id}`}>
            Read More
          </Link>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  )
}

export default CardTour