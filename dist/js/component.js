const app = Vue.createApp({
  data() {
    return {
      recipes: [],
      selectedIndex: 0,
      recipe: {}
    };
  },

  mounted: function () {
    axios({
      method: 'get',
      url: 'https://api.spoonacular.com/recipes/random?apiKey=003fbf38482a417cbe0bf767c470ccbf&number=10',
    })
      .then(response => {
        const items = response.data.recipes;
        const promises = items.map(element => {
          return axios({
            method: 'get',
            url: (`https://api.spoonacular.com/recipes/${element.id}/information?apiKey=003fbf38482a417cbe0bf767c470ccbf`),
          })
            .then(detailsResponse => {
              const recipeDetails = detailsResponse.data;
              return {
                id: recipeDetails.id,
                name: recipeDetails.title,
                image: recipeDetails.image,
                level: recipeDetails.healthScore,
                category: recipeDetails.dishTypes[0],
                servings: recipeDetails.servings,
                likes: recipeDetails.aggregateLikes,
                readyInMinutes: recipeDetails.readyInMinutes,
                preparationMinutes: recipeDetails.preparationMinutes,
              }; 
            })
            .catch(error => {
              console.log(error);
            });
        });

        Promise.all(promises)
          .then(results => {
            this.recipes = results.filter(recipe => recipe !== null);
            this.changeCategoryCard(); 
            this.changeCategoryInfo(); 
            this.changeLevelCard();
            this.changeLevelInfo();
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  },





  methods: {

    getLimitedRecipes(n) {
      return this.recipes.slice(0, n);
    },



    onClickRecipeDetails(index) {
      const recipe = this.recipes[index];
      const recipeId = recipe.id;

      axios({
        method: 'get',
        url: 'https://api.spoonacular.com/recipes/' + recipeId + '/information?includeNutrition=false&apiKey=003fbf38482a417cbe0bf767c470ccbf'
      })
        .then(response => {
          console.log(response.data);
          let item = response.data;

          this.recipe.id = index;
          this.recipe.image = item.image;
          this.recipe.name = item.title;
          this.recipe.category = item.dishTypes[0];
          this.recipe.readyInMinutes = item.readyInMinutes;
          this.recipe.preparationMinutes = item.preparationMinutes;
          this.recipe.level = item.healthScore;
          this.recipe.likes = item.aggregateLikes;
          this.recipe.servings = item.servings;
          this.recipe.occasion = item.occasions[0];
          this.recipe.summary = item.summary;
          this.recipe.instructions = item.instructions;

          let ingredientsList = "";
          for (let i = 0; i < item.extendedIngredients.length; i++) {
            ingredientsList += item.extendedIngredients[i].original + "<br>";
          }

          this.recipe.ingredients = ingredientsList;

          this.changeCategoryCard();
          this.changeCategoryInfo();
          this.changeLevelCard();
          this.changeLevelInfo();

        })
        .catch(error => console.log(error));
    },



    changeCategoryCard() {
      this.recipes.forEach(recipe => {
        const category = recipe.category;
        

        if (category === 'bread' || category === 'breakfast' || category === 'morning meal') {
          recipe.category = 'Breakfast';
        } else if (category === 'beverage' || category === 'drink') {
          recipe.category = 'Drinks';
        } else if (category === 'side dish' || category === 'appetizer' || category === 'salad' || category === 'sauce' || category === 'marinade' || category === 'fingerfood' || category === 'snack' || category === 'antipasti') {
          recipe.category = 'Appetizers';
        } else if (category === 'main course' || category === 'lunch') {
          recipe.category = 'Lunch';
        } else if (category === 'dessert') {
          recipe.category = 'Dessert';
        } else if (category === 'soup') {
          recipe.category = 'Soups';
        } else {
          recipe.category = 'Other';
        }
      });


    },




    changeCategoryInfo() {
      const category = this.recipe.category;

      if (category === 'bread' || category === 'breakfast' || category === 'morning meal') {
        this.recipe.category = 'Breakfast';
      } else if (category === 'beverage' || category === 'drink') {
        this.recipe.category = 'Drinks';
      } else if (category === 'side dish' || category === 'appetizer' || category === 'salad' || category === 'sauce' || category === 'marinade' || category === 'fingerfood' || category === 'snack' || category === 'antipasti') {
        this.recipe.category = 'Appetizers';
      } else if (category === 'main course' || category === 'lunch') {
        this.recipe.category = 'Lunch';
      } else if (category === 'dessert') {
        this.recipe.category = 'Dessert';
      } else if (category === 'soup') {
        this.recipe.category = 'Soups';
      } else {
        this.recipe.category = 'Other';
      }

      
    },



    changeLevelCard() {
      this.recipes.forEach(recipe => {
        const level = recipe.level;

        if (level>=0 && level<=20) {
          recipe.level = 'Easy';
        } else if (level>=21 && level<=70) {
          recipe.level = 'intermediate';
        } else if (level>=71) {
          recipe.level = 'Advanced';
        } else {
          recipe.level = 'Default level';
        }
      });
    },

    changeLevelInfo() {
      const level = this.recipe.level;

      if (level>=0 && level<=20) {
        this.recipe.level = 'Easy';
      } else if (level>=21 && level<=70) {
        this.recipe.level = 'intermediate';
      } else if (level>=71) {
        this.recipe.level = 'Advanced';
      } else {
        this.recipe.level = 'Default level';
      }
    },


    }

  });
