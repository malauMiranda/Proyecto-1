const app = Vue.createApp({
  data() {
    return {
      allRecipes: [],
      filterRecipes: [],
      topRecipes: [],
      selectedIndex: 0,
      recipe: {},
      likedRecipes: [],
      searchRecipes: [],
      savedRecipes:[],
      username:'',
      userEmail:'',
      userCountry:'',
      userLastname:'',
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
              image: "http://localhost/prueba01/public/storage/imgs/" + element.image,
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
    this.getSavedRecipes();
    this.verToken();
    this.username = localStorage.getItem('nameUser');
    this.userLastname = localStorage.getItem('lastnameUser');
    this.userEmail = localStorage.getItem('emailUser');
    this.userCountry = localStorage.getItem('countryUser');
    
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

          let ingredientsList = "";
          for (let i = 0; i < ingredients.length; i++) {
            ingredientsList += ingredients[i].description + "\n";
          }
          this.recipe.ingredients = ingredientsList;



        })
        .catch(error => console.log(error));
    },

                                                                                   //SEE ALL RECIPES
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

    //open recipes information for all
    onClickRecipeDetailsAll(index) {
      const recipe = this.allRecipes[index];
      const recipeId = recipe.id;

      axios({
        method: 'get',
        url: 'http://localhost/prueba01/public/api/recipes/recipe/' + recipeId,

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

          this.searchRecipes = [];

          if (items.length > 0) {
            items.forEach(element => {

              this.searchRecipes.push({
                id: element.id,
                name: element.name,
                image: "http://localhost/prueba01/public/storage/imgs/" + element.image,
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


        })
        .catch(error => console.log(error));
    },





                                                                                 //FILTER BY CATEGORY
    //show cards depending on the category
    selectCategory(event) {
      const category = event.target.dataset.category;
      console.log('Categoría seleccionada:', category);
      this.allRecipes = [];


      axios({
        method: 'get',
        url: `http://localhost/prueba01/public/api/recipes/filterby/category/` + category

      })
        .then(response => {
          let items = response.data;
          console.log(items);

          this.filterRecipes = [];

          if (items.length > 0) {
            items.forEach(element => {

              this.filterRecipes.push({
                id: element.id,
                name: element.name,
                image: "http://localhost/prueba01/public/storage/imgs/" + element.image,
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


    //open recipes information for filterRecipes
    onClickRecipeFilter(index) {
      const recipe = this.filterRecipes[index];
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


        })
        .catch(error => console.log(error));
    },



                                                                                            //LOGIN
    //Checks if the user is correct
    handleLoginData(data) {
      console.log(data.email, data.password);

      axios({
        method: 'post',
        url: `http://localhost/prueba01/public/api/users/login?email=${data.email}&password=${data.password}`
      })
        .then(response => {
          //console.log(response.data.user.email)
          const token = response.data.accessToken;
          const idUser = response.data.user.id
         // const emailUser =response.data.user.email
          const nameUser = response.data.user.name
          const lastnameUser = response.data.user.last_name
          const countryUser = response.data.user.country
          localStorage.setItem('token', token);
          localStorage.setItem('idUser', idUser)
          localStorage.setItem('emailUser',response.data.user.email)
          localStorage.setItem('nameUser', nameUser)
          localStorage.setItem('lastnameUser', lastnameUser)
          localStorage.setItem('countryUser', countryUser)
        

          alert('¡Welcome!');
          window.location.href = 'principal.html';

        })
        
        .catch(error => console.log(error));
        alert('Your email or password is incorrect');
    },

    //Logs out
    logout() {
      const token = localStorage.getItem('token');

      axios({
        method: 'get',
        url: 'http://localhost/prueba01/public/api/users/logout',

        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {

          localStorage.removeItem('token');
          localStorage.removeItem('idUser');
          localStorage.removeItem('emailUser');
          localStorage.removeItem('nameUser');
          localStorage.removeItem('lastnameUser');
          localStorage.removeItem('countryUser');
          alert('¡You logged out succesuflly!');
          window.location.href = 'principal.html';

        })
        .catch(error => {

          console.error('Error, could not log out', error);
        });
    },


    //VER SI ESTÁ EL TOKEN
    verToken() {
      const token = localStorage.getItem('token');
      const idUser = localStorage.getItem('idUser');
      const emailUser = localStorage.getItem('emailUser');
      const nameUser = localStorage.getItem('nameUser');
      const lastnameUser = localStorage.getItem('lastnameUser');
      const countryUser = localStorage.getItem('countryUser');

      if (token !== null) {
        console.log('Sesion activa', token);
        console.log('ID Usuario', idUser);
        console.log('Usuario:',nameUser);
        console.log('Email:',emailUser);
        console.log('Apellido:',lastnameUser);
        console.log('Pais:',countryUser);
      } else {
        console.log('No hay sesion');
      }
    },

                                                                                    //SIGN UP
    //Check information to create an user
    handleSignupData(data) {
      console.log(data.email, data.password, data.name, data.last_name, data.country);

      axios({
        method: 'post',
        url: `http://localhost/prueba01/public/api/users/register?name=${data.name}&last_name=${data.last_name}&country=${data.country}&email=${data.email}&password=${data.password}`
      })
        .then(response => {
          alert('Nuevo usuario');
          window.location.href = 'inicio.html';

        })
        .catch(error => console.log(error));
    },

                                                                                    //RECOVER PASSWORD

     //Checks if the user is correct
     handleRecoveryData(data) {
      console.log(data.email);

      axios({
        method: 'post',
        url: `http://localhost/prueba01/public/api/users/recoverpassword?email=${data.email}`
      })
        .then(response => {
          console.log(response.data)
         

          alert('Your new password is: '+response.data.password);
          window.location.href = 'inicio.html';

        })
        .catch(error => console.log(error));
    },



                                                                                          //LIKE A RECIPE
    onClickLike(index) {
      const idUser = localStorage.getItem('idUser');
      const arraysToCheck = [this.topRecipes, this.allRecipes, this.filterRecipes, this.searchRecipes, this.savedRecipes];
    
      let recipeId = null;
      let found = false;
    
      for (const array of arraysToCheck) {
        const recipe = array[index];
        if (recipe && recipe.id) {
          recipeId = recipe.id;
          found = true;
          break;
        }
      }
    
      if (!idUser) {
        alert('Log in to like a recipe');
        return;
      }
    
      if (found) {
        axios({
          method: 'get',
          url: 'http://localhost/prueba01/public/api/users/likes/' + idUser + '/' + recipeId
        })
        .then(response => {
          if (response.data.code === 200) {
            alert('You liked a recipe');
            console.log(response.data);
          } else {
            console.log(response.data);
          }
        })
        .catch(error => console.log(error));
      } else {
        alert('Recipe not found');
      }
    },
    

                                                                           //SAVE A RECIPE
        onClickAdd(index) {
          const idUser = localStorage.getItem('idUser');
          const arraysToCheck = [this.topRecipes, this.allRecipes, this.filterRecipes, this.searchRecipes];
        
          let recipeId = null;
          let found = false;
        
          for (const array of arraysToCheck) {
            const recipe = array[index];
            if (recipe && recipe.id) {
              recipeId = recipe.id;
              found = true;
              break;
            }
          }
        
          if (!idUser) {
            alert('Log in to save a recipe');
            return;
          }
        
          if (found) {
            axios({
              method: 'get',
              url: 'http://localhost/prueba01/public/api/users/saverecipe/' + idUser + '/' + recipeId
            })
            .then(response => {
              if (response.data.code === 200) {
                alert('You saved a recipe');
                console.log(response.data);
              } else {
                console.log(response.data);
              }
            })
            .catch(error => console.log(error));
          } else {
            alert('Recipe not found');
          }
        },
    
    

            //cards for savedRecipes
    getSavedRecipes() {
      const idUser = localStorage.getItem('idUser');
      axios({
        method: 'get',
        url: 'http://localhost/prueba01/public/api/users/savedrecipes/'+idUser
      })
        .then((response) => {
          let items = response.data;


          if (items.length > 0) {
            items.forEach(element => {
              this.savedRecipes.push({
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


        //open recipes information for savedRecipes
        onClickRecipeDetailsSaved(index) {
          const recipe = this.savedRecipes[index];
          const recipeId = recipe.id;
    
          axios({
            method: 'get',
            url: 'http://localhost/prueba01/public/api/recipes/recipe/' + recipeId,
    
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
    
    
    
    
            })
            .catch(error => console.log(error));
        },
    
    
  },



});
