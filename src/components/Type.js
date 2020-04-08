import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BackBTN from './utils/BackBTN'
import apiService from '../services/api'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
} from 'mdbreact'

// TODO: refactor out comment section into its own component.
// TODO: form validation on comments
// TODO: error handling on comment submit
// TODO: Edit users own comments
// TODO: Project owner delete comments
// TODO: Make Pretty

const Type = () => {
  const { projectId, type, typeId } = useParams()
  const [projectType, setProjectType] = useState([])
  const [comments, setComments] = useState([])
  const [formValues, setFormValues] = useState({
    comment: '',
  })

  useEffect(() => {
    const fetchType = async () => {
      const fetchedType = await apiService.getTypeById(projectId, type, typeId)
      const fetchedComments = await apiService.getComments(
        projectId,
        type,
        typeId
      )

      setProjectType(fetchedType)
      setComments(fetchedComments)
    }

    fetchType().catch((err) => console.log(err))
  }, [])

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
        <h5>{projectType.name}</h5>
        <p>{projectType.description}</p>
      </div>
      <div>
        {comments.map((comment) => (
          <p key={comment._id}>{comment.content}</p>
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
      <BackBTN />
    </>
  )
}

export default Type
