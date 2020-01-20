<script>
import axios from './plugins/axios';
export default {
  name: 'app',

  async created(){
    try{
      const response = await axios.get('/user');

      if(response.data && response.data.ok == true){
        this.devs = response.data.users;
      }
    }catch(err){
      console.log(err.message);
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.user.latitude = position.coords.latitude,
        this.user.longitude = position.coords.longitude
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000
      }
    );
  },

  data(){
    return {
      user: {
        githubUsername: '',
        latitude: 0,
        longitude: 0,
        name: '',
        techs: '',
      },
      devs: []
    }
  },

  methods: {
    async handlerAddDev(e){
      try{
        this.user.latitude = Number(this.user.latitude);
        this.user.longitude = Number(this.user.longitude);
        const response = await axios.post('/user', this.user);
        if(response.data && response.data.ok == true){
          delete response.data.ok;
          this.devs.push(response.data)
          this.user.githubUsername = '';
          this.user.latitude = '';
          this.user.longitude = '';
          this.user.name = '';
          this.user.techs = '';
        }
      }catch(err){
        console.log(err);
      }
    }
  }
}
</script>

<template>
  <div id="app">
    <aside class="sidebar">
      <strong>Cadastrar</strong>
      <form v-on:submit.prevent="handlerAddDev()">
        <div class="input-group">
          <div class="input-block">
            <label for="name">Nome</label>
            <input type="text" id="name" v-model="user.name" required>
          </div><!-- input block -->
          <div class="input-block">
            <label for="github_username">Usuário do Github</label>
            <input type="text" id="github_username" v-model="user.githubUsername" required>
          </div><!-- input block -->
        </div><!-- input group -->

        <div class="input-block">
          <label for="techs">Tecnologias</label>
          <input type="text" id="techs" v-model="user.techs" required>
        </div><!-- input block -->
        
        <div class="input-group">
          <div class="input-block">
            <label for="latitude">Latitude</label>
            <input type="number" id="latitude" step="any" v-model="user.latitude" required />
          </div><!-- input block -->

          <div class="input-block">
            <label for="logitude">Logintude</label>
            <input type="number" id="logitude" step="any" v-model="user.longitude" required />
          </div><!-- input block -->
        </div><!-- input group -->

        <button type="submit">Salvar</button>
      </form>
    </aside><!-- sidebar -->
    <main class="dev-list">
      <ul>
        <li class="dev-item" v-for="(dev, i) in devs" :key="i">
          <header>
            <img v-bind:src="dev.pictureUrl" v-bind:alt="dev.name" />
            <div class="user-info">
              <strong>{{ dev.name }}</strong>
              <span>{{ dev.techs.join(', ') }}</span>
            </div>
          </header>
          <p>{{ dev.bio || 'Bio não disponível' }}</p>
          <a v-bind:href="`https://github.com/${dev.githubUsername}`" target="_blank">Acessar Perfil no Github</a>
        </li>
      </ul>
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

  .sidebar form{
    margin-top: 30px;
  }

  .sidebar form .input-block{
    margin-top: 20px;
  }

  .sidebar form .input-group{
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .sidebar form .input-block label{
    color: #ACACAC;
    font-size: 14px;
    font-weight: bold;
    display: block;
  }

  .sidebar form .input-block input{
    width: 100%;
    height: 32px;
    font-size: 14px;
    color: #666;
    border: 0;
    border-bottom: 1px solid #eee;
    background: white;
  }

  .sidebar form button[type="submit"]{
    width: 100%;
    border: 0;
    margin-top: 30px;
    background: #7d40e7;
    border-radius: 2px;
    padding: 15px 20px;
    font-size: 16px;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    transition: background-color .5s;
  }

  .sidebar form button[type="submit"]:hover{
    background-color: #6931ca;
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
