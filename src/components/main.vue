<template>
	<div class="content content1 clearfix" @mousedown='down'>
	 <div class="main clearfix" :style="{width:width,}">
	 	<item v-for="item,index in dataList" :index="index" key="index" :item="item" :data-id='item.id' :style="{'z-index':50-index,}"></item>
	 	<!--<div class="item">
        	<div class="item-title clearfix">
        		<h2 class="fl">进行中</h2>
        		<i class = "iconfont icon-xiala fr"></i>
        	</div>
        	<div class="item-box">
        		<div class="item-content">
        			<ul class="item-task">
        				<li>
        					<i class = "iconfont icon-xuankuang fl"></i>
        				</li>
        			</ul>
        		</div>
        	</div>
        </div>-->
        <add-Item :style="{left:lefta,}"></add-Item>
        
     </div>
    <!-- <zxz v-show="zxState" :style="{left:left,top:top,}"></zxz>-->
    </div>
</template>

<script>
	import item from '@/components/item';
	import addItem from '@/view/item/add-item';
	import zxz from '@/view/newTask/zxz';
	import bus from '@/components/bus';
	import utils from '@/js/utils.js';
	export default {
		data(){
			return {
				w:0,  //页面宽度
				n:1,
				sta:0,
				len:this.$store.state.dataList.length,
				data:'',
				zxState:false,
			}
		},
		components:{
			item,
			addItem,
			zxz,
			bus,
		},
		created(){
		    this.$bus.$on('yidongbianjie',this.ydbj)
		     this.$bus.$on('yidongbianjie2',this.ydbj2)
		     this.$bus.$on('yidongbianjie3',this.ydbj3)
		},
		computed:{
//			len(){
//				return this.$store.state.dataList.length;
//			},
			lefta(){
				return this.dataList.length*298+'px';
			},
			dataList(){
				return this.$store.state.dataList;
			},
			width(){
				return this.dataList.length*298+292+'px';
			},
		},
		updated(){
			this.len=this.$store.state.dataList.length;
		},
		watch:{  //新建任务列表，适应滚动条，滚动条始终保持在最右侧，使得新建item的选框始终在页面中
			len(){
				//console.log(this.len)
				this.shiying2();
			}
			
		},
		
		methods:{
			ydbj(a){
				
				this.timer(a);
				//this.Rect=a;
			},
			ydbj2(){
				
				clearInterval(this.timer2)
			},
			ydbj3(a){
				this.Rect=a;
			},
			shiying2(){  //
				let w=this.dataList.length*298+292;
				this.w=-(w-document.documentElement.offsetWidth);//横向滚动条可移动的最大距离
				window.scrollTo(-this.w,0);  //将滚动条移动到最右则，是页面移动到最右侧
			},
			shiying(){
				//适应item的高度，当窗口变化时，item进行自适应
				//console.log('zhi')
				let content = document.querySelector('.content');
				let height=document.documentElement.clientHeight-119;
				content.style.height=height+'px';
				let that=this.$store;
				window.onresize=function(){
					height=document.documentElement.clientHeight-119
					content.style.height=height+'px';
				}
			},
			timer(a){
				
				this.width2=document.body.clientWidth;//console.log(width)
					this.Rect=a;
					//this.L=this.Rect.left;
					this.timer2=setInterval(function(){
						this.L=this.Rect.left;
						if(this.L<0){
							this.w=this.w+5;
							window.scrollTo(-this.w,0);
					
						}
						if(this.L+this.Rect.width-this.width2>0){
							this.L=this.Rect.left;
							this.w=this.w-5;
							window.scrollTo(-this.w,0);
					}
						if(this.width2-this.w-this.len*298-292>0){
							window.scrollTo(this.len*298+292-this.width2,0);
						}
						
						//console.log(199999)
					}.bind(this),0)
			},
			down(ev){
				this.scrollLeft = document.documentElement.scrollLeft||document.body.scrollLeft;
				window.onscroll=function (){
					this.scrollLeft = document.documentElement.scrollLeft||document.body.scrollLeft;
					this.w=-this.scrollLeft
				}.bind(this)
				let allItem= document.querySelectorAll('.item');
				let arr=[];
				[...allItem].forEach(function (item){
					arr.push([item,item.offsetLeft])
				})
				this.arrLeft=arr;
				let t=ev.target
				let tar=null;
				if(this.isC(t,'item-title')||this.isC(t,'item-h2')){//点击头部进行拖动
					if(this.isC(t,'item-title')){
					tar=ev.target.parentNode;
				}else{
					tar=ev.target.parentNode.parentNode;
				}
				   this.tar=tar;  //this.tar 就是要移动的item
				   tar.style.zIndex=100;
				  	this.disX=ev.clientX-tar.offsetLeft+this.scrollLeft;
					this.disY=ev.clientY-tar.offsetLeft;
					this.left=tar.offsetLeft;//console.log(tar.offsetLeft)
					this.leftA=this.left;
					
					this.timer(ev.target);
					document.addEventListener('mousemove',this.move2)
					document.addEventListener('mouseup',this.up2)
					  return
				}
				if(this.isC(t,'icon-xiala')){
					return
				}
				
				if(this.isC(t,'renwu')||this.isC(t.parentNode,'renwu')||this.isC(t.parentNode.parentNode,'renwu')){
					return;
				}
				this.disX=ev.clientX-this.w;
				this.disY=ev.clientY-this.w;
				document.addEventListener('mousemove',this.move)
				document.addEventListener('mouseup',this.up);
				
				
			},
			...utils,
			move(ev){
				let w=ev.clientX-this.disX;
				this.w=w;
				window.scrollTo(-this.w,0);//设置滚动条滚动距离
				if(ev.target.classList.contains('item')){
					ev.preventDefault();	
				}
				
			},
			move2(ev){
				ev.preventDefault();
				this.width2=document.body.clientWidth;//console.log(width)
				this.Rect=this.tar.getBoundingClientRect();
				this.L=this.Rect.left;
				
				this.scrollLeft = document.documentElement.scrollLeft||document.body.scrollLeft;
				this.tar.style.transform='rotate(3deg)';  //移动时将移动的块旋转3度
				this.tar.style.left=ev.clientX-this.disX+this.scrollLeft+'px';
				let AllItem=document.querySelectorAll('.item')
				let arr=[...AllItem];//扩展为数组，能是由数组的方法
				let index = arr.indexOf(this.tar);
				this.index=index; 
				arr.splice(index,1);//console.log(this.left)
				arr.forEach(function (item){
					if(this.collision(this.tar,item)){
						if(Math.abs(item.offsetLeft-this.tar.offsetLeft)<144){
							if(item.timer){
								return;
							}
							this.idB=item.dataset.id
							this.idA=this.tar.dataset.id;
							let left=item.offsetLeft;
							this.itemA=item;
							this.a={idA:this.idA,idB:this.idB};
//							this.sta=1;
						    this.mTween(item,'left',this.left,5,'linear',function (){
						    	this.left=left;
						    }.bind(this))
						}
					}
				}.bind(this))
				
				
			},
			up(ev){
				document.removeEventListener('mousemove',this.move)
				document.removeEventListener('mouseup',this.up)
				
			},
			up2(ev){
				//clearInterval(this.timer);
				clearInterval(this.timer2);
				this.tar.style.zIndex=0;
				this.tar.style.transform='rotate(0)';
				document.removeEventListener('mousemove',this.move2)
				document.removeEventListener('mouseup',this.up2);
				this.leftB=this.left;
				
				this.mTween(this.tar,'left',this.left,5,'linear',function (){
					if(this.sta==1){
						this.sta=0;
					}
						let allItem=document.querySelectorAll('.item');
						allItem=[...allItem].sort(function (a,b){
						return a.offsetLeft-b.offsetLeft;
					});
						let arr=allItem.map(function (item){
						return Number(item.dataset.id);
					});
						this.arrLeft.forEach(function (item){
						item[0].style.left=item[1]+'px'
					})
						this.$store.commit('changeData2',arr);
			    		this.a=null;
			    	}.bind(this))
			},
			isC(t,c){
				if(t.classList.contains(c)){
					return true;
				}
				return false;
			}
		},
		beforeRouteEnter (to, from, next) {
			//console.log('frk')
			next();
		},
		beforeRouteLeave(to,from,next){
			//console.log(234)
			//window.removeEventListener('resize',this.f)
			next();
		},
		mounted(){
			let content = document.querySelector('.content');
				let height=document.documentElement.clientHeight-119;
				content.style.height=height+'px';
			this.shiying();
		}
	}
</script>

<style>
	body{
		overflow-y: hidden;
	}
	.user-info{
		overflow: hidden;
	}
</style>