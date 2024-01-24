import axios from 'axios';

export async function viewCountAdd(articleKey) {
  try {
    let config = {
      baseURL: 'https://combom.dev.go-sprint.co.kr/',
      method: 'get',
      url: `/api/crud/single/${articleKey}`,
      body: {
        prefix: 'bc',
        alias: 'bc',
        scopes: 'bc_count,bc_regdate,bc_foreign_key,bc_foreign_key2,bc_writer_name,bc_key,bc_content',
      },
      headers: {
        'SPRINT-API-KEY': 'sprintcombom'
      }
    }
    const result = await axios(config);
    console.log('vieCountAddCall.js:', result);
    return true
  } catch (e) {
    return false
  }
}
