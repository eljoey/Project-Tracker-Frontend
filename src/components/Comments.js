import React, { useState } from 'react'
import apiService from '../services/api'
import { useParams } from 'react-router-dom'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
} from 'mdbreact'
import Moment from 'react-moment'

const Comments = ({ comments, setComments }) => {
  const { projectId, type, typeId } = useParams()
  const [formValues, setFormValues] = useState({
    comment: '',
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newComment = {
      content: formValues.comment,
    }

    try {
      const createdComment = await apiService.createComment(
        projectId,
        type,
        typeId,
        newComment
      )

      setComments([...comments, createdComment])
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div>
        {comments.map((comment) => (
          <div key={comment._id}>
            <p className="mb-1"> {comment.content} </p>
            <p className="ml-3 font-weight-bold">
              {' '}
              - {comment.user.username}{' '}
              <span className="font-italic font-weight-normal">
                - <Moment fromNow>{comment.created}</Moment>
              </span>{' '}
            </p>
          </div>
        ))}
      </div>
      <div>
        <MDBContainer className=" d-flex flex-column justify-content-center align-content-center">
          <MDBRow>
            <MDBCol md="8">
              <MDBCard>
                <MDBCardBody className="mx-1 mt-1">
                  <form onSubmit={handleSubmit}>
                    <MDBInput
                      value={formValues.description}
                      onChange={handleChange}
                      id="comment"
                      label="Comment"
                      group
                      type="textarea"
                      validate
                      outline
                      required
                    />

                    <div className="text-center mb-2 mt-3">
                      <MDBBtn
                        color="danger"
                        type="submit"
                        className="btn-block z-depth-2"
                      >
                        Submit
                      </MDBBtn>
                    </div>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </>
  )
}

export default Comments
