<template>
  <div>
    <div>
      <textarea id="result" rows="20"></textarea>
    </div>
    <div>
      <button @click=mok_popup>본인확인 시작(팝업)</button>
    </div>
    <!-- <div> -->
    <!-- <button @click=mok_move>본인확인 시작(이동)</button> -->
    <!-- </div> -->
  </div>
</template>
<script>
export default {
  name: 'App',
  mounted() {
    let scriptTag = document.createElement('script');
    //운영서버
    // scriptTag.setAttribute('src', 'https://cert-dir.mobile-ok.com/resources/js/index.js')
    //개발서버
    scriptTag.setAttribute('src', 'https://scert.mobile-ok.com/resources/js/index.js');

    document.head.appendChild(scriptTag);

    const callBackScript = document.createElement('script');
    callBackScript.innerText =
      "function result(result) {" +
      "try {" +
      "result = JSON.parse(result);" +
      "document.querySelector('#result').value = JSON.stringify(result, null, 4);" +
      "} catch (error) {" +
      "document.querySelector('#result').value = result;" +
      "}" +
      "}"
    ;

    document.head.appendChild(callBackScript);
  },

  methods: {
    /* PC | 모바일 스크립트 인식 구분 */
    /* PC 스크립트 사용시 mok_vue_server(5.1 주석해제) */
    mok_popup() {
      window.MOBILEOK.process("https://이용기관 본인확인-표준창 인증요청 처리 (Node.js)URL/mok/mok_std_request", "WB", "result");
    }
    /* 모바일 스크립트 사용시 mok_vue_server(5.2 주석해제) */
    // mok_move 사용시 mok_vue_server(5.2-1 pathname 수정 후 사용)
    // , mok_move() {
    // 모바일 전용서비스로 페이지 이동처리 또는 카카오 브라우져 등 새창으로 처리가 어려운 환경 또는 브라우져에서 처리
    // window.MOBILEOK.process("https://이용기관 본인확인-표준창 인증요청 처리 (Vue)URL/mok/mok_std_request", "WB", "");
    // }
  }
}
</script>
