<script>
import TextButtonTopBar from 'components/app-bar/TextButtonTopBar.vue';
import ProfileImageEditor from 'components/modal/profileImageEditor.vue';
import UserProfileThumb from 'components/profile/userProfileTumb.vue';
import nickNameList from 'assets/data/nickname-list.json';

export default {
  name: 'MYP0000',
  components: {UserProfileThumb, ProfileImageEditor, TextButtonTopBar},
  data() {
    return {
      detailProfileKey: '',
      options: [
        {
          label: '소통',
          value: '소통',
        },
        {
          label: '업무 관련 스킬 향상',
          value: '업무 관련 스킬 향상',
        },
        {
          label: '구인/구직 정보',
          value: '구인/구직 정보',
        },
        {
          label: '유용한 정보(세미나, 프로그램 등)',
          value: '유용한 정보(세미나, 프로그램 등)',
        },
      ],
      backgroundList: [
        "건설·건축",
        "공공·복지",
        "구매·자재·물류",
        "교육",
        "금융·보험",
        "기획·전략",
        "디자인",
        "마케팅·홍보·조사",
        "미디어·문화·스포츠",
        "바이오·제약·식품",
        "상품기획·MD",
        "서비스",
        "생산",
        "연구·R&D",
        "영업·판매·무역",
        "운전·운송·배송",
        "의료",
        "인사·노무·HRD",
        "IT개발·데이터",
        "총무·법무·사무",
        "회계·세무·재무",
        "고객상담·TM"
      ],
      edit: {
        user_info: {
          type: 'nomal',
          nickname: '',
          interesting: [],
          email: '',
          about: '',
        },
        job: {
          working: '네',
          searching: '네',
          searching_type: '이직',
          total_career: '',
          career_name: '',
          job_title: '',
        },
      },
      nickNameList,
    };
  },
  mounted() {
    this.getDetailUserInfo();
  },
  methods: {
    async save() {
      try {
        this.edit.user_info.type = 'nomal';

        const config = {
          url: '/api/crud/create',
          body: {
            data_key: this.detailProfileKey ? this.detailProfileKey : '',
            data_prefix: 'bc',
            data_foreign_key2: 'IYETRHFC',
            data_foreign_key: 'AYZXHRWS',
            data_writer_name: this.localUserKey,
            data_title: this.localUserKey,
            data_content: JSON.stringify(this.edit)
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom',
            },
          },
        }
        await this.$api.post(config.url, config.body, config.etc);
        this.$q.notify('저장이 완료되었습니다');
        this.navigateTo('/mypage/nomal');
      } catch (e) {
        this.$q.notify('저장할 수 없습니다. 관리자에게 문의해 주세요.');
      }
    },
    async getDetailUserInfo() {
      const config = {
        url: '/api/crud/lists/?order=desc_bc_regdate',
        body: {
          alias: 'bc',
          prefix: 'bc',
          scopes: 'bc_key,bc_content',
          columns_opts: {
            bc_foreign_key: 'AYZXHRWS',
            bc_foreign_key2: 'IYETRHFC',
            bc_title: this.localUserKey,
          },
          limit: 1
        },
        etc: {
          headers: {
            'SPRINT-API-KEY': 'sprintcombom'
          }
        }
      }
      const res = await this.$api.post(config.url, config.body, config.etc);
      if (res) {
        const result = res.data.response.lists[0];
        this.edit.user_info.about = result.bc_content.user_info.about;
        this.edit.user_info.nickname = result.bc_content.user_info.nickname;
        this.edit.user_info.email = result.bc_content.user_info.email;
        this.edit.user_info.interesting = result.bc_content.user_info.interesting;
        this.edit.job.working = result.bc_content.job.working;
        this.edit.job.searching = result.bc_content.job.searching;
        this.edit.job.searching_type = result.bc_content.job.searching_type;
        this.edit.job.total_career = result.bc_content.job.total_career;
        this.edit.job.career_name = result.bc_content.job.career_name;
        this.edit.job.job_title = result.bc_content.job.job_title;
        this.detailProfileKey = result.bc_key;
      }
    },
    generateNickname() {
      const adjective = this.getRandomItem(this.nickNameList.firstName);
      const animalPlant = this.getRandomItem(this.nickNameList.secondName);

      this.edit.userName = `${adjective} ${animalPlant}`;
    },
    getRandomItem(array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    navigateTo(path) {
      this.$router.push(path);
    },
  },
  computed: {
    localUserKey() {
      return localStorage.getItem('userKey');
    },
    userJobStatus() {
      const firstStaus = this.job.currentBiz ? '현업 종사' : '';
      const secondStatus = this.job.searchGoal === 'Y' ? '이직 준비중' : '전직 준비중';
      if (firstStaus && secondStatus) {
        return `${firstStaus} 및 ${secondStatus}`;
      }
      return firstStaus + secondStatus;
    },
  },
};
</script>
<template>
  <div class="gray-background">
    <!-- 테스트 -->
    <text-button-top-bar title-text="회원 정보 수정"/>
    <section class="nomal-page-layout">
      <h3 class="headline-3">기본 정보를 알려 주세요.</h3>
      <div class="surface-1">
        <div>
          <q-input
            v-model="edit.user_info.nickname"
            hint="최대 10글자"
            label="닉네임"
            maxlength="10"
            style="font-size: 1.125rem">
            <template v-slot:append>
              <q-btn class="caption-1 high-light"
                     dense flat
                     label="아이디 추천받기"
                     @click="generateNickname"
              />
            </template>
          </q-input>
        </div>
        <div>
          <q-input
            v-model="edit.user_info.email"
            label="이메일"
            placeholder="이메일을 입력하세요"
            type="email"/>
        </div>
        <div>
          <p class="sub-title-1">관심사</p>
          <q-option-group v-model="edit.user_info.interesting" :options="options" type="checkbox"/>
        </div>
        <div>
          <p class="sub-title-1">현업에 종사중이신가요?</p>
          <q-radio v-model="edit.job.working" label="네" val="네"/>
          <q-radio v-model="edit.job.working" label="아니오" val="아니오"/>
        </div>
        <div>
          <p class="sub-title-1">구직 활동 중이신가요?</p>
          <q-radio v-model="edit.job.searching" label="네" val="네"/>
          <q-radio v-model="edit.job.searching" label="아니오" val="아니오"/>
        </div>
        <div>
          <p class="sub-title-1">구직 활동의 종류는 무엇인가요?</p>
          <q-radio v-model="edit.job.searching_type" label="이직" val="이직"/>
          <q-radio v-model="edit.job.searching_type" label="전직" val="전직"/>
        </div>
      </div>
      <h3 class="headline-3">과거 경력을 알려 주세요.</h3>
      <div class="surface-1">
        <div>
          <q-input
            v-model="edit.job.total_career"
            label="총 경력"
            placeholder="총 경력"
            type="tel"/>
        </div>
        <q-select
          v-model="edit.job.career_name"
          :options="backgroundList"
          behavior="menu"
          label="업무 분야"
          style="font-size: 1.125rem"
        />
        <div>
          <q-input
            v-model="edit.job.job_title"
            label="직업"
            placeholder="직업"
            type="text"/>
        </div>
      </div>
      <h3 class="headline-3">100자 소개</h3>
      <p class="caption-1">회원 및 일거리를 제공할 수 있는 회원이 보는 글이에요.</p>
      <div class="surface-1">
        <q-input
          v-model="edit.user_info.about"
          autogrow
          label="자기소개"
          maxlength="100"
          type="textarea"
        />
      </div>
    </section>

    <q-btn
      class="full-width primary-btn"
      flat
      label="변경사항 저장"
      @click="save"
    />
  </div>
</template>

<style lang="scss" scoped>
.gray-background {
  background: #F2F2F7;
}

.headline-3 {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.sub-title-1 {
  color: var(--labels-secondary);
  font-weight: 600;
}
</style>
