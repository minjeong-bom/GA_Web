import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: 'https://combom.dev.go-sprint.co.kr/',
})

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }


// createArticle() {
//   this.$api.post('/api/crud/create',
//     {
//       "data_prefix": "testing",
//       "data_status": "on",
//       "custom_data1": "hello",
//       "custom_data2": "world"
//     },
//     {
//       headers: {
//         'SPRINT-API-KEY': 'sprinttest',
//         'Content-Type': 'application/json', // JSON 형식의 본문을 보내는 경우에 필요,
//       }
//     }
//   );
// },
// getItem() {
//   this.$api.get(`/api/crud/single/OBLCCSLU`, {
//     params: {
//       'alias': 'mem',
//     },
//     headers: {
//       'SPRINT-API-KEY': 'sprinttest',
//     },
//   })
//     .then(response => {
//       // 성공적인 응답 처리
//       console.log(response.data);
//     })
//     .catch(error => {
//       // 에러 처리
//       console.error(error);
//     });
//
// },
