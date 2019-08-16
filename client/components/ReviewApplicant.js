import React, {Component} from 'react'
import Comments from './Comments'
import styled from 'styled-components'
import getApplications from '../api/applications/getApplications'
import updateApplicationStatus from '../api/applications/updateApplicationStatus'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {green, black, Button, Container} from '../shared/styles'

const Application = styled.div``

const Field = styled.div`
  margin-bottom: 2rem;

  & h4 {
    margin-top: 0rem;
    margin-bottom: 0rem;
  }

  & p {
    margin-top: 0.4rem;
  }
`

const Status = styled.select`
  margin: 1rem 0;
`

const UpdateStatusContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0;
  position: relative;
`

const StyledLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: ${black};
`

const UpdatedText = styled.h2`
  color: ${green};
  position: absolute;
  right: 0;
  top: -55px;
`

class ReviewApplicant extends Component {
  state = {
    form: [],
    status: '',
    applicationID: '',
    wasUpdated: false
  }

  componentDidMount() {
    const {id: applicationID} = this.props.match.params

    getApplications(`${applicationID}`)
      .then(response => {
        const {data} = response
        this.setState({
          form: data.applicationBody,
          status: data.status,
          applicantName: data.applicantName,
          applicationID: data.id
        })
      })
      .catch(error => console.log(error))
  }

  handleChange = event => {
    const {value} = event.target

    this.setState({
      status: value
    })
  }

  handleClick = () => {
    const {status, applicationID, Updated} = this.state

    if (Updated) {
      this.setState({
        wasUpdated: false
      })
    }

    updateApplicationStatus(`/${applicationID}`, {status})
      .then(() => {
        this.setState({
          wasUpdated: true
        })
      })
      .catch(error => {
        console.log(error)
        this.setState({
          wasUpdated: false
        })
      })
  }

  render() {
    const {status, form, applicantName, wasUpdated} = this.state

    const {id: formId} = this.props.match.params
    const {adminName, adminId} = this.props

    const listOfFields = form.map((field, index) => {
      const {label, value} = field

      return (
        <Field key={index}>
          <h4>{label}</h4>
          <p>{String(value)}</p>
        </Field>
      )
    })

    return (
      <React.Fragment>
        <Container>
          <StyledLink to="/review">
            <svg
              width="25px"
              height="25px"
              enableBackground="new 0 0 492 492"
              viewBox="0 0 492 492"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m198.608 246.104 184.056-184.064c5.068-5.056 7.856-11.816 7.856-19.024 0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12c-5.06-5.072-11.824-7.864-19.032-7.864s-13.964 2.792-19.028 7.864l-219.148 219.144c-5.084 5.08-7.868 11.868-7.848 19.084-.02 7.248 2.76 14.028 7.848 19.112l218.944 218.932c5.064 5.072 11.82 7.864 19.032 7.864 7.208 0 13.964-2.792 19.032-7.864l16.124-16.12c10.492-10.492 10.492-27.572 0-38.06z" />
            </svg>Back
          </StyledLink>
          <section>
            <UpdateStatusContainer>
              <Status onChange={this.handleChange} name="status" value={status}>
                <option value="UNDER REVIEW">Under Review</option>
                <option value="REJECTED">Rejected</option>
                <option value="ACCEPTED">Accepted</option>
              </Status>
              <Button type="button" onClick={this.handleClick}>
                Update Status
              </Button>
              {wasUpdated && <UpdatedText>Updated!</UpdatedText>}
            </UpdateStatusContainer>
            <Application>{listOfFields}</Application>
            <Comments
              formId={formId}
              applicantName={applicantName}
              adminId={adminId}
              adminName={adminName}
            />
          </section>
        </Container>
      </React.Fragment>
    )
  }
}

const mapState = state => {
  return {
    adminName: state.user.username,
    adminId: state.user.id
  }
}

export default connect(mapState)(ReviewApplicant)
