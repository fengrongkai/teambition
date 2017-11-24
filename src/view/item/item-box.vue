<template>
	<div class="item-box" :style="{height:height,}">
		<div class="item-cont" ref="itemContent">
			<ul class="item-task" :data-id='item.id'>
				<renwu v-for="task,index in item.task" key="index" :task='task' @ww="fn" :itemu='item'></renwu>
				<!--<li class="clearfix renwu">
					<i class = "iconfont icon-xuankuang fl"></i>
				</li>-->
			</ul>
		   	<buildTask v-if="state" :item='item' :state='state'></buildTask>
		</div>
	</div>
</template>

<script>
	import renwu from '@/view/item/renwu';
	import bus from '@/components/bus';
	import buildTask from '@/view/item/buildTask';
	export default {
		data(){
			return {
				n:1,
				height:'',
				f:'',
			}
		},
		props:['item',"state"],
		components:{
			renwu,
			buildTask,
		},
		computed:{
			
		},
		beforeRouteEnter (to, from, next) {
			console.log(234)  //这是不会执行的，只在路由指定的组件中执行，当在指定的组件的子组件中时是不会执行的
			next();
		},
		beforeRouteLeave(to,from,next){
			console.log(234) //不会执行这个钩子函数
			window.removeEventListener('resize',this.f)
			next();
		},
		beforeDestroy(){
			//console.log('销毁了')
			window.removeEventListener('resize',this.f);
			bus.$off('ok', this.f);
		},
		methods:{
			fn: function (){
				
				//console.log(190000)
				let that = this;
				if(that.$route.name!='mainx'){
					return
				}
				//console.log(this.$refs.itemContent)
				var oitem=that.$refs.itemContent;//console.log(oitem)
				var itemHeight=oitem.clientHeight;
				var contentHeight=document.documentElement.clientHeight-119;
				contentHeight-=96;
				if(contentHeight<itemHeight){
					that.height=contentHeight+'px';
				}else{
					that.height=itemHeight+8+'px';
				}
			   
			}
		},
		
		updated(){
			this.fn();
		},
		mounted(){
				
			//计算item-box的高度
			var  that=this;
			this.f = this.fn.bind(this)
			bus.$on('ok',this.f);
			this.fn();
			window.addEventListener('resize',this.f)	
		}
	}
</script>

<style>
	.item-box{
		overflow-y:auto;
	}
	.item-task{
		position:relative;
	}
</style>