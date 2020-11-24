/**
 * 用户相关请求模块
 */
import request from '@/utils/request'

// 用户登录
// export const login = params => {
//   return request({
//     method: 'get',
//     url: 'http://223.3.70.19:8080/SEUMedia/login',
//     // headers:{
//     //   "Content-Type": 'application/x-www-form-urlencoded',
//     // },
//     // data 用来设置 POST 请求体
//     responseType: "json",
//     params
//   })
// }
export const login = data => {
  return request({
    method: 'post',
    url: 'http://10.201.186.249:8081/SEUMedia/login',
    params: {
      password: data.password,
      userStatus: data.userStatus,
      username: data.username
    }
  })
}

// 用户注册
export const regist = data => {
  // 将结果返回
  return request({
    method: 'post',
    url: 'http://10.201.186.249:8081/SEUMedia/regist',
    params: {
      email: data.email,
      password: data.password,
      phone: data.phone,
      userStatus: data.userStatus,
      username: data.username
    }
  })
}
// 获取所有自媒体信息
export const loadUserMediaInfos = () =>{
  return request({
    method: 'post',
    url: 'http://10.201.186.249:8081/SEUMedia/selectMediaUser'
  })
}
// 根据用户id删除自媒体信息
export const deleteUserById = (id) =>{
  return request({
    method:"get",
    url: 'http://10.201.186.249:8081/SEUMedia/deleteMediaUserInfo',
    params:{
      id:id
    }
  })
}
// 获取用户信息
export const getUserProfile = () => {
  // const user = JSON.parse(window.localStorage.getItem('user'))

  return request({
    method: 'GET',
    url: 'http://ttapi.research.itcast.cn/mp/v1_0/user/profile'
    // 后端要求把需要授权的用户身份放到请求头中
    // axios 可以通过 headers 选项设置请求头
    // headers: {
    //   // 属性名和值都得看接口的要求
    //   // 属性名：Authorization，接口要求的
    //   // 属性值：Bearer空格token数据
    //   // Bearer 就是持票人的意思，就好比你的学生证上写了学生证三个字
    //   Authorization: `Bearer ${user.token}`
    // }
  })
}

// 修改用户信息
// export const updateUser = () => {

// }

// 修改用户头像
// 注意：data 必须传递 FormData 对象
export const updateUserPhoto = data => {
  return request({
    method: 'post',
    url: 'http://10.201.186.249:8081/SEUMedia/updateHpById',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded'
  // },
    data
  })
}

// 修改用户基本信息
export const updateUserProfile = data => {
  return request({
    method: 'post',
    // url: 'http://10.201.186.249:8081/SEUMedia/updateById',
    url: 'http://223.3.75.9:8080/SEUMedia/updateById',
    headers:{
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

