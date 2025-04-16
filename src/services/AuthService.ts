import { Ref, ref } from 'vue';

class AuthService {
  private jwt: Ref<string>;
  private error: Ref<string>;
  private abortController: AbortController | null = null;

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
      // Abort any ongoing request
      if (this.abortController) {
        this.abortController.abort();
      }

      // Create a new AbortController for the current request
      this.abortController = new AbortController();

      const response = await fetch('http://localhost:3000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        signal: this.abortController.signal, // Attach the signal
      });
      const data = await response.json();

      // Reset the AbortController after the request completes
      this.abortController = null;

      // Validar error de la respuesta
      if (data.error) {
        this.error.value = data.message;
        return false;
      }

      // Guardar el JWT en el estado
      this.jwt.value = data.access_token;
      return true;
    } catch (error: any) {
      if (error.name === 'AbortError') {
        this.error.value = 'Request was aborted';
      } else {
        this.error.value = 'Login failed';
      }
      return false;
    }
  }
}

export default AuthService;