const app = Vue.createApp({
  data() {
    return {
      recipes: [],
      selectedIndex: 0,
      recipe: {},
      likedRecipes:[],
    };
  },

  mounted: function () {

    axios({
      method: 'get',
      url: 'https://api.spoonacular.com/recipes/random?apiKey=8f02b47ff3f54ece966feda0edc2f1bc&number=10'
  })

      .then(
          (response) => {

              let items =response.data.recipes;
              //console.log(items);

              this.recipes = [];

              if (items.length > 0) this.loading = false;
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

              this.getCardDetails();


          }
      )
      .catch(
          error => console.log(error)
      );


  },





  methods: {

    getLimitedRecipes(n) {
      return this.recipes.slice(0, n);
    },

    
    getCardDetails() {
      const requests = this.recipes.map(recipe => {
        return axios({
          method: 'get',
          url: 'https://api.spoonacular.com/recipes/' + recipe.id + '/information?includeNutrition=false&apiKey=8f02b47ff3f54ece966feda0edc2f1bc'
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
    


    onClickRecipeDetails(index) {
      const recipe = this.recipes[index];
      const recipeId = recipe.id;

      axios({
        method: 'get',
        url: 'https://api.spoonacular.com/recipes/'+recipeId+'/information?includeNutrition=false&apiKey=8f02b47ff3f54ece966feda0edc2f1bc'
      })
        .then(response => {
         
          let item = response.data;
          console.log(item.readyInMinutes);

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

          this.changeCategoryInfo();
          this.changeLevelInfo();



        })
        .catch(error => console.log(error));
    },


    onClickLikeRecipe(index){
      console.log("ID:" + index);

    },

    changeCategoryCard() {
      this.recipes.forEach(recipe => {
        const category = recipe.category;
    
        if (category === 'bread' || category === 'breakfast' || category === 'morning meal') {
          recipe.category = 'Breakfast';
          } else if (category ==='beverage' || category === 'drink') {
          recipe.category = 'Drinks';
        } else if (category === 'side dish' || category ==='appetizer' || category === 'salad' || category ==='sauce' || category=== 'marinade' || category === 'fingerfood' || category === 'snack' || category === 'antipasti') {
          recipe.category = 'Appetizers';
        } else if (category === 'main course' || category === 'lunch') {
          recipe.category = 'Lunch';
        } else if (category=== 'dessert') {
          recipe.category='Dessert';
        } else if (category === 'soup') {
          recipe.category ='Soups';
        } else {
          recipe.category = 'Other';
        }
      });
    },
    
    changeCategoryInfo() {
      const category = this.recipe.category;
    
      if (category === 'bread' || category === 'breakfast' || category === 'morning meal') {
        this.recipe.category = 'Breakfast';
       } else if(category === 'beverage' || category === 'drink') {
        this.recipe.category = 'Drinks';
      } else if (category === 'side dish' ||category === 'appetizer' || category === 'salad' || category === 'sauce' || category === 'marinade' || category === 'fingerfood' || category === 'snack' || category === 'antipasti') {
        this.recipe.category = 'Appetizers';
      } else if (category ==='main course' || category === 'lunch') {
        this.recipe.category = 'Lunch';
      } else if (category ==='dessert') {
        this.recipe.category = 'Dessert';
      } else if(category === 'soup') {
        this.recipe.category ='Soups';
      } else {
        this.recipe.category = 'Other';
      }
    },



    changeLevelCard() {
      this.recipes.forEach(recipe => {
        const level = recipe.level;

        if (level>=0 && level<=20) {
            recipe.level ='Easy';
        } else if (level>=21 && level<=70) {
          recipe.level= 'Intermediate';
        } else if (level>=71) {
          recipe.level ='Advanced';
        } else {
          recipe.level ='Default level';
        }
      });
    },

    changeLevelInfo() {
      const level = this.recipe.level;

      if (level>=0 && level<=20) {
        this.recipe.level = 'Easy';
      } else if (level>=21 && level<=70) {
        this.recipe.level='intermediate';
      } else if (level>=71) {
        this.recipe.level ='Advanced';
      } else {
        this.recipe.level= 'Default level';
      }
    },


    }

  });
