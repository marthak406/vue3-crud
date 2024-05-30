<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark" v-if="!isCmsRoute">
      <router-link :to="{ name: 'home' }" class="navbar-brand">MARTHA</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault"
        aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link :to="{name: 'home'}" class="nav-link">HOME</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">TENTANG</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">BERITA</a>
          </li>
        </ul>
        <div class="form-inline my-2 my-lg-0">
          <router-link :to="{ name: 'login' }" v-if="!loggedIn" class="btn btn-primary my-2 my-sm-0">LOGIN</router-link>
        </div>
      </div>
    </nav>

    <nav class="navbar navbar-expand-md navbar-light bg-light" v-if="isCmsRoute">
      <div class="container">
        <router-link :to="{ name: 'dashboard' }" class="navbar-brand">CMS Dashboard</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#cmsNavbar"
          aria-controls="cmsNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="cmsNavbar">
          <ul class="navbar-nav mr-auto">
            <router-link :to="{ name: 'dashboard' }" class="nav-link">DASHBOARD</router-link>
            <router-link :to="{ name: 'posts.index' }" class="nav-link">POSTS</router-link>
            <li class="nav-item" @click="logout" style="cursor: pointer">
              <a class="nav-link">LOGOUT</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {
      loggedIn: null
    };
  },

  methods: {
    getLoggedIn() {
      this.loggedIn = localStorage.getItem('loggedIn');
    },
    logout() {
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('token');
      this.loggedIn = null;
      this.$router.push({ name: 'home' });
    }
  },

  computed: {
    isCmsRoute() {
      const cmsRoutes = ['/dashboard', '/posts', '/create'];
      const routePath = this.$route.path;
      return cmsRoutes.includes(routePath) || routePath.startsWith('/edit');
    }
  },

  watch: {
    $route: {
      immediate: true,
      handler() {
        this.getLoggedIn();
      }
    }
  },
};
</script>
