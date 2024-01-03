<script>
export default {
	props: {
    title: {
      type: String,
      default: '알람'
    },
		alertShow: {
			type: Boolean,
			default: false,
		},
		description: {
			type: String,
			default: '관리자에게 문의해 주세요',
		},
    confirmButtonText: {
      type: String,
      default: '확인',
    }
	},
	data() {
		return {
			localAlertShow: this.alertShow
		};
	},
	watch: {
		alertShow(newVal) {
			this.localAlertShow = newVal;
		}
	}
}
</script>

<template>
	<div>
		<q-dialog v-model="localAlertShow">
			<q-card>
				<q-card-section class="alert-header">
          <p class="sub-title-1">{{ this.title }}</p>
				</q-card-section>

				<q-card-section class="q-pt-none">
					<p>{{ this.description }}</p>
				</q-card-section>

				<q-card-actions align="right">
          <q-btn flat :label="confirmButtonText" color="primary" v-close-popup @click="this.$emit('confirm')"/>
          <q-btn flat label="취소" v-close-popup @click="this.$emit('cancel')" class="confirm-button"/>
        </q-card-actions>
			</q-card>
		</q-dialog>
	</div>
</template>

<style scoped>
.alert-header {
	min-width: 50vw;
}

.confirm-button {
  background-color: var(--ga-red);
  color: #fff;
}
</style>
