<template>
<div class="scroll-wrap ratings-wrap" ref="ratingsWrap">
    <div class="ratings">
     	<div class="ratings-header">
     		<div class="score">
     			<span>{{seller.score}}</span>
     			<span>综合评分</span>
     			<span>高于周边商家{{seller.rankRate}}%</span>
     		
     		</div>
     		<div class="star-wrap">
     			<div class="serviceScore">
     				<span>服务态度</span>
				<star :size="36" :score="seller.serviceScore"></star>
				<span>{{seller.serviceScore}}</span>
     			</div>
     			<div class="serviceScore">
     				<span>商品评分</span>
				<star :size="36" :score="seller.score"></star>
				<span>{{seller.score}}</span>
     			</div>
     			<div class="time">
     				送达时间&nbsp;{{seller.deliveryTime}}分钟
     			</div>
     		</div>
     	</div>
     	<split></split>
     	<div class="ratings-con">
     		<div class="con-nav">
     			<ratingselected @select="changedRating" @toggle="toggleCon" :ratings="ratings" :selectedType="selectedType" :onlyCont="onlyCont"></ratingselected>
     		</div>
     		<div class="con-wrap" v-if="ratings.length">
     			<div class="user-rating" v-for="(rating, index) in ratings" :key="index" v-show="needShow(rating.rateType, rating.text )">
     				<div class="avatar">
     					<img :src="rating.avatar" >
     				</div>
     				<div class="user-rat-con">
     					<p class="name">{{rating.username}}</p>
     					<div class="score-wrap">
     						<star :score="rating.score" :size="36"></star><span v-if="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
     					</div>
     					<p class="text">{{rating.text}}</p>
     					<div class="tag" v-if="rating.recommend.length">
     						<div class="icon">
     							<i :class="rating.score > rating.score/2 ? 'icon-thumb_up' : 'icon-thumb_down'"></i>
     						</div>
     						<ul>
     							<li v-for="tag in rating.recommend">{{tag}}</li>
     						</ul>
     					</div>
     					<div class="time">{{ rating.rateTime | formatDate }}</div>
     				</div>
     			</div>
     		</div>
     	</div>
    </div>
</div>
</template>
<script>
	import BScroll from 'better-scroll';
	import Star from "components/star/Star";
	import Split from "components/split/Split";
	import RatingSelected from "components/ratingselected/RatingSelected";
	import {formatDate} from "../../common/js/data";
const errCode=0;

    export default {
        props : {
        	seller : {
        		type : Object
        	}
        },
        data() {
        	return {
        		ratings : [],
        		ratingType : 2,
        		ratingText : true,
        		selectedType : 0,
        		onlyCont : true
        	}
        },
        created() {
        	this.$http.get('/api/ratings').then( (res) => {
        		res=res.body;
        		if(res.errno == errCode){
        			this.ratings=res.data;
                                        this.$nextTick((res) => {
        				this._initScroll()
        			})
        		}
        	},(res) => {} )
        },
        methods : {
        	_initScroll() {
        		this.ratingsScroll=new BScroll(this.$refs.ratingsWrap, { click: true });
        	},
        	needShow(type, text) {
        		if(this.onlyCont && !text){
        			return false;
        		}
        		if(this.ratingType===2){
        			return true;
        		}
        		else {
        			return type ===this.ratingType;
        		}
        		
        	},
        	changedRating(type) {
		this.selectedType=type;
    		if(type == 0){
        			this.ratingType=2;	
        		}
        		else if(type == 1){
        			this.ratingType=0;	
        			
        		}
        		else {
        			this.ratingType=1;	
        			
        		}
        		this.$nextTick(() => {
        			this.ratingsScroll.refresh()
        		})
        	},
        	toggleCon() {
        		this.onlyCont = !this.onlyCont;
        		this.$nextTick(() => {
        			this.ratingsScroll.refresh()
        		})

        	}
        },
        components : {
        	star : Star,
        	split : Split,
        	ratingselected : RatingSelected
        },
        filters : {
        	formatDate( time) {
        		let data = new Date( time );
        		return formatDate(data,'yyyy-MM-dd hh:mm');
        	}
        }
    }
</script>
<style scoped lang="scss">
@import '../../common/scss/mixin.scss';
	.ratings-wrap {
		bottom: 0;
	}
	.ratings {
		.ratings-header {
			display: flex;
			padding: 18px 0;
			font-size: 12px;
			@include border-1px (#e8e8e8);
			.score {
				flex: 0 0 138px;
				border-right: 1px solid #e6e6e6;
				span {
					display: block;
					text-align: center;
					&:nth-child(1) {
						font-size: 22px;
						color: #ff9a0a;
						line-height: 32px;
					}
					&:nth-child(2) {
						color: #000;
						line-height: 22px;
					}
					&:nth-child(3) {
						font-size: 10px;
						line-height: 20px;
					}
				}
			}
			.star-wrap {
				flex : 1;
				padding-left: 24px;
				@media only screen and (max-width: 320px){
					padding-left: 2px;
				}
				box-sizing: border-box;
				font-size: 0;
				.serviceScore {
					display: inline-block;
					padding-bottom: 14px;
					font-size: 0;
					.star{
						display: inline-block;
						vertical-align: top;
					
					}
					span {
						font-size: 12px;
						display: inline-block;
						&:nth-child(1) {
							color: #000;
						}
					}
				}
				
				.time {
					font-size: 12px;
				}
			}	
		}
		.ratings-con {
                            	.con-nav {
                            		padding: 16px 16px 0;
                            	}
			.user-rating {
				padding: 16px 12px;
				display: flex;
				@include border-1px(#e8e8e8);
				position: relative;
				.time {
					position: absolute;
					font-size: 10px;
					top: 16px;
					right: 12px;
					color: #b7babf;
				}
				.avatar {
					flex: 0 0 30px;
					width: 30px;
					height: 30px;
					border-radius: 50%;
					overflow: hidden;
					img {
						width: 100%;
						min-height: 100%;
					}
				}
				.user-rat-con {
					flex: 1;
					color: #000;
					padding-left: 10px;
					.name {
						font-size: 10px;
					}
					.score-wrap {
						font-size: 0;
						.star {
							display: inline-block;
							vertical-align: top;
							transform: scale(0.8);
							margin-left: -14.4px;
						}
						> span {
							display: inline-block;
							color: #96979b;
							font-size: 12px;
						}
					}
					.text {
						font-size: 12px;
						line-height: 18px;

					}
					.tag {
						display: flex;
						.icon {

							display: inline-block;
							vertical-align: top;
							font-size: 12px;
							color: #009cdc;
							margin-top: 8px;
						}
						ul {
							flex: 1;
							li {
								display: inline-block;
								width: 62px;
								height: 16px;
								margin: 8px 4px 0;
								text-align: center;
								line-height: 16px;
								font-size: 10px;
								border: 1px solid #e8e8e8;
								border-radius: 2px;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
							}
						}
					}
				}

			}
		}
	}    
</style>