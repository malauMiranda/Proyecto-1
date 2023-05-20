app.component('login', {

    props: {
        username: {
            type: String,
            default: ''
        },
        keyword: {
            type: String,
            default: ''
        }

    },

    data() {
        return {
            user: this.username,
            password: this.keyword
        };


    },

    methods: {
        login() {
            console.log('Username:', this.username);
            console.log('Password:', this.password);
        }
    },

    template:

        /*html*/
        ` 
    <div class="d-flex justify-content-center align-items-center mx-5 row ">
        <div class="row px-xl-5 mx-5">

            <!--Campos de Registro-->
            <div class="col-lg-6 align-self-center">
                <h2 class="title-login d-flex justify-content-lg-start justify-content-center ">Log In</h2>
                <form action="" method="post"
                    class="row text d-flex justify-content-lg-start justify-content-center needs-validation" novalidate>


                    <div class="w-75">
                    <input class="form-control form-space input-space static-text text-lg-start text-center"
                    type="text" id="user" v-model="user" required>
                        <span
                        for="user" class="noclick msg d-flex justify-content-lg-start justify-content-center login-text">User name</span>
                        <p class="valid-feedback">
                        </p>
                    </div>


                    <div class="w-75">
                      <input class="form-control form-space input-space static-text text-lg-start text-center"
                             type="password" id="password" v-model="password" required>
                        <span
                        for="password" class="noclick msg d-flex justify-content-lg-start justify-content-center login-text">Password</span>
                        <p class="valid-feedback">
                        </p>
                    </div>


                    <div class="d-flex justify-content-lg-start justify-content-center">
                        <a class="login-link" href="recuperacion.html">Forgot password?</a>
                    </div>
                   
                    
                    <div class="d-flex justify-content-lg-start justify-content-center">
                        <!--<button class="btn login-btn btn-block fw-bold w-75 my-5 " name="login"
                            type="submit">
                            Iniciar Sesión
                        </button>-->
                        <a class="btn login-btn fw-bold w-75 my-5" href="principal.html">Log In</a>
                    </div>


                    <div class="d-flex justify-content-lg-start justify-content-center">
                        <div >
                            <p class="d-flex justify-content-lg-start justify-content-center login-text">Register </p>
                            <a class="d-flex justify-content-lg-start justify-content-center login-link" href="registro.html">Sign Up</a>
                        </div>
                    </div>
                </form>
            </div>

            <!--Imagen-->
            <div class="col-lg-6 d-none d-lg-block">
                <img class="img-rounded img-fluid" src="images/Registro.jpg" alt="Iniciar Sesión">
            </div>
        </div>

`


})