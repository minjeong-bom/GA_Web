<template>
	<div class="posting-view">
		<TextButtonTopBar :button-name="'등록'" :title-text="'새글 작성'" @action="save"></TextButtonTopBar>
		<div class="editor-surface">
			<!-- 카테고리 -->
			<q-select
				v-model="category1"
				:options="options"
				input-style="font-family: Pretendard;	font-size: 1rem;	font-style: normal;	font-weight: 600;	line-height: normal;	letter-spacing: -0.01875rem;"/>
			<!-- 제목 -->
			<q-input
				v-model="title"
				placeholder="제목 (최대 40자)"
				maxlength="40"
				input-style="	font-family: Pretendard;	font-size: 1rem;	font-style: normal;	font-weight: 600;	line-height: normal;	letter-spacing: -0.01875rem;"></q-input>
			<!-- 내용 -->
			<div style="min-height: 18.25rem;">
				<q-editor
					v-model="content"
					:definitions="{
        save: {
          tip: 'Save your work',
          icon: 'save',
          label: 'Save',
          handler: saveWork
        },
        upload: {
          tip: 'Upload to cloud',
          icon: 'cloud_upload',
          label: 'Upload',
          handler: uploadIt
        }
      }"
					:toolbar="[
        ['bold', 'italic', 'strike', 'underline'],
        ['upload', 'save'],
      ]"
				/>
				<q-input
					v-model="content"
					placeholder="내용을 입력하세요."
					autogrow
					input-style="	font-family: Pretendard;	font-size: 1rem;	font-style: normal;	font-weight: 600;	line-height: normal;	letter-spacing: -0.01875rem;"
				/>
			</div>

			<!-- 태그 입력 -->
			<q-input
				v-model="tags"
				borderless
				placeholder="태그 입력"
				maxlength="40"
				input-style="	font-family: Pretendard;	font-size: 1rem;	font-style: normal;	font-weight: 600;	line-height: normal;	letter-spacing: -0.01875rem;"></q-input>
		</div>
	</div>
</template>

<script>
import {ref} from 'vue';
import TextButtonTopBar from "components/app-bar/TextButtonTopBar.vue";

export default {
	components: {
		TextButtonTopBar,
	},
	data() {
		return {
			category1: '스토리',
			options: ['스토리', '취업스킬'],
			content: '',
			title: '',
			file: '',
			tags: '',
			errorText: {
				title: false,
				content: false,
			},
			dense: ref(false),
			categoryList: [],
		}
	},
	methods: {
		async save() {
			try {
				let config = "";

				if (this.category1 === "스토리") {
					// 카테고리 - 스토리
					config = {
						url: '/api/crud/create',
						body: {
							data_prefix: 'bc',
							data_title: this.title,
							data_foreign_key: 'DPORHCPV', // 카테고리 (스토리)
							data_foreign_key2: 'SNXKQEZS', // 테이블
							data_content: this.content,
							data_writer_name: this.userKey,
						},

					}
				} else {
					// 카테고리 - 취업 스킬
					config = {
						url: '/api/crud/create',
						body: {
							data_prefix: 'bc',
							data_title: this.title,
							data_foreign_key: 'KWUOXKGM', // 카테고리 (취업스킬)
							data_foreign_key2: 'SNXKQEZS', // 테이블
							data_content: this.content,
							data_writer_name: this.userKey,
						},
						etc: {
							headers: {
								'SPRINT-API-KEY': 'sprinttest',
							},
						}
					}
				}

				await this.$api.post(config.url, config.body, {
					headers: {
						'SPRINT-API-KEY': 'sprinttest',
					},
				});
				this.navigateTo('/');
			} catch (e) {
				window.alart('게시글 등록에 실패했습니다');
				console.error(e);
			}
		},
		navigateTo(path) {
			this.$router.push(path);
		}
	},
	computed: {
		userKey() {
			return localStorage.getItem('userKey')
		}
	}
}
</script>

<style scoped>
.posting-view {
	background: #F4F4F4;
}

.editor-surface {
	display: flex;
	height: 28.4375rem;
	padding: 0rem 1rem;
	flex-direction: column;
	gap: 0.3125rem;
	background: #fff;
	margin-top: 10px;
}

</style>
