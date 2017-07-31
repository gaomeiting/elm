<template>
    <div class="shopcart">
    	<div class="shopcart-con" @click.stop.prevent="toggleList">
	    	<div class="cacul">
	    		<div class="icon" :class="{'active': totalCount}">
	    			<i class="icon-shopping_cart"></i>
	    			<span v-if="totalCount">{{totalCount}}</span>
	    		</div>
	    		<p class="pay" :class="{'ok': totalCount}">¥{{ totalPrice }}</p>
	    		<p class="pay_info" v-if="deliveryPrice">另需配送费{{ deliveryPrice }}元</p>
	    	</div>
	    	<div class="btn" @click.stop.prevent="submitPrice">
	    		<div v-if="totalCount==0">¥{{minPrice}}起送</div>
		    	<div v-else-if="totalPrice<minPrice">还差{{ minPrice - totalPrice }}元起送</div>
		    	<div class="ok" v-else>结算</div>
	    	</div>
    	</div>
    	<div class="ball-container">
    		 <div v-for="ball in balls">
	    		<transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
	    			<div v-show="ball.show" class="ball">
	    				<div class="inner inner-hook"></div>
	    			</div>
	    		</transition>
    		</div>
    	</div>
    	<transition name="fadeInUp">
	    	<div class="shopcart-list" v-show="listShow">
	    		<h3 class="title">
	    			<span>购物车</span>
	    			<span @click="clearCount">清空</span>
	    		</h3>
			
	    		<div class="list-con" ref="listCon">
	    			<div class="list-con-scroll">
		    			<div class="food-item" v-for="(food, index) in selectFoods" :key="index">
		    				<div class="item-info">
		    					<span>{{food.name}}</span>
		    					<span>¥{{food.count * food.price}}</span>
		    				</div>
		    				<cartconcontrol @add="addFood" :food="food"></cartconcontrol>
		    			</div>
	    			</div>
	    		</div>
	    		
	    	</div>
    	</transition>
    	<transition name="fade">
    		<div class="mask" v-show="listShow" @click.stop.prevent="maskHide"></div>
    	</transition>
    </div>
</template>
<script>
	import BScroll from 'better-scroll';
	import Cartconcontrol from 'components/cartconcontrol/cartconcontrol';
	export default {
		props : {
			selectFoods : {
				type : Array
			},
			minPrice : {
				type: Number,
				default: 0
			},
			deliveryPrice : {
				type : Number,
				default: 0
			}
		},
		data() {
			return {
				balls: [
					{ show: false },
					{ show: false },
				          	{ show: false },
				          	{ show: false },
				          	{ show: false}
				        ],
				dropBalls: [],
				fold: false
			};
		},
		computed: {
			totalPrice() {
				let price=0;
				this.selectFoods.forEach((food) => {
					price += food.price * food.count
				})
				return price
			},
			totalCount() {
				let count=0;
				this.selectFoods.forEach((food) => {
					count += food.count
				})
				return count
			},
			listShow() {
				if (!this.totalCount) {
				          this.fold = true;
				          return false;
				}
				let show = !this.fold;
				if (show) {
				          this.$nextTick(() => {
				            if (!this.scroll) {
				              this.scroll = new BScroll(this.$refs.listCon, {
				                click: true
				              });
				            } else {
				              this.scroll.refresh();
				            }
				          });
				}
				return show;
			}
		},
		methods: {
			submitPrice() {
				window.alert(`支付${this.totalPrice}元`);
			},
			maskHide() {
				this.fold=true;
			},
			toggleList() {
			        if (!this.totalCount) {
			          return;
			        }
			        this.$nextTick(() => {
			            if (!this.scroll) {
			              this.scroll = new BScroll(this.$refs.listCon, {
			                click: true
			              });
			            } else {
			              this.scroll.refresh();
			            }
			          });
			        this.fold = !this.fold;
			},
			clearCount() {
				this.selectFoods.forEach((food) => {
					//console.log(food.count)
					food.count = 0;
				})
			},
			addFood(target) {
				this.drop(target);
			},
			drop(el) {
			        for (let i = 0; i < this.balls.length; i++) {
			          let ball = this.balls[i];
			          if (!ball.show) {
			            ball.show = true;
			            ball.el = el;
			            this.dropBalls.push(ball);
			            return;
			          }
			        }
			},
			beforeDrop(el) {
			        let count = this.balls.length;
			        while (count--) {
			          let ball = this.balls[count];
			          if (ball.show) {
			            let rect = ball.el.getBoundingClientRect();
			            let x = rect.left - 32;
			            let y = -(window.innerHeight - rect.top - 22);
			            //console.log(x,y)
			            el.style.display = '';
			            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
			            el.style.transform = `translate3d(0,${y}px,0)`;
			            let inner = el.getElementsByClassName('inner-hook')[0];
			            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
			            inner.style.transform = `translate3d(${x}px,0,0)`;
			          }
			        }
			},
			dropping(el, done) {
			        let rf = el.offsetHeight;
			        this.$nextTick(() => {
			          el.style.webkitTransform = 'translate3d(0,0,0)';
			          el.style.transform = 'translate3d(0,0,0)';
			          let inner = el.getElementsByClassName('inner-hook')[0];
			          inner.style.webkitTransform = 'translate3d(0,0,0)';
			          inner.style.transform = 'translate3d(0,0,0)';
			          el.addEventListener('transitionend', done);
			        });
			},
			afterDrop(el) {
			        let ball = this.dropBalls.shift();
			        if (ball) {
			          ball.show = false;
			          el.style.display = 'none';
			        }
			}
		},
		components: {
			cartconcontrol: Cartconcontrol
		}
    	}
