<template>
	<div class="chongfu">
		<ul class="chongfu0" @click='fn'>
			<li class="chongfu1 clearfix" v-for="item,index in data" @click="a=index">
				<b class="chongfu2 fl">{{item}}</b>
				<span  class="chongfu3 fr">
					<i class="icon iconfont icon-iconduigou01" v-show="a==index"></i>
				</span>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				data:['不重复','每天重复','每周重复','每月重复','每年重复','工作日重复','自定义重复'],
				a:0,
			}
		},
		props:['item','task','idw','parent'],
		mounted(){
			document.addEventListener('click',this.chongfuClose);
			this.$bus.$on('tangchaung2',this.tangchaung2);
			
		},
		beforeDestroy(){
			document.removeEventListener('click',this.chongfuClose);
			this.$bus.$off('tangchaung2',this.tangchaung2);
		},
		methods:{
			tangchaung2(){
				if(this.idw){
					this.a=this.data.indexOf(this.task.tixing);
				}
				
				
			},
			fn(){
				if(this.parent=='buildTask'){
					let a=this.a;
					this.$emit("fnChongfu",this.data[a]);
					this.$emit('fnChongfuState');
				}
				if(this.parent=='tanchuang'){
					this.task.tixing=this.data[this.a];
					let id=this.item.id;
					this.$store.commit('tanchuang',{task:this.task,id:id});
					this.$emit('fnChongfuState')
				}
				
			},
			chongfuClose(ev){
				if(this.parent=='tanchuang'){
					let item = this.$el;
					let nodes = item.getElementsByTagName('*');
					let chongfu=document.querySelector('.tc-chongfu');
					let nodes2 = chongfu.getElementsByTagName('*');
					let arr=[...nodes,...item,...chongfu,...nodes2];
					if(arr.indexOf(ev.target)==-1){
						this.$emit('fnChongfuState');
					}
				}
				if(this.parent=='buildTask'){
					ev.stopPropagation();
					let item = this.$el;
					let nodes = item.getElementsByTagName('*');
					let chongfu3=document.querySelector('.buildTask-cf')
					let nodes2 = chongfu3.getElementsByTagName('*');
					let arr=[...nodes,...item,...chongfu3,...nodes2];
					if(arr.indexOf(ev.target)==-1){
						this.$emit('fnChongfuState2');
					}
				}
			}
		}
	}
</script>

<style>
	.chongfu{
	   	background: #fff;
	   	width:168px;
	   	position:absolute;
	  	/*top:340px;
	  	left:10px;*/
	   	box-shadow: 0px 0px 10px 5px #d9d9d9;
	   }
	   .chongfu1{
	   	height: 36px;
	   	padding-left:15px;
	   	font:12px/34px "微软雅黑";
	   	color:#808080;
	   }
	   .chongfu1:hover{
	   	background: #f7f7f7;
	   }
	   .chongfu3{
	   	 margin-right: 16px;
	   }
</style>