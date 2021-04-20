import axios from "axios";
import ErrorHandler from "./../models/ErrorHandler";
import { IUser, User } from "./../models/UserModel";

class cocktailController {
  defaultMethod() {
    throw new ErrorHandler(501, "Not implemented method");
  }

  async getRandomCocktails() {
    try {
      let drinks = [];
      for (let i = 0; i < 5; i++) {
        const response = await axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/random.php`
        );
        if (response.statusText === "OK") {
          drinks.push(response.data.drinks[0]);
        } else {
          throw new ErrorHandler(
            501,
            "Something went wrong, please try again later."
          );
        }
      }
      return drinks;
    } catch (error) {
      return error;
    }
  }

  async getFilteredCocktails(query: object) {
    try {
      let queryString: string = "";
      for (const [key, value] of Object.entries(query)) {
        queryString = queryString.concat("&", `${key}=${value}`);
      }
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${queryString.slice(
        1,
        queryString.length
      )}`;

      const response = await axios.get(url);
      if (response.statusText === "OK") {
        if (response.data.drinks) {
          return response.data;
        } else {
          throw new ErrorHandler(404, "No drinks found");
        }
      } else {
        throw new ErrorHandler(
          501,
          "Something went wrong, please try again later."
        );
      }
    } catch (error) {
      return error;
    }
  }

  async getCocktailById(id: string) {
    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      if (response.statusText === "OK") {
        if (response.data.drinks) {
          return response.data;
        } else {
          throw new ErrorHandler(404, "Drink not found");
        }
      } else {
        throw new ErrorHandler(
          501,
          "Something went wrong, please try again later."
        );
      }
    } catch (error) {
      return error;
    }
  }

  async getList(query: string) {
    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/list.php?${query}=list`
      );
      if (response.statusText === "OK") {
        if (response.data) {
          return response.data.drinks;
        } else {
          throw new ErrorHandler(404, "List not found");
        }
      } else {
        throw new ErrorHandler(
          501,
          "Something went wrong, please try again later."
        );
      }
    } catch (error) {
      return error;
    }
  }

  async getIngredientDetails(id: string) {
    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=${id}`
      );
      if (response.statusText === "OK") {
        if (response.data.ingredients) {
          return response.data;
        } else {
          throw new ErrorHandler(404, "Ingredient not found");
        }
      } else {
        throw new ErrorHandler(
          501,
          "Something went wrong, please try again later."
        );
      }
    } catch (error) {
      return error;
    }
  }

  async getCocktailByName(query: string) {
    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
      );
      if (response.statusText === "OK") {
        if (response.data.drinks) {
          return response.data;
        } else {
          throw new ErrorHandler(404, "Drink not found");
        }
      } else {
        throw new ErrorHandler(
          501,
          "Something went wrong, please try again later."
        );
      }
    } catch (error) {
      return error;
    }
  }

  async addFavCocktail(userId: string, cocktailId: string) {
    try {
      const cocktail = await this.getCocktailById(cocktailId);
      if (cocktail.statusCode !== 404) {
        const user: IUser | null = await User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { favs: cocktailId } },
          { new: true, useFindAndModify: false }
        );
        if (user) {
          return user;
        } else {
          throw new ErrorHandler(404, "User not found");
        }
      } else {
        throw new ErrorHandler(404, "Cocktail not found");
      }
    } catch (error) {
      if (error.reason) {
        throw new ErrorHandler(404, "User not found");
      } else return error;
    }
  }

  async removeCocktailFromFav(userId: string, cocktailId: string) {
    try {
      const cocktail = await this.getCocktailById(cocktailId);

      if (cocktail.statusCode !== 404) {
        const user: IUser | null = await User.findOneAndUpdate(
          { _id: userId },
          { $pull: { favs: cocktailId } },
          { new: true, useFindAndModify: false }
        );
        if (user) {
          return user;
        } else {
          throw new ErrorHandler(404, "User not found");
        }
      } else {
        throw new ErrorHandler(404, "Cocktail not found");
      }
    } catch (error) {
      if (error.reason) {
        throw new ErrorHandler(404, "User not found");
      } else return error;
    }
  }
}

export = new cocktailController();
