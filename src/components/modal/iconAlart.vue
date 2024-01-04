<script>
export default {
	props: {
		alertShow: {
			type: Boolean,
			default: false,
		},
		iconName: {
			type: String,
			default: 'error',
		},
		description: {
			type: String,
			default: '관리자에게 문의해 주세요',
		},
		buttonInnerText: {
			type: String,
			default: '확인'
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
				<q-card-section v-if="iconName" class="alert-header flex-center">
					<q-icon size="sm" :name="this.iconName" class="high-light"/>
				</q-card-section>

				<q-card-section class="q-pt-none">
					<p>
						{{ this.description }}
					</p>
				</q-card-section>

				<q-card-actions align="center">
					<q-btn flat v-close-popup
                 :label="this.buttonInnerText"
                 @click="this.$emit('confirm')"
          />
				</q-card-actions>
			</q-card>
		</q-dialog>
	</div>
</template>

<style scoped>
.alert-header {
	min-width: 50vw;
}
</style>
