<script setup>
import { ref, onMounted } from 'vue';
import api from '../../api';

// Mendefinisikan state
const users = ref([]);

// Metode untuk mengambil data users
const fetchDataUsers = async () => {
    try {
        const response = await api.get('/api/users');
        users.value = response.data.data;
    } catch (error) {
        console.error('Gagal mengambil data users:', error);
    }
};

// Menjalankan hook onMounted
onMounted(() => {
    fetchDataUsers();
});

// Metode untuk menghapus user
const deleteUser = async (id) => {
    try {
        await api.delete(`/api/users/${id}`);
        fetchDataUsers();
    } catch (error) {
        console.error('Gagal menghapus user:', error);
    }
};

// Metode untuk konfirmasi penghapusan menggunakan dialog konfirmasi bawaan JavaScript
const confirmDelete = (userId) => {
    const confirmResult = window.confirm('Anda yakin ingin menghapus data ini?');
    if (confirmResult) {
        deleteUser(userId);
    }
};
</script>

<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col-md-12">
        <router-link :to="{ name: 'users.create' }" class="btn btn-md btn-success rounded shadow border-0 mb-3">ADD NEW USER</router-link>
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <table class="table table-bordered">
              <thead class="bg-dark text-white">
                <tr>
                  <th scope="col">Nama</th>
                  <th scope="col">Email</th>
                  <th scope="col" style="width:15%">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="users.length === 0">
                  <td colspan="3" class="text-center">
                    <div class="alert alert-danger mb-0">
                      Data Belum Tersedia!
                    </div>
                  </td>
                </tr>
                <tr v-else v-for="(user, index) in users" :key="index">
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td class="text-center">
                    <router-link :to="{ name: 'users.edit', params: { id: user.id } }" class="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">EDIT</router-link>
                    <button @click.prevent="confirmDelete(user.id)" class="btn btn-sm btn-danger rounded-sm shadow border-0">HAPUS</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>