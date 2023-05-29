const app = Vue.createApp({
  data() {
    return {
      recipes: [],
      selectedIndex: 0,
      recipe: {},
      likedRecipes: [],
      searchRecipes: [],
      apiKey:"7655a23dc96b491fb47e0a6c3806c590",
    };
  },

  mounted: function () {
    //localStorage.clear();
    this.likedRecipes = JSON.parse(localStorage.getItem('likedRecipes'));
    axios({
      method: 'get',
      url: 'https://api.spoonacular.com/recipes/random?apiKey=' + this.apiKey + '&number=10'
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
        console.log(this.likedRecipes);
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
          url: 'https://api.spoonacular.com/recipes/' + recipe.id + '/information?includeNutrition=false&apiKey=' + this.apiKey + ''
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

          this.changeCategoryCard();
          this.changeCategoryInfo();
          this.changeLevelCard();
          this.changeLevelInfo();
        })
        .catch(error => console.log(error));
    },



      // Change the name of the category in the card
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
  
       // Change the name of the category in recipe-info
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
  
      
      // Change the name of the level in the card
      changeLevelCard() {
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
      },
  
       // Change the name of the level in recipe-info
      changeLevelInfo() {
        const level = this.recipe.level;
  
        if (level >= 0 && level <= 20) {
          this.recipe.level = 'Easy';
        } else if (level >= 21 && level <= 70) {
          this.recipe.level = 'Intermediate';
        } else if (level >= 71) {
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
        url: 'https://api.spoonacular.com/recipes/' + recipeId + '/information?includeNutrition=false&apiKey=' + this.apiKey + ''
      })
        .then(response => {
          let item = response.data;
          this.recipeId = index;
          this.recipe.image = item.image;
          this.recipe.name = item.title;
          this.recipe.category = item.dishTypes[0];
          this.recipe.total = item.readyInMinutes;
          this.recipe.preparationMinutes = item.preparationMinutes;
          this.recipe.level = item.healthScore;
          this.recipe.likes = item.aggregateLikes;
          this.recipe.servings = item.servings;
          this.recipe.occasion = item.occasions[0];
          this.recipe.summary = this.removeTags(item.summary);
          this.recipe.instructions =this.removeTags(item.instructions);

          let ingredientsList = "";
          for (let i = 0; i < item.extendedIngredients.length; i++) {
            ingredientsList += item.extendedIngredients[i].original + "\n";
          }
          console.log(item.readyInMinutes);

          this.recipe.ingredients = ingredientsList;
          this.changeCategoryInfo();
          this.changeLevelInfo();
          //this.removeTags();
        })
        .catch(error => console.log(error));
    },





                                                          //SEARCH ON HOME

//get the name from html and search the name
searchRecipe() {
  const searchTerm = this.$refs.searchInput.value;

  axios({
    method: 'get',
    url: `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&apiKey=${this.apiKey}`

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
        url: `https://api.spoonacular.com/recipes/${recipe.id}/information?includeNutrition=false&apiKey=${this.apiKey}`
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

        this.changeCategoryInfoSearch();
        this.changeLevelInfoSearch();
        this.changeLevelCardSearch();
        this.changeCategoryCardSearch();

      })
      .catch(error => console.log(error));
  },


  changeCategoryCardSearch() {
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
  },

  changeCategoryInfoSearch() {
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

  changeLevelCardSearch() {
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
  },

  changeLevelInfoSearch() {
    const level = this.recipe.level;

    if (level >= 0 && level <= 20) {
      this.recipe.level = 'Easy';
    } else if (level >= 21 && level <= 70) {
      this.recipe.level = 'Intermediate';
    } else if (level >= 71) {
      this.recipe.level = 'Advanced';
    } else {
      this.recipe.level = 'Default level';
    }
  },


    //open recipes information for search
    onClickRecipeSearch(index) {
      const recipe = this.searchRecipes[index];
      const recipeId = recipe.id;

      axios({
        method: 'get',
        url: 'https://api.spoonacular.com/recipes/' + recipeId + '/information?includeNutrition=false&apiKey=' + this.apiKey + ''
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
          this.recipe.summary = this.removeTags(item.summary);
          this.recipe.instructions = this.removeTags(item.instructions);

          let ingredientsList = "";
          for (let i = 0; i < item.extendedIngredients.length; i++) {
            ingredientsList += item.extendedIngredients[i].original + "\n";
          }

          this.recipe.ingredients = ingredientsList;

          this.changeCategoryInfoSearch();
          this.changeLevelInfoSearch();
        })
        .catch(error => console.log(error));
    },





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
        servings: data.servings,
        likes: data.aggregateLikes+1,
        totalMinutes: data.readyInMinutes,
        preparationMinutes: data.readyInMinutes,
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
            this.recipes[index].servings = data.servings;
            this.recipes[index].likes = data.aggregateLikes +1;
            this.recipes[index].readyInMinutes = data.readyInMinutes;
            this.recipes[index].preparationMinutes = data.readyInMinutes;
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
        servings: data.servings,
        likes: data.aggregateLikes+1,
        totalMinutes: data.readyInMinutes,
        preparationMinutes: data.readyInMinutes,
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
          this.recipe.totalMinutes = item.readyInMinutes;
          this.recipe.preparationMinutes = item.preparationMinutes;
          this.recipe.level = item.healthScore;
          this.recipe.likes = item.aggregateLikes+1;
          this.recipe.servings = item.servings;
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
          this.recipe.totalMinutes = item.readyInMinutes;
          this.recipe.preparationMinutes = item.preparationMinutes;
          this.recipe.level = item.healthScore;
          this.recipe.likes = item.aggregateLikes+1;
          this.recipe.servings = item.servings;
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
