const express = require('express');
const session = require('express-session');
const axios = require("axios");
const bodyParser = require('body-parser');
const urlencode = require('urlencode');
const cors = require('cors');
const url = require('url');

/* 암호화 라이브러리 mok_Key_Manager */
let mobileOK;
try {
  mobileOK= require("./mok_Key_Manager_v1.0.2.js");
} catch (error)  {
  console.log('mok_Key_Manager 파일의 경로가 올바르지 않습니다.');
}

/* 1. express 서버 설정 */
const app = express();

/* 포트(port) 설정 */
const port = 5000 ;

/* CORS 설정 */
/* 모든 URL에 대한 CORS 허용 */
app.use(cors());

/* 특정 URL에 대한 CORS 허용 */
let corsOptions = {
  origin: 'https://이용기관 본인확인-표준창 인증요청 처리 (Vue)URL',
  credentials: true
}
app.use(cors(corsOptions));

/* 루트(root)패키지의 정적파일을 읽기위한 설정 */
app.use(express.static('./'));

/* Content-type : plain-text 설정 */
app.use(bodyParser.text());

/* request-body 데이터 urlencode 설정 */
app.use(bodyParser.urlencoded({ extended: true }));

/* 본인확인 Node.js 서버 실행 */
app.listen(port, () => {
  console.log(`App listening at Port : ${port}`);
});

/* 2. 본인확인 인증결과 경로설정 */
/* 2-1 본인확인 인증결과 MOKResult API 요청 URL */
const MOK_RESULT_REQUEST_URL = 'https://scert.mobile-ok.com/gui/service/v1/result/request';  // 개발
// const MOK_RESULT_REQUEST_URL = 'https://cert.mobile-ok.com/gui/service/v1/result/request';  // 운영

/* 2-1 본인확인 Node.js서버 매핑 URL */
const requestUri = 'https://본인확인 요청 URL/mok/mok_std_request';  // mok 인증 요청 URI
const resultUri = 'https://본인확인 요청 URL/mok/mok_std_result';  // mok 결과 요청 URI

/* 2-3 결과 수신 후 전달 URL 설정 - "https://" 포함한 URL 입력 */
const resultUrl = 'https://이용기관 본인확인-표준창 요청 (Node.js)URL/mok/mok_std_result';

/* 3. 본인확인 서비스 API 설정 */
/* 3-1 키파일 경로(본인확인 키정보파일 Path)설정 */
/* 키파일은 반드시 서버의 안전한 로컬경로에 별도 저장. 웹URL 경로에 파일이 있을경우 키파일이 외부에 노출될 수 있음 주의 */
const keyPath = '/auth/mok_keyInfo.dat';
/* 3-2 키파일 비밀번호(본인확인 키파일 패스워드)설정 */
const password = 'site0078!';
mobileOK.keyInit(keyPath, password);

// 이용기관 거래ID생성시 이용기관별 유일성 보장을 위해 설정, 이용기관식별자는 이용기관코드 영문자로 반드시 수정
const clientPrefix = "TESTBB"     // 8자이내 권고 (예) MOK, TESTCOKR

/* 본인확인 표준창 인증요청 함수 예제 */
app.post(requestUri, (req, res) => {
  /* 1. 본인확인-표준창 거래요청정보 생성  */

  /* 1.1 이용기관 거래ID 생성, 20자 이상 40자 이내 이용기관 고유 트랜잭션ID (예시) 이용기관식별자+UUID, ...  */
  // - 본인확인-표준창 거래ID 는 유일한 값이어야 하며 기 사용한 거래ID가 있는 경우 오류 발생
  // - 이용기관이 고유식별 ID로 유일성을 보장할 경우 고객이 이용하는 ID사용 가능
  let sampleClientTxId = clientPrefix + uuid();

  /* 1.2 인증 결과 검증을 위한 거래 ID 세션 저장 (권고) */
  // 동일한 세션내 요청과 결과가 동일한지 확인 및 인증결과 재사용 방지처리, "MOKResult" 응답결과 처리시 필수 구현
  // 별도의 세션서버등을 통해 sampleClientTxId 값 보관

  /* 1.3 본인확인-표준창 거래요청정보 생성  */
  const clientTxId = sampleClientTxId + "|" + getCurrentDate();

  /* 1.4 본인확인-표준창 거래요청정보 암호화 */
  const encClientTxId = mobileOK.RSAEncrypt(clientTxId);

  /* 1.5 본인확인-표준창 거래요청정보 설정 */
  const authRequestObject = {
    /* 본인확인 서비스 용도 */
    /* 01001 : 회원가입, 01002 : 정보변경, 01003 : ID찾기, 01004 : 비밀번호찾기, 01005 : 본인확인용, 01006 : 성인인증, 01007 : 상품구매/결제, 01999 : 기타 */
    'usageCode' : '01001'
    /* 본인확인 서비스 ID */
    , 'serviceId' : mobileOK.getServiceId()
    /* 암호화된 본인확인 거래 요청 정보 */
    , 'encryptReqClientInfo' : encClientTxId
    /* 이용상품 코드 */
    /* 이용상품 코드, telcoAuth : 휴대폰본인확인 (SMS인증시 인증번호 발송 방식 "SMS")*/
    /* 이용상품 코드, telcoAuth-LMS : 휴대폰본인확인 (SMS인증시 인증번호 발송 방식 "LMS")*/
    , 'serviceType' : 'telcoAuth'
    /* 본인확인 결과 타입 */
    /* 본인확인 결과 타입, "MOKToken"  : 개인정보 응답결과를 이용기관 서버에서 본인확인 서버에 요청하여 수신 후 처리 */
    /* 본인확인 결과 타입, "MOKResult" : 개인정보 응답결과를 이용자 브라우져로 수신 후 처리 (이용시 반드시 재사용 방지처리 개발) */
    , 'retTransferType' : 'MOKToken'
    // , 'retTransferType' : 'MOKResult'
    /* 본인확인 결과 수신 URL */
    , 'returnUrl' : resultUrl
  };

  /* 1.6 거래 요청 정보 JSON 반환 */
  res.send(JSON.stringify(authRequestObject));
})

