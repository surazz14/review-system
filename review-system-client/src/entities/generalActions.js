import { getRequest, postRequest, putRequest, deleteRequest } from '../common/utility/serverCall'

export const setKey = (self) => (key, value) => {
  self[key] = value
  return self[key]
}

export default (self) => ({
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  setKey: setKey(self),
})
