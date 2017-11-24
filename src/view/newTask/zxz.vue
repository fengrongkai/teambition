<template>
	<div class="zxz">
		<input type="text" placeholder="查找成员" class="shuru"/>
		<ul @click="fn">
			<li class="zxza clearfix" @click="a=-2">
				<span class="drl fl">
					<i class="icon iconfont icon-ren"></i>	
				</span>
				<b>待认领</b>
				<span class="duigou fr">
					<i class="icon iconfont icon-iconduigou01" v-show="a==b"></i>
				</span>
			</li>
			<li class="zxza clearfix" v-for='item,index in data' @click="a=index">
				<span class="fl tubiao">{{item}}</span>
				<b>{{item}}</b>
				<span class="duigou fr">
					<i class="icon iconfont icon-iconduigou01" v-show="a==index"></i>
				</span>
			</li>
		</ul>
		<p class="yaoqing">
			<span class="yaoqing2 fl">
				<i class="icon iconfont icon-iconmianxingshujutianjia"></i>	
			</span>
			<b class="fl">邀请成员</b>
		</p>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				data:['Dorenrry','Do','frk'],
				a:2,
				b:-2,
				performer:'',
			}
		},
		props:['performerA','idw','item','task','parent'],
		computed:{
			
		},
		created(){
			this.$bus.$on('tangchaung',this.tangchaung);
		},
		mounted(){
			document.addEventListener('click',this.zxzClose);
		},
		beforeDestroy(){
			document.removeEventListener('click',this.zxzClose);
		},
		methods:{
			tangchaung(c){
				if(c==this.idw){
					let index = this.data.indexOf(this.performerA);
					this.a=index;
					if(this.a==-1){
						this.a=-2
					}
				}
			},
			fn(){
				
				if(this.parent=='tanchuang'){
					this.task.performer=this.data[this.a];
					let id=this.item.id
					this.$emit('fnzxz',this.data,this.a);
					this.$store.commit('tanchuang',{task:this.task,id:id});
					this.$emit('fnZxzState');
				}
				if(this.parent=='buildTask'){
					this.$emit('fnzxz',this.data,this.a);
					
				}
				
			},
			zxzClose(ev){
				
				if(!this.idw) return;
				let item = this.$el;
				let nodes = item.getElementsByTagName('*');
				let performer=document.querySelector('.user-performer');
				let nodes2 = performer.getElementsByTagName('*');
				let arr=[...nodes,item,...nodes2,...performer];
				if(arr.indexOf(ev.target)==-1){
					this.$emit('fnZxzState');
				}
			}
		}
	}
</script>

<style>
	.zxz{
	   	background: #fff;
	   	width:233px;
	   	max-height:236px;
	   	position: absolute;
	   	background: #fff;
	   	top:120px;
	   	left:5px;
	   	box-shadow:0px 0px 10px 5px #d9d9d9;
	   	z-index: 100;
	   	-overflow-y:auto;
	   }
	   .zxz ul{
	   	-overflow-y:auto;
	   }
	   .zxz .shuru{
	   	width:196px;
	   	height: 32px;
	   	border:1px solid #a6a6a6;
	   	padding-left: 6px;
	   	margin:15px 0 10px 15px;
	   	border-radius: 4px;
	   }
	   .zxz .zxza{
	   	  height:36px;
	   	  padding-left: 13px;
	   	  font:12px/34px "微软雅黑";
	   }
	   .zxz .zxza:hover{
	   	  background: #f7f7f7;
	   }
	   .zxz .zxza:hover b{
	   	  background: #f7f7f7;
	   	  font-weight: bold;
	   }
	   .zxz .drl{
	   	  width:30px;
	   	  padding-left:4px;
	   }
	   .zxz .tubiao{
	   	width:24px;
	   	height:24px;
	   	border-radius:24px;
	   	background: #5bc2f0;
	   	margin-right:10px;
	   	float:left;
	   	line-height: 24px;
	   	text-align: center;
	   	color: #fff;
	   	margin-top:5px;
	   }
	   .zxz b{
	   	float:left;
	   	color:#808080;
	   	}
	   	.zxz .duigou{
	   		margin-right: 17px;
	   	}
	   	.yaoqing{
	   		height:36px;
	   		font:12px/36px "微软雅黑";
	   		padding-left:8px;
	   	}
	   	.yaoqing2{
	   		color:#5cb6f6;
	   		width:36px;
	   		
	   	}
	   	.yaoqing2 .icon-iconmianxingshujutianjia{
	   		font-size:29px;
	   	}
	   	.yaoqing b{
	   		color:#5cb6f6;
	   	}
	   	.yaoqing:hover b{
	   		font-weight: bold;
	   	}
</style>