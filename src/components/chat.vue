<template>
	
       
        <!-- ---------分享--------- -->
       <div class="chat-content">
            <div class="chat">
                <div class="chat-head">
                    <span>项目名称</span>
                    <a href=""><i class="iconfont icon-omit"></i></a>
                </div>
                <div class="chat-info">
                    <div class="chat-items-main">
                        
                    </div>
                </div>
                <footer class="task-foot">
                    <div class="foot-box" style="width: 1060px">
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
            </div>
         <i-button @click="show">Click me!</i-button>
    <Modal :visible.sync="visible" title="Welcome">欢迎使用 iView</Modal>
           
       </div>
   
</template>

<script>

	export default{
		data(){
			return {
				visible: false
			}
		},
		methods:{
			show: function () {
                this.visible = true;
            }
		},
		components:{
			//Switch
			//DatePicker,
		}
	}
</script>

<style>
	.fs{
		position: absolute;
		top:0;
		left:100px;
		z-index: 800;
	}
	.chat-content{
		position:fixed;
		top:100px;
		-left:1px;
		overflow: hidden;
	}
	.btn9{
		position: absolute;
		z-index: 120;
		top:0;
		left:20px;
	}
</style>