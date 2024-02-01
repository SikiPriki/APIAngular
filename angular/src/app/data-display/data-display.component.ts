import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';


@Component({
  selector: 'app-data-display',
  standalone: true,
  imports: [HttpClientModule],
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

  ngOnInit(): void{
    this.fetchFinance()
  }

  fetchFinance(){
    this.httpClient.get('https://ivarpivar.netlify.app/api').subscribe((finance: any) =>{
      console.log(finance[0].data);

      this.finance=finance;

     //Adding stuff to arrays
      for(let i = 0; i<finance[0].data.length; i++){
        let round= finance[0].data[i]
        this.fundName.push(round.fundName);
     
        
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
      
     
    });
  }

}
