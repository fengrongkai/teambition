<template>
	<div class="list-menu">
        <div class="menu-main">
            <div class="menu-head">
                <a href="javascript:;"><i class="iconfont icon-menu-left" @click='fn' v-show='w'></i></a>
                <span>{{text}}</span>
                <a href="javascript:;"><i class="iconfont icon-chuyidong" @click='cancel'></i></a>
            </div>
            <ul class="menu-operate" v-show='state'>
                <li @click='state=false,a=true,w=true,text="编辑列表"'>
                    <a href="javascript:;"><i class="iconfont icon-hricon10"></i>编辑列表</a>
                </li>
                <li  class="border-b" @click='b=true,state=false,w=true,text="添加列表"'>
                    <a href="javascript:;"><i class="iconfont icon-jiajiananniu02"></i>在此后添加新项</a>
                </li>
                <li @click='state=false,c=true,w=true,text="选择执行者"'>
                    <a href="javascript:;"><i class="iconfont icon-ren"></i>设置此列表任务执行者</a>
                </li>
                <li @click='state=false,d=true,w=true,text="选择截止时间",p=true'>
                    <a href="javascript:;"><i class="iconfont icon-rili"></i>设置此列表任务执行时间</a>
                </li>
                <li @click='state=false,e=true,w=true,text="移动本列表所有任务",num=item.id'>
                    <a href="javascript:;"><i class="iconfont icon-yidong-copy"></i>移动此列表所有任务</a>
                </li>
                <li @click='state=false,f=true,w=true,text="复制本列表所有任务",num=item.id'>
                    <a href="javascript:;"><i class="iconfont icon-fuzhi"></i>复制此列表所有任务</a>
                </li>
                <li  class="border-b" @click='state=false,g=true,w=true,text="归档本列表所有任务"'>
                    <a href="javascript:;"><i class="iconfont icon-guidang"></i>归档此列表所有任务</a>
                </li>
                <li @click='state=false,h=true,w=true,text="删除列表"'>
                    <a href="javascript:;"><i class="iconfont icon-shanchu1"></i>删除列表</a>
                </li>
            </ul>
            <div class="menu-edit" v-show='a'>
                <input type="text" :value="item.title" class="menu-done" ref="a1">
                <input type="button" value="保存" class="menu-save" @click="fna">
            </div>
            <div class="menu-add" v-show='b'>
                <p>新列表将添加在此列表后面</p>
                <input type="text" placeholder="列表名称" class="menu-done" ref="b1">
                <input type="button" value="创建" class="menu-save" @click="fnb">
            </div>
            <div class="do-person" v-show='c'>
                <input type="text" placeholder="查找成员" class="menu-done" ref="c1">
                <ul class="contain-person">
                    <li @click='c1=true,c2=false,c3=false'> 
                        <i class="iconfont icon-ren"></i>
                        <span>待认领</span>
                         <i class="iconfont icon-iconduigou01 fr" v-show="c1"></i>
                    </li>
                    <li @click='c1=false,c2=true,c3=false'>
                        <div class="user-info">
                            <a href="">
                                <span class="user-name">Do</span>
                            </a>
                        </div>
                        <span>Dorren</span>
                        <i class="iconfont icon-iconduigou01 fr" v-show="c2"></i>
                    </li>
                    <li @click='c1=false,c2=false,c3=true'>
                        <div class="user-info">
                            <a href="">
                                <span class="user-name">荣凯</span>
                            </a>
                        </div>
                        <span>冯荣凯</span>
                        <i class="iconfont icon-iconduigou01 fr" v-show="c3"></i>
                    </li>        
                </ul>
                <input type="button" value="确定" :class="{'person-ok':!(c1||c2||c3),'blue':c1||c2||c3,}" @click="fnc">
            </div>
            <div class="move-mission" v-show='e'>
                <p>
                    <em>项目</em>
                    <a href="">这里是项目名称
                        <i class="iconfont icon-chevron-tiny-down"></i>
                    </a>
                </p>
                <p>
                    <em>列表</em>
                    <a href="javascript:;">{{titleA}}
                        <i class="iconfont icon-chevron-tiny-down" @click="l=!l"></i>
                    </a>
                </p>
                <p class="p-txt">你可以在任务板中添加和修改任务，分组及添加任务列表</p>
                <input type="button" value="确定" class="menu-save" @click="fne(item.id)">
                <!-- 此弹窗里的另一个弹窗 -->
                <div class="move-mission-tanbox">
                    <input type="text" value="查找项目" class="menu-done">
                    <p>非星标项目<i class="iconfont icon-iconduigou01"></i></p>
                    <p>项目名称</p>
                    <p>Teambition新手指导</p>
                </div>
                <ul class="move-mission-done" v-show='l'>
                    <li v-for="itemA,index in allItem" @click="num=itemA.id,l=!l">{{itemA.title}}<i class="iconfont icon-iconduigou01" v-show="itemA.id==num"></i></li>
                   <!--<li>待处理<i class="iconfont icon-iconduigou01"></i></li>
                    <li>进行中<i class="iconfont icon-iconduigou01"></i></li>-->
                </ul>
            </div>
            <div class="move-mission" v-show='f'>
                <p>
                    <em>项目</em>
                    <a href="">这里是项目名称
                        <i class="iconfont icon-chevron-tiny-down"></i>
                    </a>
                </p>
                <p>
                    <em>列表</em>
                    <a href="javascript:;">{{titleA}}
                        <i class="iconfont icon-chevron-tiny-down" @click='m=!m'></i>
                    </a>
                </p>
                <ul class="update-tip">
                    <li>
                        <i class="iconfont icon-xuankuang"></i>
                        <span>原任务接收新任务的提醒</span>
                    </li>
                    <li>
                        <i class="iconfont icon-xuankuang"></i>
                        <span>原任务接收新任务的提醒</span>
                    </li>
                </ul>
                <p class="p-txt">你可以在任务板中添加和修改任务，分组及添加任务列表</p>
                <input type="button" value="确定" class="menu-save" @click='fnf(item.id)'>
        		<ul class="move-mission-done" v-show='m'>
                    <li v-for="itemA,index in allItem" @click="num=itemA.id,m=!m">{{itemA.title}}<i class="iconfont icon-iconduigou01" v-show="itemA.id==num"></i></li>
                   <!--<li>待处理<i class="iconfont icon-iconduigou01"></i></li>
                    <li>进行中<i class="iconfont icon-iconduigou01"></i></li>-->
                </ul>
            
            </div>
            <div class="mission-file" v-show='g'>
                <p>你确定要归档这个列表下的所有任务吗？</p>
                <input type="button" value="保存" class="menu-save mission-file-btn" @click="fng(item.id)">
            </div>
            <div class="mission-delete-tip" v-show='h&&ha'><p>请先清空此列表上的所有任务，然后再删除这个列表</p></div>
            <div class="mission-file" style="-display: block" v-show='h&&!ha'>
                <p>你确定要永远删除这个列表吗？</p>
                <input type="button" value="保存" class="menu-save mission-file-btn"@click="fnh(item.id)">
            </div>
            <div v-show="d" class="timeMenu">
             <date-picker open v-model:value="deadTime" class='timeMenu2' v-show="d" type="datetime" placeholder="Select date and time" ref="time" style="width: 200px"  @on-ok='fnTime'></date-picker>
             </div>
        </div>
    </div>
