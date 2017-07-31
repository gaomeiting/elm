<template>
    <div class="cartconcontrol">
    	<transition name="move">
    		<i class="icon-remove_circle_outline" v-if="food.count" @click.stop.prevent="removeCart"></i>
    	</transition>
    	<span class="count" v-if="food.count">{{food.count}}</span>
    	<i class="icon-add_circle" @click.stop.prevent="addCart"></i>
    </div>
</template>
<script>
	export default {
		props : ['food'],
		methods: {
			addCart(event) {
				if(!event._constructed) {
					return
				}
				if(!this.food.count) {
					this.$set( this.food, 'count', 1)
				}else {
					this.food.count++
				}
				this.$emit('add', event.target);
			},
			removeCart() {
				if(!event._constructed) {
					return
				}
				if(this.food.count) {
					this.food.count--
				}
			}
		}
    	}
</script>
<style scoped lang="scss">
	.move-enter-active, .move-leave-active {
		transform: translateX(0) rotate(0);
		opacity: 1;
		transition: .3s linear;
	}
	.move-enter, .move-leave-active {
		transform: translateX(30px) rotate(180deg);
		opacity: 0;
		transition: .3s linear;
	}
	.cartconcontrol {
		position: absolute;
		bottom: 12px;
		right: 10px;
		font-size: 20px;
		i, span {
			display: inline-block;
			vertical-align: top;
			color: #00a0dc;
		}
		.count {
			font-size: 14px;
			line-height: 20px;
			color: #93999f;
		}
	}
</style>