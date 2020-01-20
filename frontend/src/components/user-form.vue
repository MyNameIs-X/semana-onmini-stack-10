<script>
import axios from '@/plugins/axios';

export default {
  created(){
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

  data() {
    return {
      user: {
        githubUsername: "",
        latitude: 0,
        longitude: 0,
        name: "",
        techs: ""
      }
    };
  },

  methods: {
    async handlerAddDev(e){
      try{
        this.user.latitude = Number(this.user.latitude);
        this.user.longitude = Number(this.user.longitude);
        const response = await axios.post('/user', this.user);
        if(response.data && response.data.ok == true){
          delete response.data.ok;
          this.user.githubUsername = '';
          this.user.latitude = '';
          this.user.longitude = '';
          this.user.name = '';
          this.user.techs = '';

          this.$emit('addUser', response.data);
        }
      }catch(err){
        console.log(err);
      }
    }
  }
};
</script>

<template>
  <form v-on:submit.prevent="handlerAddDev()">
    <div class="input-group">
      <div class="input-block">
        <label for="name">Nome</label>
        <input type="text" id="name" v-model="user.name" required />
      </div>
      <!-- input block -->
      <div class="input-block">
        <label for="github_username">Usuário do Github</label>
        <input type="text" id="github_username" v-model="user.githubUsername" required />
      </div>
      <!-- input block -->
    </div>
    <!-- input group -->

    <div class="input-block">
      <label for="techs">Tecnologias</label>
      <input type="text" id="techs" v-model="user.techs" required />
    </div>
    <!-- input block -->

    <div class="input-group">
      <div class="input-block">
        <label for="latitude">Latitude</label>
        <input type="number" id="latitude" step="any" v-model="user.latitude" required />
      </div>
      <!-- input block -->

      <div class="input-block">
        <label for="logitude">Logintude</label>
        <input type="number" id="logitude" step="any" v-model="user.longitude" required />
      </div>
      <!-- input block -->
    </div>
    <!-- input group -->

    <button type="submit">Salvar</button>
  </form>
</template>

<style scoped>
form {
  margin-top: 30px;
}

form .input-block {
  margin-top: 20px;
}

form .input-group {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

form .input-block label {
  color: #acacac;
  font-size: 14px;
  font-weight: bold;
  display: block;
}

form .input-block input {
  width: 100%;
  height: 32px;
  font-size: 14px;
  color: #666;
  border: 0;
  border-bottom: 1px solid #eee;
  background: white;
}

form button[type="submit"] {
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
  transition: background-color 0.5s;
}

form button[type="submit"]:hover {
  background-color: #6931ca;
}
</style>