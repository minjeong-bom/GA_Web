function formatToBasicDate(inputDateString) {
  // 입력 문자열로부터 Date 객체 생성
  console.log('ddd')
  const date = new Date(inputDateString);

  // yyyy.dd.mm 포맷으로 변환
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth()는 0부터 시작하므로 1을 더해줌
  const day = String(date.getDate()).padStart(2, '0');

  // 변환된 포맷 반환
  return `${year}.${month}.${day}`;
}

export default {
  formatToBasicDate
};
