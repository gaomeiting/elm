import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/goods/Goods'
import Seller from '@/components/seller/Seller'
import Ratings from '@/components/ratings/Ratings'

Vue.use(Router)
const routes=[
    {path:'/goods', component: Goods },
    {path:'/ratings', component: Ratings },
    {path:'/seller', component: Seller }
]
const router= new Router({
  routes : routes
})
router.push('goods')
export default router
