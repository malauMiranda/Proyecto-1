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

        index:{
            type: Number
        }

    },

methods: {

    onClickViewRecipe(event){
        //console.log("VIEW");
        this.$emit('recipedetails',this.index);



    },
},



    template:

    /*html*/
    ` 
    <div class="card cards-rec">
    <h1 class="card-title">{{name}}</h1>
    <img v-bind:src="image" class="card-img-top"  alt="img">
    <div class="card-body red-space">
      <p class="card-text card-body-text text-center">Details:</p>
      <p class="card-text card-body-text text-center">Level: {{level}} </p>
      <p class="card-text card-body-text text-center">Category: {{category}}</p>
      <p class="card-text card-body-text text-center">Servings: {{servings}} </p>
      <img class="img-fluid line" src="images/linea.png" alt="division">
      <ul class="text-center">
      <button v-on:click="onClickViewRecipe"  class="btn card-body-text text-center">View</button><br>
        <button  class="btn card-body-text text-center" href="perfil.html">Add</button><br>
        <a class="card-like text-center mt-5" href="#"><img class="img-fluid" src="images/corazon.png"
            alt="">{{likes}}</a>
      </ul>
    </div>
    </div>`


})