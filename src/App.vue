<template>
  <div class="wrap">
        <div class="project ref='project'">
            <div class="pro-left">
                <i class="iconfont icon-zhankai"></i>
                <p>个人项目</p>
                <div class="search">
                    <span class="search-icon iconfont icon-sousuo"></span>
                    <input type="text" placeholder="在个人项目中搜索">
                </div>
                <i class="iconfont icon-iconmianxingshujutianjia"></i>
            </div>
            <ul class="pro-right">
                <i class = "iconfont icon-yiwen"></i>
                <em class="icon-line" style="width: 1px"></em>
                <i>我的</i>
                <em class="icon-line"></em>
                <i>日历</i>
                <em class="icon-line"></em>
                <i class = "iconfont icon-lingdang_xiao"></i>
                <i class = "iconfont icon-xiaoxi"></i>
                <div class="user-info">
                    <a href="">
                        <span class="user-name">Do</span>
                    </a>
                </div>
            </ul>
        </div>
        <div class="header" ref='header'>
            <div class="home-page">
                <a href="" class="fl">首页</a>
                <i class="iconfont icon-i fl"></i>
                <a href="" class="fl">project</a>
                <i class="iconfont icon-chevron-tiny-down fl"></i>
                <a href="" class="fl"><i class="iconfont icon-xing"></i></a>
            </div>
            <ul class="nav">
               <li><router-link tag='a'class="lia" to="/" exact>任务</router-link></li>
               <li><router-link tag="a" to="/share">分享</router-link></li> 
                <li><router-link tag='a' to="/file">文件</router-link></li>
               <li><router-link tag='a' to="/" exact>日程</router-link></li>
                <li><router-link tag='a' to="/chat">群聊</router-link></li>
            </ul>
            <div class="nav-footer">
                <i class = "iconfont icon-shuangren"></i>
                <span>1</span>
                <em class="icon-line" style="width: 1px"></em>
                <i class = "iconfont icon-faxian"></i>
                <span>视图</span>
                <em class="icon-line"></em>
                <i class = "iconfont icon-caidan"></i>
                <span>菜单</span>
            </div>
        </div>
        <transition :name="names" mode="out-in"> 
        	<router-view></router-view>
     	</transition>
     	<tanchuang v-if="tanchuangState" :style="{'left':left,}" :data="data" @closeTanChaung='closeTanChaung'></tanchuang>
     	<date-picker open v-model:value="DateTime" :style="{'left':left2,'top':top2,}" v-show="timeState" class="time-tangchuang" type="datetime" placeholder="Select date and time" ref="timeTc" style="width: 200px" @on-ok='fnTime'></date-picker>
    </div>
</template>
	
<script>
		import bus from '@/components/bus';
		import tanchuang from '@/view/item/tanchuang'
		export default	{
			data(){
				return {
					names:'left',
					tanchuangState:false,
					left:0,
					timeState:false,
					ev:'',
					DateTime:'',
				}
			},
			components:{
				tanchuang,
			},
			created(){
				bus.$on('changeRenwu',this.changeRenwu);
				this.$bus.$on('fnTime2',this.fnTime2);
			},
			watch:{
				$route(to,from){//to是目标组件的路由配置，from是离开的组件的路由配置
  		//console.log(to.meta);//目标导航的下标
  		//console.log(from.meta.index);//离开导航的下标
				if(to.meta.index>from.meta.index){
					this.names="left"
				}else{
					this.names="right"
				}
		  	}
			},
			computed:{
				left2(){
					return this.ev.clientX+30+'px';
				},
				top2(){
					return this.ev.clientY-130+'px';
				},
			},
			methods:{
				fnTime(){
					if(this.$refs.timeTc.value!=''){
					var data=this.$refs.timeTc.value;
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
				this.$bus.$emit('backTime',time)
				this.timeState=false;
				},
				fnTime2(ev){
					this.timeState=true;
					let tate=new Date;
					this.DateTime=tate;
					this.ev=ev;
				},
				closeTanChaung(){
				this.tanchuangState=false;
				let body=document.querySelector('body');
				body.style.overflow='auto';
			},
				changeRenwu(a){
					this.tanchuangState=true;
					this.data=a;
						var scrollLeft = document.documentElement.scrollLeft||document.body.scrollLeft;
				this.left=scrollLeft+'px';
				let body=document.querySelector('body');
				body.style.overflow='hidden';
					//document.style.overflow='hidden';
				},
			}
		}
		
</script>

<style>

.left-enter{
transform:translateX(100%);/*//开始的时候移除到屏幕外*/
}
.left-enter-to{
	transform:translateX(0);/*//结束状态是移入到屏幕中*/
}
.left-enter-active,.left-leave-active,.right-enter-active,.right-leave-active{
	transition:0.5s;
}
.left-leave{
	transform:translateX(0);
}
.left-leave-to{
	transform:translateX(-100%);
}
.right-enter{
	transform:translateX(-100%);/*//开始的时候移除到屏幕外*/
}
.right-enter-to{
	transform:translateX(0);/*//结束状态是移入到屏幕中*/
}
.right-leave{
	transform:translateX(0);
}
.right-leave-to{
	transform:translateX(100%);
}
.nav-footer .icon-caidan{
	margin-top:15px;
}
.time-tangchuang{
	position: absolute;
	z-index:200;
	top:100px;
	left:200px;
}
 /*.timeMenu2{
        	position:relative;
        	left:20px;
        	-margin-left:20px;
        	top:40px;
        }*/
.time-tangchuang .ivu-date-picker-rel{
top:-40px;
}
</style>
