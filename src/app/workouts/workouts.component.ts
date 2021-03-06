import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { Room, Player, Quote } from '../models/game';
import { GameService } from '../models/game.service';
import { Router } from '@angular/router';
import { Image } from '../widgets/picture-chooser/picture-chooser.component'

declare const FB: any;



@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss']
})


export class WorkoutsComponent implements OnInit {

  room = new Room();
  me: Player;
  
  
  


  constructor(private http: Http, public game: GameService, private router: Router) { }

  

  ngOnInit() {
      this.me = this.game.me;
      setInterval(()=> this.update(), 1000)
  }

  update(){
      this.http.get(this.game.apiRoot + "/game/room").subscribe( data =>{
          this.room = data.json();
      });
  }

  flipPicture(e: MouseEvent){
      e.preventDefault();
      this.http.post(this.game.apiRoot + "/game/room/picture", {}).subscribe();
  }
  
  submit(e: MouseEvent, quote: Quote, i: number){
      e.preventDefault();
      const data = { text: quote.text, player: this.me.name };
      this.http.post(this.game.apiRoot + "/game/room/quotes", data).subscribe(res=>{
          this.me.quotes.splice(i, 1);
          this.me.quotes.push( res.json() );            
      })
  }

  chooseQuote(e: MouseEvent, i: number){
      e.preventDefault();
      this.http.post(this.game.apiRoot + "/game/room/quotes/choose", { i: i }).subscribe(res=>{
      })
  }

  chosenQuote = ()=> this.room.quotes.find(x=> x.chosen);
  myQuote = ()=> this.room.quotes.find(x=> x.player ==this.me.name);

 

  
}


