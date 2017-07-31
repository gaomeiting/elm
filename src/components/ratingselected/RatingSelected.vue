<template>
	<div class="ratingselected">
		<div class="nav">
			<span @click="select(0,$event)" class="positive" :class="{'positive-active':selectedType==0}">{{desc.all}}<small>&nbsp;{{ratings.length}}</small></span>
			<span @click="select(1,$event)" class="positive" :class="{'positive-active':selectedType==1}">{{desc.positive}}<small>&nbsp;{{positive.length}}</small></span>
			<span @click="select(2,$event)" class="nagtive" :class="{'nagtive-active':selectedType==2}">{{desc.nagtive}}<small>&nbsp;{{nagtive.length}}</small></span>
		</div>
		<div class="nav-fiter" @click="toggle" :class="{'active' : onlyCont == true}">
			<div class="icon">
				<i class="icon-check_circle"></i>
			</div>
			<p class="text">只看有内容的评价</p>
		</div>
	</div>
</template>

<script>

export default {
    props : {
       ratings : {
            type : Array,
            default() {
            	return []
            }
        },
        selectedType : {
            type : Number,
            default : 0
        },
        onlyCont : {
            type : Boolean,
            default : true
        },
        desc : {
            type : Object,
            default() {
                return {
                    all : '全部',
                    positive : '满意',
                    nagtive : '不满意'
                }
            }
        }
        
    },
    computed : {
    	positive() {
    		return this.ratings.filter((rating) => {
    			return rating.rateType === 0;
    		})
    		
    	},
    	nagtive() {
    		return this.ratings.filter((rating) => {
    			return rating.rateType === 1;
    		})
    		
    	}
    },
    methods : {
    	select(type, event) {
    		if(!event._constructed){
    			return;
    		}
    		this.$emit('select', type);
    	},
    	toggle(event) {
    		if(!event._constructed){
    			return;
    		}
    		this.$emit('toggle');
    	}
    }
}
</script>


<style scoped lang="scss">
@import '../../common/scss/mixin.scss';
.ratingselected {
	.nav {
		font-size: 0;
		padding-bottom: 18px;
		@include border-1px(#f7f7f7);
		span {
			display: inline-block;
			width: 60px;
			height: 32px;
			border-radius: 2px;
			line-height: 32px;
			text-align: center;
			font-size: 12px;
			color: #4d555d;
                        		margin-right: 8px;
			&.positive {
				background-color: rgba(0,160,220,0.2)
			}
			&.positive-active {
				background-color: rgb(0,160,220);
				color: #fff;
			}
			&.nagtive {
				background-color: rgba(77,85,93,0.2);
			}
			&.nagtive-active {
				background-color: rgb(77,85,93);
				color: #fff;
			}
		}

	}
	.nav-fiter {
		color: rgb(147,153,159);
		font-size: 0;
		padding: 10px 0;
		.icon {
			display: inline-block;
			font-size: 20px;
			vertical-align: top;
		}
		.text {
			display: inline-block;
			font-size: 12px;
			line-height: 26px;
			text-indent: 4px;

		}
		&.active {
			.icon {
				color: rgb(0,200,80);
			}
		}
	}
}
</style>
