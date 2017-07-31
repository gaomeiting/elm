<template>
<transition name="move">
	<div class="food-wrap" v-show="showFlag" ref="foodWrap">
		<div class="food">
			<div class="food-img">
				<img :src="selectFood.image">
				<i class="icon-arrow_lift" @click="hide"></i>
			</div>
			<div class="introduce pos">
				<h3>{{selectFood.name}}</h3>
				<p><span>月售{{ selectFood.sellCount }}份</span>好评率{{selectFood.rating}}%<span></span></p>
				<p><span><small>¥</small>{{ selectFood.price }}</span><small v-if="selectFood.oldPrice">¥{{ selectFood.oldPrice }}</small></p>
				<transition name="fade" v-if="!selectFood.count || selectFood.count==0">
					<a href="javascript:;" class="btn" @click="addCount">加入购物车</a>
				</transition>
				<cartconcontrol v-else :food="selectFood"></cartconcontrol>
			</div>
			<split></split>
			<div class="introduce" v-if="selectFood.info">
				<h3>商品介绍</h3>
				<p>{{selectFood.info}}</p>
			</div>
			<split></split>
			<div class="introduce" v-if="selectFood.ratings">
				<h3>商品评价</h3>
				<ratingselected @toggle="foodToggle" @select="filterSelect" :ratings="selectFood.ratings" :onlyCont="selectOnlyCont" :selectedType="selectedTypeFood" :desc="{all:'全部', positive: '推荐', nagtive: '吐糟'}"></ratingselected>
				<div class="ratings">
					<div class="rating" v-for="rating in selectFood.ratings" v-show="foodShow(rating.rateType, rating.text)">
						<p>{{rating.rateTime}}</p>
						<p><i class="icon" :class="rating.rateType > 0 ? 'icon-thumb_down' :'icon-thumb_up'"></i><span>{{rating.text}}</span></p>
						<div class="user">
							<p>{{rating.username}}</p>
							<div><img :src="rating.avatar" alt=""></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</transition>
</template>
<script>
import split from 'components/split/Split'; 	
import ratingselected from 'components/ratingselected/RatingSelected'; 	
import cartconcontrol from 'components/cartconcontrol/cartconcontrol'; 	
import BScroll from 'better-scroll'; 	
export default {
	props : ['selectFood'],
	data() {
		return {
			showFlag : false,
			selectedTypeFood : 0,
			selectOnlyCont: false
		}
	},
	created() {
		
	},
	computed : {
	},
	methods : {
		show(){
			this.showFlag=!this.showFlag;
			this._foodScroll()
		},
		hide() {
			this.showFlag=false
		},
		addCount(event) {
			if(!event._constructed){
				return
			}
			if(this.selectFood.count){
				this.selectFood.count++	
			}
			else {
				this.$set(this.selectFood, 'count', 1)
			}
		},
		filterSelect(type) {
			this.selectedTypeFood=type;
			this._foodScroll();
		},
		foodShow(type, text) {
			if( this.selectOnlyCont && !text ) {
				return false;
			}
			if(this.selectedTypeFood==1) {
				if(type==0)
					return true
			}
			else if(this.selectedTypeFood==2){
				if(type==1)
					return true

			}
			else {
				return true
			}
		},
		foodToggle(){
			this.selectOnlyCont=!this.selectOnlyCont;
			this._foodScroll();
		},
		_foodScroll() {
			this.$nextTick( () => {
				if(!this.foodScroll){
					this.foodScroll=new BScroll(this.$refs.foodWrap,{ click : true})
				}
				else {
					this.foodScroll.refresh();
				}
			} )
			
		}
	},
	components : {
		split : split,
		ratingselected : ratingselected,
		cartconcontrol : cartconcontrol
	}
}
</script>
<style scoped lang="scss">
	@import '../../common/scss/mixin.scss';
	.food-wrap {
		width: 100%;
		background-color: #fff;
		position: absolute;
		z-index: 980px;
		left: 0;
		top: 0;
		bottom: 48px;
		overflow: hidden;
	}
	.food {
		width: 100%;
		.food-img {
			position: relative;
			overflow: hidden;
			&:after {
				content: '';
				display: block;
				padding-top: 100%;
			} 
			> img {
				position: absolute;
				top: 0;
				width: 100%;
				min-height: 100%;
			}
			.icon-arrow_lift {
				position: absolute;
				color: #fff;
				font-size: 18px;
				padding: 16px 10px;
			}
		}
		.introduce {
			padding: 18px;
			&.pos {
				position: relative;
			}
			h3 {
				font-size: 16px;
				color: #000;
				padding-bottom: 12px;
				font-weight: normal;
			}
			p {
				font-size: 12px;
				color: #545557;
				line-height: 22px;
			}
			.btn { 
				display: inline-block;
				background-color: #00a0dc;
				padding: 0 12px;
				height: 24px;
				line-height: 24px;
				font-size: 12px;
				color: #fff;
				border-radius: 12px;
				position: absolute;
				right: 10px;
				bottom: 14px;
			}
			.ratings {
				border-top: 1px solid #e5e5e5;
				.rating {
					padding: 12px 0;
					position: relative;
					@include border-1px(#e5e5e5);
					p {
						&:first-child {
							font-size: 10px;
							line-height: 18px;
						}
						&:nth-child(2) {
							font-size: 0;
							i {
								display: inline-block;
								font-size: 14px;
								line-height: 20px;
								margin-right: 4px;
								vertical-align: top;
							}
							span {
								display: inline-block;
								font-size: 12px;
								line-height: 20px;
								color: #000;
							}

						}
						.icon {
							font-size: 16px;
							&.icon-thumb_down {
								color: #b7babf;
							}
							&.icon-thumb_up {
								color: #089dd5;
							}
						}

					}
					.user {
						position: absolute;
						right: 0;
						top: 12px;
						font-size: 0;
						p {

							display: inline-block;
							font-size: 12px;
							line-height: 18px;
							margin-right: 6px;
							vertical-align: top;
						}
						div {
							display: inline-block;
							width: 12px;
							height: 12px;
							border: 1px solid #e5e5e5;
							overflow: hidden;
							border-radius: 50%;
							margin-top: 3px;
							img {
								width: 12px;
								min-height: 12px;
							}
						}
					} 
				}
			}
		}
	}
</style>