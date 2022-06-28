<template>
  <div id="app">
    <h1 class="login-tit">{{ title }}</h1>
        <div class="login-box">
            <div v-if="state.account.id" class="login-open-tit">
                안녕하세요!<br/>{{ state.account.name }}님! 로그인을 환영합니다!
                <button type="submit" class="btn-submit" @click="logout">로그아웃</button>
            </div>
            <div v-else class="login-inp-area">
                <div class="login-form">
                    <label for="useremail">ID : </label>
                    <input type="text" id="useremail" placeholder="test@test.com" v-model="state.form.loginId" @blur="validateEmail">
                </div>
                <div class="login-form">
                    <label for="userpassword">PW : </label>
                    <input type="password" id="userpassword" v-model="state.form.loginPw">
                </div>
                <button type="submit" class="btn-submit" v-on:click="submit">로그인</button>
                <p v-if="msg.userEmail" class="login-txt">{{ msg.userEmail }}</p>
                <ToastPopup v-bind:open="state.loggedIn" v-bind:close="state.loggedOut" v-on:popupDown="state.loggedOut = false"></ToastPopup>

            </div>
        </div>
  </div>
</template>

<script>
import axios from "axios";
import {reactive} from "vue";
import ToastPopup from './components/ToastPopup.vue';

let timer;
export default {
    name: 'app',
    components: {
        ToastPopup
    },
    data(){
        const state = reactive({
            account : {
                id : null,
                name : "",
            },
            loggedIn : false,
            loggedOut: false,
            form : {
                loginId:'',
                loginPw:'',
                },
        });
        const submit = () =>{
            const args = {
                loginId : state.form.loginId,
                loginPw : state.form.loginPw,
            }
            axios.post("/api/account",args).then(res =>{
                state.loggedIn = true;
                clearInterval(timer);
                timer = setTimeout(()=>state.account = (res.data), 2000)

               //console.log(res);
            }).catch(() => {
                state.loggedOut = true;
            });
        }
        //로그아웃
        const logout = () =>{
           axios.delete("/api/account").then(() =>{
             alert('로그아웃하였습니다.')
             state.account.id = null;
             state.account.name = '';
             state.form.loginId = '';
             state.form.loginPw = '';
             state.loggedIn = false;
            });  
        }
        axios.get("/api/account").then(res =>{
           state.account = res.data;
        });
        return {  
            state,
            submit,
            logout,
            title : 'Bora\'s LOGIN' ,
            msg:[],
            
        };
    },
    methods:{
      validateEmail(){
        /* eslint-disable */
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.form.loginId)){
            this.msg['userEmail'] = '';
        } else{
            this.msg['userEmail'] = '올바르지 않은 ID 입니다.'
        }
      }  
    },
}
</script>

<style>
/* reset
------------------------------------------ */
body,p,h1,h2,h3,h4,h5,h6,ul,ol,li,dl,dt,dd,table,th,td,form,fieldset,legend,input,textarea,button,select,img,div{margin:0; padding:0}
article, aside, details, figcaption, figure, footer, header, hgroup, nav, section{display:block}
img,fieldset{border:0}
ul,ol{list-style:none}
img,input,select{vertical-align:middle}
em,address{font-style:normal}
table{border-collapse:collapse; border-spacing:0px; empty-cells:show; table-layout:fixed}
caption{overflow:hidden; opacity:0; top:0; left:0; width:1px; height:1px; margin-top:-1px}

/* basic
------------------------------------------ */
body, input, select, textarea{font-family:'Malgun Gothic','맑은 고딕',dotum,'돋움',sans-serif; font-size:13px; color:#444}
body{-webkit-text-size-adjust:none}
input::placeholder {color: rgb(211, 211, 211);}
input::-webkit-input-placeholder{color: rgb(211, 211, 211);}
input:-mos-input-placeholder{color: rgb(211, 211, 211);}

.login-tit{
    text-align: center;
    font-size:18px;
    color:#a3a3a3;
    background:#ccc;
    padding:3% 0;

}
.login-box{
    margin-top:40px
}
.login-open-tit{
    font-size:13px;
    text-align:center;
    color:#444;
    font-size:16px;
    padding-bottom:30px;
    line-height:24px;
}
.login-inp-area{
    margin:0 auto;
    width:60%;
    text-align:center;
}
.login-form{margin-top:8px;text-align:left;}
.login-form label{line-height:32px;display:inline-block;width:20%;font-size:13px;font-weight:600}
.login-form label + input{border-radius:3px;box-sizing:border-box;width:80%;height:32px;line-height:32px;padding:0 2%;border:1px solid #a9a9ac}
.btn-submit{margin-top:30px;font-size:14px;border-radius:6px;width:60%;border:0;padding:0 2%;font-weight:600;height:36px;line-height:36px;background:#24c1a0;color:#fff}
.login-txt{font-size:14px;margin-top:20px;color:#222}
</style>