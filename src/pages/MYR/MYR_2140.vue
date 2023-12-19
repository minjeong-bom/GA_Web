<script>
export default {
	name: "MYR_2140",
  props: {
    depart: {
      type: Array,
      default: [],
    },
    range: {
      type: Array,
      default: [],
    },
    performances: {
      type: Array,
      default: [],
    },
    filed: {
      type: Array,
      default: [],
    }
  },
	data() {
		return {
			groupCount: 1,
			companyName: [],
			departmentName: [],
			yourJob: [],
			performance: [],
			start: [],
			end: [],
		}
	},
  mounted() {
    if (this.range[0]) {
      this.groupCount = this.range.length;

      this.depart.forEach(item => {
        this.companyName.push(item.companyName);
        this.departmentName.push(item.departmentName);
      });
      this.range.forEach(item => {
        this.start.push(item.start);
        this.end.push(item.end);
      });
      this.yourJob = this.filed;
      this.performance = this.performances;
    }
  },
	methods: {
		addGroup() {
			this.groupCount = this.groupCount + 1;
		},
		saveHistory() {
			this.$emit('saveHistory', this.companyName, this.departmentName, this.yourJob, this.performance, this.start, this.end);
		}
	},
	computed: {
		doneInput() {
			return (
        this.groupCount === this.companyName.length &&
        this.groupCount === this.departmentName.length &&
        this.groupCount === this.yourJob.length &&
        this.groupCount === this.start.length &&
        this.groupCount === this.performance.length &&
        this.groupCount === this.end.length
      )
		}
	}
}
</script>

<template>
	<div class="myr-page">
		<section class="sub-myr-view">
			<div class="full-width">
				<h2 class="headline-2">경력 사항</h2>
				<p class="footnote">최근 연도 순으로 기간과 관련 업무 경력을 입력하세요.</p>
			</div>

			<div v-for="(item, index) in groupCount" class="input-group full-width">
				<p class="sub-title-1">경력 {{ index + 1 }}</p>
				<div class="input-group-inner-wrap">
					<q-input v-model="companyName[index]" label="회사 또는 단체명" class="full-width"/>
					<q-input v-model="departmentName[index]" label="소속 부서" class="full-width"/>
					<q-input v-model="yourJob[index]" label="주요 담당 업무" class="full-width"/>
					<q-input v-model="performance[index]" label="주요 성과" class="full-width"/>
					<div class="flex-sb full-width" style="gap: 10px">
						<q-input v-model="start[index]" label="시작일" type="date" class="full-width"/>
						<p> - </p>
						<q-input v-model="end[index]" label="종료일" type="date" class="full-width"/>
					</div>
				</div>
			</div>
			<q-btn flat label="경력 추가하기" @click="addGroup"></q-btn>

			<q-btn
				rounded
				flat
				size="lg"
				label="저장"
				:disable="!doneInput"
				class="full-width myr-modal-save-button"
				@click="saveHistory"
			/>

		</section>
	</div>
</template>

<style scoped>
.footnote {
	color: #808080;
}

.input-group-inner-wrap {
	display: flex;
	padding: 1.25rem 1rem;
	flex-direction: column;
	gap: 1.875rem;

	border-radius: 0.75rem;
	border: 0.5px solid #C6C6C8;
	background: #FFF;
}

</style>
