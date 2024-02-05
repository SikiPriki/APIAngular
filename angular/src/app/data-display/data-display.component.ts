import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-data-display',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
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
  fundData: any[]=[];


  ngOnInit(): void{
    this.fetchFinance()
  }

  //Getting data from API and then adding it to arrays.
  fetchFinance(){
    this.httpClient.get('https://ivarpivar.netlify.app/api').subscribe((finance: any) =>{
      

      this.finance=finance[0].data

     //Adding stuff to specific arrays
      for(let i = 0; i<finance[0].data.length; i++){
        let round= finance[0].data[i]
        
        this.fundName.push(round.fundName);
        
        //Seeing if there are nul values 
        if (round.change1m!=null){
          
          this.change1m.push(round.change1m);
          
        }else{
         
          this.change1m.push("-")

        }

     
        if (round.change3m!=null){
          
          this.change3m.push(round.change3m);
         
        }else{
          
          this.change3m.push("-")
          
        }


        if (round.change3y!=null){
          
          this.change3y.push(round.change3y);
          
        }else{
         
          this.change3y.push("-")
         
        } 
      }

      //Adding arrays data in one array.
      for (let j = 0; j<this.fundName.length; j++){
        this.fundData.push([
          {
            "id":j,
            "name": this.fundName[j],
            "change1m": this.change1m[j] ,
            "change3m": this.change3m[j],
            "change3y":  this.change3y[j]
          }
        ])
      }
    })
  }

}
