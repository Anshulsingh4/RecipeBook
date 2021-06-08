import { HttpClient } from '@angular/common/http';
import { AfterContentInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model'
import { ShoppingListService } from '../shopping-list.service';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, AfterContentInit, OnDestroy {

  @ViewChild('f', { static: false }) slForm: NgForm;

  subscription: Subscription;
  index: string;
  editMode: boolean = false;
  ingredient;

  constructor(private slService: ShoppingListService,
    private http: HttpClient) { }


  ngOnInit(): void {

  }

  ngAfterContentInit() {
    this.subscription = this.slService.startedEditing.subscribe((index: string) => {
      this.index = index;
      this.editMode = true;
      this.http.get('http://localhost:3000/getShoppingById/' + index).subscribe(res => {
        console.log(res)
        this.ingredient = res;
        this.slForm.setValue({
          name: this.ingredient.name,
          amount: this.ingredient.amount
        })
      })
    })
  }

  // Connected with Database
  onSubmit(data: NgForm) {
    if (this.editMode) {
      this.http.post('http://localhost:3000/editShopping/' + this.index, { name: data.value.name, amount: data.value.amount })
        .subscribe((res) => {
          alert('Successfully Updated')
        })

      this.editMode = false;
    }
    else {
      this.http.post('http://localhost:3000/newShopping', { name: data.value.name, amount: data.value.amount })
        .subscribe((res) => {
          this.ingredient = res;
        })
    }
    data.reset();
  }



  onClear() {
    this.slForm.reset();
  }


  onDelete(index: string) {
    this.onClear();
    this.http.post('http://localhost:3000/deleteShopping/' + index, {})
      .subscribe((res) => {
        if (res) {
          this.editMode = false;
          alert("Successfully Deleted Item");
        }
        else {
          alert("unable to delete")
        }
      })

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}


