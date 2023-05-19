app.component('recipe-info', {

    props: {
        name:{
            type: String,
            default: "default name"
        },

        likes:{
            type: Number,
            default: 1
        },

        image:{
            type: String
        },

        level:{
            type: String,
            default: "default level"
        },

        category:{
            type: String,
            default: "default category"
        },

        readyIn:{
            type: Number,
            default: 1
        },

        cookTime:{
            type: Number,
            default: 1
        },

        servings:{
            type: String,
            default: "default servings"
        },

        occasion:{
            type: String,
            default: "default occasion"
        },

        summary:{
            type: String,
            default: "default summary"
        },

        ingredients:{
            type: String,
            default: "default ingredients"
        },

        instructions:{
            type: String,
            default: "default instructions"
        },

        

    },





    template:
    /*html*/
    ` 
    <h1 class="recipe-title mt-5 mb-2">{{name}}</h1>
        <img class="img-fluid" src="images/red line.png" alt="linea">
    </section>

    <section class="container-fluidtext">
        <a class="regular-text pe-lg-5 ps-lg-5"><img class="img-fluid" src="images/corazon R.png" alt=""> 225</a>
    </section>

    <section class="container-fluid text-center">
        <img v-bind:src="image" class="img-fluid info-img"  alt="img">
    </section>

    <!--Tabla-->
    <section class="container-fluid ">
        <table class="tabla mt-5 text-center">

            <tbody>
                <tr>
                    <td class="text-center regular-text td-tabla">Level: {{level}}</td>
                    <td class="text-center regular-text td-tabla">Total Time: {{readyIn}} mins</td>
                    <td class="text-center regular-text td-tabla">{{servings}} servings</td>
                </tr>
                <tr>
                    <td class="text-center regular-text td-tabla">Category: {{category}}</td>
                    <td class="text-center regular-text td-tabla">Cooking time: {{cookTime}} mins</td>
                    <td class="text-center regular-text td-tabla">Occasion: {{occasion}}</td>
                </tr>

            </tbody>
        </table>

        <!--Cuadro-->
        <table class="tabla mt-lg-4">

            <tbody>
                <tr>
                    <td>
                        <h1 class="subtitle-recipe ms-5 mt-4">Description</h1>
                        <p class="me-5 ms-5 regular-text">{{summary}}</p>
                        
                        <h1 class="subtitle-recipe ms-5">Ingredients</h1>
                        <div class="col-md ms-5">

                            <div class="regular-text">
                                <p class="mt-2 mb-2">{{ingredients}}</p>
                                <p class="mt-2 mb-2">{{ingredients}}</p>
                                <p class="mt-2 mb-2">{{ingredients}}</p>

                            </div>

                    </td>
                </tr>
            </tbody>
        </table>
    </section>

    <!--Instrucciones-->
    <section class="container-fluid">
        <h1 class="green-sub-titles text-center pt-5">Instructions</h1>

        <p class="ms-lg-5 me-lg-5 regular-text pe-lg-5 ps-lg-5 mt-lg-5"> {{instructions}}</p>

        <p class="ms-lg-5 me-lg-5 regular-text pe-lg-5 ps-lg-5 mt-lg-5"> {{instructions}}</p>

        <p class="ms-lg-5 me-lg-5 regular-text pe-lg-5 ps-lg-5 mt-lg-5"> {{instructions}}</p>

            </section>
`



})