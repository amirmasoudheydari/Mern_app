import { MDBCollapse, MDBContainer, MDBIcon, MDBNavbar, MDBNavbarBrand, MDBNavbarItem, MDBNavbarLink, MDBNavbarNav, MDBNavbarToggler, MDBTypography } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setLogut } from '../redux/features/authSlice'
import { getToursByUser } from '../redux/features/tourSlice'
import decode from 'jwt-decode'


const Header = () => {
  const [show, setShow] = useState(false)
  const [search, setSearch] = useState('')
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = user?.token
  
    if (token) {
      const decodeToken = decode(token)
      if (decodeToken.exp * 1000 < new Date().getTime()) {
        dispatch(setLogut())
      }
    }

  const handelLogout = () => {
    dispatch(setLogut())
  }
  useEffect(() => {
    if (user?.result) {
      dispatch(getToursByUser(user.result._id))
    }
  }, [dispatch, user])

  const handelSubmit = (e) => {
    e.preventDefault()
    if (search) {
      navigate(`/tours/search?searchQurey=${search}`)
      setSearch('')
    } else {
      navigate('/')
    }
  }
  return (
    <MDBNavbar fixed='top' expand='lg' style={{ backgroundColor: '#f0e6ea' }}>
      <MDBContainer>
        <MDBNavbarBrand href='/' style={{ color: '#606080', fontWeight: '600', fontSize: '22px' }}>
          Touropedia
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type='button'
          aria-expanded='false'
          aria-label='Toogle navigation'
          onClick={() => setShow(!show)}
        >
          <MDBIcon fas icon='bars' style={{ color: '#606080' }} />
        </MDBNavbarToggler>
        <MDBCollapse show={show} navbar >
          <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
            {user?.result?._id && (
              <MDBTypography tag='h5' style={{ marginTop: '10px', marginRight: '20px', '&:hover': { color: 'red' } }}>
                login user as: {user?.result?.name}
              </MDBTypography>
            )}
            <MDBNavbarItem>
              <MDBNavbarLink tag='p' className='mb-0'>
                <Link className='header-text' to='/'>Home</Link>
              </MDBNavbarLink>
            </MDBNavbarItem>

            {user?.result?._id && (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink tag='p' className='mb-0'>
                    <Link to='/addTour' className='header-text'>Add Tour</Link>
                  </MDBNavbarLink>
                </MDBNavbarItem>

                <MDBNavbarItem>
                  <MDBNavbarLink tag='p' className='mb-0'>
                    <Link to='/dashboard' className='header-text'>Dashboard</Link>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )}

            {
              user?.result?._id ? (
                <MDBNavbarItem>
                  <MDBNavbarLink tag='p' className='mb-0' >
                    <Link to='/login' onClick={handelLogout} className='header-text'>Logout</Link>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              )
                :
                (
                  <MDBNavbarItem>
                    <MDBNavbarLink tag='p'>
                      <Link to='/login' className='header-text'>Login</Link>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                )
            }
          </MDBNavbarNav>
          <form className='d-flex input-group w-auto' onSubmit={handelSubmit}>
            <input
              type='text'
              className='form-control'
              placeholder='Search Tour'
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div style={{ marginTop: '5px', marginLeft: '5px' }}>
              <MDBIcon fas icon='search' />
            </div>
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  )
}

export default Header