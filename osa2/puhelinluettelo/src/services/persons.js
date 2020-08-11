import axios from 'axios'

const dbUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(dbUrl)
  return request.then(response => response.data)
}

const add = newGuy => {
    const request = axios.post(dbUrl, newGuy)
    return request.then(response => response.data)
}

const remove = id => {
  const request = axios.delete(`${dbUrl}/${id}`)
  return request.then(response => response.data)
}

const update = (id, newGuy) => {
  const request = axios.put(`${dbUrl}/${id}`, newGuy)
  return request.then(response => response.data)
}


export default { 
  getAll, add, remove, update  
}