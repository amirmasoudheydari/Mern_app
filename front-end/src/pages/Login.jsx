import React, { useEffect, useState } from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardFooter, MDBIcon, MDBInput, MDBSpinner, MDBValidation, MDBValidationItem } from 'mdb-react-ui-kit'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, LoginUser } from '../redux/features/authSlice'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
  email: '',
  password: ''
}


const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()



  const { error, loading } = useSelector(state => ({ ...state.auth }))
  const [formValue, setFormValue] = useState(initialState)

  const handelSubmit = (e) => {
    const { email, password } = formValue
    if (email && password) {
      dispatch(LoginUser({ formValue, navigate, dispatch }))
    }
  }
  const onInputChange = e => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value })
  }


  useEffect(() => {
    if (error) {
      error && toast.error(error)
      dispatch(clearError())
    }
  }, [dispatch, error])


  return (
    <div
      style={{
        margin: 'auto',
        padding: '15px',
        maxWidth: '450px',
        alignContent: 'center',
        marginTop: '120px'
      }}
    >
    
      <MDBCard alignment='center'>
        <MDBIcon fas icon='user-circle' className='fa-2x' />
        <h5>sign in</h5>
        <MDBCardBody>

          <MDBValidation onSubmit={handelSubmit} noValidate className='row g-4'>
            <MDBValidationItem invalid feedback='Please provide your email.'  >
              <MDBInput
                value={formValue.email}
                type="email"
                name='email'
                onChange={onInputChange}
                required
                label='Email'
              />
            </MDBValidationItem>
            <MDBValidationItem invalid feedback='Please provide your password.' >
              <MDBInput
                value={formValue.password}
                name='password'
                onChange={onInputChange}
                required
                label='Password'
              />
            </MDBValidationItem>
            <MDBBtn >
              {loading && (
                <MDBSpinner
                  size='md'
                  role='status'
                  tag='span'
                  className='me-2'
                />
              )}
              login
            </MDBBtn>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to='/register'>
            <p>dont'n have an account ? sing up</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>

    </div>
  )
}

export default Login