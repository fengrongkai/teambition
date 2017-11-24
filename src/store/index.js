import Vue from 'vue'
import Vuex from 'vuex'



Vue.use(Vuex)

let dataList =[
    		{
    			id:1,
    			title:'已完成',
    			num:1,
    			task:[
    				{
    					idw:1,
    					performer:'Do',
    					state:false,
    					subtitle:'小标题',
    					deadtime:'2055年12月22日18:00:00',
    					tixing:'每天重复',
    					youxianji:'普通',
    					canruzhe:[],
    					remark:"dfdsf",
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
    					comment:[  //对话
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
    					relation:true,  //关联
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
    			]
    		},
    		{
    			id:2,
    			title:'还没开始',
    			num:2,
    			task:[
    				{
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
    				{
    					idw:3,
    					performer:'frk',
    					state:false,
    					subtitle:'小标题',
    					deadtime:'2029年12月22日 截止',
    					youxianji:'紧急',
    					tixing:'每天重复',
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
    			]
    		},
    		
    		{
    			id:3,
    			title:'还没开始',
    			num:2,
    			task:[
    				
    			]
    		},
    	
    	]
function index(state,id){
	let A=null;
	 state.forEach(function (item,index){
		if(item.id==id||item.idw==id){
			A=index;
			return
		}
	})
	 return A
}
function deepCopy(obj){  // 深度拷贝
				let newObj = obj instanceof Array ? [] : {};
				for(let attr in obj){
					if(typeof obj[attr] === 'object' &&　obj[attr]　!== null){
						newObj[attr] = deepCopy(obj[attr])
					}else{
						newObj[attr] = obj[attr]
					}
				}
				return newObj;
			}
let store = new Vuex.Store({    
    state:{
    	contentHeight:'',
    	dataList:dataList,
    	idNum:4,
    	idwNum:4,
    	guidang:{},
    },
    mutations:{
    	conH(state,payload){
    		state.conntentHeight=payload;
    		
    	},
    	changeData(state,payload){
			let A=index(state.dataList,payload.idA);
    	    let B=index(state.dataList,payload.idB);//console.log(A,B)
    	    let a=null;let b=null;
    		state.dataList[A].task.forEach(function(item,index){
    			if(item.idw==payload.idwA){
    				a=item;
    				b=index
    			}
    			
    		})
    		state.dataList[A].task.splice(b,1)
    		let c=null;let d=null;
    		state.dataList[B].task.forEach(function(item,index){
    			if(item.idw==payload.idwB){
    				c=item;
    				d=index
    			}
    			
    		})
    		state.dataList[B].task.splice(d,0,a);
    		},
    	changeData2(state,payload){
    		let arr=[];
    		payload.forEach(function (item){
    			state.dataList.forEach(function (e){
    				if(e.id==item){
    					arr.push(e)
    				}
    			})
    		});
    		state.dataList=arr;
			},
			addItem(state,payload){
				
				state.dataList.push({id:state.idNum,title:payload,task:[],});
				state.idNum++;
			},
		changeTitle(state,payload){
			let indexA=index(state.dataList,payload.id);
			state.dataList[indexA].title=payload.str;
		},
		addItemAfter(state,payload){
			let indexA=index(state.dataList,payload.id);
			state.dataList.splice(indexA+1,0,{id:state.idNum,title:payload.str,task:[],});
			state.idNum++;
		},
		changePerformer(state,payload){
			let indexA=index(state.dataList,payload.id);//console.log(payload)
			state.dataList[indexA].task.forEach(function (item){
				item.performer=payload.str;
			})
		},
		moveAllItem(state,payload){
			let indexA=index(state.dataList,payload.idA);
			let indexB=index(state.dataList,payload.idB);
			state.dataList[indexB].task.push(...state.dataList[indexA].task);
			state.dataList[indexA].task=[];
		},
		copyAllItem(state,payload){
			let indexA=index(state.dataList,payload.idA);
			let indexB=index(state.dataList,payload.idB);
			let arr=state.dataList[indexA].task;
			arr.forEach(function (item){
				state.indNum++;
				item.id=state.idNum;
			});
			state.dataList[indexB].task.push(...arr);
		},
		guiDang(state,payload){
			let indexA=index(state.dataList,payload);
			if(!state.guidang[payload]){
				state.guidang[payload]=[];
			}
			state.guidang[payload].push(...state.dataList[indexA].task);
			state.dataList[indexA].task=[];
		},
		shangChu(state,payload){
			let indexA=index(state.dataList,payload);
			state.dataList.splice(indexA,1)
			},
		buildTask(state,payload){
			let indexA=index(state.dataList,payload.id);
			//let obj=payload.task;
			state.idwNum++;
			payload.task.idw=state.idwNum;
			let copy=deepCopy(payload.task);
			state.dataList[indexA].task.push(copy);
			//console.log(state.dataList[indexA].task)
		},
		tanchuang(state,payload){
			let indexA=index(state.dataList,payload.id);
			let idw=payload.task.idw;
			let indexB=null;//console.log(payload.task)
			state.dataList[indexA].task.forEach(function(item,index){
				if(item.idw==idw){
					indexB=index;
				}
			})
			state.dataList[indexA].task[indexB]=payload.task;
		},
		changeRenwu2(state,payload){
			//console.log(payload)
				if(payload.fangxiang!='bugaibian'){  //除去不改变数据，以外的情况
					let indexA=index(state.dataList,payload.idA);
					let indexAw=index(state.dataList[indexA].task,payload.idwA);
					let indexB=index(state.dataList,payload.idB);
					if(payload.idwB==-1){
					let a=state.dataList[indexA].task.splice(indexAw,1);
					state.dataList[indexB].task.push(a[0])
				}else if(payload.fangxiang=='xia'){
					
					let a=state.dataList[indexA].task.splice(indexAw,1);
					let indexBw=index(state.dataList[indexB].task,payload.idwB);
					state.dataList[indexB].task.splice(indexBw+1,0,a[0])
				}else if(payload.fangxiang=='shang'){
						let a=state.dataList[indexA].task.splice(indexAw,1);
						let indexBw=index(state.dataList[indexB].task,payload.idwB);
						state.dataList[indexB].task.splice(indexBw,0,a[0])
				}
			}
			
		},
		changeTime(state,payload){
			let indexA=index(state.dataList,payload.id);
			let indexB=index(state.dataList[indexA].task,payload.idw);
			state.dataList[indexA].task[indexB].deadtime=payload.time;
		},
		changeTime2(state,payload){
			let indexA=index(state.dataList,payload.id);
			if(state.dataList[indexA].task.length!=0){
				state.dataList[indexA].task.forEach(function(item){
					item.deadtime=payload.time;
				})
			}
		},
    	changeRenwu(state,payload){
 			let indexIdA=index(state.dataList,payload.idA);//console.log(indexIdA)
    		let indexIdB=index(state.dataList,payload.idB);//console.log(indexIdB)
    		let idw=Number(payload.idw);
    		let a=null;let b=null;
    		state.dataList[indexIdA].task.forEach(function(item,index){
    			if(item.idw==idw){
    				a=item;
    				b=index
    			}
    		})
    		state.dataList[indexIdA].task.splice(b,1)
    		if(payload.prevIdw==-1){
    			state.dataList[indexIdB].task.unshift(a);
    			return
    		}
    		state.dataList[indexIdB].task.splice(payload.prevIdw,0,a)
    	}
    	
    },
  
})
export default store

