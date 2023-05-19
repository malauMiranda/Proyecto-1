app.component('recipe-card', {

    props: {
        name:{
            type: String,
            default: "default name"
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

        servings:{
            type: String,
            default: "default servings"
        },

        likes:{
            type: Number,
            default: 1
        },

    },





    template:

    /*html*/
    ` 
    <div class="card cards-rec">
    <h1 class="card-title">{{name}}</h1>
    <a href="recetaInfo.html"><img v-bind:src="image" class="card-img-top"  alt="img"></a>
    <div class="card-body red-space">
      <p class="card-text card-body-text text-center">Details:</p>
      <p class="card-text card-body-text text-center">Level: {{level}} </p>
      <p class="card-text card-body-text text-center">Category: {{category}}</p>
      <p class="card-text card-body-text text-center">Servings: {{servings}} </p>
      <img class="img-fluid line" src="images/linea.png" alt="division">
      <ul class="text-center">
        <a class="card-body-text text-center mb-lg-5" href="perfil.html">Add</a><br>
        <a class="card-like text-center mt-5" href="#"><img class="img-fluid" src="images/corazon.png"
            alt="">{{likes}}</a>
      </ul>
    </div>
    </div>`


})