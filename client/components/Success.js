import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const Container = styled.section`
  margin: 0 2rem;
`

const Success = () => {
  return (
    <Container>
      <h1>Thank you for applying!</h1>
      <p>
        Your application has been received and we will review it right away.
      </p>
      <Link to="/">Return Home</Link>
    </Container>
  )
}

export default Success
