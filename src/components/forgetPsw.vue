<template>
  <div class='forgetPsw bg-white' :style="'margin-top:'+(clientHeight-357)/2+'px'">
    <h1>hello</h1>
    <strong class='title'>找回密码</strong>
    <el-form :model="validateForm" ref="loginForm" :rules="rules">
      <el-form-item prop="userIphone">
        <el-input placeholder="请输入手机号" prefix-icon="el-icon-phone-outline" v-model="validateForm.userIphone"></el-input>
      </el-form-item>
      <el-form-item prop="userPassWord">
        <el-input type='password' placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="validateForm.userPassWord"></el-input>
      </el-form-item>
      <el-form-item prop="userCheckPsw">
        <el-input type='password' placeholder="输入确认密码" prefix-icon="el-icon-lock" v-model="validateForm.userCheckPsw"></el-input>
      </el-form-item>
      <el-form-item prop="captcha_code" class="code">
        <el-input type='password' placeholder="请输入验证码" prefix-icon="lj-icon-yanzhengma"
                  v-model="validateForm.captcha_code" autocomplete="off" autocapitalize="off"
                  spellcheck="false" max-length="6" ></el-input>
        <el-button type="button" @click="sendcode" :disabled="disabled" v-if="disabled == false">发送验证码</el-button>
        <el-button type="button" @click="sendcode" :disabled="disabled" v-if="disabled == true">{{btntxt}}</el-button>
      </el-form-item>
      <el-form-item class='txt-center'>
        <el-button :loading='loading' :disabled="loading" type="warning" @click="submitForm()" class='loginBtn'>下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import $valid from '@/assets/js/formValidate'
    export default {
      name: "forgetPsw",
      data() {
        return {
          disabled: false,
          time:0,
          btntxt:'重新发送',
          loading:false,
          validateForm: {
            userIphone: '',
            userPassWord:'',
            userCheckPsw:'',
            captcha_code:'',
          },
          rules:{
            userIphone:[
              {required: true, message: '请输入手机号', trigger:['change','blur']},
              {validator:$valid.cellphone, trigger:['change','blur']}
            ],
            userPassWord:[
              {required: true, message: '请输入密码', trigger:['change','blur']},
            ],
            userCheckPsw:[
              {required:true,message:'输入确认密码',trigger:['change','blur']},
              {validator:(rule,value,callback)=>{
                  if(value !== this.userPassWord){
                    callback(new Error('两次输入密码不一致'))
                  }else {
                    callback()
                  }
                },
                trigger:'blur'}
            ],
            captcha_code:[
              {required: true, message: '请输入验证码', trigger:['change','blur']},
            ],
          },
          clientHeight:document.body.clientHeight
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        //60s 倒数
        timer(){
          if (this.time > 0) {
            this.time --;
            this.btntxt = this.time + "s后重新获取";
            setTimeout(this.timer,1000);
          } else {
            this.time = 0;
            this.btntxt = "获取验证码";
            this.disable = false;
          }
        },
      //  手机发送验证码
        sendcode() {
          if(this.time === 0){
            this.time = 60;
            this.disable = true;
            this.timer();
          }
        },

      },
    }
</script>

<style scoped>
  .forgetPsw{width:30%;margin:auto;display:block;box-shadow:0 -1px 3px #4b7884, 0 1px 2px #4b7884;}
  .forgetPsw .title{border-bottom:10px solid #4b7884;background:#629aa9;color:#fff;text-align:center;line-height:60px;font-size:24px;display:block;margin:0 -2px;}
  .forgetPsw .loginBtn{width:120px;margin:auto;font-size:16px;}
  .forgetPsw>>> .el-form{padding:40px 60px;}
  .forgetPsw>>> .el-form .box{letter-spacing:2px;}
  .forgetPsw>>> .el-form .box .btn{display:inline-block;color:#337ab7;font-size:16px;}
  .forgetPsw>>> .el-form .box .btn:hover{color:#f2b33f;}
  @media (max-width:1920px){
    .forgetPsw{width:50%;}
  }
  @media (max-width:1200px){
    .forgetPsw{width:70%;}
  }
  @media (max-width:768px){
    .forgetPsw{width:90%;}
  }
</style>
