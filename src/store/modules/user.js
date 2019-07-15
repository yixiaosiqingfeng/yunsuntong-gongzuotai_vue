import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, getRoles, removeRoles } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { decrypt, encryption } from '@/utils/crypto'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      console.log(encryption(password), 78878)
      login({ data: { username: username.trim(), password: encryption(password) }, code: '3008' }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data)
        setToken(data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { menus, name, avatar, introduction } = data

        // roles must be a non-empty array
        if (!menus || menus.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        let rolesArr = null
        if (menus.length > 1) {
          rolesArr = ['admin']
          commit('SET_ROLES', ['admin'])
        } else if (menus.includes('hoster')) {
          rolesArr = ['hoster']
          commit('SET_ROLES', ['hoster'])
        } else if (menus.includes('editor')) {
          rolesArr = ['editor']
          commit('SET_ROLES', ['editor'])
        }
        resolve(rolesArr)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updataRoles({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_ROLES', [])
      resolve()
    })
  },
  addRoles({ commit, state }, roles) {
    return new Promise((resolve, reject) => {
      commit('SET_ROLES', JSON.parse(decrypt(getRoles())))
      resolve()
    })
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        removeRoles()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
