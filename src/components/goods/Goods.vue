<template>
<div class="goods_wrap">
	<div class="goods">
		<div class="menu_wrap" ref="menuWrap">
			<div class="goods_menu">
				<div class="comMenuItem" v-for="(item, index) in goods" :key="index" :class="{'active': index===currentIndex}" @click="selectMenu(index)">
					<span class="icon" v-if="item.type > 0" :class="classMap[item.type]"></span>
					<span class="text">{{ item.name }}</span>
				</div>
			</div>
		</div>
		<div class="content_wrap" ref="contentWrap">
			<div class="goods_content">
				<div class="contentItem contentItemHook" v-for="(item, index) in goods" :key="index" ref="foodlist">
					<h3 class="name">{{item.name}}</h3>
					<div class="food" v-for="food in item.foods" @click="selectItem(food, $event)">
						<figure>
							<img :src="food.image" width="58" height="58" >
						</figure>
						<div class="foodCon">
							<p class="foodName">
								{{food.name}}
							</p>
							<p class="description" v-if="food.description">
								{{food.description}}
							</p>
							<p class="info">
								<span class="sellCount">月售{{food.sellCount}}份&nbsp;&nbsp;</span><span class="rating">好评率{{food.rating}}%</span>
							</p>
							<p class="priceRow">
								<span class="price"><small>¥</small><strong>{{food.price}}&nbsp;</strong></span>
								<small class="oldPrice" v-if="food.oldPrice">{{food.oldPrice}}</small>
							</p>
						</div>
						<cartconcontrol @add="addFood" :food="food"></cartconcontrol>
					</div>
				</div>
			</div>
		</div>
	</div>
	<shopcart ref="shopcart" :minPrice="seller.minPrice" :deliveryPrice="seller.deliveryPrice" :selectFoods="selectFoods"></shopcart>
	<food :selectFood="selectFood" ref="food"></food>
</div>
</template>
<script>
	import BScroll from 'better-scroll';
	import Shopcart from 'components/shopcart/shopcart';
	import Cartconcontrol from 'components/cartconcontrol/cartconcontrol';
	import food from 'components/food/food';
	const errNo = 0;
export default {
	props: {
		seller: {
			type: Object
		}
	},
    	data() {
    		return {
    			goods: [],
    			scrollY: 0,
    			listHei: [],
    			selectFood: Object
    		}
    	},
    	created() {
    		this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    		this.$http.get('/api/goods').then((res) => {
    			if(res.body.errno === errNo) {
    				this.goods=res.body.data
    				this.$nextTick(() => {
				            this._initScroll();
				            this._caculHeight();
				});
    			}
    		}, (res) => {})
    	},
    	computed: {
    		currentIndex() {
    			if(this.scrollY < this.listHei[0] -10){
    				return 0;
    			}
    			for(let i=0; i<this.listHei.length-1; i++){
    				if( this.scrollY >= this.listHei[i] -10 && this.scrollY < this.listHei[i+1]){
    					return i+1;
    				}
    			}
    		},
    		selectFoods() {
    			let foods=[]
    			this.goods.forEach((good) => {
    				good.foods.forEach((food) => {
    					if(food.count){
    						foods.push(food)
    					}
    				} )
    			})
    			return foods
    		}
    	},
    	methods: {
    		selectMenu(index) {
    			console.log(this.listHei[index-1])
    			let el = this.$refs.foodlist[index]
    			this.foodsScroll.scrollToElement(el, 500)
    		},
    		addFood(target) {
		        this._drop(target);
		},
		selectItem(item, event) {
			if(!event._constructed) {
				return;
			}
			this.selectFood=item;
			this.$refs.food.show();
		},
		_drop(target) {
		        // 体验优化,异步执行下落动画
		        this.$nextTick(() => {
		          this.$refs.shopcart.drop(target);
		        });
		 },
    		_initScroll() {
    			this.menuScroll=new BScroll(this.$refs.menuWrap, { click: true });
    			this.foodsScroll=new BScroll(this.$refs.contentWrap, { click: true, probeType: 3 });
    			this.foodsScroll.on("scroll", (pos) => {
    				this.scrollY=Math.abs(Math.round(pos.y))
    			})
    		},
    		_caculHeight() {
    			let els=this.$refs.contentWrap.getElementsByClassName("contentItemHook");
    			let hei=0;
    			for(let i=0; i<els.length; i++){
    				hei+=els[i].offsetHeight;
    				this.listHei.push(hei)
    			}
    		}
    	},
    	components: {
    		shopcart: Shopcart,
    		cartconcontrol: Cartconcontrol,
    		food : food
    	}
    }
</script>
<style scoped lang="scss">
	@import '../../common/scss/mixin.scss';

	.goods {
		position: absolute;
		top: 170px;
		bottom: 48px;
		width: 100%;
		overflow: hidden;
		display: flex;
		.menu_wrap {
			flex: 0 0 80px;
			width: 80px;
			
			.goods_menu {
					
			}
			.comMenuItem{
				padding: 12px;
				font-size: 14px;
				line-height: 18px;
				background-color: #f4f5f7;
				@include border-1px-80(#dddee0);
				.icon {
					display: inline-block;
					vertical-align: top;
					width: 12px;
					height: 12px;
					background-size: cover;
					margin-top: 3px;
					border: 1px solid rgba(255,0,0,0.5);
					border-radius: 2px;
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
				.text {
					color: #000;
				}
			}
			.active {
				background-color: #fff;
				@include border-1px-80(#fff);
			}
		}
		.content_wrap {
			flex: 1;
			.name {
				font-size: 14px;
				line-height: 26px;
				background-color: #f4f5f7;
				border-left: 1px solid #dadde2;
				text-indent: 1em;
				color: #91969c;
				font-weight: normal;
			}

			.food {
				display: flex;
				padding: 16px;
				position: relative;
				@include border-1px(#ddd);
				&:last-child {
					@include border-1px(#fff)
				}
				.foodCon {
					padding-left: 10px;
				}
				figure {
					flex: 0 0 58px;
					width: 58px;
					border-radius: 2px;
					overflow: hidden;
				}
				.foodName {
					font-size: 16px;
					line-height: 18px;
					color: #000;
				}
				.description{
					font-size: 12px;
					line-height: 20px;
					max-height: 40px;
					overflow-y: hidden;
				}
				.info {
					font-size: 12px;
					line-height:  16px;
				}
				.priceRow{
					font-size: 14px;
					small {
						font-size: 80%;
					}
					strong {
						color: #ff0000;
					}
					.oldPrice {
						text-decoration: line-through;
						vertical-align: top;
						font-weight: bold;
						font-size: 85%;
					}
				}
			}
		}
	}
    
</style>