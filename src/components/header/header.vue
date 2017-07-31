<template>
    <div class="header">
    	<div class="content-wrapper">
    		<div class="avatar">
    			<img :src="seller.avatar" width="64">
    		</div>
    		<div class="content">
    			<div class="title">
    				<span class="brand"></span>
    				<span class="name">{{seller.name}}</span>
    			</div>
    			<div class="description">
    				{{seller.description}}/{{seller.deliveryTime}}分钟送达
    			</div>
    			<div class="supports" v-if="seller.supports">
    				<span class="icon" :class="classMap[seller.supports[0].type]"></span>
    				<span class="text">{{seller.supports[0].description}}</span>
    			</div>
    		</div>
    		<div v-if="seller.supports" class="seller-count" @click.stop.prevent="showDetail">
    			<span class="count">{{seller.supports.length}}个</span>
			<i class="icon-keyboard_arrow_right"></i>
    		</div>
    	</div>
    	<div class="bulletin-wrapper" @click.stop.prevent="showDetail">
    		<span class="bulletin-title"></span>
    		<span class="bulletin-text">{{seller.bulletin}}</span>
    		<i class="icon-keyboard_arrow_right"></i>
    	</div>
    	<div class="bg-img">
    		<img :src="seller.avatar" width="100%" height="100%">
    	</div>
    	<transition name="fade">
	    	<div class="detail" v-show="detailShow">
	    		<div class="detail-content">
	    			<h3 class="name">
	    				{{seller.name}}
	    			</h3>
	    			<star :size="48" :score="seller.score"></star>
	    			<div class="rule" v-show="seller.supports">
	    				<h3 class="title">
	    					<span></span>
	    					<strong>优惠信息</strong>
	    					<span></span>
	    				</h3>
	    				<div class="supports" v-for="(itemSupport, index) in seller.supports" key="index">
	    					<span class="icon" :class="classMap[itemSupport.type]"></span>
	    					<span class="text">{{ itemSupport.description }}</span>
	    				</div>
	    				<h3 class="title">
	    					<span></span>
	    					<strong>商家公告</strong>
	    					<span></span>
	    				</h3>
	    				<p class="bulletin">{{seller.bulletin}}</p>
	    			</div>
	    		</div>
	    		<div class="detail-close" @click.stop.prevent="hideDetail">
	    			<i class="icon-close"></i>
	    		</div>
	    		<div class="mask"></div>
	    	</div>
    	</transition>
    </div>
</template>
<script>
	import Star from "components/star/Star";
	export default {
	    props: {
	        seller: {
	            type: Object
	        }
	    },
	    data() {
	    	return {
	    		detailShow: false
	    	}
	    },
	    methods: {
	    	showDetail() {
	    		this.detailShow = true
	    	},
	    	hideDetail() {
	    		this.detailShow = false
	    	}
	    },
	    created(){
	    	this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
	    },
	    components: {
	    	star : Star
	    }
	}
