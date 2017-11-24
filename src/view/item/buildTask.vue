<template>
	<div class="buildTask" ref="buildTask">
		<textarea placeholder="任务内容" ref="text">
			
		</textarea>
		<div class="clearfix zhixingzhe">
			<a href="javascript:;" @click="fnZx">
				<span class="fl span1" v-show="drl">{{zhixingzhe}}</span>
				<span class="drl fl" v-show="!drl">
					<i class="icon iconfont icon-ren"></i>	
				</span>
				<i class="fl i1">{{zhixingzhe}}</i>	
			</a>
		</div>	
		<div class="clearfix zhixingzhe">
			<p class="clearfix"><em class="fl">参与者</em><b class="fl">?</b></p>
			<span class="fl tjcrz" v-for="item,index in crz" v-show='item.state'>{{item.name}}</span>
			<i @click="crzState=!crzState" class="iconfont icon-iconmianxingshujutianjia fl"></i>
		</div>	
		<div class="more" v-show="mState">
			<a href="javascript:;" @click="mState=!mState">
				<i>…</i>
				<span>更多</span>
			</a>
		</div>
		<div class="more2" v-show="!mState">
			<p class="deadTime">
				<a href="javascript:;" class="fl" @click="fnTime">
				<em> 
					<i class="iconfont icon-rili fl"></i>
				</em>
				<span class="deadTime-2">{{time3}}</span>
				</a>
			</p>
			<p class="yxj" @click="youxjState=!youxjState">
				<em>
					<i class="iconfont icon-yuan-copy fl"></i>
				</em>
				<span class="yxj-2">优先级</span>
				 <b class="yxj3" :style="{'color':color,'border-color':color,}">{{youxjText}}</b>
			</p>
			<p class="cfx">
				<a href="javascript:;" @click='chongfuState=!chongfuState' class="buildTask-cf fl">
					<em>
						 <i class="iconfont icon-renwu fl"></i>
					</em>
					<span class="cfx-2">{{ChongfuText}}</span>
				</a>
			</p>
			<div class="bqa">
				<div class="bqa1">
					<em clsss="bqa2">
						<i class="iconfont icon-biaoqian1"></i>
					</em>
					<span clsss="bqa3">标签</span>
				</div>
				<div class='clearfix bqa7'>
					<b class="fl bqa4" v-for="item,index in bqData" v-show="item.state">{{item.title}}<i class="iconfont icon-shanchu fr" @click='item.state=false'></i></b>
					<span class="bqa5 fl" @click="biaoqianState=!biaoqianState">
						<i class="iconfont icon-add"></i>
					</span> 
				</div>
			</div>
		</div>
		<div class="chuangjian clearfix">
		  <i class="iconfont icon-suo fl"></i>
		  <div class="cj2 fl">
		  	<p>隐私模式</p>
		  	<p>所有成员可见</p>
		  </div>
		  <input class="fr sure" type="button" value="创建" @click="build"/>
		</div>
		<zxz v-show="zxzState" @fnzxz='fnzxz' parent='buildTask'></zxz>
		<canruzhe v-show="crzState" @fncrz='fncrz'></canruzhe>
		<youxj v-show="youxjState" @fnYouxj='fnYouxj' parent='buildTask' indexA='0'></youxj>
		<chongfu v-show="chongfuState" @fnChongfu='fnChongfu' class="bTchonfu" parent='buildTask' @fnChongfuState2='fnChongfuState2'></chongfu>
		<biaoqiana v-show="biaoqianState" @fnBiaoqian='fnBiaoqian' :bqData='bqData' parent='buildTask'></biaoqiana>
	</div>
</template>

