<template>
	<div class="youxianji">
		<ul class="yxj" @click="fn">
			<li class="yxj0" v-for='itemC,index in data' @click="a=index">
				<b class="yxj1 fl" :style="{'color':color[index],'border-color':color[index],}">{{itemC}}</b>
				<span  class="yxj2 fr">
					<i class="icon iconfont icon-iconduigou01" v-show='a==index'></i>
				</span>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				data:['普通','紧急','非常紧急'],
				color:['#a6a6a6','#ffaf38','#ff4f3e'],
				a:this.indexA,
			}
		},
		props:['indexA','item','task','idw','parent'],
		mounted(){
			document.addEventListener('click',this.youxianjiClose);
		},
		beforeDestroy(){
			document.removeEventListener('click',this.youxianjiClose);
		},
		watch:{
		 a(){
		 	return this.indexA;
		 }
		},
		methods:{
			fn(){
				let a=this.a
				if(this.parent=='buildTask'){
					this.$emit('fnYouxj',this.data[a],this.color[a]);
				}
				
				if(this.parent=='tanchuang'){
					this.task.youxianji=this.data[this.a];
					let id=this.item.id;
					this.$store.commit('tanchuang',{task:this.task,id:id});
					}
					this.$emit('fnYxjState');
			},
			youxianjiClose(ev){
				if(this.idw){
					//console.log(this.idw)
					let item = this.$el;
					let nodes = item.getElementsByTagName('*');
					let performer=document.querySelector('.tcYouxiaji');
					let nodes2 = performer.getElementsByTagName('*');
					let arr=[...nodes,item,...nodes2,...performer];
					if(arr.indexOf(ev.target)==-1){
						this.$emit('fnYxjState');
					}
				}
				
			}
		}
	}
</script>

<style>
	.youxianji{
	  	width:200px;
	  	background: #fff;
	  	position:absolute;
	  	top:295px;
	  	left:5px;
	  	box-shadow: 0px 0px 10px 5px #d9d9d9;
	  }
	  .yxj0{
	  	height:42px;
	  	padding-left:16px;
	  }
	  .yxj1{
	  	height:24px;
	  	padding:0 8px;
	  	border:1px solid #a6a6a6;
	  	font:12px/24px "微软雅黑";
	  	margin:12px 0 0 0px;
	  	border-radius: 4px;
	  	color:#a6a6a6;
	  }
	  .yxj2{
	  	margin:12px 24px 0 0;
	  }
	  .yxj2 .icon-iconduigou01{
	  	font-size:25px;
	  	color:#a6a6a6;
	  }
</style>