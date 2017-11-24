import Vue from 'vue'
import Router from 'vue-router'


import file from '@/components/file'
import mainx from '@/components/main'
import chat from '@/components/chat'
import share from '@/components/share'
import test from '@/components/test'


Vue.use(Router)

export default new Router({
	linkActiveClass:'is-active',
  routes: [
    {
      path: '/',
      name: 'mainx',
      component: mainx,
      meta:{
      	index:1,
      },
      
    },
    {
    	path:'/file',
    	name:'file',
    	component:file,
    	meta:{
      	index:2,
      }
    },
    {
    	path:'/chat',
    	name:'chat',
    	component:chat,
    	meta:{
      	index:3,
      }
    },
    {
    	path:'/share',
    	name:'share',
    	component:share,
    	meta:{
      	index:3,
      }
    },
      {
    	path:'/test',
    	name:'test',
    	component:test,
    	meta:{
      	index:5,
      }
    },
    ]
})