</template>

<script>
	export default{
		data(){
			return{
				state:true,
				a:false,
				b:false,
				c:false,
				d:false,
				e:false,
				f:false,
				g:false,
				h:false,
				i:false,
				w:false,
				c1:false,
				c2:false,
				c3:false,
				text:'列表菜单',
				num:'',
				l:false,
				m:false,
				deadTime:'',
			}
		},
		props:['sta','item'],
		mounted(){
			
		},
		watch:{
			sta(){
				let date=new Date();
			this.deadTime=date;
					this.fn();
			},
			a(){
				if(this.a){
					setTimeout(function (){
						this.$refs.a1.focus();	
					}.bind(this),0)
					
				}
			},
			b(){
				if(this.b){
					setTimeout(function (){
						this.$refs.b1.focus();	
					}.bind(this),0)
					
				}
			},
			c(){
				if(this.c){
					setTimeout(function (){
						this.$refs.c1.focus();	
					}.bind(this),0)
					
				}
			}
		},
		computed:{
			allItem(){
				return this.$store.state.dataList;
			},
			titleA(){
				let ind='';
				this.allItem.forEach(function (item,index){
					if(item.id==this.num){
						ind=index;
					}
				}.bind(this))
				if(this.num!=''){
					return this.allItem[ind].title;	
				}
			},
			ha(){
				if(this.item.task.length==0){
					return false;
				}else{
					return true;
				}
			},
//			height(){
//				return document.body.clientHeight-141+'px'
//			},
		},
		methods:{
			fn(){
				this.state=true;
				this.a=false;
				this.b=false;
				this.c=false;
				this.d=false;
				this.e=false;
				this.f=false;
				this.g=false;
				this.h=false;
				this.i=false;
				this.w=false;
				this.c1=false,
				this.c2=false,
				this.c3=false,
				this.text='列表菜单';
			},
			cancel(){
				this.fn();
				this.$emit('cancel')
			},
			fna(){
				let str=this.$refs.a1.value;
				let id=this.item.id
				this.$store.commit('changeTitle',{str,id});
				this.cancel();
			},
			fnb(){
				let str=this.$refs.b1.value;
				let id=this.item.id
				if(str==''){
					return
				}
				this.$store.commit('addItemAfter',{str,id});
				this.cancel();
			},
			fnc(){
				if(!(this.c1||this.c2||this.c3)){
					return;
				}
				let str='';
				if(this.c1){
					str=false;
				}else if(this.c2){
					str='Dorren'
				}else{
					str="冯荣凯"
				}
				let id=this.item.id
				this.$store.commit('changePerformer',{str,id});
				this.cancel();
			},
			fne(idA){
				let idB=this.num;
				this.$store.commit('moveAllItem',{idA,idB});
				this.cancel();
			},
			fnf(idA){
				let idB=this.num;
				this.$store.commit('copyAllItem',{idA,idB});
				this.cancel();
			},
			fng(idA){
				let idB=this.num;
				this.$store.commit('guiDang',idA);
				this.cancel();
			},
			fnh(idA){
				let idB=this.num;
				this.$store.commit('shangChu',idA);
				this.cancel();
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
				let a =this.$el.querySelector('.timeMenu2 .ivu-date-picker-rel');console.log(a)
				a.style.top='0px';
				let b =this.$el.querySelector('.timeMenu2');
				b.style.top='0px';
				this.$store.commit('changeTime2',{id:this.item.id,time,})
				this.cancel();
				
			},
		}
	}
