<template>
    <div class="star" :class="starType">
	<span class="star-item" v-for="(itemClass, index) in itemClasses" :class="itemClass" key="index"></span>
    </div>
</template>
<script>
const onCls="on";
const offCls="off";
const halfCls="half";
const lenStar=5;
    export default {
        props: {
            size: {
                type: Number
            },
            score: {
                type: Number
            }
        },
        computed: {
        	starType: function() {
        		return "star-" + this.size;
        	},
        	itemClasses: function() {
        		let result = [];
        		let score=Math.floor(this.score * 2) / 2;
		let initScore=Math.floor(this.score);
		for(let i=0; i<initScore; i++) {
			result.push(onCls)
		}
        		if(score % 1 ){
        			result.push(halfCls)
        		}
        		while(result.length < lenStar){
        			
        			result.push(offCls)
        		}
        		return result;
        	}
        }
    }
</script>
<style scoped lang="scss">
@import '../../common/scss/mixin.scss';
 	.star {
 		font-size: 0;
 		&.star-48{
 			.star-item {
 				display: inline-block;
				width: 24px;
				height: 24px;
				background-size: cover;
				margin: 0 10px;

	 		}
	 		.on {
	 			@include bg-image (star48_on)
	 		}
	 		.half {
	 			@include bg-image (star48_half)
	 		}
	 		.off {
	 			@include bg-image (star48_off)
	 		}
 		}
 		 &.star-36{
		            .star-item {
		                display: inline-block;
		                width: 18px;
		                height: 18px;
		                background-size: cover;
		                margin: 0 2px;
		             }
		              .on {
		                   @include bg-image (star36_on)
		              }
		             .half {
		                   @include bg-image (star36_half)
		              }
		              .off {
		                   @include bg-image (star36_off)
		              }
		            
		}
 		
 	}
</style>