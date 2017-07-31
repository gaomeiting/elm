<template>
	<div class="seller" ref="sellerWrap">
		<div class="seller-cont">
			<div class="totality">
				<h3>{{seller.name}}</h3>
				<p>
					<star :size="36" :score="seller.score"></star>
					<span>({{seller.ratingCount}})</span>
					<span>月售{{seller.sellCount}}单</span>
				</p>
				<ul>
					<li>
						<p>起送价</p>
						<p>{{seller.minPrice}} <small>元</small></p>
					</li>
					<li>
						<p>商家配送</p>
						<p>{{seller.deliveryPrice}} <small>元</small></p>
					</li>
					<li>
						<p>平均配送时间</p>
						<p>{{seller.deliveryTime}} <small>分钟</small></p>
					</li>
				</ul>
			</div>
			<split></split>
		    	<div class="notice">
		    		<h3>公告与活动</h3>
		    		<p>{{seller.bulletin}}</p>
		    		<ul v-if="seller.supports">
		    			<li v-for="(support, index) in seller.supports" :key="index">
		    				<span class="icon" :class="supportIcon(support.type)"></span>
		    				<span>{{support.description}}</span>
		    			</li>
		    		</ul>
		    	</div>
		    	<split></split>
		    	<div class="img-group-wrap">
		    		<h3>商家实景</h3>
		    		<div class="img-group" v-if="seller.pics" ref="imgWrap">
		    			<div class="picList"  ref="picList">
			    			<div class="img" v-for="(pic, index) in seller.pics" :key="index">
			    				<img :src="pic" width="120">
			    			</div>
		    			</div>
		    		</div>
		    	</div>
		    	<split></split>
		    	<div class="info">
		    		<h3>商家信息</h3>
		    		<ul v-if="seller.infos">
		    			<li v-for="(info, index) in seller.infos" :key="index">
		    				<span>{{info}}</span>
		    			</li>
		    		</ul>
		    	</div>
		    	<split></split>
		</div>
	    	
	</div>
</template>
<script>
	import star from "components/star/Star";
	import split from "components/split/Split";
	import BScroll from "better-scroll";
	export default {
		props : {
			seller : {
				type : Object,
				default : {}
			}
		},
		data() {
			return {}
		},
		created() {
			this.$nextTick(() => {
				this._initScroll();
				this._initPics();
			})
		},
		methods : {
			supportIcon(type) {
				return "icon-" + type ;
			},
			_initScroll() {
				if(!this.sellerScroll) {
					this.sellerScroll = new BScroll(this.$refs.sellerWrap,{})
				}
				else {
					this.sellerScroll.refresh()
				}
			},
			_initPics() {
				let oImg=this.$refs.picList.querySelectorAll("img");
				let marg=6;
				let w=(oImg[0].width+marg)*oImg.length-marg
				this.$refs.picList.style.width=w+"px";
				if(!this.picScroll){
					this.picScroll = new BScroll(this.$refs.imgWrap, { scrollX : true, click: true, eventPassthrough: 'vertical'})	
				}
				else {
					this.picScroll.refresh()
				}
			}
		},
		components : {
			star,
			split
		}
	}
</script>
<style scoped lang="scss">
	@import "../../common/scss/mixin";
	.title {
		font-size: 16px;
		line-height: 22px;
		color: #000;

	}
	.seller {
		position: absolute;
		top: 170px;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
		.seller-cont {
			
			.totality {
				width: 100%;
				padding: 16px 12px;
				@include border-1px(#e5e5e5);
				> h3 {
					@extend .title
				}
				> p {
					color: #4e555b;
					display: inline-block;
					padding-bottom: 14px;
					font-size: 0;
					@include border-1px(#e5e5e5);
					span {
						font-size: 14px;
						line-height: 26px;
						padding-left: 10px;
					}
					.star {
						display: inline-block;
						margin-top: 3px;
						vertical-align: top;
					}

				}
				ul {
					display: flex;
					padding-top: 18px;
					li {
						flex: 1;
						border-right: 1px solid #e5e5e5;
						p {
							font-size: 10px;
							color: #98999b;
							text-align: center;
							&:last-child {
								font-size: 20px;
								line-height: 30px;
								color: #000;
								small {
									font-size: 50%;
								}
							}

						}
					}
				}
			}
			.notice {
				padding: 10px 16px;
				> h3 {
					@extend .title
				}
				> p {
					font-size: 12px;
					line-height: 24px;
					color: #ef1e17;
					padding: 0 14px 16px;
					@include border-1px(#e5e5e5);
				}
			}
			ul {
				li {
					font-size: 0;
					padding: 14px 0;
					@include border-1px(#e5e5e5);
					&:last-of-type {
						@include border-1px(#fff);
					}
					.icon {
						width: 18px;
						height: 18px;
						border-radius : 2px;
						background-size: 100% 100%;
						background-position: center center;
						vertical-align: top;
						margin-right: 8px;
						&.icon-0 {
							@include bg-image("decrease_4");
						}
						&.icon-1 {
							@include bg-image('discount_4');
						}
						&.icon-2 {
							@include bg-image('guarantee_4');
						}
						&.icon-3 {
							@include bg-image('invoice_4');
						}
						&.icon-4 {
							@include bg-image('special_4');
						} 
					}

					span {
						display: inline-block;
						&:nth-child(2) {
							font-size: 12px;
							line-height: 18px;
							color: #000;
						}
					}
				}
			}
			.img-group-wrap {
				padding: 10px 16px;
				h3 {
					padding-bottom: 10px;
					@extend .title;
				}
				.img-group {
					overflow: hidden;
					.picList {
						display: flex;	
							.img {
							flex: 0 0 120px;
							width: 120px;
							height: 90px;
							overflow: hidden;
							margin-right: 6px;
							&:last-child {
								margin-right: 0;
							}
						}
					}
					
				}
			}
			.info {
				padding: 10px 16px;
				h3 {
					@extend .title
				}
				li {
					padding: 14px 0;
					font-size: 12px;
					line-height: 18px;
					@include border-1px(#e5e5e5);
					&:last-of-type {
						@include border-1px(#fff);
					}
				}
			}
		}
	}
</style>