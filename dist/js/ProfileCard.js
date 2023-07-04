app.component('profile-card', {

    props: {
        name:{
            type: String,
            default: "default user"
        },


        lastname:{
            type: String,
            default: "default name"
        },

        country:{
          type: String,
          default: "default country"
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
                
                <img src="images/fresa.png" class="img-user text-center round-img m-3" alt="user">

              </div>


              <div class="col">
                <div class="mt-lg-5">
                  <h1 class="text-user">Name: {{name}}</h1>
                  <h1 class="text-user">Lastname: {{lastname}}</h1>
                  <h1 class="text-user">Country: {{country}}</h1>
                  <h1 class="text-user">E-mail: {{email}}</h1>

                  
                </div>

              </div>
            </div>

          </td>
        </tr>
      </tbody>
    </table>

`


})