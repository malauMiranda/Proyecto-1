app.component('profile-card', {

    props: {
        user:{
            type: String,
            default: "default user"
        },

        image:{
            type: String
        },

        name:{
            type: String,
            default: "default name"
        },

        email:{
            type: String,
            default: "default email"
        },


    },





    template:

    /*html*/
    ` 
    <table class="tabla-perfil mt-5">

      <tbody>
        <tr>
          <td>
            <div class="row">

              <div class="col">
                
                <img v-bind:src="image" class="img-user text-center round-img" alt="user">

              </div>


              <div class="col">
                <div class="mt-lg-5">
                  <h1 class="text-user">Usuario:{{user}}</h1>
                  <h1 class="text-user">Nombre completo:{{name}}</h1>
                  <h1 class="text-user">Correo electrónico: {{email}}</h1>

                  <a href="editarPerfil.html" class="btn white-user-btn ms-lg-3 mt-lg-2">Editar</a>
                </div>

              </div>
            </div>

          </td>
        </tr>
      </tbody>
    </table>

`


})