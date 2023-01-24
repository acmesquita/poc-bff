import axios from 'axios'

export const apiCep = axios.create({
  baseURL: 'http://localhost:3001'
})

export const apiAccount = axios.create({
  baseURL: 'http://localhost:3002'
})

export const api = axios.create()
