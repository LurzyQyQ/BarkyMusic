import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    
    children: [
      {
        path: 'recommend',
        name: 'Recommend',
        component: () => import('../views/Recommend.vue'),
        
      },
      {
        path: 'video',
        name: 'Video',
        component: () => import('../views/Video.vue'),
      },
      {
        path: 'my',
        name: 'My',
        component: () => import('../views/My.vue'),
      },
      {
        path: 'find',
        name: 'Find',
        component: () => import('../views/Find.vue'),
      },
      {
        path: 'songdetails',
        name: 'SongDetails',
        component: () => import('../components/SongDetails.vue'),
      },
      {
        path: 'login',
        // 别名,默认访问该页面
        alias: "",
        name: 'Login',
        component: () => import('../components/Login.vue'),
      },
      {
        path: 'search',
        name: 'Search',
        component: () => import('../components/Search.vue'),
      },
      {
        path: 'rankinglist',
        name: 'RankingList',
        component: () => import('../components/RankingList.vue'),
      },
      {
        path: 'songdetailsranking',
        name: 'SongDetailsRanking',
        component: () => import('../components/SongDetailsRanking.vue'),
      },
      {
        path: 'leftfunction',
        name: 'LeftFunction',
        component: () => import('../components/LeftFunction.vue'),
      },
      {
        path: 'mvdetails',
        name: 'MvDetails',
        component: () => import('../components/MvDetails.vue'),
      },
      {
        path: 'songslist',
        name: 'SongsList',
        component: () => import('../components/SongsList.vue'),
      },
      {
        path: 'dayrecommend',
        name: 'DayRecommend',
        component: () => import('../components/DayRecommend.vue'),
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
