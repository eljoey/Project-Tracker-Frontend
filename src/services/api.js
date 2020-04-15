import axios from 'axios'

const baseUrl = 'https://lit-bayou-93209.herokuapp.com/api'

let token = null
let header = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
  setAuthHeader(token)
}

const setAuthHeader = (info) => {
  header = {
    headers: {
      Authorization: info,
    },
  }
}

// User
const getUserInfo = async () => {
  const userInfo = await axios.get(`${baseUrl}/user`, header)

  return userInfo.data
}

// Project

const getProjects = async () => {
  const projects = await axios.get(`${baseUrl}/projects`, header)

  return projects.data
}

const getProjectId = async (id) => {
  const project = await axios.get(`${baseUrl}/project/${id}`, header)

  return project.data
}

const createProject = async (project) => {
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

const deleteProject = async (id) => {
  const deletedProject = await axios.post(
    `${baseUrl}/project/${id}/delete`,
    header
  )

  return deletedProject.data
}

// Feature OR Bug

const getType = async (projId, type) => {
  const typeInfo = await axios.get(
    `${baseUrl}/project/${projId}/${type}s`,
    header
  )

  return typeInfo.data
}

const getTypeById = async (projId, type, typeId) => {
  const typeInfo = await axios.get(
    `${baseUrl}/project/${projId}/${type}/${typeId}`,
    header
  )

  return typeInfo.data
}

const createType = async (projId, type, feature) => {
  const createdType = await axios.post(
    `${baseUrl}/project/${projId}/${type}/create`,
    feature,
    header
  )

  return createdType.data
}

const updateType = async (projId, type, typeId, feature) => {
  const updatedType = await axios.post(
    `${baseUrl}/project/${projId}/${type}/${typeId}/update`,
    feature,
    header
  )

  return updatedType.data
}

const deleteType = async (projId, type, typeId) => {
  const deletedFeature = await axios.post(
    `${baseUrl}/project/${projId}/${type}/${typeId}/delete`,
    header
  )

  return deletedFeature.data
}

// Comments

const getComments = async (projId, type, typeId) => {
  const comments = await axios.get(
    `${baseUrl}/project/${projId}/${type}s/${typeId}/comments`,
    header
  )

  return comments.data
}

const createComment = async (projId, type, typeId, comment) => {
  const createdComment = await axios.post(
    `${baseUrl}/project/${projId}/${type}s/${typeId}/comment/create`,
    comment,
    header
  )

  return createdComment.data
}

const updateComment = async (projId, type, typeId, comment) => {
  const updatedComment = await axios.post(
    `${baseUrl}/project/${projId}/${type}s/${typeId}/comment/update`,
    comment,
    header
  )

  return updatedComment.data
}

const deleteComment = async (projId, type, typeId, commentId) => {
  const deletedComment = await axios.post(
    `${baseUrl}/project/${projId}/${type}s/${typeId}/comment/${commentId}/delete`,
    header
  )

  return deletedComment.data
}

export default {
  getUserInfo,
  setToken,
  getProjects,
  getProjectId,
  createProject,
  editProject,
  deleteProject,
  getType,
  getTypeById,
  createType,
  updateType,
  deleteType,
  getComments,
  createComment,
  updateComment,
  deleteComment,
}
