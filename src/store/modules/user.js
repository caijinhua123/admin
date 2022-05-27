// import { login, logout, getInfo } from '@/api/user'
import {login,whoami} from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    user:{}
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
    console.log(state.token);
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USER: (state, user) => {
    state.user = user
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password,captcha,remember } = userInfo
    // console.log(userInfo);
    return new Promise((resolve, reject) => {
      login({ loginId: username.trim(), loginPwd: password,captcha:captcha,remember:remember }).then(response => {
        const { data } = response
        try{
          commit('SET_USER', data)
          resolve(response)
        }catch{
          reject(response) 
        }
        
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      whoami().then(response => {
        const { data } = response
        if (!response.data) {
          return reject('请重新登录')
        }
        commit('SET_USER', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
        removeToken() // must remove  token  first
        resetRouter()
        //清空状态
        commit('RESET_STATE')
        resolve()
      // logout(state.token).then(() => {
      //   removeToken() // must remove  token  first
      //   resetRouter()
      //   commit('RESET_STATE')
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
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

