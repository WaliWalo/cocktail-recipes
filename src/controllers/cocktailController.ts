import ErrorHandler from "./../models/ErrorHandler";
class userController {
  defaultMethod() {
    throw new ErrorHandler(501, "Not implemented method");
  }

  getRandomCocktails() {
    return "GET RANDOM COCKTAILS";
  }

  getCocktailsByIngredient() {
    //   www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin
    return "GET COCKTAILS INGREDIENT";
  }

  getCocktailsByName(name: string) {
    return "GET COCKTAILS BY NAME";
  }

  getCocktailById(id: string) {
    return "GET COCKTAILS BY ID";
  }

  getIngredientDetails(id: string) {
    return "GET INGREDIENT DETAILS BY NAME";
  }

  addFavCocktail(userId: string, cocktailId: string) {
    return "POST Fav Cocktail";
  }

  removeCocktailFromFav(userId: string, cocktailId: string) {
    return "DELETE Cocktail";
  }
}

export = new userController();
