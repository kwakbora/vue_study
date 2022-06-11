```Vue
<template>
  <div>
      <form v-on:submit.prevent="submitForm">
          <div>
              <label for="useremail">Email :</label>
              <input id="useremail" type="text" v-model="useremail">
              <label for="password">PW :</label>
              <input id="password" type="password" v-model="password">
          </div>
          <button type="submit">로그인</button>
      </form>
  </div>
</template>

<script>
export default {
    data(){
        return{
            useremail: '',
            password: '',
        };
    },
    methods:{
        submitForm(){
            console.log('submit');
            this.initForm();
        },
        initForm(){
            this.useremail = '';
            this.password = '';
        }
    },
}
</script>

<style>

</style>

```
