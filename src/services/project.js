import axios from 'axios'

const baseUrl = 'https://lit-bayou-93209.herokuapp.com/api'

let token = null
let header = null

const setToken = newToken => {
  token = `bearer ${newToken}`
  setAuthHeader(token)
}

const setAuthHeader = info => {
  header = {
    headers: {
      Authorization: info
    }
  }
}

const getProjects = async () => {
  const projects = await axios.get(`${baseUrl}/projects`, header)

  return projects.data
}

const getProjectId = async id => {
  const project = await axios.get(`${baseUrl}/project/${id}`, header)

  return project.data
}

const createProject = async project => {
  const newProject = await axios.post(
    `${baseUrl}/project/create`,
    project,
    header
  )

  return newProject.data
}

const editProject = async (id, project) => {
  const updatedProject = await axios.post(
    `${baseUrl}/project/${id}/update`,
    project,
    header
  )

  return updatedProject.data
}

const deleteProject = async id => {
  const deletedProject = await axios.post(
    `${baseUrl}/project/${id}/delete`,
    header
  )

  return deletedProject.data
}

export default {
  setToken,
  getProjects,
  getProjectId,
  createProject,
  editProject,
  deleteProject
}
