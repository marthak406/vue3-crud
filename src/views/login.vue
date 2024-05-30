<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <h1 class="card-title" style="text-align: center;">Login</h1>
              <form @submit.prevent="login()">
                <div class="mb-3">
                  <label for="email" class="form-label fw-bold">Email</label>
                  <input type="email" class="form-control" v-model="email" id="email" >
                  <div v-if="errors.email" class="alert alert-danger mt-2">
                    <span>{{ errors.email[0] }}</span>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label fw-bold">Password</label>
                  <input type="password" class="form-control" v-model="password" id="password" >
                  <div v-if="errors.password" class="alert alert-danger mt-2">
                    <span>{{ errors.password[0] }}</span>
                  </div>
                </div>
                <button type="submit" class="btn btn-md btn-primary rounded-sm shadow border-0">Login</button>
              </form>
              <div v-if="errors.general" class="alert alert-danger mt-3">
                <span>{{ errors.general }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import api from "../api";

    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const errors = ref({});
    onMounted(async () => {
    try {
        await api.get('/sanctum/csrf-cookie');
    } catch (error) {
        console.error('Unable to get CSRF token:', error);
    }
    });

    const login = async () => {
    try {
        errors.value = {};
        await api.post('/api/login', {
        email: email.value,
        password: password.value
        });
        router.push({ path: "/home" });
    } catch (error) {
        if (error.response && error.response.data.data && error.response.data.data.errors) {
        errors.value = error.response.data.data.errors;
        console.log(errors.value);  // Cetak errors ke konsol
        } else if (error.response && error.response.data.message) {
        errors.value.general = error.response.data.message;
        console.log(errors.value);  // Cetak errors ke konsol
        } else {
        errors.value.general = "An unexpected error occurred.";
        console.log(errors.value);  // Cetak errors ke konsol
        }
    }

    };
    </script>
  