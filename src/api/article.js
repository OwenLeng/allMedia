/**
 * 文章相关请求模块
 */

import request from '@/utils/request'
import { version } from 'less'

/**
 * 获取文章列表
 */
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    // Body 参数使用 data 设置
    // Query 参数使用 params 设置
    // Headers 参数使用 headers 设置
    params
  })
}

/**
 * 获取文章频道
 */
export const getArticleChannels = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}

/**
 * 删除文章
 */
export const getArticlesReal = params => {
  return request({
    method: 'GET',
    // url: '/mp/v1_0/articles',
    url: 'http://10.201.186.249:8081/search/status',
    // Body 参数使用 data 设置
    // Query 参数使用 params 设置
    // Headers 参数使用 headers 设置
    params
  })
}
export const deleteArticle = articleId => {
  return request({
    method: 'get',
    // 接口文档中的写的路径参数需要在 url 中传递
    // 凡是看见接口路径中有的 :xxx 格式的字段，则需要传递路径参数
    url: 'http://10.201.186.249:8081/delete/deleted_by_Id_version',
    params:{
      article_id:articleId,
      article_version:1
    }
  })
}

/**
 * 新建文章
 */
export const addArticle = (data, draft = false) => {
  return request({
    method: 'POST',
    url: 'http://10.201.186.249:8081/article/addArticle',
    // params: {
    //   data: data,
    //   draft: draft
    // },
    data: {
      // data:{
      //   data: data ,
      //   draft: draft 
      // }
      data: data
    }
  })
}

/**
 * 编辑文章
 */
export const updateArticle = (articleId, data, draft = false) => {
  return request({
    method: 'post',
    url: `http://10.201.186.249:8081/article/updateArticle`,
    // params: {
    //   draft // 是否存为草稿（true 为草稿）
    // },
    data
  })
}

/**
 * 获取指定文章
 */
export const getArticle = articleId => {
  return request({
    method: 'GET',
    url: `http://10.201.186.249:8081/search/return_by_id_version/`,
    params:{
      article_id: articleId,
      article_version:1
    }
  })
}
export const checkArticle = (article_id, status) =>{
  return request({
    method: "GET",
    url:'http://10.201.186.249:8081/article_pass',
    params:{
      article_id: article_id,
      status: status
    }
  })
}
// 查询文章评论
export const getComments = params => {
  return request({
    method: 'POST',
    // url: '/mp/v1_0/articles', 
    url: 'http://10.201.186.249:8081/comment/showUserAll',
    // Body 参数使用 data 设置
    // Query 参数使用 params 设置
    // Headers 参数使用 headers 设置
    params
  })
}


/**
 * 修改文章评论状态
 */
export const updateCommentStatus = (articleId, allowComment) => {
  return request({
    method: 'PUT',
    url: '/mp/v1_0/comments/status',
    params: {
      // 对象的属性名不受代码规范限制
      article_id: articleId
    },
    data: {
      allow_comment: allowComment
    }
  })
}
