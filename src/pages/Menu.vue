<script>
export default {
	name: "Menu",
	data() {
		return {
			eventCount: 0,
			menuList: [
				{
					color: '',
					lable: '서비스 소개',
					iconClass: 'fa-book',
					subLable: '',
          path: '/ser0000'
				},
				{
					color: '',
					lable: '스토리',
					iconClass: 'fa-message',
					subLable: '일과 삶의 이야기',
				},
				{
					color: '',
					lable: '취업 스킬',
					iconClass: 'fa-face-smile-wink',
					subLable: '일과 삶의 이야기',
				},
				{
					color: 'var(--ga-red)',
					lable: "지애's Pick",
					iconClass: 'fa-fire',
					subLable: '추천 스토리',
				},
				{
					color: '',
					lable: "마이페이지",
					iconClass: 'fa-user',
					subLable: '',
					path: '/myp0000',
          sub: [
            {
              color: '',
              lable: "내 게시글",
              iconClass: 'fa-pen-to-square',
              subLable: '',
              path: '/myp0000',
            },
            {
              color: '',
              lable: "내 북마크",
              iconClass: 'fa-bookmark',
              subLable: '',
              path: '/myp3000',
            },
            {
              color: '',
              lable: "내 이력서",
              iconClass: 'fa-id-card-clip',
              subLable: '',
              path: '/myp0000',
            },
            {
              color: '',
              lable: "1:1 문의사항",
              iconClass: 'fa-comments',
              subLable: '',
              path: '/myp4001',
            },
          ]
				},
				{
					color: '',
					lable: "공지사항",
					iconClass: 'fa-thumbtack',
					subLable: '',
          path: 'not0000',
				},
				{
					color: '',
					lable: "이벤트",
					iconClass: 'fa-gift',
					subLable: '',
          path: 'eve0000',
				},
				{
					color: '',
					lable: "고객센터",
					iconClass: 'fa-headset',
					subLable: '10:00~18:00',
          path: 'cus0000',
				},
				{
					color: '',
					lable: "서비스 정책",
					iconClass: 'fa-scale-balanced',
					subLable: '',
				},
				{
					color: '',
					lable: "설정",
					iconClass: 'fa-sliders',
					subLable: '',
				},
			]
		}
	},
	mounted() {
		this.getEventList();
	},
	methods: {
		async getEventList() {
			try {
				const config = {
					url: '/api/crud/lists/',
					body: {
						"alias": "bc",
						"prefix": "bc",
						"scopes": "bc_key,bc_foreign_key",
						"columns_opts": {
							"bc_foreign_key2": "RCKOKHAZ", // 이벤트
							"bc_foreign_key": "NCNZKKMC", // 이벤트 카테고리
						},
						"limit": 100
					},
					etc: {
						headers: {
							'SPRINT-API-KEY': 'sprinttest',
						}
					}
				}

				const response = await this.$api.post(config.url, config.body, config.etc);
				let res = response.data.response.lists;
				this.menuList[6].subLable = res.length + '개 진행중';

			} catch (e) {
				console.error(e);
			}
			// 작성자명 가공 함수 호출
		},
    closeMenu() {
      this.$router.push('/');
    }
	},
}
</script>

<template>
	<div>
		<div class="close-button-wrap">
			<q-btn flat round icon="close" size="lg" @click="closeMenu()"></q-btn>
		</div>
		<div class="headline-wrap">
			<h1 class="headline-1">전체</h1>
		</div>
		<div>
			<section v-for="item in menuList" >
				<q-btn flat class="full-width" @click="this.$router.push(item.path)">
          <div class="menu-item">
            <div class="icon-lable-wrap">
              <div class="icon-frame flex-center">
                <i class="fa-solid" :class="item.iconClass"></i>
              </div>
              <span class="menu-lable-2">{{ item.lable }}</span>
            </div>
            <span v-if="item.subLable" class="footnote">{{ item.subLable }}</span>
          </div>
				</q-btn>
        <div v-if="item.sub" class="sub-menu-item-wrap">
          <q-btn
            v-if="item.sub"
            flat dense
            class="full-width"
            v-for="sub in item.sub"
            @click="this.$router.push(sub.path)"
          >
            <div class="menu-item">
              <div class="icon-lable-wrap">
                <div class="icon-frame flex-center">
                  <i class="fa-solid sub-menu-lable" :class="sub.iconClass"></i>
                </div>
                <span class="sub-menu-lable">{{ sub.lable }}</span>
              </div>
              <span v-if="sub.subLable" class="footnote">{{ sub.subLable }}</span>
            </div>
          </q-btn>
        </div>
			</section>
		</div>
	</div>
</template>

<style scoped>
.fa-solid {
	font-size: 20px;
}

.close-button-wrap {
	display: flex;
	padding: 0.5rem 0.5rem 0.5rem 0rem;
	justify-content: flex-end;
	align-items: center;
}

.headline-wrap {
	display: flex;
	padding: 0.1875rem 1rem 0.5rem 1rem;
	flex-direction: column;
	align-items: flex-start;
}

.icon-lable-wrap {
	display: flex;
	width: 50%;
	align-items: center;
	gap: 0.625rem;
	flex-shrink: 0;
}

section {
	width: 100%;
}

.menu-item {
	display: flex;
	width: 100%;
	padding: 0.6rem 0;
	justify-content: space-between;
	align-items: center;
}

.footnote {
	color: var(--grays-gray);
}

.icon-frame {
	width: 2rem;
	height: 2rem;
}

.sub-menu-item-wrap {
  padding-left: 32px;
}

.sub-menu-item-wrap .icon-frame {
  width: 1.5rem;
  height: 1.5rem;
}

.sub-menu-item-wrap .sub-menu-lable {
  font-size: 1rem;
  color: var(--labels-secondary)
}
</style>
