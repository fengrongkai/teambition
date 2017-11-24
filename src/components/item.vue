<template>
	<div class="item" :style="{left:left,}">
        	<div class="item-title clearfix">
        		<h2 class="fl item-h2">{{item.title}}</h2>
        		<i class = "iconfont icon-xiala fr" @click='st=!st'></i>
        		<listMenu v-show='st' @cancel="cancel" :sta='st' :item="item"></listMenu>
        	</div>
        	<itemBox :item='item' :state='state'></itemBox>
        	<!--<div class="item-box">
        		<div class="item-content">
        			<ul class="item-task">
        				<li>
        					<i class = "iconfont icon-xuankuang fl"></i>
        				</li>
        			</ul>
        		
        		</div>
        	</div>-->
        		<p class="addTask clearfix" @click="fn" v-show="!state" ref="addTask">
        			 <i class="icon iconfont icon-iconmianxingshujutianjia fl"></i>
        			<span class="fl">添加任务</span>
        		</p>
        </div>
</template>

<script>
	import itemBox from '@/view/item/item-box';
	import bus from '@/components/bus';
	import listMenu from '@/view/item/item-head/list-menu';
	export default {
		data(){
			return {
			   st:false,
			   state:false,
			}
		},
		props:['item','index'],
		computed:{
			left(){
				return this.index*298+'px'
			}
		
		},
		components:{
			itemBox,
			listMenu,
			bus,
		},
		methods:{
			cancel(){
				this.st=false;
			},
			fn(){
				this.state=true,
				document.addEventListener('click',this.fc);
			},
			fc(ev){//点击添加任务的输入框以外的地方时，关闭添加任务的编辑栏
				let f=this.$el;
				let f2=f.querySelector('.buildTask');
				let nodes=f2.getElementsByTagName("*");
				let timetangchuang=document.querySelector('.time-tangchuang');
		  		let nodes3=timetangchuang.getElementsByTagName("*");
				let arr=[...nodes,f2,timetangchuang,...nodes3];
				let addTask=this.$refs.addTask;
//				let zxz=document.querySelector('.zxz');
//				let zxzNodes=zxz.getElementsByTagName("*");
//				let arr2=[...zxzNodes,zxz];
//				if(arr2.indexOf(ev.target)!=-1){
//					return;
//				}
				if(arr.indexOf(ev.target)==-1&&ev.target!=addTask&&ev.target.parentNode!=addTask){
					bus.$emit('reset')
					this.state=false;
					document.removeEventListener('click',this.fc);
				}
			}
		}
	}
</script>

<style>
	.addTask{
		height:48px;
		font:15px/48px "微软雅黑";
		color:#0c92f3;
		padding-left:23px;
	}
	.addTask .icon-iconmianxingshujutianjia{
		padding-right:10px;
	}
	.item-title{
		position: relative;
	}
</style>