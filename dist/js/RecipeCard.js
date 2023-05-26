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
            type: Number,
            default: 1
        },

        likes:{
            type: Number,
            default: 1
        },

        readyInMinutes:{
            type: Number,
            default: 1
        },

        preparationMinutes:{
            type: Number,
            default: 1
        },

        index:{
            type: Number
        }

    },

methods: {

    onClickViewRecipe(){
        //console.log("VIEW");
        this.$emit('recipedetails', this.index, this.readyInMinutes) ;

    },

    onClickLikeRecipe(){
        //console.log("VIEW");
        this.$emit('recipelike', this.index);

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
      <button v-on:click="onClickViewRecipe" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="btn card-body-text text-center">View</button><br>
        <button v-on:click="onClickLikeRecipe" class="btn card-body-text text-center">Add</button><br>
        <a class="card-like text-center mt-5" href="#"><img class="img-fluid" src="images/corazon.png"
            alt="">{{likes}}</a>
      </ul>
    </div>
    </div>`


})