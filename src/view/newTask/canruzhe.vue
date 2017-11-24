<template>
	<div class="zxz crz">
		<input type="text" placeholder="查找成员" class="shuru"/>
		<ul @click="fn">
			<li class="zxza clearfix" @click="fna">
				<span class="drl fl">
					<i class="icon iconfont icon-shuangren"></i>	
				</span>
				<b>所有成员</b>
				<span class="duigou fr">
					<i class="icon iconfont icon-iconduigou01" v-show="a"></i>
				</span>
			</li>
			<li class="zxza clearfix" v-for='item,index in data' @click="item.state=!item.state">
				<span class="fl tubiao">{{item.name}}</span>
				<b>{{item.name}}</b>
				<span class="duigou fr">
					<i class="icon iconfont icon-iconduigou01" v-show="item.state"></i>
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
				data:[
					{name:'frk',state:true,},
					{name:'Dorreny',state:false,},
					{name:'fengrongkai',state:false,},
				],
				a:false,
				
			}
		},
		methods:{
			fn(){
				let b=true;
				this.data.forEach(function (item){
					if(item.state==false){
						b=false;
						return;
					}
				})
				if(b){
					this.a=true;
				}else{
					this.a=false;
				}
				this.$emit('fncrz',this.data);
			},
			fna(){
				this.a=!this.a;
				if(this.a){
					this.data.forEach(function (item){
						item.state=true;
					})
				}else{
					this.data.forEach(function (item){
						item.state=false;
					})
					this.data[0].state=true;
				}
				this.$emit('fncrz',this.data);
			}
		}
	}
</script>

<style>
	.crz{
	   	background: #fff;
	   	width:233px;
	   	max-height:236px;
	   	position: absolute;
	   	background: #fff;
	   	top:190px;
	   	left:5px;
	   	box-shadow:0px 0px 10px 5px #d9d9d9;
	   	z-index: 100;
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
	   	.icon-shuangren{
	   		font-size:20px;
	   	}
</style>