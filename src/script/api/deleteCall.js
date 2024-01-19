import axios from 'axios';

export async function itemDelete(itemKey) {
  try {
    console.log(itemKey)
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
        'SPRINT-API-KEY': 'sprintcombom'
      }
    }
    await axios(config);
    return true
  } catch (e) {
    return false
  }
}
