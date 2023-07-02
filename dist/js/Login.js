app.component('login', {

    
   
    data() {
      return {
        email: '',
        password:''
      };
    },

    methods: {

      async login() {
        this.$emit('login-data', {
            email: this.email,
            password: this.password
          })
              
              
        }
    
    },

    template:

        /*html*/
        ` 
        <div class="d-flex justify-content-center align-items-center mx-5 row">
        <div class="row px-xl-5 mx-5">
          <div class="col-lg-6 align-self-center">
            <h2 class="title-login d-flex justify-content-lg-start justify-content-center">Log In</h2>
            <div class="w-75">
              <input class="form-control form-space input-space static-text text-lg-start text-center" type="text" v-model="email" placeholder="Email" />
              <input class="form-control form-space input-space static-text text-lg-start text-center" type="password" v-model="password" placeholder="Password" />
              <div class="d-flex justify-content-lg-start justify-content-center">
                <a class="login-link mt-5" href="recuperacion.html">Forgot password?</a>
              </div>
            </div>
      
            <div class="d-flex justify-content-lg-start justify-content-center">
              <button class="btn login-btn fw-bold w-75 my-5" v-on:click="login">Log In</button>
            </div>
      
            <div class="d-flex justify-content-lg-start justify-content-center">
              <div>
                <p class="d-flex justify-content-lg-start justify-content-center login-text">Register</p>
                <a class="d-flex justify-content-lg-start justify-content-center login-link" href="registro.html">Sign Up</a>
              </div>
            </div>
          </div>
      
          <div class="col-lg-6 align-self-center">
            <img class="img-rounded img-fluid" src="images/Registro.jpg" alt="Iniciar Sesión">
          </div>
        </div>
      </div>
      

`


})