<script>
import TitleTopBar from "components/app-bar/TitleTopBar.vue";

export default {
  name: "SER_0000",
  components: {TitleTopBar}
}
</script>

<template>
  <div>
    <title-top-bar :title-text="'서비스 소개'"></title-top-bar>
    <div class="service-intro-view">
      <p>서비스 소개</p>
      <h1 class="headline-1">안녕하세요</h1>
      <section>
        <p class="nomal-text-3">
          굿애프터눈은 중장년 분들이 자신의 일상을 계속 유지하고 즐기는 데 도움을 주는
          워킹 라이프 서포팅 서비스입니다
        </p>
      </section>
      <section>
        <img src="src/assets/graphic/intro-graphic-2.png"/>
      </section>
      <section>
        <h2 class="section-header">서비스를 만들게 된 중요한 사실</h2>
        <p class="nomal-text-3">
          NH투자증권 100세 시대 연구소에 따르면 한국과 미국은 은퇴자의 심리상태가 아래 그림처럼 차이를 보인다고 해요.

          어느쪽이 한국 은퇴자의 심리 상태일까요?
        </p>
        <img class="intro-round-img" src="src/assets/graphic/intro-graphic-1.png">
        <p class="nomal-text-3">
          정답은 ‘오른쪽’이 한국 은퇴자의 심리에요.
          미국인은 은퇴를 꿈꾼다면, 한국인은 은퇴를 두려워한다는 것을 알 수 있었어요.
        </p>
        <img src="src/assets/graphic/intro-graphic-3.png">
      </section>
      <section>
        <h2 class="section-header">중장년이 겪는 어려움</h2>
        <p class="nomal-text-3">
          저희가 먼저 한 일은 중장년이 겪는 어려움이 어떤 것인지 파악하는 것이었어요. 여러 자료와 실제 인터뷰를 통해 보고, 들은 것은 다음과 같은 부분이었어요.
        </p>
        <img class="intro-round-img animation-image-4 no-bottom-margin" src="src/assets/graphic/intro-graphic-5.png">
        <img class="intro-round-img animation-image no-bottom-margin" src="src/assets/graphic/intro-graphic-6.png">
        <img class="intro-round-img animation-image-4 no-bottom-margin" src="src/assets/graphic/intro-graphic-7.png">
        <img class="intro-round-img animation-image no-bottom-margin" src="src/assets/graphic/intro-graphic-8.png">
      </section>
      <section>
        <h2 class="section-header">이제 혼자 고민하지 마세요</h2>
        <p class="nomal-text-3">
          위와 같은 중장년분들의 어려움을 해소할 수 있도록 서비스를 구성했어요.
        </p>
        <p class="small-caption">*아래 예시 이미지는 서비스 목적에 맞게 재구성된 것으로 실제 서비스와는 다를 수 있습니다. 차근차근 준비해 더 좋은 서비스를 제공할 수 있도록
          노력하겠습니다.</p>

        <h3 class="headline-3">
        <span>
          재취업, 은퇴 등 혼자 고민 그만<sup>1</sup>
        </span>
        </h3>
        <p class="nomal-text-4">
          나의 경험담, 고민거리, 취미 등등
          자유롭게 이야기 해보세요!
        </p>
        <img class="intro-round-img" src="src/assets/graphic/onboard_graphic_coffee.png"/>
        <q-btn flat rounded class="full-width" style="background: var(--ga-red)">
          <div class="flex-center" style="padding: 4px 0; gap: 4px">
            <q-icon name="verified" style="color: #fff" size="sm"/>
            <span style="color: #fff">스토리 보러가기</span>
          </div>
        </q-btn>


        <h3 class="headline-3">
        <span>
          나에게 맞는 일자리 찾기<sup>2</sup>
        </span>
        </h3>
        <p class="nomal-text-4">
          저희가 직접 확인, 선별한 정보를<br>
          공유해 드립니다
        </p>
        <img class="intro-round-img" src="src/assets/graphic/onboard_graphic_job.png"/>
        <q-btn flat rounded class="full-width" style="background: var(--ga-red)">
          <div class="flex-center" style="padding: 4px 0; gap: 4px">
            <q-icon name="verified" style="color: #fff" size="sm"/>
            <span style="color: #fff">지애픽 보러가기</span>
          </div>
        </q-btn>

        <h3 class="headline-3">
        <span>
          재취업, 은퇴 등 혼자 고민 그만<sup>3</sup>
        </span>
        </h3>
        <p class="nomal-text-4">
          나의 경험담, 고민거리, 취미 등등
          자유롭게 이야기 해보세요!
        </p>
        <img class="intro-round-img" src="src/assets/graphic/intro-graphic-10.png"/>

        <h3 class="headline-3">
        <span>
          전문가의 도움을 바로바로<sup>4</sup>
        </span>
        </h3>
        <p class="nomal-text-4">
          전문가 상담 및 컨설팅으로 효과적으로<br>
          일과 삶을 계획해 보세요
        </p>
        <img class="intro-round-img" src="src/assets/graphic/intro-graphic-10.png"/>
      </section>
    </div>
  </div>
</template>

<style scoped>
.animation-image {
  animation: moveAnimation 2s linear infinite;
}

.animation-image-4 {
  animation: moveAnimation 4s linear infinite;
}

@keyframes moveAnimation {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(5px);
  }
}

.no-bottom-margin {
  margin-bottom: 0;
}

.service-intro-view {
  padding: 1.5rem 16px;
}

section {
  padding: 1.25rem 0;
}

img {
  width: 100%;
  margin: 1.25rem 0;
}

.nomal-text-3 {
  color: var(--k-65);
}

.section-header {
  color: var(--k-75);
  margin-top: 50px;
  margin-bottom: 1.25rem;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.5625rem; /* 125% */
  letter-spacing: -0.025rem;
  color: var(--k-75);
}

.intro-round-img {
  border-radius: 1rem;
}

.small-caption {
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 125%; /* 0.9375rem */

  opacity: 0.45;
}

.headline-3 {
  color: var(--k-65);
  margin-top: 1.88rem;
}
</style>
