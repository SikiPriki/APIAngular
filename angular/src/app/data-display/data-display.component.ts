import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-data-display',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
 /* template:` <div *ngFor="let item of testtest | keyvalue">
 Key: {{item.key}}, Value: {{item.value}}
</div>`, */
  templateUrl: './data-display.component.html',
  styleUrl: './data-display.component.css'
})
export class DataDisplayComponent {

  httpClient= inject(HttpClient);
  finance: any[]=[];
  fundName: any[]=[];
  change1m: any[]=[];
  change3m: any[]=[];
  change3y: any[]=[]; 
  testtest: any[]=[];

  ngOnInit(): void{
    this.fetchFinance()
  }

  fetchFinance(){
    this.httpClient.get('https://ivarpivar.netlify.app/api').subscribe((finance: any) =>{
      console.log(finance[0].data);

      //this.finance=finance;
      this.finance=finance[0].data

     //Adding stuff to arrays
      for(let i = 0; i<finance[0].data.length; i++){
        let round= finance[0].data[i]
        this.fundName.push(round.fundName);
        
        let nulcheck1m="";
        let nulcheck3m="";
        let nulcheck3y="";

        
        if (round.change1m!=null){
          this.change1m.push(round.change1m);
          //nulcheck1m=round.change1m;
        }else{
         //nulcheck1m="-";
         this.change1m.push("-")
        }

        //this.change1m.push(nulcheck1m)
        if (round.change3m!=null){
          this.change3m.push(round.change3m);
          //nulcheck3m=round.change3m;
        }else{
          this.change3m.push("-")
          //nulcheck3m="-";
        }


        if (round.change3y!=null){
          this.change3y.push(round.change3y);
          //nulcheck3y=round.change3y;
        }else{
         this.change3y.push("-")
         //nulcheck3y="-";
        }

        
        
      }

      for (let j = 0; j<this.fundName.length; j++){
        this.testtest.push([
          {
            "id":j,
            "name": this.fundName[j],
          "change1m": this.change1m[j] ,
          "change3m": this.change3m[j],
          "change3y":  this.change3y[j]}
        ])
      }
     
 console.log(this.testtest);
    })

   /*  this.testtest.push( //round.fundName/*
         [{
          "name": this.fundName,
          "change1m": this.change1m ,
          "change3m": this.change3m,
          "change3y":  this.change3y}] ) */
    console.log(this.testtest);
  }

}
