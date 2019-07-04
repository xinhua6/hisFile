<template>
  <div class='forgetPsw bg-white' :style="'margin-top:'+(clientHeight-357)/2+'px'">
    <strong class='title'>找回密码</strong>
    <el-form :model="validateForm" ref="loginForm" :rules="rules">
      <el-form-item prop="userIphone">
        <el-input placeholder="请输入手机号" prefix-icon="el-icon-phone-outline" v-model="validateForm.userIphone"></el-input>
      </el-form-item>
      <el-form-item prop="userPassWord" v-if="visible">
        <el-input type='password' placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="validateForm.userPassWord">
          <i slot="suffix" class="el-icon-view" @click="showPwd('show')" style="cursor: pointer"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="userPassWord" v-else>
        <el-input type='text' placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="validateForm.userPassWord">
          <i slot="suffix" class="el-icon-view" @click="showPwd('hide')" style="cursor: pointer"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="code" class="code">
        <el-input type='password' class="yanzhengma" placeholder="请输入验证码" prefix-icon="iconfont icon-yanzhengma"
                  v-model="validateForm.code" autocomplete="off" autocapitalize="off"
                  spellcheck="false" maxlength="6" style="width: 60%; float: left"></el-input>
        <el-button @click.prevent="getForgetCode" style="width: 40%" type="primary" :disabled="!rightPhone" >
          {{computedTime > 0 ? computedTime +'s后重新发送':'获取验证码'}}
        </el-button>
      </el-form-item>
      <el-form-item class='txt-center'>
        <el-button :loading='loading' :disabled="isClick" type="warning" @click="submitForm()" class='loginBtn'>下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import $valid from '@/assets/js/formValidate'
  import {reqSmsCode} from "../api";
    export default {
      name: "forgetPsw",
      data() {
        return {
          visible: true,
          computedTime:0,
          loading:false,
          validateForm: {
            userIphone: '',
            userPassWord:'',
            code:'',
          },
          rules:{
            userIphone:[
              {required: true, message: '请输入手机号', trigger:['change','blur']},
              {validator:$valid.cellphone, trigger:['change','blur']}
            ],
            userPassWord:[
              {required: true, message: '请输入密码', trigger:['change','blur']},
            ],
            code:[
              {required: true, message: '请输入验证码', trigger:['change','blur']},
            ],
          },
          clientHeight:document.body.clientHeight
        };
      },
      computed:{
        rightPhone(){
          return /^1\d{10}$/.test(this.validateForm.userIphone)
        },
        isClick(){
        //  只有所有都填完才能点击下一步
          if (!this.validateForm.userIphone || !this.validateForm.userPassWord ||
             !this.validateForm.code){
            return true
          }else {
            return false
          }
        }
      },
      methods: {
        //提交成功后跳转到登录页面
        submitForm() {
          this.$refs.loginForm.validate((valid) => {
            if (valid) {
              this.$http({
                method: 'post',
                url: `${this.baseURL}/user/updatePassword.do`,
                data: this.$qs.stringify(this.validateForm)
              }).then(res=>{
                this.loading=false;
                if(!res.status){
                  this.$message.success('找回密码成功');
                  this.$http({method: 'post',url: `${this.baseURL}/user/updatePassword.do`,
                    data:this.$qs.stringify(this.validateForm)}).then(res=>{
                    if(res.status){
                      this.$message.error('账号不存在');
                    }else{
                      this.$store.dispatch('logIn',res.data)
                      this.$router.push('/');
                    }
                  })
                }else this.$message.error(res.msg);
              })
            } else {
              this.loading=false;
            }
          });
        },

        //  手机发送验证码
        async getForgetCode(){
          if(this.computedTime === 0){
            this.computedTime = 60;
            this.intervalId = setInterval(()=>{
              this.computedTime--
              if (this.computedTime === 0){
                clearInterval(this.intervalId)
              }
            },1000)

            const result =  await reqSmsCode(this.validateForm.userIphone)
            if(result.status !== 0) { // 发送短信错误
              // 显示提示
              this.$message.error(result.data)
              // 停止计时
              if(this.computeTime) {
                this.computeTime = 0
                clearInterval(this.intervalId)
                this.intervalId = undefined
              }
            }

          }
        },

        // 密码的显示与隐藏  true:暗文显示，false:明文显示
        showPwd (value) {
          this.visible = !(value === 'show');
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
  .forgetPsw >>> .yanzhengma .el-input__prefix {width: 25px;}
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
