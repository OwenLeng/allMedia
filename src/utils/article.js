/**
 * 文章相关请求模块
 */
import request from './request'

 
 

/**
 * 获取所有的文章
 */
export const getNumbsArticle = () => {
  return request({
    method: 'GET',
    responseType:"json",
    // url:  `http://223.3.83.20/ArticleServlet`
    url: `http://223.3.70.34:8080/search/return_finish_status`
  })
}


/**
 * 获取指定文章的ID
 */

export const getArticleByID = (article_id,article_version) => {
  return request({
    method: 'GET',
    headers: {
      // 'Content-type': 'application/json;charset=UTF-8'
    },
    url: `http://223.3.70.34:8080/article/returnArticle`, 
    params : {
        article_id: article_id, 
        article_version:article_version
    }
  })
}


/**
 * 获取一定数量的推荐文章
 */
export const getRecommendArticles = (objectID,currentPage,numOfItem) => {
  return request({
    // transformRequest: [function(data) {
    //   data = JSON.stringify(data)
    //   return data
    // }],
    method: 'GET',
    headers: {
      
    },
    // responseType:"json",
    url: `http://223.3.70.34:8000/recommendations/article/relevant`,
    // url: `http://223.3.83.20/ArticleServlet`,
    params:{
      objectID:objectID,
      // article_id :'14',
      currentPage:currentPage,
      numOfItem:numOfItem
    }
  })
}

/**
 * 查询文章
 */
export const searchArticles = (content,current_page,item) => { 
  return request({ 
      method: 'GET', 
      url: `http://223.3.70.34:8080/article/`,  
      headers: {
        'Content-type': 'application/json;charset=UTF-8'
      },
      params :{
        content:content, 
        current_page:current_page,
        item:item
    }
  })
}

export const addComment = (article_id,author_id,content,type) => {
  return request({
    method: 'POST',
    headers: {
      // 'Content-type': 'application/json;charset=UTF-8'
    },
    url: `http://223.3.70.34:8080/comment/addComment`, 
    params :{
      article_id: article_id,
      author_id: author_id,
      content: content,
      type: type
  }
  })
}
 

export const showAll = (article_id) => { 
  return request({ 
      method: 'POST', 
      url: `http://223.3.70.34:8080/comment/showAll`,  
      headers: {
        'Content-type': 'application/json;charset=UTF-8'
      },
      params :{
        article_id: article_id, 
    }
  })
}


   
