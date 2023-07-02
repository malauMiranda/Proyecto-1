app.component('sign-up', {


    data() {
        return {
            name:'',
            last_name:'',
            country:'',
            email:'',
            password:'',
        };


    },

    methods: {
        async signup() {
            this.$emit('signup-data', {
                name:this.name,
                last_name:this.last_name,
                country:this.country,
                email: this.email,
                password: this.password
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
                <h2 class="title-login d-flex justify-content-lg-start justify-content-center ">Sign Up</h2>
               

                    <div class="w-75">
                    <input class="form-control form-space input-space static-text text-lg-start text-center" type="text" v-model="name"  placeholder="Name"/>
                    <input class="form-control form-space input-space static-text text-lg-start text-center" type="text" v-model="last_name"  placeholder="Lastname"/>
                    <input class="form-control form-space input-space static-text text-lg-start text-center" type="text" v-model="country"  placeholder="Country"/>
                    <input class="form-control form-space input-space static-text text-lg-start text-center" type="text" v-model="email"  placeholder="Email"/>
                    <input class="form-control form-space input-space static-text text-lg-start text-center" type="password" v-model="password"  placeholder="Password"/>
                    </div>

                   
                    
                    <div class="d-flex justify-content-lg-start justify-content-center">
                    <button  class="btn login-btn fw-bold w-75 my-5" v-on:click="signup">Sign Up</button>
                    </div>
            </div>

            <!--Imagen-->
            <div class="col-lg-6 d-none d-lg-block">
                <img class="img-rounded img-fluid" src="images/Registro.jpg" alt="Iniciar Sesión">
            </div>
        </div>

`


})