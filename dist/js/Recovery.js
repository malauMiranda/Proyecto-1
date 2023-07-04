app.component('recovery', {

    props: {


    },

    data() {
        return {
            email: this.mail,
           
        };


    },

    methods: {
        recovery() {
            this.$emit('recovery-data', {
                email: this.email,
                
              })
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
                


                    <div class="w-75">
                    <input class="form-control form-space input-space static-text text-lg-start text-center" type="text" v-model="email" placeholder="Email" />
                    </div>


                    <div class="d-flex justify-content-lg-start justify-content-center">
                    <button class="btn login-btn fw-bold w-75 my-5" v-on:click="recovery">Reset Password</button>
                  </div>

               
            </div>

            <!--Imagen-->
            <div class="col-lg-6 d-none d-lg-block">
                <img class="img-rounded img-fluid" src="images/Registro.jpg" alt="Iniciar Sesión">
            </div>
        </div>

        

`


})