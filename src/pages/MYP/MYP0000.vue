<script>
import TextButtonTopBar from "components/app-bar/TextButtonTopBar.vue";
import { extractCityOrCounty } from '../../script/text/cityExtractor';

export default {
	name: "MYP0000",
	components: {TextButtonTopBar},
	data() {
		return {
			interesting: '',
			email: '',
			address: '',
			cityName: '',
			intro: '',
			job: {
				cureer: '', // 경력
				filed: '', // 업무 분야
				jobTitle: '', // 직업
				jobSearch: '', // 구직 활동 여부
				currentBiz: '', // 현업 종사 여부
				searchGoal: '', // 구직 활동 목표
			},
      file: null, // 이미지 데이터
		}
	},
  watch: {
    // 'file' 데이터 속성을 감시합니다.
    file(newFile, oldFile) {
      // 파일이 변경되었을 때 실행할 로직
      if (newFile !== oldFile) {
        this.uploadFile();
      }
    }
  },
	mounted() {
		this.getMyInfo()
	},
	methods: {
		async getMyInfo() {
			try {
				const config = {
					url : '/api/crud/single/' + this.localUserKey,
					body : {
						"prefix": "mem",
						"alias": "mem",
						"scopes": "mem_key,mem_address,mem_status,mem_id,mem_class,mem_title,mem_foreign_key,mem_regdate,mem_phone,mem_email,mem_regis_num,mem_category,mem_career,mem_field,mem_job,mem_current_biz,mem_job_srch,mem_job_srch_goal,mem_user_profile,mem_job_srch_goal,mem_pro_field,mem_pro_career,mem_enterprise_field,mem_experience"
					},
					etc: {
						headers: {
							'SPRINT-API-KEY': 'sprinttest',
						}
					}
				}
				const response = await this.$api.post(config.url, config.body, config.etc);
				const res = response.data.response.view;

				this.interesting = res.mem_category;
				this.email = res.mem_email;
				this.job.cureer = '';
				this.job.jobTitle = res.mem_job;
				this.job.filed = res.mem_field;
				this.address = res.mem_address;
				console.log(res);
				this.job.searchGoal = res.mem_job_srch_goal;
				res.mem_job_srch === 'Y' ? this.job.jobSearch = true : this.job.jobSearch = false;
				res.mem_job_srch_goal === 'Y' ? this.job.searchGoal = true : this.job.searchGoal = false;
				res.mem_current_biz === 'Y' ? this.job.currentBiz = true : this.job.currentBiz = false;
				this.extractCityOrCounty();
			} catch (e) {
				console.error(e);
			}
		},
    uploadFile() {
      if (this.file) {
        const reader = new FileReader();

        reader.onload = async (e) => {
          const imageData = e.target.result.split(',')[1];

          const config = {
            url: '/api/crud/create',
            body: {
              data_prefix: "bc",
              data_title: "profile",
              data_foreign_key: "QAACWXSQ",
              data_foreign_key2: "UZPWQOWR",
              data_content: imageData,
              data_writer_name: "TJXPOWQA"
            },
            etc: {
              headers: {
                'SPRINT-API-KEY': 'sprinttest',
              }
            }
          };

          try {
            const result = await this.$api.post(config.url, config.body, config.etc);
            console.log('Upload successful', result);
            this.$emit('saveProfileImage', result.data.response.result.data_key);
          } catch (error) {
            console.error('Error uploading file', error);
          }
        };

        reader.readAsDataURL(this.file);
      } else {
        alert('Please select an image to upload.');
      }
    },
		extractCityOrCounty() {
			this.cityName = extractCityOrCounty(this.address);
		},
    navigateTo(path) {
      this.$router.push(path);
    },
    triggerFileInput() {
      this.$refs.fileInput.pickFiles();
    },
	},
	computed: {
		localUserKey() {
			return localStorage.getItem('userKey');
		},
		localUserName() {
			return localStorage.getItem('userName');
		},
		userJobStatus() {
			const firstStaus = this.job.currentBiz ? '현업 종사' : '';
			const secondStatus = this.job.searchGoal === 'Y' ? '이직 준비중' : '전직 준비중';
			if (firstStaus && secondStatus) {
				return firstStaus + ' 및 ' + secondStatus;
			} else {
				return firstStaus + secondStatus;
			}
		}
	}
}
</script>

