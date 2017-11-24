<template>
	<div class="task-wrap">
        <div class="task-mask" @click="fn"></div>
        <section class="task-main">
            <header class="task-head">
                <p class="task-head-left">
                    <span>project · </span>
                    <a href="">{{item.title}}</a>
                </p>
                <p class="task-head-right">
                    <i class="iconfont icon-dianzan"></i>
                    <i class="iconfont icon-jiantou"></i>
                    <i class="iconfont icon-chuyidong"></i>
                </p>
            </header>
            <div class="task-content">
                <div class="task-scroll">
                    <div class="scroll-top">
                        <div class="task-item">
                            <p class="item-p">
                                <i class="iconfont icon-xuankuang">
                                    <strong><i class="iconfont icon-iconduigou01 "></i></strong>
                                </i>
                                <span>{{task.subtitle}}</span>
                            </p>
                            <div class="item-things">
                                <div class="user-info user-performer fl" @click="fnZxz">
                                    <a href="javascript:;" class="performer" v-show='performer!=undefined'>
                                        <span class="user-name">{{performer}}</span>
                                    </a>
                                    <span class="drl fl" v-show='performer==undefined'>
										<i class="icon iconfont icon-ren"></i>	
									</span>
									<b v-show='performer==undefined' class="dairl">待认领</b>
                                    <i class="fl i1" v-show='performer!=undefined'>{{performer}}</i>
                                 </div>
                                <i class="iconfont icon-yiwen1 fl"></i>
                                <div class="item-operate fl">
                                    <a href="javascript:;" @click="timeState=!timeState">
                                        <i class="iconfont icon-rili"></i>
                                        <span>{{timeMes}}</span>
                                    </a>
                                  
                                    <date-picker open v-model:value="DateTime" v-show="timeState" class="time" type="datetime" placeholder="Select date and time" ref="time" style="width: 200px" @on-ok='fnTime'></date-picker>
                                    <a href="javascript:;" class='tc-chongfu'><i class="iconfont icon-hricon10" @click="fnTchongfu"></i></a>
                                    <a href="javascript:;"><i class="iconfont icon-naozhong"></i></a>
                                </div>
                            </div>
                        </div>
                            <ul class="item-notes">
                                <li class='hc'>
                                    <div class="notes-left">
                                        <i class="iconfont icon-beizhu"></i>
                                        <span>备注</span>
                                    </div>
                                    <a href="" class="note">写下你想记的东西</a>
                                </li>
                                <li class='tcYouxiaji hc'>
                                    <div class="notes-left">
                                        <i class="iconfont icon-yuan-copy"></i>
                                        <span>优先级</span>
                                    </div>
                                    <a href="javascript:;" :style="{'color':colorA,'border-color':colorA,}" class="level" @click='fnYouxj'>{{task.youxianji}}</a>
                                </li>
                                <li class="clearfix bq-tc">
                                    <div class="notes-left">
                                        <i class="iconfont icon-biaoqian"></i>
                                        <span>标签</span>
                                    </div>
                                    <a href="javascript:;" class="project-name" v-for='item,index in task.label'>{{item}} <i class="iconfont icon-shanchu" @click='deleteLabel(index)'></i></a>
                                    <i class="iconfont icon-add fl" @click='biaoqianState=!biaoqianState'>
                                    </i>
                                    <biaoqian v-if="biaoqianState" :bqDataB='task.label' :item='item' :task='task'></biaoqian>
                                </li>
                            </ul>
                            <div class="child-mission">
                                <p>
                                    <i class="iconfont icon-caidan"></i>
                                    <span>子任务 ·</span>&nbsp;<strong></strong>
                                </p>
                                <p class="add-child-missiom">
                                    <i class="iconfont icon-iconmianxingshujutianjia"></i>
                                    <span>添加子任务</span>
                                </p>
                            </div>
                            <div class="child-mission">
                                <p>
                                    <i class="iconfont icon-guanlian"></i>
                                    <span>关联内容 ·</span>&nbsp;<strong> </strong>
                                </p>
                                <p class="add-child-missiom">
                                    <i class="iconfont icon-iconmianxingshujutianjia"></i>
                                    <span>添加关联</span>
                                </p>
                            </div>
                    </div>
                        <div class="task-player">
                            <div class="player-info">
                                <span>参与者</span>
                                <i class="iconfont icon-yiwen1"></i>
                            </div>
                            <div class="play-items">
                                <div class="user-info">
                                    <a href="">
                                        <span class="user-name">荣凯</span>
                                    </a>
                                </div>
                                <div class="user-info">
                                    <a href="">
                                        <span class="user-name">Do</span>
                                    </a>
                                </div>
                                <i class="iconfont icon-iconmianxingshujutianjia"></i>
                            </div>
                        </div>
                </div>
            </div>
            <footer class="task-foot">
                <div class="foot-box">
                    <textarea name="" cols="25" rows="2" id="" placeholder="@提及他人，按Enter快速发送"></textarea>
                    <div class="foot-emoj">
                        <div class="emoj-left">
                            <a href=""><i class="iconfont icon-fujian2"></i></a>
                            <a href=""><i class="iconfont icon-xiaolian"></i></a>
                        </div>
                        <div class="emoj-right">
                            <p><a href="">1</a>人将会收到通知</p>
                            <div class="send">
                                <a href="" class="send-a">发送</a>
                                <a href=""><i class="iconfont icon-shuxian"></i></a>
                                <a href=""><i class="iconfont icon-chevron-tiny-down"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </section>
        <zxz class="zxzTz" @fnZxzState='fnZxzState' parent='tanchuang' v-show="zxzState" :idw='idw' :performerA='performer' :item=item :task='task'></zxz>
        <chongfu v-show='chongfuState':idw='idw' @fnChongfuState='fnChongfuState' parent="tanchuang" class="chongfu" :item='item' :task="task"></chongfu>
        <youxj v-show='youxjState' parent='tanchuang':idw='idw' @fnYxjState='fnYxjState' class="youxj" :item='item' :indexA='indexA' :task="task"></youxj>
    </div>
