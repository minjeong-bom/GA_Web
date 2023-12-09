<script>
export default {
  name: "commentId",
  props: {
    writer: String,
	  userPosition: String,
	  createdAt: String,
  }
}
</script>

<template>
  <div class="card-id-wrap">
    <!-- User Profile Image -->
    <div class="profile-wrap"></div>
    <!-- Creater & Created Time -->
    <div class="l-column" style="width: 100%">
      <!-- 00님이 -->
      <div class="created-user-and-lable">
        <div class="created-user-info-wrap card-headline-1">
          <span>{{ writer }}님</span>
        </div>
      </div>
      <!-- Badge + User Role Caption | Created Time -->
      <div class="user-badge-created-time-wrap">
        <img class="user-badge" src="../../assets/icon/person_assignment_24px.svg"/>
        <span class="card-caption-1">{{ userPosition? userPosition : "OO전문가" }}</span>
        <span class="card-caption-2">|</span>
	      <span class="card-caption-1">{{ createdAt? createdAt : "0000.00.00 10:00" }}</span>
      </div>
    </div>
<!--	  <q-btn flat round icon="more_vert" style="opacity: 0.5"/>-->
	  <q-btn-dropdown
		  to="/start/pick-quasar-flavour"
		  color="teal"
		  icon="more_vert"
		  round
	  >
		  <q-list>
			  <q-item clickable v-close-popup>
				  <q-item-section>
					  <q-item-label>Photos</q-item-label>
				  </q-item-section>
			  </q-item>

			  <q-item clickable v-close-popup>
				  <q-item-section>
					  <q-item-label>Videos</q-item-label>
				  </q-item-section>
			  </q-item>

			  <q-item clickable v-close-popup>
				  <q-item-section>
					  <q-item-label>Articles</q-item-label>
				  </q-item-section>
			  </q-item>
		  </q-list>
	  </q-btn-dropdown>
  </div>
</template>

<style scoped>
.profile-wrap {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
	background-color: var(--grays-gray-2);
  //background-image: url("../../assets/graphic/user-profile-thumb-sample.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 30px;
}

.created-user-and-lable {
  gap: 0.625rem;
}

.created-user-info-wrap>span {
  margin-right: 0.1875rem;
}

.cartegory2-lable span {
  color: var(--grays-gray-2);
  font-size: 0.75rem;
}

.user-badge-created-time-wrap {
  display: inline-flex;
  align-items: center;
  gap: 0.1875rem;
}

.card-id-wrap {
	width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.1875rem;
  margin-bottom: 0.5rem;
}

.cartegory2-lable {
  display: inline-block;
  padding: 0.0625rem 0.25rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  border-radius: 0.25rem;
  border: 0.33px solid var(--fills-quartternary);
  background: var(--grays-gray-7);
}
</style>
