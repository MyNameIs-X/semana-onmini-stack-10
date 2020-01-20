<script>
import axios from './plugins/axios';
import userForm from './components/user-form.vue';
import listUser from './components/list-users.vue';
export default {
  name: 'app',
  
  components: {
    listUser,
    userForm
  },

  async created(){
    try{
      const response = await axios.get('/user');

      if(response.data && response.data.ok == true){
        this.devs = response.data.users;
      }
    }catch(err){
      console.log(err.message);
    }
  },


  data(){
    return {
      devs: []
    }
  },

  methods: {
    addUserList(e){
      this.devs.push(e);
    }
  }
}
</script>

<template>
  <div id="app">
    <aside class="sidebar">
      <strong>Cadastrar</strong>
      <userForm v-on:addUser="addUserList" />
    </aside><!-- sidebar -->
    <main class="dev-list">
      <listUser v-bind:devs="devs" />
    </main>
  </div>
</template>

<style lang="css">
  @import './assets/css/global.css';

  #app{
    max-width: 1200px;
    margin: 0 auto;
    padding: 60px 30px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }

  .dev-list{
    margin-left: 30px;
  }

  .sidebar{
    width: 320px;
    background: #fff;
    box-shadow: 0 0 14px 0 rgba(0, 0, 0, .2);
    border-radius: 2px;
    padding: 30px 20px;
  }

  .sidebar strong{
    font-size: 20px;
    text-align: center;
    display: block;
    color: #333;
  }

  .dev-list{
    flex: 1;
  }

  .dev-list ul{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    list-style: none;
  }

  .dev-item{
    background-color: #fff;
    box-shadow: 0 0 14px 0 rgba(0, 0, 0, .2);
    border-radius: 2px;
    padding: 20px;
  }

  .dev-item header{
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .dev-item header img{
    width: 54px;
    height: 54px;
    border-radius: 50%;
  }
  
  .dev-item header .user-info{
    margin-left: 10px;
  }

  .user-info strong{
    display: block;
    font-size: 16px;
    color: #333;
  }

  .user-info span{
    font-size: 13px;
    color: #999;
    margin-top: 2px;
  }

  .dev-item p{
    color: #666;
    font-size: 14px;
    line-height: 20px;
    margin: 10px 0;
  }

  .dev-item a{
    color: #8e4dff;
    font-size: 14px;
    text-decoration: none;
  }

  .dev-item a:hover{
    color: #5a2ea6;
  }

  @media (max-width: 1000px){
    #app{
      flex-direction: column
    }

    #app .dev-list{
      margin-left: 0;
      margin-top: 30px;
    }

    #app .sidebar{
      width: 100%;
    }
  }
</style>
