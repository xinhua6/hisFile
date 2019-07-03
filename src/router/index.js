import Vue from 'vue'
import Router from 'vue-router'
import hisFile from '@/components/hisFile'
import forgetPsw from '@/components/forgetPsw'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hisFile',
      component: hisFile
    }
  ]
})
