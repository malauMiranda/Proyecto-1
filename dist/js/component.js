
const app = Vue.createApp({
    data() {
      return {
        recipes: [],
        recipe:{}
      };
    },
  
    mounted() {
      axios({
        method: 'get',
        url: 'https://api.spoonacular.com/recipes/complexSearch?type=main%20course&apiKey=e60c2febb03f48e39574aa3f412be711',
      })
        .then(response => {
          const items = response.data.results;
          const promises = items.map(element => {
            return axios({
            method: 'get',
              url:(`https://api.spoonacular.com/recipes/${element.id}/information?apiKey=e60c2febb03f48e39574aa3f412be711`),
            })
              .then(detailsResponse => {
                const recipeDetails = detailsResponse.data;
                return {
                  id: recipeDetails.id,
                  name: recipeDetails.title,
                  image: recipeDetails.image,
                  level: recipeDetails.healthScore,
                  category:"default category",
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
        onClickRecipeDetails(recipeId) {
            console.log("ID:" + index);
            

            axios({
                method: 'get',
                url: 'https://api.spoonacular.com/recipes/'+index+'/information?includeNutrition=false&apiKey=94c0451559b94743a024799352374d29'
            })
                .then(
                    (response) => {
                        //console.log(response.data.meals);
                        let item = response.data;
                        console.log(item);

                        this.recipe.id=index;
                        this.recipe.image =item.image;
                        this.recipe.name =item.title;
                        this.recipe.category ="Default category";
                        this.recipe.time =item.readyInMinutes+"mins";
                        this.recipe.cookTime =item.readyInMinutes+"mins";
                        this.recipe.level =item.healthScore;
                        this.recipe.likes =item.aggregateLikes;
                        this.recipe.servings =item.servings;
                        this.recipe.occasion ="Default occasion";
                        this.recipe.summary =item.summary;
                        this.recipe.instructions =item.instructions;

                        let ingredientsList="";
                        for(let i=0; i<item.extendedIngredients.length; i++){
                            ingredientsList+=item.extendedIngredients[i].original+"\n"

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
  