</script>

<style>
	.list-menu{
            background: #eee;
            position:absolute;
            z-index: 4;
            -overflow: auto;
            top:35px;
            left:150px;
            box-shadow: 10px 10px 10px #d9d9d9;
        }
        .list-menu{
            width: 252px;
            background: #fff;
        }

        .menu-main .menu-head{
            width: 222px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            border-bottom: 1px solid #ededed;
            margin: 0 15px;
        }

        .menu-head .icon-chuyidong{
            float: right;
            padding: 0 15px;
            color: #a7a7a7;

        }

        .menu-head .icon-menu-left{
            float: left;
            padding: 0 15px;
            color: #a7a7a7;
        }

        .menu-head i:hover{
            color: #3da8f5;
        }

        .menu-operate{
            color: #808080;
            width: 252px;
            -display: none;
        }

        .menu-operate li{
            padding: 14px 30px;
            box-sizing: border-box;
        }

        .menu-operate li:hover{
            background: #ededed;
        }

        .menu-operate i{
            padding-right: 10px;
        }

        .border-b{
            border-bottom: 1px solid #ededed;
        }

        /* 编辑列表 */
        .menu-main .menu-edit{
            width: 222px;
            height: 124px;
            padding: 0 15px;
            -display: block;
        }
  		
        .menu-main input{
            width: 220px;
            height: 38px;
            border: 1px solid #a6a6a6;
            border-radius: 3px;
            margin-bottom: 15px;
            box-sizing: border-box;
            -color: #cccccc;
            cursor: pointer;
        }
        
        .menu-edit input{
  			color:#000;
  		}

        .menu-main .menu-done{
            padding-left: 12px;
            margin-top: 15px;
        }

        .menu-main .menu-save{
            border: none;
            background: #3da8f5;
            color: #fff;
        }

        .menu-main .menu-save:hover{
            opacity: .7;
        }

        .menu-add{
            width: 222px;
            padding: 0 15px;
            -display: none;
        }

        .menu-add p{
            padding: 20px 0 5px 0;
        }

        .do-person{
            width: 222px;
            padding: 0 15px;
            -display: none;
        }

        .do-person .contain-person{
            padding-bottom: 40px;
        }

        .contain-person .user-info{
            float: left;
            margin-top: 0px;
        }

        .contain-person li{
            height: 44px;
            line-height: 44px;
            cursor: pointer;
        }

        .contain-person li:hover{
            background: #eee;
        }

        .do-person .person-ok{
            background: #d9d9d9;
            color: #fff;
            border: none;
        }

        .move-mission{
            margin: 0 15px;
            position: relative;
            -display: none;
        }

        .move-mission p{
            padding: 15px 0;
            border-bottom: 1px solid #ededed;
            color: #979797;
        }

        .move-mission .p-txt{
            line-height: 20px;
        }

        .move-mission p em{
            color: #000000;
        }

        .move-mission p a{
            float: right;
        }

        .move-mission p a:hover{
            color: #3da8f5;
        }

        .move-mission .move-mission-tanbox{
            position: absolute;
            top: 50px;
            left: 39px;
            width: 198px;
            height: 192px;
            padding: 0 15px;
            box-sizing: border-box;
            background: #fff;
            display: none;
        }

        .move-mission-tanbox input{
            width: 166px;
            height: 32px;
        }

        .move-mission-tanbox i{
            float: right;
        }

        .move-mission .move-mission-tanbox p{
            border: none;
        }

        .move-mission-done{
            width: 192px;
            position: absolute;
            top: 90px;
            left: 42px;
            padding: 10px 0;
            background: #fff;
            max-height: 200px;
            box-shadow: 5px 5px 5px #d9d9d9;
            overflow: auto;
           -display: none;
        }

        .move-mission-done li{
            height: 35px;
            line-height: 35px;
            padding: 0 15px;
            cursor: pointer;
            color: #808080;
        }

        .move-mission-done i{
            float: right;
        }

        .move-mission-done li:hover{
            background: #f7f7f7;
        }

        .hidden{
            display: block;
        }

        .update-tip{
            padding: 10px 0 5px 0;
        }

        .update-tip li{
            height: 30px;
            line-height: 30px;
            color: #9b9b9b;
            cursor: pointer;
        }

        .update-tip li:hover{
            color: #3da8f5;
        }

        .mission-file{
            margin: 0 15px;
            -display: none;
        }

        .mission-file p{
            line-height: 20px;
            padding:10px 0;
            color: #383838;
        }

        .mission-file .mission-file-btn{
            background: #ff4f3e;
        }

        .mission-delete-tip{
            -display: none;
        }

        .mission-delete-tip p{
            height: 50px;
            padding: 15px;
        }
        .icon-jiajiananniu02,.icon-yidong-copy{
        	font:20px/16px "微软雅黑";
        	
        }
        .border-b{
        	font:14px/16px "微软雅黑";
        }
        .blue{
        	background: #3da8f5;
        	color:#fff;
        }
        .timeMenu{
        	height:350px;
        }
        .timeMenu2{
        	position:relative;
        	left:20px;
        	-margin-left:20px;
        	top:40px;
        }
        .timeMenu2 .ivu-date-picker-rel{
        top:-40px;
        }
</style>