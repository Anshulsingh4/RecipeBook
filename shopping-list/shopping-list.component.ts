import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, DoCheck, OnDestroy {
  public ingredients;

  constructor(private slService: ShoppingListService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/getShopping').subscribe((res) => {
      this.ingredients = res;
      // console.log(this.ingredients)
    })
  }

  ngDoCheck() {
    this.http.get('http://localhost:3000/getShopping').subscribe((res) => {
      this.ingredients = res;
    })
  }



  onEditItem(index: string) {
    this.slService.startedEditing.next(index)
    // console.log(index)
    // this.http.post('http://localhost:3000/editShopping', { index }).subscribe()

  }

  ngOnDestroy() {
  }
}
