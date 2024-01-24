<script>
import TitleTopBar from "components/app-bar/TitleTopBar.vue";
import {ref} from 'vue'

export default {
  name: "MYP4120",
  components: {TitleTopBar},
  data() {
    return {
      title: '',
      content: '',
      writerKey: '',
      filesKey: '',

      group: ref(['op1']),
      options: [
        {
          label: '오류 및 속도 느림',
          value: '오류 및 속도 느림'
        },
        {
          label: '제공 정보',
          value: '제공 정보'
        },
        {
          label: '검색 및 탐색 과정',
          value: '검색 및 탐색 과정'
        },
        {
          label: '커뮤니티 운영',
          value: '커뮤니티 운영'
        },
        {
          label: '컨설팅 서비스',
          value: '컨설팅 서비스'
        },
        {
          label: '기타 의견',
          value: '기타 의견'
        },
      ]
    }
  },
  mounted() {
    this.getContent();
  },
  methods: {
    async getContent() {
      const config = {
        url: '/api/crud/single/' + this.contentKey,
        body: {
          prefix: 'bc',
          alias: 'bc',
          scopes: 'bc_content,bc_title,bc_writer_name',
        },
        etc: {
          headers: {
            'SPRINT-API-KEY': 'sprintcombom',
          }
        }
      }
      const res = await this.$api.post(config.url, config.body, config.etc);
      const result = res.data.response.view;

      this.title = result.bc_title;
      this.content = result.bc_content;
      this.writerKey = result.bc_writer_name;
    },
    async save() {
      this.content.type = this.group;
      try {
        const content = JSON.stringify(this.content);

        const config = {
          url: '/api/crud/create',
          body: {
            data_key: this.contentKey,
            data_prefix: 'bc',
            data_title: this.title,
            data_foreign_key: 'IOZOZWFG',
            data_foreign_key2: 'ZRBTGTEX',
            data_content: JSON.stringify(content),
            data_writer_name: this.writerKey,
          },
          etc: {
            headers: {
              'SPRINT-API-KEY': 'sprintcombom',
            }
          }
        }

        await this.$api.post(config.url, config.body, config.etc);
        this.isLoading = false;

        this.$router.push('/myp4130');
      } catch (e) {
        console.error('1:1 문의글 등록 실패', e);
      }
    },
  },
  computed: {
    contentKey() {
      return this.$route.query.key;
    }
  }
}
</script>

<template>
  <div>
    <title-top-bar></title-top-bar>
    <section class="nomal-page-layout">
      <div class="myp4120-layout-1 l-column">
        <h1 class="article-card-headline">문의하신 것이 어떤 내용에 해당하나요?</h1>
        <p class="caption-1">해당하는 보기를 모두 선택해 주세요</p>
      </div>

      <div class="l-column">
        <q-option-group
          v-model="group"
          :options="options"
          type="checkbox"
        />
      </div>

      <!-- 다음 버튼 -->
      <div class="bottom-fixed-btn">
        <q-btn
          class="primary-btn full-width" flat
          label="다음"
          rounded
          @click="save"
        ></q-btn>
      </div>
    </section>
  </div>
</template>

<style scoped>
.myp4120-layout-1 {
  gap: 0.62rem;
}

.bottom-fixed-btn {
  position: fixed;
  width: 100%;
  padding: 1rem;
  bottom: 0;
  left: 0;
}
</style>
