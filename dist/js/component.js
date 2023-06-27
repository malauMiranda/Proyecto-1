const app = Vue.createApp({
  data() {
    return {
      allRecipes:[],
      topRecipes: [],
      selectedIndex: 0,
      recipe: {},
      likedRecipes: [],
      searchRecipes: [],
    };
  },

  mounted: function () {

    
    //SHOW RECIPE CARD INFO TOP10
    axios({
      method: 'get',
      url: 'http://localhost/prueba01/public/api/recipes/top10'
    })
      .then((response) => {
        let items = response.data;
        this.topRecipes = [];

        if (items.length > 0) {
          items.forEach(element => {
            this.topRecipes.push({
              id: element.id,
              name: element.name,
              image:"http://localhost/prueba01/public/storage/imgs/"+element.image,
              level: element.level,
              category: element.category,
              occasion: element.occasion,
              likes: element.likes
            });
          });
        }

       
        //console.log(this.likedRecipes);
      })
      .catch(error => console.log(error));

      this.getAllRecipes();
  },


  methods: {

                                                              //CARDS ON HOME

    //open recipes information for top10
    onClickRecipeDetails(index) {
      const recipe = this.topRecipes[index];
      const recipeId = recipe.id;
    
      axios({
        method: 'get',
        url: `http://localhost/prueba01/public/api/recipes/recipe/${recipeId}`
      })
        .then(response => {
          let item = response.data[0][0];
          let ingredients = response.data[1];
    
          this.recipeId = index;
          this.recipe.image ="http://localhost/prueba01/public/storage/imgs/"+item.image;
          this.recipe.name = item.name;
          this.recipe.category = item.category;
          this.recipe.total = item.total_time;
          this.recipe.preparation = item.cooking_time;
          this.recipe.level = item.level;
          this.recipe.likes = item.likes;
          this.recipe.portions = item.portions;
          this.recipe.occasion = item.occasion;
          this.recipe.summary = item.description;
          this.recipe.instructions = item.preparation_instructions;
    
          let ingredientsList = "";
          for (let i = 0; i < ingredients.length; i++) {
            ingredientsList += ingredients[i].description + "\n";
          }
          this.recipe.ingredients = ingredientsList;
    
        
    
        })
        .catch(error => console.log(error));
    },
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//cards for allRecipes
    getAllRecipes() {
      axios({
        method: 'get',
        url: 'http://localhost/prueba01/public/api/recipes/all'
      })
      .then((response) => {
        let items = response.data;
        this.allRecipes = [];
  
        if (items.length > 0) {
          items.forEach(element => {
            this.allRecipes.push({
              id: element.id,
              name: element.name,
              image: "http://localhost/prueba01/public/storage/imgs/" + element.image,
              level: element.level,
              category: element.category,
              occasion: element.occasion,
              likes: element.likes
            });
          });
        }

        
      })
      .catch(error => console.log(error));
      
    },


   



                                                          //SEARCH ON HOME

//get the name from html and search the name
searchRecipe() {
  const searchTerm = this.$refs.searchInput.value;

  axios({
    method: 'get',
    url: `http://localhost/prueba01/public/api/recipes/searchbyname/${searchTerm}`

  })
    .then(response => {
      let items = response.data;
      console.log(items);

      
      if (items.length > 0) {
        items.forEach(element => {

          this.searchRecipes.push({
            id: element.id,
            name: element.name,
            image: "http://localhost/prueba01/public/storage/imgs/" +element.image,
            level: element.level,
            category: element.category,
            occasion: element.occasion,
            likes: element.likes,
          });
        });

        
      }
    })
    .catch(error => console.log(error));
},




    //open recipes information for search
    onClickRecipeSearch(index) {
      const recipe = this.searchRecipes[index];
      const recipeId = recipe.id;
    
      axios({
        method: 'get',
        url: 'http://localhost/prueba01/public/api/recipes/recipe/' + recipeId
      })
        .then(response => {
          let item = response.data[0][0];
          let ingredients = response.data[1];
          this.recipeId = index;
          this.recipe.image = "http://localhost/prueba01/public/storage/imgs/" + item.image;
          this.recipe.name = item.name;
          this.recipe.category = item.category;
          this.recipe.total = item.total_time;
          this.recipe.preparation = item.cooking_time;
          this.recipe.level = item.level;
          this.recipe.likes = item.likes;
          this.recipe.portions = item.portions;
          this.recipe.occasion = item.occasion;
          this.recipe.summary = item.description;
          this.recipe.instructions = item.preparation_instructions;
          this.recipe.ingredients = ingredients.map(ingredient => ingredient.description).join('\n');
    
          // ...
        })
        .catch(error => console.log(error));
    }
    ,





                                                                 //CARDS ON MY RECIPES LIKES

//get the id from add

onClickLike(index) {
  console.log("ID:" + index);
  const recipe = this.recipes[index];
  const recipeId = recipe.id;


  axios({
    method: 'get',
    url: `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${this.apiKey}`
  })
    .then((response) => {
      const data = response.data;

      let category = '';
      if (data.dishTypes && data.dishTypes.length > 0) {
        category = data.dishTypes[0];
      }

      this.likedRecipes.push({
        id: data.id,
        name: data.title,
        image: data.image,
        level: data.healthScore,
        category: category,
        portions: data.portions,
        likes: data.aggregateLikes+1,
        total: data.readyInMinutes,
        preparation: data.readyInMinutes,
      });

      localStorage.setItem('likedRecipes', JSON.stringify(this.likedRecipes));

      console.log(this.likedRecipes);
      this.getLikeDetails();

    })
    .catch(error => console.log(error));
},


    //get information for the cards
    getLikeDetails() {
      const requests = this.likedRecipes.map(recipe => {
        return axios({
          method: 'get',
          url: 'https://api.spoonacular.com/recipes/' + recipe.id + '/information?includeNutrition=false&apiKey=' + this.apiKey + ''
        });
      });

      Promise.all(requests)
        .then(responses => {
          responses.forEach((response, index) => {
            const data = response.data;
            this.recipes[index].level = data.healthScore;
            this.recipes[index].portions = data.portions;
            this.recipes[index].likes = data.aggregateLikes +1;
            this.recipes[index].total = data.readyInMinutes;
            this.recipes[index].preparation = data.readyInMinutes;
          });


        })
        .catch(error => console.log(error));
    },

    //open recipes information for search//get the id from add

onClickLike(index) {
  console.log("ID:" + index);
  const recipe = this.recipes[index];
  const recipeId = recipe.id;


  axios({
    method: 'get',
    url: `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${this.apiKey}`
  })
    .then((response) => {
      const data = response.data;

      let category = '';
      if (data.dishTypes && data.dishTypes.length > 0) {
        category = data.dishTypes[0];
      }

      this.likedRecipes.push({
        id: data.id,
        name: data.title,
        image: data.image,
        level: data.healthScore,
        category: category,
        portions: data.portions,
        likes: data.aggregateLikes+1,
        total: data.readyInMinutes,
        preparation: data.readyInMinutes,
      });

      localStorage.setItem('likedRecipes', JSON.stringify(this.likedRecipes));

      console.log(this.likedRecipes);
      this.getLikeDetails();

    })
    .catch(error => console.log(error));
},


    onClickLikeInfo(index) {
      const recipe = this.likedRecipes[index];
      console.log(index);
      const recipeId = recipe.id;

      axios({
        method: 'get',
        url: `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${this.apiKey}`
      })
        .then(response => {
          let item = response.data;
          this.selectedIndex = index;
          this.recipeId = index;
          this.recipe.image = item.image;
          this.recipe.name = item.title;
          this.recipe.category = item.dishTypes[0];
          this.recipe.total = item.readyInMinutes;
          this.recipe.preparation = item.readyInMinutes;
          this.recipe.level = item.healthScore;
          this.recipe.likes = item.aggregateLikes+1;
          this.recipe.portions = item.portions;
          this.recipe.occasion = item.occasions[0];
          this.recipe.summary = this.removeTags(item.summary);
          this.recipe.instructions = this.removeTags(item.instructions);

          let ingredientsList = "";
          for (let i = 0; i < item.extendedIngredients.length; i++) {
            ingredientsList += item.extendedIngredients[i].original + "\n";
          }

          this.recipe.ingredients = ingredientsList;


        })
        .catch(error => console.log(error));
    },


    onClickLikeInfoProfile(index) {

      axios({
        method: 'get',
        url: 'https://api.spoonacular.com/recipes/'+index+'/information?includeNutrition=false&apiKey='+this.apiKey+''
      })
        .then(response => {
          let item = response.data;
          this.selectedIndex = index;
          this.recipeId = index;
          this.recipe.image = item.image;
          this.recipe.name = item.title;
          this.recipe.category = item.dishTypes[0];
          this.recipe.total = item.readyInMinutes;
          this.recipe.preparation = item.readyInMinutes;
          this.recipe.level = item.healthScore;
          this.recipe.likes = item.aggregateLikes+1;
          this.recipe.portions = item.portions;
          this.recipe.occasion = item.occasions[0];
          this.recipe.summary = this.removeTags(item.summary);
          this.recipe.instructions = this.removeTags(item.instructions);

          let ingredientsList = "";
          for (let i = 0; i < item.extendedIngredients.length; i++) {
            ingredientsList += item.extendedIngredients[i].original + "\n";
          }

          this.recipe.ingredients = ingredientsList;


        })
        .catch(error => console.log(error));
    },



    removeTags(str) {
      if ((str===null) || (str===''))
          return false;
      else
          str = str.toString();
      return str.replace( /(<([^>]+)>)/ig, '');
  },

      
    },
    

  
});
