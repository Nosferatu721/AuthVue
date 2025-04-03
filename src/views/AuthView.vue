<template>
  <h1>Auth View</h1>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title text-center">Login</h2>
            <form @submit.prevent="authUser">
              <div class="form-group">
                <label for="email">Email address</label>
                <input v-model="email" type="email" class="form-control" id="email" placeholder="Enter email" />
              </div>
              <div class="form-group mt-2">
                <label for="password">Password</label>
                <input v-model="password" type="password" class="form-control" id="password" placeholder="Password" />
              </div>
              <button class="btn btn-primary btn-block mt-4" type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import AuthService from '../services/AuthService';

let email = ref('');
let password = ref('');

const authUser = async () => {
  const auth = new AuthService();
  const success = await auth.login(email.value, password.value);
  if (success) {
    // Redirect to the home page or show a success message
    console.log('Login successful!');
    console.log(auth.getJwt().value);
  } else {
    // Show an error message
    console.log(auth.getError().value);
  }
};
</script>

<style scoped></style>
