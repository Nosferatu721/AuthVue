import { Ref, ref } from 'vue';

class AuthService {
  private jwt: Ref<string>;
  private error: Ref<string>;

  constructor() {
    this.jwt = ref('');
    this.error = ref('');
  }

  getJwt(): Ref<string> {
    return this.jwt;
  }

  getError(): Ref<string> {
    return this.error;
  }

  async login(email:string, password:string): Promise<boolean> {
    try {
      const response = await fetch('http://localhost:3000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      // Validar error de la respuesta
      if (data.error) {
        this.error.value = data.message;
        return false;
      }

      // Guardar el JWT en el estado
      this.jwt.value = data.access_token;
      return true;
    } catch (error) {
      this.error.value = 'Login failed';
      return false;
    }
  }
}

export default AuthService;