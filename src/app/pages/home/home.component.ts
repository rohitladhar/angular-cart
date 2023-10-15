import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productList: any[] = [];
  cartObj:any={
    "CartId":0,
    "CustId":69,
    "ProductId":0,
    "Quantity":0,
    "AddedDate":"2023-10-15T07:12:40.9234"
  }

  constructor(private productService:ProductService){
    //constructor gets called when initialized the component
  }

  ngOnInit(): void {
    this.loadAllProducts();
    // calls after constructor gets loaded
  }

  loadAllProducts(){
    this.productService.getAllProducts().subscribe((result:any)=>{
      this.productList = result.data;
    })
  }

  addItemToCart(productId:number){
    this.cartObj.ProductId = productId;
    this.productService.addToCart(this.cartObj).subscribe((result:any)=>{
      if(result.result){
        alert("Product Added to cart");
        this.productService.cartAddedSubject.next(true);
      }
    })
  }
}
