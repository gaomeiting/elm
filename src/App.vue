<template>
	<div id="app">
		<my-header :seller="seller"></my-header>
		<div class="tab">
			<div class="tab-item"><router-link to="/goods">商品</router-link></div>
			<div class="tab-item"><router-link to="/ratings">评论</router-link></div>
			<div class="tab-item"><router-link to="/seller">商家</router-link></div>
		</div>
		<keep-alive>
			<router-view :seller="seller"></router-view>
		</keep-alive>
	</div>
</template>

<script>
import {urlParse} from './common/js/util';
import Header from "./components/header/header.vue"
const errNo=0
export default {
  name: 'app',
  data() {
  	return {
  		seller: {
  			id: (() => {
			            let queryParam = urlParse();
			            return queryParam.id;
			})()
  		}
  	}
  },
  created() {
  	this.$http.get('/api/seller?id=' + this.seller.id).then((res) => {
  		if(res.body.errno === errNo){
  			this.seller = Object.assign({}, this.seller, res.body.data);
  		}
  		
  	},(res) => {})
  },
  components: {
    'my-header': Header
  }
}
</script>

<style lang="scss" scoped>
@import "./common/scss/mixin.scss";
	#app {
		.tab {
			display: flex;
			width: 100%;
			height: 40px;
			line-height: 40px;
			@include border-1px (rgba(7,17,27,0.1))
			.tab-item {
				flex: 1;
				text-align: center;
				a {
					display: block;
					width: 100%;
					height: 100%;
					color: #515459;
					font-size: 16px;
				}
				.router-link-active {
					color: #ef1120;
				}
			}
			
		}
	}
</style>