</script>
<style scoped lang="scss">
	@import '../../common/scss/mixin.scss';
	@keyframes fadeInUp {
	  from {
	    opacity: 0;
	    transform: translate3d(0, 30%, 0);
	  }

	  to {
	    opacity: 1;
	    transform: none;
	  }
	}

	.fadeInUp-enter-active {
	  animation: fadeInUp .5s;
	}
	.shopcart {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 48px;
		z-index: 990;
		color: #898e92;
		.mask {
			width: 100%;
			height: 100%;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 899;
			background-color: rgba(0,0,0,0.5);
		}
		.shopcart-con{
			display: flex;
			position: relative;
			z-index: 992;
			.ball-container {
				.ball {
			        		position: fixed;
			        		left: 32px;
			        		bottom: 22px;
			        		z-index: 990;
			        		transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
			        		.inner {
				          		width: 16px;
				          		height: 16px;
				          		border-radius: 50%;
				          		background: rgb(0, 160, 220);
				          		transition: all 0.4s linear;
				          	}
			        	}
			        	
			}
			.cacul {
				flex: 1;
				font-size: 0;
				position: relative;
				background-color: #131d26;
				.icon {
					
					width: 46px;
					height: 46px;
					color: #808589;
					text-align: center;
					background-color: #2b343d;
					border: 6px solid #131d26;
					border-radius: 50%;
					position: absolute;
					top: -12px;
					left: 12px;
					z-index: 990;
					span {
						position: absolute;
						min-width: 24px;
						height: 18px;
						line-height: 18px;
						white-space: normal;
						color: #fff;
						background-color: #ff0000;
						border-radius: 9px;
						font-size: 10px;
					}
					.icon-shopping_cart {
						font-size: 24px;
						line-height: 46px;
					}
					&.active {
						color: #fff;
						background-color: #00a0dc;
					}
				}
				.pay {
					display: inline-block;
					vertical-align: top;
					padding: 3px 12px;
					margin: 12px 0 0 70px;
					font-size: 16px;
					font-weight: bold;
					border-right: 1px solid #2c343f;
					&.ok {
						color: #fff;
					}
				}
				.pay_info {
					display: inline-block;
					line-height: 24px;
					font-size: 10px;
					margin: 12px 0 0 12px;
				}
			}
			.btn {
				flex: 0 0 106px;
				width: 106px;
				font-size: 14px;
				font-weight: bold;
				text-align: center;
				line-height: 48px;
				white-space: nowrap;
				background-color: #2b343b;
				.ok {
					background-color: #00b43c;
					color: #fff;
				}
			}
		}
		.shopcart-list {
			position : absolute;
			left: 0;
			bottom: 48px;
			z-index: 900;
			width: 100%;
			background-color: #fff;
			.title {
				height: 34px;
				line-height: 34px;
				background-color: #f4f5f7;
				font-weight: normal;
				@include border-1px(rgba(0,0,0,0.5));
				display: flex;
				span {
					font-size: 16px;
					color: #000;
					padding-left: 18px;
					flex: 1;
					&:nth-child(2) {
						text-align: right;
						padding-right: 18px;
						color: #00a0dc;
					}
				}

			}
			.list-con {
				background-color: #fff;
				max-height: 150px;
				overflow: hidden;
				padding:  0 18px;
				margin-bottom: 22px;
				.food-item {
					color: #000;
					font-size: 14px;
					position: relative;
					@include border-1px(rgba(0,0,0,0.2))
					.item-info {
						width: 100%;
						display: flex;
						span {
							line-height: 48px;
							&:nth-child(1) {
								flex: 1;
							}
							&:nth-child(2) {
								padding-right: 66px;
							}
						}
					}
					
					.cartconcontrol {
						bottom: 8px;
						right: 0;
					}
				}
			}
		}

	}
</style>