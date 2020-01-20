<script>
export default {
  props: {
    devs: {
      type: Array,
      required: true,
      default: () => []
    }
  }
};
</script>

<template>
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
      <a
        v-bind:href="`https://github.com/${dev.githubUsername}`"
        target="_blank"
      >Acessar Perfil no Github</a>
    </li>
  </ul>
</template>