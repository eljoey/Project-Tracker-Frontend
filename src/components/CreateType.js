import React, { useState } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
} from 'mdbreact'
import apiService from '../services/api'

const CreateType = ({ setMessage }) => {
  const history = useHistory()
  const { projectId, type } = useParams()
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newType = {
      name: formValues.name,
      description: formValues.description,
    }

    try {
      // TODO: Validation!!!!

      await apiService.createType(projectId, type, newType)

      // Capitalize first letter cuz it be like that sometimes ya kno?
      const capitolizedType = type.charAt(0).toUpperCase() + type.slice(1)
      setMessage(`${capitolizedType} Created: ${newType.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      history.push(`/project/${projectId}`)
    } catch (err) {
      setMessage(err.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 10000)
    }
  }

  return (
    <MDBContainer className=" d-flex flex-column justify-content-center align-content-center">
      <MDBRow>
        <MDBCol md="8">
          <MDBCard>
            <div className="header pt-3 grey lighten-2">
              <MDBRow className="d-flex justify-content-start">
                <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                  Create {type}
                </h3>
              </MDBRow>
            </div>
            <MDBCardBody className="mx-4 mt-4">
              <form onSubmit={handleSubmit}>
                <MDBInput
                  value={formValues.name}
                  onChange={handleChange}
                  id="name"
                  label="Name"
                  group
                  type="text"
                  validate
                  outline
                  required
                />
                <MDBInput
                  value={formValues.description}
                  onChange={handleChange}
                  id="description"
                  label="Description"
                  group
                  type="textarea"
                  validate
                  outline
                  required
                />

                <div className="text-center mb-4 mt-5">
                  <MDBBtn
                    color="danger"
                    type="submit"
                    className="btn-block z-depth-2"
                  >
                    Submit
                  </MDBBtn>
                </div>
              </form>

              <div>
                <p className="font-small grey-text d-flex justify-content-center">
                  Change your mind?
                  <Link
                    to={`/project/${projectId}`}
                    className="dark-grey-text font-weight-bold ml-1"
                  >
                    Go Back
                  </Link>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default CreateType
