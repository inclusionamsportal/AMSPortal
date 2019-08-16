import React, {Component} from 'react'
import getApplications from '../api/applications/getApplications'
import styled from 'styled-components'
import {green, red, yellow, black} from '../shared/styles'
import {Link} from 'react-router-dom'

const Container = styled.section`
  margin: 0 2rem;
`

const ApplicantContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: row wrap;
`

const Applicant = styled(Link)`
  border: 1px solid ${props => props.bordercolor};
  padding: 2rem;
  color: ${black};
  flex-basis: 30%;
  margin-bottom: 2rem;
`

class ReviewPage extends Component {
  state = {
    applicants: []
  }

  componentDidMount() {
    getApplications()
      .then(response => {
        const {data} = response

        this.setState({
          applicants: data
        })
      })
      .catch(error => console.log(error))
  }

  getStatusColor = status => {
    let color
    switch (status.toLowerCase()) {
      case 'under review':
        color = yellow
        break
      case 'accepted':
        color = green
        break
      case 'rejected':
        color = red
        break
      default:
        color = black
        break
    }

    return color
  }

  render() {
    const {applicants} = this.state

    const listOfApplicants = applicants.map(applicant => {
      const {
        applicantName: name,
        applicantEmail: email,
        title,
        formId,
        status,
        id
      } = applicant
      const statusColor = this.getStatusColor(status)

      return (
        <Applicant key={id} to={`/review/${id}`} bordercolor={statusColor}>
          <h2>{title}</h2>
          <p>{name}</p>
          <p>{email}</p>
          <p>{status}</p>
        </Applicant>
      )
    })

    return (
      <Container>
        <h1>Review Applicants</h1>
        {applicants.length === 0 && (
          <div>
            <p>
              Don't have any applicants?
              <Link to="/create-form"> Create a form</Link> to get started!
            </p>
          </div>
        )}

        <ApplicantContainer>{listOfApplicants}</ApplicantContainer>
      </Container>
    )
  }
}

export default ReviewPage
