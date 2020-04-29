import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import BackBTN from './utils/BackBTN'
import apiService from '../services/api'
import Comments from './Comments'
import { MDBBtn } from 'mdbreact'

// TODO: form validation on comments
// TODO: error handling on comment submit
// TODO: Edit users own comments
// TODO: Make Pretty

const Type = ({ user, projects }) => {
  const history = useHistory()
  const { projectId, type, typeId } = useParams()
  const [projectType, setProjectType] = useState([])
  const [currentProject, setCurrentProject] = useState({})
  const [comments, setComments] = useState([])

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
      setCurrentProject(projects.find((proj) => proj._id === projectId))
    }

    fetchType().catch((err) => console.log(err))
  }, [])

  const handleTypeDelete = async () => {
    console.log('STARTING IN DELETE')
    console.log('Type', type)
    try {
      await apiService.deleteType(projectId, type, typeId)

      console.log('DID I GET HERE?')
      history.push('/projects')
    } catch (err) {
      console.log(err)
    }
  }

  const renderDeleteBTN = () => {
    // find a way to not need this(user doesnt show up on first render so it throws an error)
    if (!user || !currentProject.admin) {
      return
    }

    if (currentProject.admin === user._id) {
      return (
        <MDBBtn
          color="danger"
          className="btn btn-sm"
          onClick={handleTypeDelete}
        >
          Delete {type}
        </MDBBtn>
      )
    }
  }

  return (
    <>
      <div>
        <h4>{projectType.name}</h4>
        <p>{projectType.description}</p>
        {renderDeleteBTN()}
      </div>
      <Comments
        comments={comments}
        setComments={setComments}
        user={user}
        currentProject={currentProject}
      />
      <BackBTN />
    </>
  )
}

export default Type
