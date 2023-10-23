<template>
  <div>
    <top-bar :title="'마이 페이지'"></top-bar>
    <section>
      <h5>{{ userId }}님</h5>
    </section>
    <section>
      <div class="profile-info-wrapper">
        <div class="profile-image-info-wrapper">
          <div class="profile-image">
            <img src="../assets/testing-image/server-img-1.jpg">
            <button class="btn-add-profile-image">
              <i class="fa-solid fa-camera"></i>
            </button>
          </div>
          <div class="profile-user-info">
            <p>role</p>
            <p>position</p>
            <p>email@sample.com</p>
          </div>
        </div>
        <div>
          <button class="btn-outline-primary">
            회원 정보 수정
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TopBarSub from "components/common/TopBarSub.vue";

export default {
  components: {
    'top-bar': TopBarSub,
  },
  methods: {

  },
  computed: {
    userId () {
      const storageUserId = localStorage.getItem('user_id');
      return storageUserId;
    }
  }
}
</script>

<style scoped>
section {
  padding: 20px 24px;
}

h5 {
  font-size: 28px;
  font-style: normal;
  font-weight: 700;

  margin-block-start: 0;
  margin-block-end: 0;
}

.profile-info-wrapper {
  display: flex;
  justify-content: space-between;
}

.profile-image-info-wrapper {
  display: flex;
  gap: 10px;
}

.profile-info-wrapper .profile-image {
  position: relative;
  width: 100px;
  height: 100px;
}

.profile-info-wrapper .profile-image img {
  width: 100%;
  height: 100%;
  border-radius: 100px;
}

.btn-add-profile-image {
  text-align: center;

  position: absolute;
  bottom: 0px;
  right: 6px;

  width: 27px;
  height: 27px;
  padding: 0;

  border-radius: 20px;
  border: 0;

  background: #fff;
}

.profile-user-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.profile-user-info p{
  margin-block-start: 0;
  margin-block-end: 0;
}
</style>