<template>
	<div>
		<text-button-top-bar :button-name="'정보 수정'" :title-text="'마이 페이지'"></text-button-top-bar>

		<section class="user-info-wrap">
			<div class="user-thumbnail-wrap">
				<img class="user-thumbnail" style="background-image: url('src/assets/graphic/user-profile-thumb-sample.jpeg')"/>
				<q-btn
          dense round size="sm" flat
          class="upload-photo"
          icon="photo_camera"
          style="background: #fff"
          @click="triggerFileInput"
        />
        <q-file
          v-model="file"
          style="display: none"
          ref="fileInput"
        />
			</div>
			<div class="l-column user-detail-info text-align-center">
				<h2 class="user-name-text">{{ localUserName }}</h2>
				<p class="user-title">{{ job.jobTitle }}</p>
				<p class="user-personal-info">{{ userJobStatus }}<span v-if="cityName"> | </span>{{ cityName }}</p>
				<p class="user-personal-info">{{ email }}</p>
			</div>
		</section>
		<section class="point-section">
			<div class="my-point-overview">
				<div>
					<p class="caption-1">활동지수</p>
					<span class="card-headline-1">000,000</span>
					<q-btn dense flat size="xs" icon="chevron_right"></q-btn>
				</div>
				<div>
					<p class="caption-1">활동지수</p>
					<span class="card-headline-1">000,000</span>
					<q-btn dense flat size="xs" icon="chevron_right"></q-btn>
				</div>
				<div>
					<p class="caption-1">활동지수</p>
					<span class="card-headline-1">000,000</span>
					<q-btn dense flat size="xs" icon="chevron_right"></q-btn>
				</div>
			</div>
		</section>
		<section class="point-section">
			<p v-if="!intro">
				아직 {{ localUserName }}의 소개글이 없습니다.<br>
				100자 이내의 간단한 소개로 자신을 알려 보세요.
			</p>
		</section>
		<section class="point-section">
			<p>주요 경력과 역량</p>
			<div class="my-propose-text sub-title-1">
				전기로 운영 18년<br>
				탁월한 관찰<br>
				시간관리 잘해요<br>
				<q-btn dense flat size="md" style="color: var(--k-40)">더보기</q-btn>
			</div>
		</section>
		<section class="point-section">
			<p>관심사</p>
			<div class="sub-title-1" style="display: flex; gap: 0.75rem">
				<span>소통</span>
				<span>업무 관련 스킬</span>
				<span>구인 정보</span>
				<span>유용한 정보</span>
			</div>
		</section>
		<section class="my-menu-list">
			<div class="my-menu flex-sb" @click="navigateTo('/myr0000')">
				<p style="display: flex; gap: 0.625rem; align-items: center;">
					<i class="fa-solid fa-book"></i>
					<span class="user-title"> 내 게시글</span>
				</p>
				<q-btn dense flat size="xs" icon="chevron_right"></q-btn>
			</div>
			<div class="my-menu flex-sb">
				<p style="display: flex; gap: 0.625rem; align-items: center;">
					<i class="fa-solid fa-id-card-clip"></i>
					<span class="user-title"> 내 이력서</span>
				</p>
				<q-btn dense flat size="xs" icon="chevron_right"></q-btn>
			</div>
			<div class="my-menu flex-sb">
				<p style="display: flex; gap: 0.625rem; align-items: center;">
					<i class="fa-solid fa-bookmark"></i>
					<span class="user-title"> 내 북마크</span>
				</p>
				<q-btn dense flat size="xs" icon="chevron_right"></q-btn>
			</div>
			<div class="my-menu flex-sb">
				<p style="display: flex; gap: 0.625rem; align-items: center;">
					<i class="fa-solid fa-mug-hot"></i>
					<span class="user-title"> 커피챗 내역</span>
				</p>
				<q-btn dense flat size="xs" icon="chevron_right"></q-btn>
			</div>
			<div class="my-menu flex-sb">
				<p style="display: flex; gap: 0.625rem; align-items: center;">
					<i class="fa-solid fa-headset"></i>
					<span class="user-title"> 1:1문의 사항</span>
				</p>
				<q-btn dense flat size="xs" icon="chevron_right"></q-btn>
			</div>
		</section>
	</div>
</template>

<style scoped>
html, body, div, .q-layout {
	background: #F2F2F7 !important;
}

.user-thumbnail-wrap {
	position: relative;
	width: 6.25rem;
	height: 6.25rem;
}

.user-thumbnail {
	width: 6.25rem;
	height: 6.25rem;
	flex-shrink: 0;
	background-size: cover;
	border-radius: 10rem;
}

.upload-photo {
	position: absolute;
	right: 0;
	bottom: 0;
}

.user-info-wrap {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 2.4rem;
}

.user-name-text {
	font-size: 1.3125rem;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
}

.user-title {
	font-size: 1rem;
	font-style: normal;
	font-weight: 500;
}

.user-personal-info {
	color: #999;
	font-size: 0.75rem;
	font-style: normal;
	font-weight: 250;
	line-height: normal;
}

.point-section {
	padding: 16px;
}

.my-point-overview * {
	background: #fff !important;
}

.my-point-overview {
	display: flex;
	height: 4.25rem;
	padding: 0.8125rem 1.5rem;
	justify-content: space-between;
	align-items: center;
	flex: 1 0 0;

	background: #fff !important;
	border-radius: 0.625rem;
}

.caption-1 {
	font-size: 0.75rem;
	font-style: normal;
	font-weight: 400;
	line-height: 0.875rem; /* 116.667% */
}

.card-headline-1 {
	color: var(--ga-red);
}

.my-menu-list {
	padding: 16px;
	display: flex;
	flex-direction: column;
	gap: 0.62rem;
}

.my-propose-text {
	display: flex;
	padding: 0.625rem 0.75rem;
	flex-direction: column;
	align-items: flex-start;
	background: #fff !important;
	border-radius: 0.75rem;
}

.my-menu {
	background: #fff !important;
	border-radius: 0.625rem;
	padding: 0.5625rem 1rem;
}
</style>
