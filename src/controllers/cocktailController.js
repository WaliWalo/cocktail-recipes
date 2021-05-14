"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const axios_1 = __importDefault(require("axios"));
const ErrorHandler_1 = __importDefault(require("./../models/ErrorHandler"));
const UserModel_1 = require("./../models/UserModel");
class cocktailController {
    defaultMethod() {
        throw new ErrorHandler_1.default(501, "Not implemented method");
    }
    async getRandomCocktails() {
        try {
            let drinks = [];
            for (let i = 0; i < 5; i++) {
                const response = await axios_1.default.get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`);
                if (response.statusText === "OK") {
                    drinks.push(response.data.drinks[0]);
                }
                else {
                    throw new ErrorHandler_1.default(501, "Something went wrong, please try again later.");
                }
            }
            return drinks;
        }
        catch (error) {
            return error;
        }
    }
    async getFilteredCocktails(query) {
        try {
            let queryString = "";
            for (const [key, value] of Object.entries(query)) {
                queryString = queryString.concat("&", `${key}=${value}`);
            }
            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${queryString.slice(1, queryString.length)}`;
            const response = await axios_1.default.get(url);
            if (response.statusText === "OK") {
                if (response.data.drinks) {
                    return response.data.drinks;
                }
                else {
                    throw new ErrorHandler_1.default(404, "No drinks found");
                }
            }
            else {
                throw new ErrorHandler_1.default(501, "Something went wrong, please try again later.");
            }
        }
        catch (error) {
            return error;
        }
    }
    async getCocktailById(id) {
        try {
            const response = await axios_1.default.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
            if (response.statusText === "OK") {
                if (response.data.drinks) {
                    return response.data;
                }
                else {
                    throw new ErrorHandler_1.default(404, "Drink not found");
                }
            }
            else {
                throw new ErrorHandler_1.default(501, "Something went wrong, please try again later.");
            }
        }
        catch (error) {
            return error;
        }
    }
    async getList(query) {
        try {
            const response = await axios_1.default.get(`https://www.thecocktaildb.com/api/json/v1/1/list.php?${query}=list`);
            if (response.statusText === "OK") {
                if (response.data) {
                    return response.data.drinks;
                }
                else {
                    throw new ErrorHandler_1.default(404, "List not found");
                }
            }
            else {
                throw new ErrorHandler_1.default(501, "Something went wrong, please try again later.");
            }
        }
        catch (error) {
            return error;
        }
    }
    async getIngredientDetails(id) {
        try {
            const response = await axios_1.default.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=${id}`);
            if (response.statusText === "OK") {
                if (response.data.ingredients) {
                    return response.data;
                }
                else {
                    throw new ErrorHandler_1.default(404, "Ingredient not found");
                }
            }
            else {
                throw new ErrorHandler_1.default(501, "Something went wrong, please try again later.");
            }
        }
        catch (error) {
            return error;
        }
    }
    async getCocktailByName(query) {
        try {
            const response = await axios_1.default.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
            if (response.statusText === "OK") {
                if (response.data.drinks) {
                    return response.data;
                }
                else {
                    throw new ErrorHandler_1.default(404, "Drink not found");
                }
            }
            else {
                throw new ErrorHandler_1.default(501, "Something went wrong, please try again later.");
            }
        }
        catch (error) {
            return error;
        }
    }
    async addFavCocktail(userId, cocktailId) {
        try {
            const cocktail = await this.getCocktailById(cocktailId);
            if (cocktail.statusCode !== 404) {
                const user = await UserModel_1.User.findOneAndUpdate({ _id: userId }, { $addToSet: { favs: cocktailId } }, { new: true, useFindAndModify: false });
                if (user) {
                    return user;
                }
                else {
                    throw new ErrorHandler_1.default(404, "User not found");
                }
            }
            else {
                throw new ErrorHandler_1.default(404, "Cocktail not found");
            }
        }
        catch (error) {
            if (error.reason) {
                throw new ErrorHandler_1.default(404, "User not found");
            }
            else
                return error;
        }
    }
    async removeCocktailFromFav(userId, cocktailId) {
        try {
            const cocktail = await this.getCocktailById(cocktailId);
            if (cocktail.statusCode !== 404) {
                const user = await UserModel_1.User.findOneAndUpdate({ _id: userId }, { $pull: { favs: cocktailId } }, { new: true, useFindAndModify: false });
                if (user) {
                    return user;
                }
                else {
                    throw new ErrorHandler_1.default(404, "User not found");
                }
            }
            else {
                throw new ErrorHandler_1.default(404, "Cocktail not found");
            }
        }
        catch (error) {
            if (error.reason) {
                throw new ErrorHandler_1.default(404, "User not found");
            }
            else
                return error;
        }
    }
}
module.exports = new cocktailController();