/* 본인확인 표준창 인증결과 함수 예제 */
app.post(resultUri, async (req, res) => {
  /* 1. 본인확인 결과 타입 설정 */
  const resultRequestString = req.body;
  const resultRequestJson = urlencode.decode(resultRequestString.data);
  const resultRequestObject = JSON.parse(resultRequestJson);

  /* 2. 본인확인 결과 타입별 결과 요청 */
  let encryptMOKResult;
  if (resultRequestObject.encryptMOKKeyToken != null) {
    /* 2.1 본인확인 결과 타입 : MOKToken */
    /* 2.1.1 본인확인 결과요청 입력정보 설정 */
    const authResultRequestObject = { encryptMOKKeyToken : resultRequestObject.encryptMOKKeyToken };
    /* 2.1.2 본인확인 결과요청 */
    const resultResponseObject = await sendPost(MOK_RESULT_REQUEST_URL, authResultRequestObject);
    try {
      if (typeof resultResponseObject == 'undefined') {
        throw MOKException;
      }
    } catch(MOKException) {
      return res.send('-0|본인확인 서버통신(결과요청)에 실패했습니다.');
    }
    encryptMOKResult = resultResponseObject.encryptMOKResult;

    /* 2.1.3 본인확인 결과요청 실패시 */
    if (resultResponseObject.resultCode != '2000') {
      console.log('본인확인 결과요청에 실패했습니다.');
      return res.send(resultResponseObject.resultCode + ', ' + resultResponseObject.resultMsg);
    }
  } else if (resultRequestObject.encryptMOKResult != null) {
    /* 2.2 본인확인 결과 타입 : MOKResult */
    encryptMOKResult = resultRequestObject.encryptMOKResult
  } else {
    return res.send('-1|본인확인 MOKToken 인증결과 응답이 없습니다.');
  }

  // 'encryptMOKResult'가 없을 경우
  try {
    if (encryptMOKResult == null || encryptMOKResult == '' || typeof encryptMOKResult == undefined) {
      throw MOKException;
    }
  } catch (MOKException) {
    return res.send('-2|본인확인 MOKResult 값이 없습니다.');
  }

  // encryptMOKResult 복호화가 실패하는 경우
  let decryptMOKResultJson = null;
  try {
    decryptMOKResultJson = mobileOK.getResult(encryptMOKResult);
  } catch(error) {
    return res.send('-3|본인확인 결과 복호화 오류');
  }

  /* 3. 본인확인 결과정보 변환 */
  /* 3-1 본인확인 결과정보 복호화 */
  const decryptMOKResultObject = JSON.parse(decryptMOKResultJson);

  /* 3-2 본인확인 결과정보 설정 */
  /* 사용자 이름 */
  let userName = '';
  if (decryptMOKResultObject.hasOwnProperty("userName")) {
    userName = decryptMOKResultObject.userName;
  }
  /* 이용기관 ID */
  let siteID = '';
  if (decryptMOKResultObject.hasOwnProperty("siteID")) {
    siteID = decryptMOKResultObject.siteID;
  }
  /* 이용기관 거래 ID */
  let clientTxId = '';
  if (decryptMOKResultObject.hasOwnProperty("clientTxId")) {
    clientTxId = decryptMOKResultObject.clientTxId;
  }
  /* 본인확인 거래 ID */
  let txId = '';
  if (decryptMOKResultObject.hasOwnProperty("txId")) {
    txId = decryptMOKResultObject.txId;
  }
  /* 서비스제공자(인증사업자) ID */
  let providerId = '';
  if (decryptMOKResultObject.hasOwnProperty("providerId")) {
    providerId = decryptMOKResultObject.providerId;
  }
  /* 이용 서비스 유형 */
  let serviceType = '';
  if (decryptMOKResultObject.hasOwnProperty("serviceType")) {
    serviceType = decryptMOKResultObject.serviceType;
  }
  /* 사용자 CI */
  let ci = '';
  if (decryptMOKResultObject.hasOwnProperty("ci")) {
    ci = decryptMOKResultObject.ci;
  }
  /* 사용자 DI */
  let di = '';
  if (decryptMOKResultObject.hasOwnProperty("di")) {
    di = decryptMOKResultObject.di;
  }
  /* 사용자 전화번호 */
  let userPhone = '';
  if (decryptMOKResultObject.hasOwnProperty("userPhone")) {
    userPhone = decryptMOKResultObject.userPhone;
  }
  /* 사용자 생년월일 */
  let userBirthday = '';
  if (decryptMOKResultObject.hasOwnProperty("userBirthday")) {
    userBirthday = decryptMOKResultObject.userBirthday;
  }
  /* 사용자 성별 (1: 남자, 2: 여자) */
  let userGender = '';
  if (decryptMOKResultObject.hasOwnProperty("userGender")) {
    userGender = decryptMOKResultObject.userGender;
  }
  /* 사용자 국적 (0: 내국인, 1: 외국인) */
  let userNation = '';
  if (decryptMOKResultObject.hasOwnProperty("userNation")) {
    userNation = decryptMOKResultObject.userNation;
  }
  /* 본인확인 인증 종류 */
  const reqAuthType = decryptMOKResultObject.reqAuthType;
  /* 본인확인 요청 시간 */
  const reqDate = decryptMOKResultObject.reqDate;
  /* 본인확인 인증 서버 */
  const issuer = decryptMOKResultObject.issuer;
  /* 본인확인 인증 시간 */
  const issueDate = decryptMOKResultObject.issueDate;

  /* 4. 세션 내 요청 clientTxId 와 수신한 clientTxId 가 동일한지 비교(권고) */

  /* 5. 이용기관 서비스 기능 처리 */
  // - 이용기관에서 수신한 개인정보 검증 확인 처리
  // - 이용기관에서 수신한 CI 확인 처리

  /* 6. 본인확인 결과 응답 */
  let data = {
    'errorCode' : '2000'
    , 'resultMsg' : '성공'
    , 'data' : userName
  };

  /* 6. 본인확인 결과 응답 방식 */
  /* 6.1 : 팝업창(Pop-Up) : callback 유 */
  /* 6.1-1 팝업창(Pop-Up) 결과반환 */
  res.send(data);

  /* 6.2 : 페이지 이동(Redirect) : callback 무 */
  /* 6.2-1 이동페이지(Redirect Page) 설정 */
  // res.redirect(url.format({
  //     pathname:"https://이용기관 본인확인-표준창 인증요청 처리 (Vue)URL/redirect",
  //     query: {
  //        "data": JSON.stringify(data),
  //      }
  //   }));
});

