<template>
    <div>
        <div class="toastPopup" v-bind:class="{'popup_open': open ? 'popup_open': close}">
            <span v-if="open">로그인에 성공했습니다.</span>
            <span v-else>로그인에 실패했습니다.</span>
        </div>
    </div>
</template>

<script>
let closeTimer;
export default {  
    props: ['open','close'],
    watch:{
        open(newValue){
            if(newValue){
               console.log('토스트 팝업 열기');
            }
        },
        close(newValue){
            if(newValue){
                clearTimeout(closeTimer);
               closeTimer = setTimeout(()=> this.$emit("popupDown"), 2000);
            }
        }
    }
    
}
</script>

<style scoped>
.toastPopup{background:rgb(0, 0, 0, 0.6);width:40%;height:5%;color:#fff;display:flex;justify-content:center;align-items:center;font-size:12px;position:fixed;left:4%;bottom:-5%;transition:bottom 0.2s linear;}
.popup_open {bottom:3%;}

</style>