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
    this.verToken();
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

    handleLoginData(data) {
      console.log(data.email, data.password);

      axios({
        method: 'post',
        url: `http://localhost/prueba01/public/api/users/login?email=${data.email}&password=${data.password}`
      })
      .then(response => {
        //console.log(response.data.accessToken)
        const token = response.data.accessToken; 
        localStorage.setItem('token', token);
        alert('¡Bienvenido');
        window.location.href = 'principal.html';

      })
      .catch(error => console.log(error));
  },


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
        alert('¡Se ha cerrado la sesión exitosamente!');
        window.location.href = 'principal.html';

      })
      .catch(error => {
        
        console.error('Error al cerrar sesión:', error);
      });
  },

     //VER SI ESTÁ EL TOKEN

verToken(){
  const token = localStorage.getItem('token');

  if (token !== null) {
    console.log('Sesion activa', token);
  } else {
    console.log('No hay sesion');
  }
},





  },



});
