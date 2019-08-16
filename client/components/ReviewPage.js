import React, {Component} from 'react'
import getApplications from '../api/applications/getApplications'
import {parseDate} from '../utils/date'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {
  flatRed,
  green,
  yellow,
  black,
  gray,
  brandyRose,
  Container
} from '../shared/styles'

const ApplicantContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: row wrap;
`

const Applicant = styled(Link)`
  color: ${black};
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
  flex-basis: 47%;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  border: 1px solid ${black};
  border-radius: 5px;

  &:hover {
    background-color: #f1f1f1;
  }

  @media (max-width: 1040px) {
    flex-basis: 80%;
  }

  @media (max-width: 700px) {
    flex-basis: 100%;
  }
`

const ButtonContainer = styled.div`
  margin-right: 1.4rem;
  flex-basis: 40%;
`

const DateContainer = styled.div`
  border-right: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1.4rem;
  padding-right: 1rem;
  color: ${black};
`

const Day = styled.span`
  color: ${gray};
`

const DateCreated = styled.span`
  font-weight: 600;
  color: ${brandyRose};
  font-size: 1.4rem;
`

const Month = styled.span``

const StatusButton = styled.button`
  border-radius: 10px;
  border: 1px solid ${props => props.borderColor};
  background-color: ${props => props.borderColor};
  font-size: 0.8rem;
  font-weight: 600;
  width: 100%;
  padding: 0.4rem 0.8rem;
`

const ApplicantInfo = styled.div`
  flex-basis: 70%;

  & p:first-child {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 0.4rem;
  }

  & p:nth-child(2) {
    margin-top: 0;
  }
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
        color = flatRed
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
        status,
        id,
        createdAt
      } = applicant

      const created = parseDate(createdAt)
      const statusColor = this.getStatusColor(status)

      return (
        <Applicant key={id} to={`/review/${id}`} bordercolor={statusColor}>
          <DateContainer>
            <Day>{created.day}</Day>
            <DateCreated>{created.date}</DateCreated>
            <Month>{created.month}</Month>
          </DateContainer>
          <ApplicantInfo>
            <p>{name}</p>
            <p>{email}</p>
          </ApplicantInfo>
          <ButtonContainer>
            <StatusButton type="button" borderColor={statusColor}>
              {status}
            </StatusButton>
          </ButtonContainer>
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
