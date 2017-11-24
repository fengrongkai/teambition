<template>
	<li class="clearfix renwu" :data-idw='task.idw' :data-id="itemu.id" @mousedown='down'>
		<div class="mes" v-show="tab" :style="{'border-left-width':leftWidth,'border-color':background,}">
		<div class="xiebian" :style="{'background':background,}"></div>
		<h2 class='renwu-title clearfix'>
			<i class = "iconfont icon-xuankuangkaobei fl" @click='fnxuankuang'></i>
			<span>{{task.subtitle}}</span>
			<div class="user-info fr real" v-show='task.performer'>
                    <a href="javascript:;" class="master">
                        <span class="user-name">{{task.performer}}</span>
                    </a>
            </div>
		</h2>
		<div class="renwu-con clearfix">
			<p class="deadTime fl" v-show="task.deadtime">{{time}}截止</p>
			<p class="tip fl" v-show="task.tixing=='不重复'?false:true">{{task.tixing}}</p>
			<span class="fl spanT">
			<i class = "iconfont icon-icon fl" v-show='task.remark'></i>
			</span>
			<p class="fl child-renwu spanT" v-show='task.childTask.length'>
				<i class = "iconfont icon-caidan fl"></i>
				<em class="fl"></em>   <!--子任务-->
			</p>
			<span class="fl spanT">
			<i class = "iconfont icon-iconfontduihua fl" v-show="task.comment.length"></i>
			</span>
			<span class="fl spanT">
			<i class = "iconfont icon-guanlian1 fl" v-show='false'></i>
			</span>
			<p class="biaoqian fl spanT" v-for="label,index in task.label">
				<i class='fl yuandian'></i>
				<span class="fl bqian">{{label}}</span>
			</p>
		</div>
		</div>
		<div class="bg" v-show='!tab' :style={height:height,}>
			
		</div>
		
	</li>
</template>

