<script>

import {itemDelete} from "src/script/api/deleteCall";

export default {
  name: "resumeCard",
  props: {
    resumeKey: String,
    title: String,
    created: String,
    status: String,
  },
  mounted() {
    this.formattingDate();
  },
  data() {
    return {
      basicDate: String,
    }
  },
  methods: {
    formattingDate() {
      const date = new Date(this.created);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth()는 0부터 시작하므로 1을 더해줌
      const day = String(date.getDate()).padStart(2, '0');

      this.basicDate = `${year}.${month}.${day}`;
    },
    editMode() {
      this.$router.push({
        path: 'myr0000/edit',
        query: {
          key: this.resumeKey
        }
      })
    },
    deleteCard() {
      this.$q.dialog({
        title: '이력서 삭제',
        message: '다시 복원할 수 없어요. 정말 삭제하시겠습니까?',
        cancel: '취소하기',
        ok: '네, 삭제할래요.'
      }).onOk(async () => {
        await itemDelete(this.resumeKey);
        this.$q.notify('삭제되었습니다.');
      }).onCancel(() => {

      }).onDismiss(() => {

      })
    }
  }
}
</script>

<template>
  <div>
    <div class="resume-item">
      <div>
        <div class="resume-wrapper">
          <h3 class="resume-title">{{ this.title }}</h3>
          {{ resumeKey }}
          <p class="resume-date">{{ basicDate }}</p>
        </div>
        <div class="resume-status">
          {{ this.status }}
        </div>
      </div>
      <q-btn flat icon="more_vert" round>
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item v-close-popup clickable @click="editMode">
              <div class="item-section">수정하기</div>
            </q-item>
            <q-item v-close-popup clickable @click="deleteCard">
              <div class="item-section">삭제하기</div>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
  </div>
</template>

<style scoped>
p {
  margin-block-end: 0;
}

.resume-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  border-bottom: 1px solid #E6E0E9;
  cursor: pointer;
}

.resume-date {
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #938F96;
}

.resume-wrapper {
  display: flex;
  width: 270px;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;

  padding: 20px 0;
}

.resume-item h3 {
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-block-start: 0;
  margin-block-end: 0;
}

.resume-status {
  text-align: right;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #938F96;
}
</style>
