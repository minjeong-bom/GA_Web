function calculateDDay(targetDate) {
  // 현재 날짜와 목표 날짜를 Date 객체로 생성
  const now = new Date();
  const target = new Date(targetDate);

  // 두 날짜의 차이를 밀리초 단위로 계산
  const difference = target - now;

  // 차이를 일 단위로 변환 (밀리초 -> 초 -> 분 -> 시간 -> 일)
  const days = Math.ceil(difference / (1000 * 60 * 60 * 24));

  // 올바른 변수를 반환합니다
  return `D-${days}`;
}

export default {
  calculateDDay
};
