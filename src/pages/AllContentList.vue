<script>
import TextButtonTopBar from "components/app-bar/TextButtonTopBar.vue";
import TitleTopBar from "components/app-bar/TitleTopBar.vue";
import ArticleCard from "components/card/ArticleCard.vue";

export default {
	name: "AllContentList",
	components: {ArticleCard, TitleTopBar},
	props: {
		listName: '',
		listCategory2: '',
	},
	mounted() {
		this.getArticleList(this.listCategory2);
	},
	methods: {
		async getArticleList(category) {
			const commonConfig = {
				url: '/api/crud/lists/',
				data: {
					"alias": "bc",
					"prefix": "bc",
					"scopes": "bc_title,bc_count,bc_regdate,bc_foreign_key,bc_foreign_key2,bc_writer_name,bc_key",
					"columns_opts": {
						"bc_foreign_key2": "SNXKQEZS"
					},
					"limit": 5
				},
				etc: {
					headers: {
						'SPRINT-API-KEY': 'sprinttest',
					}
				}
			};
			let config = {...commonConfig};

			// 카테고리 별 'bc_foreign_key' 설정
			if (category === 'story') {
				config.data.columns_opts.bc_foreign_key = "DPORHCPV"; // 스토리
			} else if (category === 'skills') {
				config.data.columns_opts.bc_foreign_key = "KWUOXKGM"; // 스킬
			} else if (category === 'gapick') {
				config.data.columns_opts.bc_foreign_key = "CEZTXGLJ"; // 스킬
			}

			// API 호출
			const res = await this.$api.post(config.url, config.data, config.etc);
			let response = res.data.response.lists;

			// 카테고리 이름 삽입
			const categoryInfo = {
				DPORHCPV: "스토리",
				KWUOXKGM: "취업 스킬",
				CEZTXGLJ: "지애픽"
			};
			response.forEach(item => {
				item.category_name = categoryInfo[item.bc_foreign_key] || null;
			});

			// 작성자명 가공 함수 호출
			this.replaceWriterNames(response);
		},
		async replaceWriterNames(array) {
			for (let item of array) {
				try {
					const res = await this.$api.post(
						`/api/crud/single/${item.bc_writer_name}`,
						{
							prefix: "mem",
							alias: "mem",
							scopes: "mem_title,mem_job"
						},
						{
							headers: {
								'SPRINT-API-KEY': 'sprinttest',
							}
						}
					)
					if (res.data.status === 'success') {
						item.bc_writer_name = res.data.response.view.mem_title;
						if (res.data.response.view.mem_job) {
							item.badgeTitle = res.data.response.view.mem_job
						} else {
							item.badgeTitle = "일반 회원" // job 정보가 등록되지 않은 회원은 일반 회원으로 표시
						}
					}
				} catch (e) {
					item.badgeTitle = "비공개 회원" // 삭제된 회원
				}
			}
			this.articleList = array;
		}
	}
}
</script>

<template>
	<div>
		<title-top-bar :title-text="listName"></title-top-bar>
		<section>
			<div v-for="item in articleList">
				<article-card
					:title="item.bc_title"
					:article-thumb="item.articleThumb"
					:article-type="item.category_name"
					:article-type2="item.category_name"
					:writer="item.bc_writer_name"
					:badge-title="item.badgeTitle"
					:created-at="item.bc_regdate"
					:writer-thumb="item.writerThumb"
					:motivation="item.motivation"
					:view-count="item.bc_count"
					@click="goToArticle(item.bc_key)"
				>
				</article-card>
			</div>
		</section>
	</div>
</template>

<style scoped>

</style>
