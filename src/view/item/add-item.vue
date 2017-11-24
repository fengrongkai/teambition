<template>
	<div class="add-item" @click='fn'>
		<div class="add-item1" v-show='state'>
			<i class = "iconfont icon-jiajiananniu02 fl"></i>
			<p class="fl p1">新建任务列表…</p>
		</div>
		<div class="add-item2 clearfix" v-show="!state" ref="addItem2">
			<input type="text" class="newTask" placeholder='新建任务列表…' ref='newTask'/>
			<input type="button" class="save btn fr" value="保存" @click='save'/>
			<input type="button" class="cancel btn fr" value="取消" @click='cancel'/>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				state:true,
			}
		},
		methods:{
			fc(ev){
				if(ev.target!=this.$refs.addItem2&&ev.target.parentNode!=this.$refs.addItem2){
					this.state=true;
					document.removeEventListener('click',this.fc)
				}
			},
			fn(){
				this.state=false;//console.log(22)
				setTimeout(function (){
					this.$refs.newTask.focus();
					document.addEventListener('click',this.fc)
				}.bind(this),0)
			},
			save(ev){
				ev.preventDefault();
				ev.stopPropagation();
				let text=this.$refs.newTask.value;
				if(text==''){
					return
				}else{
					//console.log(999)
					this.$store.commit('addItem',text)
					this.$refs.newTask.value=''
					this.$refs.newTask.focus();
				}
			},
			cancel(ev){
				ev.stopPropagation();
				this.state=true;
				document.removeEventListener('click',this.fc)
			}
		}
	}
</script>

<style>
	.add-item{
		position:absolute;
		width:288px;
		-height:48px;
		background: #eeeeee;
		-left:900px;
		font:12px/48px "微软雅黑";
		color:#b5b5b5;
	}
	.add-item1{
		height:48px;
	}
	.add-item .icon-jiajiananniu02{
		margin-left:20px;
		font:20px/48px "微软雅黑";
	}
	.add-item .p1{
		font:12px/48px "微软雅黑";
		height:48px;
		margin-left:8px;
	}
	.add-item1:hover{
		color:#3da8f5;
	}
	.add-item2 .newTask{
		width:256px;
		height: 38px;
		background: #fff;
		margin-left:10px;
		padding-left: 12px;
	}
	.add-item2 .btn{
		margin:10px;
		font:12px/38px "微软雅黑";
	}
	.add-item2 .cancel{
		color:#808080;
		margin-right:16px;
		
	}
	.add-item2 .cancel:hover{
		color:#3da8f5;
	}
	.add-item2 .save{
		width:72px;
		height: 38px;
		
		color:#fff;
		background: #3da8f5;
		border-radius: 4px;
	}
	.add-item2 .save:hover{
		background: #5ab5f7;
	}
	.add-item2 .newTask{
		
	}
</style>