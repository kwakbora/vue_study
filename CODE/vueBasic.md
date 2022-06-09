```vue
<template>
  <div>
    <h1>Hello {{ animal }}</h1>
    <h2> 원숭이는 {{ food }} 를 좋아합니다.</h2>
    <input type="text" v-model="food" /><br/>
    <span>링크 연결 : <a :href="linkUrl" target="_blank">{{ food }}</a></span>
    <hr/>
    <!-- v-bind:class="{클래스명 : 참/거짓}" -->
    <h2 v-bind:class="{red: food === 'apple','not-good': food==='rice' }">원숭이는 {{ food }} 를 좋아합니다.</h2>
    <hr/><br/>
    <h3>당신의 나이는 {{ age }} 입니다.</h3>
    <p v-if="age > 18">당신은 어른입니다.</p>
    <p v-else-if=" age > 13 && age <= 18">당신은 청소년 입니다.</p>
    <p v-else>당신은 어린이 입니다.</p>
    <hr/><br/>
    <div>
        <h2 v-for="(ani, index) in animals" :key="index">{{ ani }} 인덱스는 :: {{ index }}</h2>
        <ul>
            <li v-for="(user,index) in users" :key="index">
                이름은 {{user.name}}이고 직업은 {{user.jog}} 이고, 성별은 {{user.gender}} 입니다.
                <p v-for="item in user.skill" :key="item">* {{item}}</p>
                <p>- skill 에서 첫번째 값 가져오기 :: {{ user.skill[0] }}</p>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
    name: "App",
    data(){
        return{
            animal: 'Monkey',
            food : 'apple',
            linkUrl : 'http://www.naver.com',
            age : 15,
            animals :['monkey','rat','dog','lion','monkey'],
            users :[
                { name:'영희', job:'developer', gender: 'female', skill:['html','css','javascript'] },
                { name:'철수', job:'designer', gender: 'male', skill:['html','css','javascript']},
                { name:'john', job:'pm', gender: 'male', skill:['html','css','javascript']}
            ]
        }
    }
}
</script>

<style>
.orange{
    color: orange;
}
.salmon{
    color:salmon;
}
.red{
    color:red;
}
.not-good{
    text-decoration: line-through;
}
</style>
```

