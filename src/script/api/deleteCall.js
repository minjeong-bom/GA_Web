import axios from 'axios';

export async function itemDelete(itemKey) {
  try {
    let config = {
      baseURL: 'https://combom.dev.go-sprint.co.kr/',
      method: 'post',
      url: '/api/crud/delete',
      data: {
        columns_opts: {
          data_key: itemKey,
        }
      },
      headers: {
        'SPRINT-API-KEY': 'sprinttest'
      }
    }
    await axios(config);
    return true
  } catch (e) {
    console.error('삭제 실패', e);
    return false
  }
}
