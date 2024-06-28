<template>
  <div class="container mt-5">
      <div class="row">
          <div class="col-md-12">
              <div class="card border-0 rounded shadow">
                  <div class="card-body">
                      <form @submit.prevent="createUser()">
                          <div class="mb-3">
                              <label class="form-label fw-bold">Name</label>
                              <input type="text" class="form-control" v-model="name" placeholder="Name">
                              <div v-if="errors.name" class="alert alert-danger mt-2">
                                  <span>{{ errors.name[0] }}</span>
                              </div>
                          </div>
                          <div class="mb-3">
                            <label class="form-label fw-bold">Email</label>
                            <input type="text" class="form-control" v-model="email" placeholder="Email">
                            <div v-if="errors.email" class="alert alert-danger mt-2">
                                <span>{{ errors.email[0] }}</span>
                            </div>
                          </div>
                          <div class="mb-3">
                            <label class="form-label fw-bold">Password</label>
                            <input type="password" class="form-control" v-model="password" placeholder="Password">
                            <div v-if="errors.password" class="alert alert-danger mt-2">
                                <span>{{ errors.password[0] }}</span>
                            </div>
                          </div>
                          <button type="submit" class="btn btn-md btn-primary rounded-sm shadow border-0">Save</button>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: {
          name: '',
          email: '',
          password: '',
        },
      };
    },
    methods: {
      createUser() {
        axios.post('/api/users', this.user)
          .then(() => {
            this.$router.push({ name: 'users.index' });
          })
          .catch(error => {
            console.error(error);
          });
      },
    },
  };
  </script>
  