<script>
	import zxz from '@/view/newTask/zxz';
	import canruzhe from '@/view/newTask/canruzhe';
	import youxj from '@/view/newTask/youxj';
	import chongfu from '@/view/newTask/chongfu';
	import biaoqiana from '@/view/newTask/biaoqian';
	import bus from '@/components/bus';
	export default{
		data(){
			return{
				mState:true,
				time3:'截止时间',
				task:{
    					idw:2,
    					performer:'Do',
    					state:false,
    					subtitle:'小标题',
    					deadtime:'2025年12月22日 截止',
    					tixing:'每天重复',
    					youxianji:'普通',
    					remark:"",
    					childTask:[
    						{
    							content:'子任务内容',
    							name:'frk',
    							tiem:'时间'
    						},
    						{
    							content:'子任务内容',
    							name:'frk',
    							tiem:'时间'
    						}
    					],
    					comment:[
    						{
    							name:'frk',
    							content:'吃饭了吗',
    							time:'',
    						},
    						{
    							name:'frk',
    							content:'吃饭了吗',
    							time:'',
    						}
    					],
    					relation:true,
    					label:['标签1','标签2','标签3'],
    					record:[
    						{
    							name:'frk', //更改人
    							item:'label',//更改的事项
    							content:'',//更改的内容
    							time:'',//更改的时间 
    						},
    						{
    							name:'frk', //更改人
    							item:'label',//更改的事项
    							content:'',//更改的内容
    							time:'',//更改的时间 
    						}
    					]
    				},
				zxzState:false,
				zhixingzhe:'frk',
				drl:true,
				crzState:false,
				youxjState:false,
				crz:[
					{name:'frk',state:true,},
				],
				youxjText:'普通',
				color:'##a6a6a6',
				chongfuState:false,
				ChongfuText:'不重复',
				biaoqianState:false,
				bqData:[
					{title:'标题一',state:false,},
					{title:'标题二',state:false,},
					{title:'标题三',state:false,},
				],
			}
		},
		props:['item','state'],
		components:{
			zxz,
			youxj,
			canruzhe,
			chongfu,
			biaoqiana,
			bus,
		},
		created(){
			bus.$on('reset',this.reset);
			document.addEventListener('click',this.closeBq);
		},
		destroyed(){
			document.removeEventListener('click',this.closeBq)
		},
		watch:{
			state(){
				this.getFocus();	
			}
		},
		mounted(){
			this.$refs.text.focus();
			this.$bus.$on('backTime',this.fnbackTime)
		},
		methods:{
			reset(){
				//this.mState=true;
				//this.task={};
				this.zxzState=false;
				this.zhixingzhe='frk';
				this.drl=true;
				this.crzState=false;
				this.color='#a6a6a6';
				this.time3="截止时间";
				this.youxjState=false;
				this.crz=[
					{name:'frk',state:true,},
				];
				this.youxjText='普通';
				this.color='##a6a6a6';
				this.chongfuState=false;
				this.ChongfuText='不重复';
				this.biaoqianState=false;
				this.bqData=[
					{title:'标题一',state:false,},
					{title:'标题二',state:false,},
					{title:'标题三',state:false,},
				];
			},
		  getFocus(){  //获取textarea的焦点
		  	 	setTimeout(function (){
					this.$refs.text.focus();
				}.bind(this),0)
		  },
		  build(){  //将新建任务的数据传递给store
		  	 let title=this.$refs.text.value;
		  	 if(title=='') return;
		  	 this.task.subtitle=title;
		  	 this.task.performer=this.zhixingzhe;
		  	 this.task.tixing=this.ChongfuText;
		  	 this.task.canruzhe=[];
		  	 this.task.childTask=[];
		  	 //this.task.deadtime='';
		  	 this.task.comment=[];
		  	 this.crz.forEach(function (item){
		  	 	 if(item.state){
		  	 	 	this.task.canruzhe.push(item.name);
		  	 	 }
		  	 }.bind(this))
		  	 this.task.youxianji=this.youxjText;
		  	 this.task.label=[];
		  	 this.bqData.forEach(function (item){
		  	 	if(item.state){
		  	 		this.task.label.push(item.title)
		  	 	}
		  	 }.bind(this));
		  	 this.$store.commit('buildTask',{id:this.item.id,task:this.task,});//console.log(this.task);
		  	 this.$refs.text.value='';
		  	 this.getFocus();
		  	 this.reset();
		  	 //this.mState=false;
		  },
		  closeBq(ev){
		  	if(!this.biaoqianState){
		  		return;
		  	}
		  
		  	
		  	let biaoqiana=this.$el.querySelector('.biaoqiana');
		  	let bqa5=this.$el.querySelector('.bqa5');
		  	let nodes = biaoqiana.getElementsByTagName('*');
		  	let arr=[...nodes,biaoqiana,bqa5,bqa5.children[0],];
		  	if(arr.indexOf(ev.target)==-1){
		  		this.biaoqianState=false;
		  	}
		  },
		  fnZx(ev){
		  	this.zxzState=!this.zxzState;
		  	let shuru=this.$el.querySelector('.zxz .shuru');
		  	setTimeout(function (){
		  		shuru.focus();
		  	},0)
		  },
		  fnzxz(a,b){
		 	this.zxzState=false;
		 	if(b==-2){
		 		this.zhixingzhe="待认领";
		 		this.drl=false;
		 	}else{
		 		this.zhixingzhe=a[b];
		 		this.drl=true;
		 	}
		},
		fncrz(a){
			this.crz=a;
		},
		fnYouxj(a,b){
			this.youxjState=false;
			this.youxjText=a;
			this.color=b;
		},
		fnChongfu(a){
			this.ChongfuText=a;
			this.chongfuState=false;
		},
		fnChongfuState2(){
			this.chongfuState=false;
		},
		fnBiaoqian(a){
			this.bqData=a;
		},
		fnTime(ev){
			this.$bus.$emit("fnTime2",ev)
		},
		fnbackTime(time){
			this.task.deadtime=time;
			this.time3=time;
		}
		},
	}