<script>
	import utils from '@/js/utils.js';
	import bus from '@/components/bus';
	export default {
		data(){
			return {
				tab:true,
				height:'',
				s:true,
				item:10,
				width:0,
				leftWidth:0,
				background:'#a6a6a6',
				data:['普通','紧急','非常紧急'],
				color:['#a6a6a6','#ffaf38','#ff4f3e'],
				pengzhuangle:false,
				//height:this.$el.children[0].clientHeight+'px',
			}
		},
		created(){
			this.fnXb();
		},
		props:['task','itemu'],
		computed:{
			time(){
				if(this.task.deadtime!=0)
				return this.task.deadtime.match(/.+\u65e5/g)[0];
			}
		},
        watch:{
        	  task:function (){
        		//console.log(9800)
        		if(this.task.youxianji=='普通'){
        			this.background='#a6a6a6';
        			this.leftWidth=0;
        		}else if(this.task.youxianji=='紧急'){
        			this.background='#ffaf38';
        			this.width='4px';
        			this.leftWidth='4px';
        		}else{
        			this.background='#ff4f3e';
        			this.width='4px';
        			this.leftWidth='4px';
        		}
        	},
        	'task.youxianji'(){
        		let index=this.data.indexOf(this.task.youxianji);
        		this.background=this.color[index];
        		if(index>0){
        			this.leftWidth='4px';
        		}else{
        			this.leftWidth=0;
        		}
        	}
        },
        updated(){
        	this.height=this.$el.children[0].offsetHeight+'px';
        	bus.$emit('ok')
        },
		mounted(){
			  this.height=this.$el.children[0].offsetHeight+'px';
		},
		methods:{
			...utils,
			fnxuankuang(){
				let idw=this.task.idw;
				let id=this.itemu.id;
			},
			fnXb(){
				if(this.task.youxianji=='普通'){
        			this.background='#a6a6a6';
        		}else if(this.task.youxianji=='紧急'){
        			this.background='#ffaf38';
        			this.width='4px';
        			this.leftWidth='4px';
        		}else{
        			this.background='#ff4f3e';
        			this.width='4px';
        			this.leftWidth='4px';
        		}
			},
			down(ev){
				let xuankuang=this.$el.querySelector('.icon-xuankuangkaobei');
				if( xuankuang==ev.target){
						return;
					}
				this.scrollLeft = document.documentElement.scrollLeft||document.body.scrollLeft;
				
				window.onscroll=function (){
					this.scrollLeft = document.documentElement.scrollLeft||document.body.scrollLeft;
				}.bind(this)
				
				this.clientXA=ev.clientX;
				let renwu=this.$el;
				let renwuRect=renwu.getBoundingClientRect();
				this.renwuRect=renwuRect;
				this.oUl=document.createElement('ul');
				this.renwuLeft=renwuRect.left;
				this.renwuTop=renwuRect.top;
				this.oUl.appendChild(renwu.cloneNode(true));
				this.oUl.classList.add('oUl')
				document.body.appendChild(this.oUl);
				this.oUl.style.top=this.renwuTop+'px';
				this.oUl.style.left=this.renwuLeft-8+this.scrollLeft+'px';
				this.oUl.style.zIndex=100;
				this.renwu=this.$el;
				this.disX=ev.clientX-this.renwuRect.left;
				this.disY=ev.clientY-this.renwuRect.top;
				
				document.addEventListener('mousemove',this.renwuMove);
				document.addEventListener('mouseup',this.renwuUp);
				
				let renwuAll=document.querySelectorAll('.renwu');
				    renwuAll=[...renwuAll]
				let index=renwuAll.indexOf(this.$el);
				let index2=renwuAll.indexOf(this.$oUl);
				renwuAll.splice(index,1);
				renwuAll.splice(index2,1);
				this.renwuAll=renwuAll;  //被碰撞元素的集合
				this.renwu.children[0].style.display="none";
				this.renwu.children[1].style.display='block';
				this.renwu2=this.renwu.cloneNode(true);//用于插入到被碰撞元素前后
				
				let itemtaskAll=document.querySelectorAll('.item-task');
				this.itemtaskArr=[];
				  itemtaskAll=[...itemtaskAll];
				  itemtaskAll.forEach(function (item){
				  	if(item.children.length==0){
				  		this.itemtaskArr.push(item);
				  	}
				  }.bind(this))
				  
				 if(this.renwu.parentNode.children.length==1){
				 	this.disizhong=this.renwu.parentNode;
				 	this.itemtaskArr.push(this.disizhong)
				 }
				this.idA=this.itemu.id;
				this.idwA=this.task.idw;
				ev.stopPropagation();
				this.Recta=this.oUl.getBoundingClientRect();
				this.$bus.$emit('yidongbianjie',this.Recta)
			},
			renwuMove(ev){
				ev.preventDefault();
				ev.stopPropagation();
				this.Recta=this.oUl.getBoundingClientRect();
				this.$bus.$emit('yidongbianjie3',this.Recta)
				this.scrollLeft = document.documentElement.scrollLeft||document.body.scrollLeft;
				this.oUl.style.left=ev.clientX-this.disX+this.scrollLeft+'px';
				this.oUl.style.top=ev.clientY-this.disY+'px';
				this.oUl.style.transform="rotate(3deg)";
				
				this.renwuAll.forEach(function (item){
					if(this.collision(item,this.oUl)){
				         let oUlRect=this.oUl.getBoundingClientRect();
				         let itemRect=item.getBoundingClientRect();
				         let oUlx=oUlRect.width/2+oUlRect.left;
				         let itemx=itemRect.width/2+itemRect.left;
				         let oUly=oUlRect.height/2+oUlRect.top;
				         let itemy=itemRect.height/2+itemRect.top;
				        if(Math.abs(oUlx-itemx)<oUlRect.width/2){  //碰撞的两个元素中心点的水平距离小于被碰元素宽的一半
				        	if(oUly-itemy>0&&oUly-itemy<itemRect.height/2){//在被碰撞元素下方
				        		if(this.f){
				        				this.f.remove();
				        			}	
				        			this.pengzhuangle=true;
				        		this.renwu.style.display='none';
				        		this.insertAfter(this.renwu2,item);//console.log(this.renwu2)
				        		this.f=this.renwu2;
				        		this.idB=item.dataset.id;
				        		this.idwB=item.dataset.idw;//console.log(this.idB,this.idwB);
				        		this.fangxiang='xia';//console.log('下')
				        		bus.$emit('ok')
				        	}
				        	if(itemy-oUly>0&&itemy-oUly<itemRect.height/2){//在被碰撞元素上方
				        		if(this.f){
				        				this.f.remove();
				        			}
				        		this.pengzhuangle=true;
				        		this.renwu.style.display='none';
				        		item.parentNode.insertBefore(this.renwu2,item);
				        		this.f=this.renwu2;
				        		bus.$emit('ok')
				        		this.idB=item.dataset.id;
				        		this.idwB=item.dataset.idw;
				        		this.fangxiang='shang';//console.log('上')
				        	}
				        	
				        }
				         
					}
					  
				}.bind(this))
				
				
				this.itemtaskArr.forEach(function (item){
					let itemA=item.parentNode.parentNode.parentNode;
					if(this.collision(itemA,this.oUl)){
					  let oUlRect=this.oUl.getBoundingClientRect();
			          let itemRect=itemA.getBoundingClientRect();
			          if(oUlRect.top-itemRect.top>48){
			          	if(Math.abs(oUlRect.left-itemRect.left)<oUlRect.width/2){
			          		if(this.f){
				        				this.f.remove();
				        			}
				        		this.pengzhuangle=true;
				        		this.renwu.style.display='none';
				        		item.appendChild(this.renwu2);
				        		this.f=this.renwu2;
				        		this.idB=item.dataset.id;
				        		this.idwB=-1;
				        		this.fangxiang='wu'
				        		bus.$emit('ok')
			          	}
			          }
			         
					}
				}.bind(this))
				
			},
			renwuUp(ev){
				let fRect=null;
				this.$bus.$emit('yidongbianjie2')
				if(this.pengzhuangle){
					fRect=this.f.getBoundingClientRect();
				}else{
					fRect=this.renwu.getBoundingClientRect();
					this.idB='bugaibian';
	        		this.idwB='bugaibian';
	        		this.fangxiang='bugaibian';
				}
				this.pengzhuangle=false;
				let fLeft=fRect.left;
				let fTop=fRect.top;
				this.oUl.style.top=fTop+'px';
				this.oUl.style.left=fLeft-8+this.scrollLeft+'px';
				this.oUl.remove();
				if(this.f){
					this.f.remove();	
				}
				this.renwu.style.display='block';
				this.renwu.children[0].style.display="block";
				this.renwu.children[1].style.display='none';
				bus.$emit('ok');
				this.$store.commit('changeRenwu2',{idA:this.idA,idwA:this.idwA,idB:this.idB,idwB:this.idwB,fangxiang:this.fangxiang})
				document.removeEventListener('mousemove',this.renwuMove);
				document.removeEventListener('mouseup',this.renwuUp);
				if(ev.clientX==this.clientXA){
					bus.$emit('changeRenwu',{task:this.task,item:this.itemu})
				}
			},
			insertAfter(newEl, targetEl){ 
			var parentEl = targetEl.parentNode; 
				if(parentEl.lastChild == targetEl) 
				{ 
				parentEl.appendChild(newEl); 
				}else 
				{ 
				parentEl.insertBefore(newEl,targetEl.nextSibling); 
				} 
			}, 
		}
	}
