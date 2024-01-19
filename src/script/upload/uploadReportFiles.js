import axios from 'axios';

// 파일 업로드를 처리하는 함수
export async function uploadFile(selectedFile, data_title, data_writer_name, data_foreign_key) {
  try {
    const imageData = await readFileAsDataURL(selectedFile);

    const config = {
      baseURL: 'https://combom.dev.go-sprint.co.kr/',
      url: '/api/crud/create',
      method: 'post',
      data: {
        data_prefix: 'bc',
        data_title: data_title,
        data_foreign_key: data_foreign_key,
        data_foreign_key2: 'UZPWQOWR',
        data_content: imageData,
        data_writer_name: data_writer_name
      },
      headers: {
        'SPRINT-API-KEY': 'sprintcombom',
      }
    };

    const response = await axios(config); // 서버로 POST 요청 보내고 응답을 받음
    console.log('Upload successful', response.data);

    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error('Error uploading file - server error', error);
    throw error; // 에러 처리를 위해 에러 다시 던지기
  }
}

// 파일을 읽어서 Data URL로 변환하는 함수
function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result.split(',')[1]);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
