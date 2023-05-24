
const app = Vue.createApp({
    data() {
      return {
        recipes: [],
        selectedIndex: 0,
        recipe:{}
      };
    },
  
    mounted: function() {
      
      axios({
        method: 'get',
        url: 'https://api.spoonacular.com/recipes/complexSearch?type=main%20course&apiKey=62540050086947d1b64609a3c11d4e25',
      })
        .then(response => {
          const items = response.data.results;
          const promises = items.map(element => {
            return axios({
            method: 'get',
              url:(`https://api.spoonacular.com/recipes/${element.id}/information?apiKey=62540050086947d1b64609a3c11d4e25`),
            })
              .then(detailsResponse => {
                const recipeDetails = detailsResponse.data;
                return {
                  id: recipeDetails.id,
                  name: recipeDetails.title,
                  image: recipeDetails.image,
                  level: recipeDetails.healthScore,
                  category:recipeDetails.dishTypes[0],
                  servings: recipeDetails.servings,
                  likes: recipeDetails.aggregateLikes,
                };
              })
              .catch(error => {
                console.log(error);
              });
          });
  
          Promise.all(promises)
            .then(results => {
              this.recipes = results.filter(recipe => recipe !== null);
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
            //console.log("ID:" + index);
            const recipe = this.recipes[index];
            const recipeId = recipe.id;
            

            axios({
                method: 'get',
                url: 'https://api.spoonacular.com/recipes/'+recipeId+'/information?includeNutrition=false&apiKey=62540050086947d1b64609a3c11d4e25'
            })
                .then(
                    (response) => {
                        //console.log(response.data.meals);
                        let item = response.data;
                        console.log(item);

                        this.recipe.id=index;
                        this.recipe.image =item.image;
                        this.recipe.name =item.title;
                        this.recipe.category =item.dishTypes[0];
                        this.recipe.readyIn =item.preparationMinutes;
                        this.recipe.cookTime =item.cookingMinutes;
                        this.recipe.level =item.healthScore;
                        this.recipe.likes =item.aggregateLikes;
                        this.recipe.servings =item.servings;
                        this.recipe.occasion =item.occasions[0];
                        this.recipe.summary =item.summary;
                        this.recipe.instructions =item.instructions;

                        let ingredientsList="";
                        for(let i=0; i<item.extendedIngredients.length; i++){
                            ingredientsList+=item.extendedIngredients[i].original+"<br>"

                        }

                        this.recipe.ingredients=ingredientsList;


                    }
                )
                .catch(
                    error => console.log(error)
                );

        },


    },




    
  });
  