</script>
<style scoped lang="scss">
	@import '../../common/scss/mixin.scss';
	.support_extend{
		font-size: 10px;
		line-height: 2;
		.icon {
			display: inline-block;
			vertical-align: top;
			width: 12px;
			height: 20px;
			background-size: 12px 12px;
			background-position: center 5px;
			background-repeat: no-repeat;
		}
		.decrease {
			@include bg-image('decrease_1');
		}
		.discount {
			@include bg-image('discount_1');
		}
		.special {
			@include bg-image('guarantee_1');
		}
		.invoice {
			@include bg-image('invoice_1');
		}
		.guarantee {
			@include bg-image('special_1');
		}
	}
 	.header {
 		color: #fff;
 		background: rgba(0,0,0,0.6);
 		padding-bottom: 24px;
 		position: relative;
 		.content-wrapper {
 			padding: 24px 12px 18px 24px;
 			font-size: 0;
 			position: relative;
 			.avatar, .content {
 				display: inline-block;
 				vertical-align: top;
 			}
 			.avatar{
 				border-radius: 2px;
 				overflow: hidden;
 			}
 			.content {
 				padding-left: 14px;
 				font-size: 12px;
 				max-width: 220px;
 				box-sizing: border-box;
 				.title {
 					font-size: 16px;
 					line-height: 1.5;
 					font-weight: bold;
 					.brand {
 						display: inline-block;
 						vertical-align: top;
 						width: 30px;
 						height: 24px;
 						border-radius: 2px;
 						overflow: hidden;
 						background-size: 100% 18px;
 						background-position: 0 3px;
 						background-repeat: no-repeat;
 						@include bg-image('brand')
 					}
 					
 				}
 				.description {
 					line-height: 1.8;
 				}
 				.supports {
 					@extend .support_extend
 				}
 			}
 			.seller-count{
 				position: absolute;
 				right: 10px;
 				bottom: 14px;
 				font-size: 0;
 				line-height: 25px;
 				width: 44px;
 				height: 25px;
 				border-radius: 12px;
 				background: rgba(0,0,0,0.6);
 				.count {
 					display: inline-block;
 					margin-left: 9px;
 					font-size: 12px;
 					vertical-align: top;
 				}
 				.icon-keyboard_arrow_right {
 					display: inline-block;
 					font-size: 12px;
 					padding-top: 7px;
 					padding-right: 2px;
 				}
 			}
 		}
 		.bg-img {

 			width: 100%;
 			height: 100%;
 			position: absolute;
 			left: 0;
 			top: 50%;
 			z-index: -1;
 			transform: translateY(-50%);
 			filter: blur(6px);
 			overflow: hidden;
 		}
 		.bulletin-wrapper {
 			width: 100%;
 			height: 28px;
 			font-size: 12px;
 			line-height: 28px;
 			display: flex;
 			background: rgba(0,0,0,0.6);
 			position: absolute;
 			bottom: 0;
 			.bulletin-title { 
 				width: 22px;
 				height: 12px; 
 				@include bg-image(bulletin);
 				background-size: cover;
 				border-radius: 2px;
 				margin: 8px 0 0 11px;
 			 }
 			.bulletin-text { 
 				flex: 1;
 				padding-left: 4px;
 				white-space: nowrap;
 				overflow: hidden;
 				text-overflow: ellipsis;
 			}
 			.icon-keyboard_arrow_right { 
 				font-size: 12px;
 				padding-top: 8px;
 				padding-right: 14px;
 			}

 		}
 		.detail {
 			width: 100%;
 			height: 100%;
 			background: rgba(7,17,27,0.8);
 			overflow-y: auto;
 			position: fixed;
 			left: 0;
 			top: 0;
 			z-index: 999;
 			.mask {
 				width: 100%;
 				height: 100%;
 				position: absolute;
 				left: 0;
 				top: 0;
 				z-index: -1;
 			}
 			.detail-content {
 				min-height: 100%;
 				box-sizing: border-box;
 				padding: 57px 35px 65px;
 				text-align: center;
 				.name {
 					font-size: 18px;
 					font-weight: bold;
 					line-height: 32px;
 					color: #fff;
 					text-align: center;
 				}
 				.star {
 					display: inline-block;
 					padding: 18px 0;
 				}
 				.rule {
 					h3{
 						display: flex;
	 					width: 100%;
	 					line-height: 50px;
	 					height: 50px;
	 					span { 
	 						flex: 1;
	 						@include border-1px (#ccc)
	 						position: relative;
	 						top: -50%;
	 					}
	 					strong { 
	 						font-size: 14px;
	 						padding: 0 10px;
	 					}
 					}
 					.supports {
 						@extend .support_extend;
 						padding: 0 10px;
 						text-align: left;
 						.text {
 							font-size: 14px;
 							line-height: 28px;
 						}
 						.icon {
 							width: 16px;
 							height: 16px;
 							background-size: 100%;
 							background-position: center;
 							margin-top: 6px;
 						}
 					}
 					.bulletin {
 						font-size: 14px;
 						line-height: 2;
 						text-align: left;
 						padding: 0 10px;
 					}
 					
 				}
				
 			}
 			.detail-close {
				width: 100%; 
				height: 65px;
				text-align: center;
				position: relative;
				margin-top: -65px;
				.icon-close {
					font-size: 30px;
					color: #8e9397;
				}
 			}

 		}
 	}
 	
</style>