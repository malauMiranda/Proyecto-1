app.component('recipe-info', {

    props: {


        name: {
            type: String,
            default: "default name"
        },

        likes: {
            type: Number,
            default: 1
        },

        image: {
            type: String
        },

        level: {
            type: String,
            default: "default level"
        },

        category: {
            type: String,
            default: "default category"
        },

        total: {
            type: Number,
            default: 60
        },

        preparation: {
            type: Number,
            default: 25
        },

        portions: {
            type: Number,
            default: 1
        },

        occasion: {
            type: String,
            default: "default occasion"
        },

        summary: {
            type: String,
            default: "default summary"
        },

        ingredients: {
            type: String,
            default: "default ingredients"
        },

        instructions: {
            type: String,
            default: "default instructions"
        },



    },


    methods: {


    },


    template:
        /*html*/
        ` 
    <div class="modal fade modal-b modal-lg" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">View</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <h1 class="recipe-title mt-5 mb-2">{{name}}</h1>
        <img class="img-fluid" src="images/red line.png" alt="linea">
    </section>

    <section class="container-fluidtext">
        <a class="regular-text pe-lg-5 ps-lg-5"><img class="img-fluid" src="images/corazon R.png" alt="">{{likes}}</a>
    </section>

    <section class="container-fluid text-center">
        <img v-bind:src="image" class="img-fluid info-img"  alt="img">
    </section>

    <section class="container-fluid ">
        <table class="tabla mt-5 text-center">

            <tbody>
                <tr>
                    <td class="text-center regular-text td-tabla">Level: {{level}}</td>
                    <td class="text-center regular-text td-tabla">Total Time: {{ total}} </td>
                    <td class="text-center regular-text td-tabla">{{portions}} portions</td>
                </tr>
                <tr>
                    <td class="text-center regular-text td-tabla">Category: {{category}}</td>
                    <td class="text-center regular-text td-tabla">Cooking time: {{preparation}}</td>
                    <td class="text-center regular-text td-tabla">Occasion: {{occasion}}</td>
                </tr>

            </tbody>
        </table>
        </section>
   
        <section class="container-fluid">
        <div class="table-responsive">
          <table class="tabla mt-5">
            <tbody>
              <tr>
                <td>
                  <h1 class="subtitle-recipe ms-5 mt-4">Description</h1>
                  <p class="me-5 ms-5 regular-text">{{summary}}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <h1 class="subtitle-recipe ms-5 mt-4">Ingredients</h1>
                  <p class="me-5 ms-5 regular-text">{{ingredients}}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      
    
    
    
    
    <section class="container-fluid">
        <h1 class="green-sub-titles text-center pt-5">Instructions</h1>

        <p class="ms-lg-5 me-lg-5 regular-text pe-lg-5 ps-lg-5 mt-lg-5"> {{instructions}}</p>

            </section>

            <button class="btn btn-category  float-end" type="button" data-bs-toggle="modal" data-bs-target="#message" data-bs-dismiss="modal">Close</button>

    
        </div>
      </div>
    </div>
    </div>
`



})