</script>

<style>
	.mes{
		position:relative;
	}
	.xiebian{
		position:absolute;
		width:0px;
		height:100%;
		top:0;
		left:-4px;
		background: yellow;
		border-radius: 4px 0px 0px 4px;
		transition: width 0.2s ease-out;
		-webkit-transition: width 0.2s ease-out;
	}
	.mes:hover .xiebian{
		width: 8px;
	}
	.renwu{
		background: #fff;
		margin:8px;
		margin-top:0;
		border-radius: 4px;
		-padding-bottom: 10px;
		
	}
	.mes{
		border-radius: 4px;
		border-left:4px solid red;
		padding-bottom:10px;
	}
	.renwu-title{
		padding:12px 14px 6px 10px; 
	}
	.renwu span{
		font:12px/20px "微软雅黑";
		color:#a6a6a6;
	}
	.real .master{
		margin:0;
		width:24px;
		height:24px;
		font-size:12px;
	}
	.icon-xuankuangkaobei{
		color: #eeeeee;
		margin-right:12px;
		font-size:20px;
	}
	.renwu-con{
		padding-left:42px;
		padding-right:15px;
		font:12px/20px "微软雅黑";
		font-size:12px;
	}
	.deadTime,.tip,.child-renwu em,.biaoqian span{
		font:12px/20px "微软雅黑";
	}
	.deadTime{
		padding:0 4px;
		background: #e1e1e1;
		color:#818181;
		margin-right: 6px;
		margin-bottom: 4px;
	}
	.tip{
		padding:0 4px;
		background: #3da8f5;
		color:#fff;
		margin-bottom: 4px;
	}
	.icon-icon,.child-renwu,.icon-iconfontduihua,.icon-guanlian1,.biaoqian{
		margin-bottom: 2px;
		margin-left: 14px;
	}
	.icon-caidan{
		font:16px/20px "微软雅黑";
		margin-right: 6px;
	}
	.yuandian{
		width:6px;
		height:6px;
		border-radius: 6px;
		background: #3da8f5;
		margin-top:7px;
		margin-right:6px;
	}
	.renwu{
		-position:relative;
		width:251px;
		
	}
	.oUl{
		position: absolute;
		top:0;
		left:0;
	}
	.bg{
		border-radius: 4px;
		background: #e5e5e5;
	}
	.icon-icon{
		height:20px;
		margin-bottom: 4px;
	}
	.child-renwu{
		height:18px;
		margin-bottom: 4px;
	}
	.spanT{
		height:24px;
		margin-bottom: 0;
	}
</style>