</template>

<script>
	import zxz from '@/view/newTask/zxz';
	import chongfu from '@/view/newTask/chongfu';
	import youxj from '@/view/newTask/youxj';
	import biaoqian from '@/view/newTask/biaoqian';
	export default{
		data(){
			return {
				zxzState:false,
				chongfuState:false,
				youxjState:false,
				biaoqianState:false,
				color:['#a6a6a6','#ffaf38','#ff4f3e'],
				dataA:['普通','紧急','非常紧急'],
				indexA:'',
				timeState:false,
				DateTime:this.DataTime2,
			}
		},
		props:['data'],
		components:{
			zxz,
			chongfu,
			youxj,
			biaoqian,
		},
		computed:{
			timeMes(){
				if(this.data.task.deadtime==''){
					return '设置截止时间'
				}else{
					return this.data.task.deadtime;
				}
			},
			colorA(){
				let index =this.dataA.indexOf(this.task.youxianji);
				this.indexA=index;
				return this.color[index];
			},
			task(){
				return this.data.task;
			},
			item(){
				return this.data.item;
			},
			performer(){
				return this.data.task.performer;
			},
			idw(){
				return this.data.task.idw;
			},
			DateTime2(){
				return this.data.task.deadtime.match(/\d+/g).join('');
			}
		},
		mounted(){
			
		},
		methods:{
			fnZxz(){
				this.zxzState=!this.zxzState;
				this.$bus.$emit('tangchaung',this.idw);
			},
			fn(){
				this.$emit('closeTanChaung')
			},
			fnZxzState(){
				this.zxzState=false;
				
			},
			fnChongfuState(){
				this.chongfuState=false;
			},
			fnTchongfu(){
				this.chongfuState=!this.chongfuState;
				this.$bus.$emit('tangchaung2')
			},
			fnYouxj(){
				this.youxjState=!this.youxjState;
			},
			fnYxjState(){
				this.youxjState=false;
			},
			deleteLabel(index){
				this.task.label.splice(index,1);
				let id=this.item.id;
				this.$store.commit('tanchuang',{task:this.task,id:id});
			},
			fnTime(){
				if(this.$refs.time.value!=''){
					var data=this.$refs.time.value;
					var day = data.getDate();
					var mon = data.getMonth()+1;
					var year = data.getFullYear();
					var hours = data.getHours();
					var minute = data.getMinutes();
					var second = data.getSeconds();
					var time=year+'年'+mon+'月'+day+'日'+hours+':'+minute+':'+second
				}else{
					var time=''
				}
				let a =this.$el.querySelector('.time .ivu-date-picker-rel');console.log(a)
				a.style.top='0px';
				let b =this.$el.querySelector('.time');
				b.style.top='0px';
				this.$store.commit('changeTime',{time,id:this.data.item.id,idw:this.task.idw})
				
				
			}
		}
	}
</script>

<style>
	.user-info .performer{
		float:left;
	}
	.user-info .i1{
		padding-right: 3px;
	}
	.user-info{
		position: relative;
	}
	.task-wrap .zxzTz{
		position:absolute;
		top:180px;
		left:320px;
	}
	.dairl{
		float:left;
		margin:0 6px;
	}
	.chongfu{
		top:180px;
		left:550px;
		z-index:190;
	}
	.youxj{
		z-index:190;
		top:340px;
		left:550px;
	}
	.project-name{
		float:left;
		margin-bottom: 5px;
		margin-right:5px;
	}
	.icon-add{
		position:relative;
	}
	.bq-tc .biaoqiana{
		position:absolute;
		top:30px;
		left:250px;
		-height:100px;
		z-index: 200;
	}
	.bq-tc{
		position:relative;
	}
	.biaoqiana li{
		margin:0;
	}
	.item-operate{
		position: relative;
	}
	.time{
		position: absolute;
		top:50px;
		left:200px;
	}
	.task-wrap .youxj{
		position:absolute;
		top:340px;
		left:500px;
	}
	.task-wrap .ivu-select-dropdown{
		top:32px;
	}
	.ivu-date-picker-rel{
		top:-40px;
	}
	.child-mission .icon-caidan{
		margin-top:10px;
	}
</style>