/* 거래 ID(uuid) 생성 예제 함수 */
function uuid() {
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);

    return v.toString(16);
  });
}

/* 본인확인 거래 ID(요청 시간) 생성 예제 함수 */
function getCurrentDate() {
  let newDate = new Date();
  newDate.toLocaleString('ko-kr');

  let year = newDate.getFullYear();
  let mon = newDate.getMonth() + 1;
  let date = newDate.getDate();

  let hour = newDate.getHours();
  let min = newDate.getMinutes();
  let sec = newDate.getSeconds();

  mon = mon < 10 ? `0${mon}` : `${mon}`;
  date = date < 10 ? `0${date}` : `${date}`;
  hour = hour < 10 ? `0${hour}` : `${hour}`;
  min = min < 10 ? `0${min}` : `${min}`;
  sec = sec < 10 ? `0${sec}` : `${sec}`;

  const reqDate = year + mon + date + hour + min + sec;

  return reqDate;
}

/* 본인확인 서버 통신 예제 함수 */
async function sendPost(targetUrl, encryptMOKKeyToken) {
  try {
    let responseData = await axios ({
      method : 'post',
      url : targetUrl,
      data : encryptMOKKeyToken
    });

    return responseData.data;
  } catch (AxiosError) {
    console.log('본인확인 서버 통신URL이 잘 못 되었습니다.');
  }
}
