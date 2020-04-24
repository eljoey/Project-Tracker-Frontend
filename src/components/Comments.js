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
  MDBCloseIcon,
} from 'mdbreact'
import Moment from 'react-moment'

// TODO: Page comments (10per page)
// TODO: Add Admin being able to delete comments

const Comments = ({ comments, setComments, user }) => {
  const { projectId, type, typeId } = useParams()
  const [formValues, setFormValues] = useState({
    comment: '',
  })
  const [toggledBTNS, setToggledBTNS] = useState({
    old: false,
    new: true,
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newComment = {
      content: formValues.comment,
    }

    setFormValues({
      comment: '',
    })

    try {
      const createdComment = await apiService.createComment(
        projectId,
        type,
        typeId,
        newComment
      )

      // Adds comment to begining or end depending on sort order
      if (toggledBTNS.old) {
        setComments([...comments, createdComment])
      } else {
        setComments([createdComment, ...comments])
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleSort = (order) => {
    let sortedComments

    if (order === 'new') {
      // toggle button as active
      setToggledBTNS({
        old: false,
        new: true,
      })
      // sort by newest first
      sortedComments = comments.sort((a, b) => {
        const dateA = new Date(a.created)
        const dateB = new Date(b.created)

        return dateB - dateA
      })
    } else {
      // toggle button as active
      setToggledBTNS({
        old: true,
        new: false,
      })
      // sort by oldest first
      sortedComments = comments.sort((a, b) => {
        const dateA = new Date(a.created)
        const dateB = new Date(b.created)

        return dateA - dateB
      })
    }

    setComments(sortedComments)
  }

  const renderSortBTNS = () => {
    if (toggledBTNS.new) {
      return (
        <>
          <MDBBtn
            active
            type="button"
            className="btn  btn-sm"
            onClick={() => handleSort('new')}
          >
            New
          </MDBBtn>{' '}
          <MDBBtn
            type="button"
            className="btn btn-sm "
            onClick={() => handleSort('old')}
          >
            Old
          </MDBBtn>
        </>
      )
    } else {
      return (
        <>
          <MDBBtn
            type="button"
            className="btn  btn-sm"
            onClick={() => handleSort('new')}
          >
            New
          </MDBBtn>{' '}
          <MDBBtn
            active
            type="button"
            className="btn btn-sm "
            onClick={() => handleSort('old')}
          >
            Old
          </MDBBtn>
        </>
      )
    }
  }

  const renderDeleteCommentIcon = (comment) => {
    if (comment.user.username === user.username) {
      return (
        <MDBCloseIcon
          className="m-2"
          onClick={() => handleCommentDelete(comment._id)}
        />
      )
    }
  }

  const handleCommentDelete = async (id) => {
    const deletedComment = await apiService.deleteComment(
      projectId,
      type,
      typeId,
      id
    )
    console.log(deletedComment)

    const updatedComments = comments.filter((comment) => comment._id !== id)

    setComments(updatedComments)
  }

  return (
    <>
      <div>
        <MDBContainer className="d-flex flex-column justify-content-center align-content-center">
          <MDBRow>
            <MDBCol md="8">
              <MDBCard>
                <MDBCardBody className="mx-1 mt-1">
                  <form onSubmit={handleSubmit}>
                    <MDBInput
                      value={formValues.comment}
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
      <div>
        <h6>Comments</h6> <span>Sort By {renderSortBTNS()}</span>
      </div>
      <div>
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="border border-dark #eeeeee grey lighten-2 rounded-mb-5 m-3"
          >
            {renderDeleteCommentIcon(comment)}
            <p className="m-1"> {comment.content} </p>
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
    </>
  )
}

export default Comments
