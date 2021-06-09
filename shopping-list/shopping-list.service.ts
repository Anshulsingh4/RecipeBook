
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model'

@Injectable()
export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>()
    startedEditing = new Subject<string>()

    constructor(private http: HttpClient) { }

    private ingredients = [];
    private ingredient = {};



    getIngredients() {
        return this.ingredients.slice()
    }

    getIngredient(index: string) {
        this.http.get('http://localhost:3000/getIngredient/' + index).subscribe((res) => {
            console.log(res)
            this.ingredient = res;
        })
    }

    addIngredient(ingredient) {
        this.http.post('http://localhost:3000/newShopping', ingredient).subscribe()

    }

    addIngredients(ingredients: Ingredient[]) {

        // this.ingredients.push(...ingredients)
        // this.ingredientsChanged.next(this.ingredients.slice())
    }

    updateIngredient(index: string, newIngredient: Ingredient) {
        //     this.ingredients[index] = newIngredient;
        //     this.ingredientsChanged.next(this.ingredients.slice())
    }

    deleteIngredient(index: string) {
        // this.http.post('http://localhost:3000/deleteIngredient', index).subscribe()
    }


}