</script>
  
<style>
	.bqa7{
		min-height:30px;
	}
	.bqa5 .icon-add{
		font-size:20px;
		color: #aaaaaa;
	}
	.bqa{
		-min-height:74px;
		margin-left:8px;
	}
	.bqa1{
		height:36px;
		font:12px/34px "微软雅黑";
	}
	.bqa4{
		padding:0 0 0 10px;
		padding-right:10px;
		min-height:24px;
		font:12px/24px "微软雅黑";
		color:#256594;
		background: #a1d4fa;
		border-radius: 12px;
		margin-right:10px;
		margin-bottom: 10px;
	}
	.bqa4 .icon-shanchu{
		margin-left:5px;
		font-size:16px;
		width:12px;
		padding-right:10px;
		display:none;
	}
	.bqa4:hover{
		padding-right: 0;
	}
	.bqa4:hover .icon-shanchu{
		display:block;
	} 
	.buildTask{
		width:251px;
		background: #fff;
		margin-left: 7px;
		font-family: Helvetica Neue, PingFang SC, Microsoft Yahei, '\5FAE\8F6F\96C5\9ED1', STXihei, '\534E\6587\7EC6\9ED1', sans-serif;
		position: relative;
		
	}
	textarea{
		width:206px;
		border:1px solid #a6a6a6;
		margin-top:8px;
		margin-left:8px;
		resize:vertical;
		padding:12px;
		font-family: "微软雅黑";
	}
	.zhixingzhe{
		padding-top:16px;
		-padding-left:8px;
		padding-bottom:11px;
		border-bottom: 1px solid #e5e5e5;
		width:240px;
		margin-left:8px;
	}
	.zhixingzhe span{
		width:24px;
		height:24px;
		border-radius: 24px;
		background: #f3a082;
		font:12px/24px "微软雅黑";
		color:#fff;
		text-align: center;
	}
	.zhixingzhe .i1{
		height:24px;
		line-height: 24px;
		margin-left: 9px;
	}
	.zhixingzhe p{
		padding-bottom: 12px;
	}
	.zhixingzhe em{
		font:12px/12px "微软雅黑";
		color:#a6a6a6;
	}
	.zhixingzhe b{
		width:14px;
		height: 14px;
		background: #a6a6a6;
		color:#fff;
		text-align: center;
		border-radius: 14px;
		font:12px/14px "微软雅黑";
		margin-left:11px;
	}
	.zhixingzhe .icon-iconmianxingshujutianjia{
		font-size:26px;
		color:#3da8f5;
		margin-left:10px;
	}
	.more{
		height:47px;
		margin-left:8px;
		border-bottom: 1px solid #e5e5e5;
		font:12px/47px "微软雅黑";
		color:#808080;
		
	}
	.more span{
		margin-left:8px;
	}
	.more a:hover span{
		color:#3da8f5;
	}
	.chuangjian{
		-height:47px;
		margin-left:8px;
		border-bottom: 1px solid #e5e5e5;
		padding:9px 0 0 0;
	}
	.chuangjian .icon-suo{
		font-size:20px;
		color:#acacac;
	}
	.chuangjian .cj2{
		margin-left:9px;
		font:12px/20px "微软雅黑";
		color:#808080;
	}
	.chuangjian p{
		font:12px/20px "微软雅黑";
	}
	.chuangjian .sure{
		width:72px;
		height:38px;
		background: #3da8f5;
		color:#fff;
		border-radius: 4px;
		margin-right:8px;
	}
	.more2 p{
		height:47px;
		font:12px/47px "微软雅黑";
		color:#808080;
		margin:0 9px;
		border-bottom: 1px solid #e5e5e5;
		background: #fff;
	}
	.more2 em{
		display:block;
		width:24px;
		float:left;
		-height: 47px;;
	}
	.more2 .icon-yuan-copy{
		color:#a6a6a6;
		font-size:16px;
	}
	.more2 .bq{
		height:74px;
	}
	
	.more2 .bq-3{
		display:block;
		height:30px;
		text-align: top;
		line-height:12px;
	}
	.deadTime-2:hover,.yxj-2:hover,.cfx-2:hover,.cj2:hover{
		color:#3da8f5;
	}
	.yxj3{
		 float:right;
		 padding: 0 8px;
		 font:12px/24px "微软雅黑";
		 border:1px solid #a6a6a6;
		 border-radius: 4px;
		 margin-top:11px;
		 margin-right: 2px;
	}
	.tjcrz{
		margin-left:5px;
	}
	.chuangjian{
		padding-bottom: 10px;
	}
	/*.bq5{
		padding:10px;
		height:24px;
		font:12px/24px "微软雅黑";
		color:#286997l
		background:#1d4fa;
	}*/
	.buildTask .bTchonfu{
		top:330px;
		left:10px;
	}
</style>