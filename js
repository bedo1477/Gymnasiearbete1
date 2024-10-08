
document.getElementById('ingredient-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const userIngredients = document.getElementById('ingredients').value
        .toLowerCase()
        .split(',')
        .map(item => item.trim());

    // Find recipes that match the ingredients
    const matchedRecipes = recipes.map(recipe => {
        const matchingIngredients = recipe.ingredients.filter(ingredient => userIngredients.includes(ingredient));
        return { 
            name: recipe.name,
            matchingCount: matchingIngredients.length,
            totalIngredients: recipe.ingredients.length
        };
    });

    // Sort recipes by number of matching ingredients
    matchedRecipes.sort((a, b) => b.matchingCount - a.matchingCount);

    const recipeResults = document.getElementById('recipe-results');
    recipeResults.innerHTML = '';

    if (matchedRecipes.length > 0) {
        matchedRecipes.forEach(recipe => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe-item');

            recipeDiv.innerHTML = `<strong>${recipe.name}</strong> - Matches ${recipe.matchingCount}/${recipe.totalIngredients} ingredients`;

            recipeResults.appendChild(recipeDiv);
        });
    } else {
        recipeResults.innerHTML = '<p>No recipes found with the given ingredients.</p>';
    }
});

