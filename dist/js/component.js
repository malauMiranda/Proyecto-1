const app = Vue.createApp({
  data() {
    return {
      recipes: [],
      selectedIndex: 0,
      recipe: {},
      likedRecipes: [],
      searchRecipes: [],
    };
  },

  mounted: function () {
    axios({
      method: 'get',
      url: 'https://api.spoonacular.com/recipes/random?apiKey=aad664e7aedf41e290ddb6c82be41ec1&number=10'
    })
      .then((response) => {
        let items = response.data.recipes;
        this.recipes = [];

        if (items.length > 0) {
          items.forEach(element => {
            this.recipes.push({
              id: element.id,
              name: element.title,
              image: element.image,
              level: element.healthScore,
              category: element.dishTypes[0],
              servings: element.servings,
              likes: element.aggregateLikes,
              totalMinutes: element.readyInMinutes,
              preparationMinutes: element.readyInMinutes,
            });
          });
        }

        this.getCardDetails();
      })
      .catch(error => console.log(error));

  },

  methods: {

    //Show limited recipes
    getLimitedRecipes(n) {
      return this.recipes.slice(0, n);
    },


    //CARDS ON HOME
    //get information for the cards
    getCardDetails() {
      const requests = this.recipes.map(recipe => {
        return axios({
          method: 'get',
          url: 'https://api.spoonacular.com/recipes/' + recipe.id + '/information?includeNutrition=false&apiKey=aad664e7aedf41e290ddb6c82be41ec1'
        });
      });

      Promise.all(requests)
        .then(responses => {
          responses.forEach((response, index) => {
            const data = response.data;
            this.recipes[index].level = data.healthScore;
            this.recipes[index].servings = data.servings;
            this.recipes[index].likes = data.aggregateLikes;
            this.recipes[index].readyInMinutes = data.readyInMinutes;
            this.recipes[index].preparationMinutes = data.readyInMinutes;
          });

          this.changeCategory();
          this.changeLevel();
        })
        .catch(error => console.log(error));
    },



      // Change the name of the category
      changeCategory() {
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
      
        const categoryInfo = this.recipe.category;
      
        if (categoryInfo === 'bread' || categoryInfo === 'breakfast' || categoryInfo === 'morning meal') {
          this.recipe.category = 'Breakfast';
        } else if (categoryInfo === 'beverage' || categoryInfo === 'drink') {
          this.recipe.category = 'Drinks';
        } else if (categoryInfo === 'side dish' || categoryInfo === 'appetizer' || categoryInfo === 'salad' || categoryInfo === 'sauce' || categoryInfo === 'marinade' || categoryInfo === 'fingerfood' || categoryInfo === 'snack' || categoryInfo === 'antipasti') {
          this.recipe.category = 'Appetizers';
        } else if (categoryInfo === 'main course' || categoryInfo === 'lunch') {
          this.recipe.category = 'Lunch';
        } else if (categoryInfo === 'dessert') {
          this.recipe.category = 'Dessert';
        } else if (categoryInfo === 'soup') {
          this.recipe.category = 'Soups';
        } else {
          this.recipe.category = 'Other';
        }
      },
      



    //change the level 
    changeLevel() {
      this.recipes.forEach(recipe => {
        const level = recipe.level;
    
        if (level >= 0 && level <= 20) {
          recipe.level = 'Easy';
        } else if (level >= 21 && level <= 70) {
          recipe.level = 'Intermediate';
        } else if (level >= 71) {
          recipe.level = 'Advanced';
        } else {
          recipe.level = 'Default level';
        }
      });
    
      const levelInfo = this.recipe.level;
    
      if (levelInfo >= 0 && levelInfo <= 20) {
        this.recipe.level = 'Easy';
      } else if (levelInfo >= 21 && levelInfo <= 70) {
        this.recipe.level = 'Intermediate';
      } else if (levelInfo >= 71) {
        this.recipe.level = 'Advanced';
      } else {
        this.recipe.level = 'Default level';
      }
    },
  

    //open recipes information
    onClickRecipeDetails(index) {
      const recipe = this.recipes[index];
      const recipeId = recipe.id;

      axios({
        method: 'get',
        url: 'https://api.spoonacular.com/recipes/' + recipeId + '/information?includeNutrition=false&apiKey=aad664e7aedf41e290ddb6c82be41ec1'
      })
        .then(response => {
          let item = response.data;
          this.recipeId = index;
          this.recipe.image = item.image;
          this.recipe.name = item.title;
          this.recipe.category = item.dishTypes[0];
          this.recipe.totalMinutes = item.readyInMinutes;
          this.recipe.preparationMinutes = item.preparationMinutes;
          this.recipe.level = item.healthScore;
          this.recipe.likes = item.aggregateLikes;
          this.recipe.servings = item.servings;
          this.recipe.occasion = item.occasions[0];
          this.recipe.summary = item.summary;
          this.recipe.instructions = item.instructions;

          let ingredientsList = "";
          for (let i = 0; i < item.extendedIngredients.length; i++) {
            ingredientsList += item.extendedIngredients[i].original + "\n";
          }

          this.recipe.ingredients = ingredientsList;

          this.changeCategory();
          this.changeLevel();
        })
        .catch(error => console.log(error));
    },





//SEARCH ON HOME

//get the name from html and search the name
searchRecipe() {
  const searchTerm = this.$refs.searchInput.value;

  axios({
    method: 'get',
    url: `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&apiKey=aad664e7aedf41e290ddb6c82be41ec1`
  })
    .then(response => {
      let items = response.data.results;
      console.log(items);

      if (items.length > 0) {
        items.forEach(element => {
          let category = '';
          if (element.dishTypes && element.dishTypes.length > 0) {
            category = element.dishTypes[0];
          }

          this.searchRecipes.push({
            id: element.id,
            name: element.title,
            image: element.image,
            level: element.healthScore,
            category: category,
            servings: element.servings,
            likes: element.aggregateLikes,
            totalMinutes: element.readyInMinutes,
            preparationMinutes: element.readyInMinutes,
          });
        });

        this.getSearchDetails(searchTerm);
      }
    })
    .catch(error => console.log(error));
},


//brings the information from api
  getSearchDetails(searchTerm) {
    const requests = this.searchRecipes.map(recipe => {
      return axios({
        method: 'get',
        url: `https://api.spoonacular.com/recipes/${recipe.id}/information?includeNutrition=false&apiKey=aad664e7aedf41e290ddb6c82be41ec1`
      });
    });
  
    Promise.all(requests)
      .then(responses => {
        responses.forEach((response, index) => {
          const data = response.data;
          this.searchRecipes[index].level = data.healthScore;
          this.searchRecipes[index].category = data.dishTypes[0];
          this.searchRecipes[index].name = data.title;
          this.searchRecipes[index].servings = data.servings;
          this.searchRecipes[index].likes = data.aggregateLikes;
        });

        this.changeCategorySearch();
        this.changeLevelSearch();

      })
      .catch(error => console.log(error));
  },



//change the categorry on card
changeCategorySearch() {
  this.searchRecipes.forEach(recipe => {
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

  const categoryInfo = this.recipe.category;

  if (categoryInfo === 'bread' || categoryInfo === 'breakfast' || categoryInfo === 'morning meal') {
    this.recipe.category = 'Breakfast';
  } else if (categoryInfo === 'beverage' || categoryInfo === 'drink') {
    this.recipe.category = 'Drinks';
  } else if (categoryInfo === 'side dish' || categoryInfo === 'appetizer' || categoryInfo === 'salad' || categoryInfo === 'sauce' || categoryInfo === 'marinade' || categoryInfo === 'fingerfood' || categoryInfo === 'snack' || categoryInfo === 'antipasti') {
    this.recipe.category = 'Appetizers';
  } else if (categoryInfo === 'main course' || categoryInfo === 'lunch') {
    this.recipe.category = 'Lunch';
  } else if (categoryInfo === 'dessert') {
    this.recipe.category = 'Dessert';
  } else if (categoryInfo === 'soup') {
    this.recipe.category = 'Soups';
  } else {
    this.recipe.category = 'Other';
  }
},



//change the level 
changeLevelSearch() {
  this.searchRecipes.forEach(recipe => {
    const level = recipe.level;

    if (level >= 0 && level <= 20) {
      recipe.level = 'Easy';
    } else if (level >= 21 && level <= 70) {
      recipe.level = 'Intermediate';
    } else if (level >= 71) {
      recipe.level = 'Advanced';
    } else {
      recipe.level = 'Default level';
    }
  });

  const levelInfo = this.recipe.level;

  if (levelInfo >= 0 && levelInfo <= 20) {
    this.recipe.level = 'Easy';
  } else if (levelInfo >= 21 && levelInfo <= 70) {
    this.recipe.level = 'Intermediate';
  } else if (levelInfo >= 71) {
    this.recipe.level = 'Advanced';
  } else {
    this.recipe.level = 'Default level';
  }
},

    //open recipes information
    onClickRecipeSearch(index) {
      const recipe = this.searchRecipes[index];
      const recipeId = recipe.id;

      axios({
        method: 'get',
        url: 'https://api.spoonacular.com/recipes/' + recipeId + '/information?includeNutrition=false&apiKey=aad664e7aedf41e290ddb6c82be41ec1'
      })
        .then(response => {
          let item = response.data;
          this.recipeId = index;
          this.recipe.image = item.image;
          this.recipe.name = item.title;
          this.recipe.category = item.dishTypes[0];
          this.recipe.totalMinutes = item.readyInMinutes;
          this.recipe.preparationMinutes = item.preparationMinutes;
          this.recipe.level = item.healthScore;
          this.recipe.likes = item.aggregateLikes;
          this.recipe.servings = item.servings;
          this.recipe.occasion = item.occasions[0];
          this.recipe.summary = item.summary;
          this.recipe.instructions = item.instructions;

          let ingredientsList = "";
          for (let i = 0; i < item.extendedIngredients.length; i++) {
            ingredientsList += item.extendedIngredients[i].original + "\n";
          }

          this.recipe.ingredients = ingredientsList;

          this.changeCategorySearch();
          this.changeLevelSearch();
        })
        .catch(error => console.log(error));
    },









    onClickLikeRecipe(index) {
      console.log("ID:" + index);
    },









      
    },
    

  
});
