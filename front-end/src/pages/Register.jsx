import React, { useEffect, useState } from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardFooter, MDBIcon, MDBInput, MDBSpinner, MDBValidation, MDBValidationItem } from 'mdb-react-ui-kit'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../redux/features/authSlice'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm:''
}

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { error, loading } = useSelector(state => ({ ...state.auth }))
  const [formValue, setFormValue] = useState(initialState)
  const { firstName, lastName, email, password, passwordConfirm } = formValue

  const handelSubmit = (e) => {
    if( password !== passwordConfirm) {
      return toast.error('password should match')
    }
    if (email && password && firstName && lastName && password && passwordConfirm) {
      dispatch(register({ formValue, navigate }))
    }
  }
  const onInputChange = e => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    error && toast.error(error)
  }, [error])


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
        <ToastContainer />
        <MDBIcon fas icon='user-circle' className='fa-2x' />
        <h5>sign up</h5>
        <MDBCardBody>

          <MDBValidation onSubmit={handelSubmit} noValidate className='row g-4'>
            <MDBValidationItem className='col-md-6' invalid feedback='Please provide your first name.'  >
              <MDBInput
                value={firstName}
                type="text"
                name='firstName'
                onChange={onInputChange}
                required
                label='first name'
              />
            </MDBValidationItem>
            <MDBValidationItem className='col-md-6' invalid feedback='Please provide your last name.'  >
              <MDBInput
                value={lastName}
                type="text"
                name='lastName'
                onChange={onInputChange}
                required
                label='last name'
              />
            </MDBValidationItem>
            <MDBValidationItem invalid feedback='Please provide your email.'  >
              <MDBInput
                value={email}
                type="email"
                name='email'
                onChange={onInputChange}
                required
                label='Email'
              />
            </MDBValidationItem>
            <MDBValidationItem invalid feedback='Please provide your password.' >
              <MDBInput
                value={password}
                name='password'
                onChange={onInputChange}
                required
                label='Password'
              />
            </MDBValidationItem>
            <MDBValidationItem invalid feedback='Please provide your password Confirm.' >
              <MDBInput
                value={passwordConfirm}
                name='passwordConfirm'
                onChange={onInputChange}
                required
                label='Password confirm'
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
              Register
            </MDBBtn>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to='/login'>
            <p>Already have an account ? sing In</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>

    </div>
  )
}

export default Register