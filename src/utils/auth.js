import Cookies from 'js-cookie'
import { encryption } from './crypto'

const TokenKey = 'Admin-Token'
const rolesKey = 'Jurisdiction'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setRoles(token) {
  return Cookies.set(rolesKey, encryption(token))
}

export function getRoles() {
  return Cookies.get(rolesKey)
}

export function removeRoles() {
  return Cookies.remove(rolesKey)
}
