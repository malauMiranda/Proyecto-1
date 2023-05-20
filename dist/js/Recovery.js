app.component('recovery', {

    props: {
        mail: {
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
            email: this.mail,
            password: this.keyword
        };


    },

    methods: {
        login() {
            console.log('Email:', this.email);
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
                <h2 class="title-login d-flex justify-content-lg-start justify-content-center ">Password recovery</h2>
                <form action="" method="post"
                    class="row text d-flex justify-content-lg-start justify-content-center needs-validation" novalidate>


                    <div class="w-75">
                    <input class="form-control form-space input-space static-text text-lg-start text-center"
                    type="text" id="email" v-model="email" required>
                        <span
                        for="email" class="noclick msg d-flex justify-content-lg-start justify-content-center login-text">E-mail</span>
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
                        <!--<button class="btn login-btn btn-block fw-bold w-75 my-5 " name="login"
                            type="submit">
                            Iniciar Sesión
                        </button>-->
                        <a class="btn login-btn fw-bold w-75 my-5" href="inicio.html">Reset password</a>
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