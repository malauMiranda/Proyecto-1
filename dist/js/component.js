
const app = Vue.createApp({
    data(){
        return {
            recipes: [],

    }},

    mounted: function () {
        this.allRecipes = this.recipes;

        axios({
            method: 'get',
            url: 'https://api.spoonacular.com/recipes/complexSearch?type=main course&apiKey=94c0451559b94743a024799352374d29'
        })

            .then(
                (response) => {

                    let items =response.data.results;
                    console.log(items);

                    this.recipes = [];

                    items.forEach(element => {
                        this.recipes.push({
                            id: element.id,
                            name: element.title,
                            image: element.image,
                            level:"Easy",
                            category: "deafault category",
                            servings: "6",
                            likes:96,

                        });
                    });

                }
            )
            .catch(
                error => console.log(error)
            );

    },

})