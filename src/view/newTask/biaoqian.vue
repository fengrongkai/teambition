<template>
	<div class="biaoqiana">
		<div class="clearfix biaoqiana0">
			<input type="text" placeholder="添加标签" class="biaoqiana1 fl" ref="bq"/>
			<input type="button" value="添加" class="biaoqiana2 fr" @click='fnc'/>
		</div>
		<ul class="biaoqiana3" @click="fn">
			<li class="biaoqiana4" v-for="item,index in data" @click='item.state=!item.state'>
				<em class="biaoqiana5 fl"></em>
				<b class="biaoqiana6 fl">{{item.title}}</b>
				<span  class="biaoqiana7 fr">
					<i class="icon iconfont icon-iconduigou01" v-show="item.state"></i>
				</span>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				data:this.bqData,
				a:-1,
			}
		},
		props:['bqData','bqDataB','task','item','parent'],
		mounted(){
//			console.log(999999)
//			console.log(this.task)
			if(typeof(this.bqDataB)=='undefined'){
				return
			};
			let arr=[];
				this.bqDataB.forEach(function (item){
					arr.push({title:item,state:true,})
				});
				this.data=arr;
			
		},
		methods:{
			fn(){
				console.log(99)
				this.$emit('fnBiaoqian',this.data)
				if(this.parent=='tanChuang'){
					this.change();
				}
			},
			fnc(){
				let val=this.$refs.bq.value;
				if(val!=''){
					this.data.unshift({title:val,state:true})
				}
				if(this.parent=='tanChuang'){
					this.change();
				}
				
			},
			change(){
				let arr=[];
				this.data.forEach(function (item){
					if(item.state){
						arr.push(item.title)
					}
				})
				this.task.label=arr;
				let id=this.item.id;
				this.$store.commit('tanchuang',{task:this.task,id:id});
			}
		}
	}
</script>

<style>
	.biaoqiana{
	   	background: #fff;
	   	width:186px;
	   	padding:12px 0 0 0px;
	   	box-shadow: 5px 5px 5px #d9d9d9;
	   	position:absolute;
	  	top:410px;
	  	left:0;
	   }
	   .biaoqiana1{
	   	width:125px;
	   }
	   .biaoqiana2{
	   	margin-right: 16px;
	   	color:#3da8f5;
	   }
	   .biaoqiana0{
	   	height:35px;
	   	border-bottom: 1px solid #eeeeee;
	   	padding-left: 16px;
	   }
	   .biaoqiana3{
	   	min-height:100px;
	   	max-height: 200px;
	   	overflow:auto;
	   	color:#8b8b8b;
	   	padding-left: 16px;
	   }
	   .biaoqiana4{
	   	 height:36px;
	   	 font:12px/34px "微软雅黑";
	   }
	   .biaoqiana5{
	   	width:6px;
	   	height: 6px;
	   	background:#3da8f5;
	   	border-radius: 6px;
	   	margin-top:14px;
	   	margin-right: 10px;
	   	}
	   	.biaoqiana7{
	   		margin-right: 16px;
	   	}
</style>