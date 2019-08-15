import React, {Component} from 'react'
import getComments from '../api/comments/getComments'
import postComment from '../api/comments/postComment'
import styled from 'styled-components'
import {Button} from '../shared/styles'

const Section = styled.section`
  margin-top: 4rem;
`

const MessageBox = styled.textarea`
  width: 80%;
  margin: 1rem 0;
  height: 100px;
`

const CommentList = styled.div`
  margin-top: 2rem;
`

const Comment = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 2rem 0 4rem 0;
`

const Avatar = styled.svg`
  border-radius: 50%;
  height: 40px;
  width: 40px;
`

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CommentBody = styled.p`
  margin-left: 1.4rem;
`

class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [],
      message: ''
    }
  }

  componentDidMount() {
    const {formId, applicantName} = this.props

    getComments(`${applicantName}`)
      .then(response => {
        const {data} = response

        this.setState({
          comments: data
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  componentDidUpdate(prevProps) {
    if (this.props.applicantName !== prevProps.applicantName) {
      const {formId, applicantName} = this.props
      getComments(`${applicantName}`)
        .then(response => {
          const {data} = response
          console.log(response)

          this.setState({
            comments: data
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const {message, comments} = this.state
    const {adminName, applicantName, adminId, formId} = this.props

    const data = {
      adminId,
      adminName,
      applicantName,
      commentBody: message
    }

    postComment('/', data)
      .then(response => {
        const {data: newComment} = response
        const newComments = [newComment]
        const updatedComments = newComments.concat(comments)

        this.setState({
          comments: updatedComments,
          message: ''
        })
      })
      .catch(error => console.log(error))
  }

  handleChange = event => {
    const target = event.target
    const value = target.value

    this.setState({
      message: value
    })
  }

  render() {
    const {comments, message} = this.state

    const listOfComments = comments.map(comment => {
      const {id, adminName, commentBody} = comment

      return (
        <Comment key={id}>
          <AvatarContainer>
            {/* <Avatar src={avatarImage} alt="avatar" /> */}
            <Avatar
              enableBackground="new 0 0 512 512"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m437.02 330.98c-27.883-27.882-61.071-48.523-97.281-61.018 38.782-26.711 64.261-71.414 64.261-121.962 0-81.607-66.393-148-148-148s-148 66.393-148 148c0 50.548 25.479 95.251 64.262 121.962-36.21 12.495-69.398 33.136-97.281 61.018-48.352 48.353-74.981 112.64-74.981 181.02h40c0-119.103 96.897-216 216-216s216 96.897 216 216h40c0-68.38-26.629-132.667-74.98-181.02zm-181.02-74.98c-59.551 0-108-48.448-108-108s48.449-108 108-108 108 48.448 108 108-48.449 108-108 108z" />
            </Avatar>
            {/* <span>Test Name</span> */}
            <span>{adminName}</span>
          </AvatarContainer>
          <CommentBody>{commentBody}</CommentBody>
        </Comment>
      )
    })

    return (
      <Section>
        <h2>Comment</h2>
        <form onSubmit={this.handleSubmit}>
          <MessageBox
            name="message"
            onChange={this.handleChange}
            value={message}
            row={6}
          />
          <div>
            <Button type="submit">Post Comment</Button>
          </div>
        </form>
        <CommentList>{listOfComments}</CommentList>
      </Section>
    )
  }
}

export default Comments
