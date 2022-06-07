import React from 'react'
import { MDBSpinner } from 'mdb-react-ui-kit'

const Spinner = () => {
  return (
    <div className='text-center'>
      <MDBSpinner
        style={{ width: '3rem', height: '3rem', marginTop: '100px' }}
        role='status'
      >
        <span className='visually-hidden'>loading...</span>
      </MDBSpinner>
    </div>
  )
}

export default Spinner