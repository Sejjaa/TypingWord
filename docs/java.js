$(()=>{
var body=$('body');
var score=0;
var navigation=  `
					<nav class="navbar-inverse">
					<div class="container-fluid">
					<div class="navbar-header">
					<a class="navbar-brand" href="#">Tayping Game</a>
					</div>
					<ul class="nav navbar-nav">
					<li><a href="#"><p class="text-info">Level-1 : 2-3 words</p></a></li>
					<li><a href="#"><p class="text-warning">Level-2 : 3-5 words</p></a></li>
					<li><a href="#"><p class="text-danger">Level-3 : 5-8 words</p></a></li>
					<li id="score"><a href="#">SCORE :-${score}  </a></li>
					</ul>
					</div>			
                 `;
body.append(navigation);
var li=document.querySelectorAll('li');

///inserting input for tayping
body.append('<input id="inp" type="text"></input>');
var input=document.querySelector('#inp');

//////// addEvent to links
for(let i=0;i<li.length;i++){
	li[i].addEventListener('click',allLevels)///////addd clicks
}/////end of events

/////stop to run function                
var stoplevel1=0;
var stoplevel2=0;
var stoplevel3=0;
////////global var how much words we will have
var leveldif;
var levelspeed;
///////who is caling like global var
var btnli;
///////////new var for reset arrey
var stop1;
var stop2;
var stop3;
//////////speed 
var speed;
function allLevels(){
	input.focus();
	if(this==li[0]){          ////for li 1		
	btnli=this;               ////for global var
	stop2=0;
	stop3=0;
	stop1=8;
	speed=30;
	filterarrey();
	displayANDhide(); 	
	if(stoplevel1==0){
	setTimeout(setuplevel1,1200);
	levelspeed=2500;
	stoplevel1++;
	leveldif=8;		
	}
	}if(this==li[1]){          ////for li 2
	stop1=0;
	stop3=0;
	stop2=6;
	speed=60;
	filterarrey();
	if(stoplevel2==0){
	setTimeout(setuplevel1,500);
	stoplevel2++;
	leveldif=6;
	levelspeed=4000;
	}		
	}if(this==li[2]){          ////for li 3
	stop2=0;
	stop1=0;
	stop3=4;
	speed=100;
	filterarrey();
	if(stoplevel3==0){
	setTimeout(setuplevel1,500);
	stoplevel3++;
	leveldif=4;
	levelspeed=6000;
	}		
	}                         
}

////////arraye for colors
var forspan=0;
var boje=['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'];
var rand;
var rand1;
var margine=[70,140,210,280,350,420,490,530];
/////////////end of first global vars
var allwords=words; //array of all words
var trendword=[];   ////emptyarrey
////////return intervals
var int1;
var leveldif1;



////////function for making spans
function setuplevel1(){
	if(leveldif==8){  //////level 1
		stopinterval();
		setTimeout(movespans,11000);
		setTimeout(startlevel,8000);
		}if(leveldif==6){  //////level 2
		stopinterval();
		setTimeout(startlevel,8000);
		}if(leveldif==4){  //////level 3
		stopinterval();	
		setTimeout(startlevel,8000);
		}

		function startlevel(){
			var leveldif1=setInterval(()=> {
			takecolor();
		    body.append('<div class="span span'+[forspan]+'">'+trendword[rand1]+'</div>');
			var span=$('.span'+[forspan]+' ');
			spans=$('.span');
			$(span).css({background:boje[rand],top:margine[Math.floor(Math.random()*margine.length)]})	
		forspan++;
		if(forspan==40){
			forspan=0;
		}
		return int1=leveldif1;	
		},levelspeed);
		return;
		}
	
return;
}//////////end of function making spans

////function for takerandom color
function takecolor(){
rand=Math.floor(Math.random()*boje.length);
rand1=Math.floor(Math.random()*trendword.length);

}///end of this color

////function for filtering words
function filterarrey(){
	if(stop1==8){             ////lev1
		for(let i=2;i<4;i++){
		var twords=allwords.filter(word=>word.length==i);	
		}
	 trendword=[];
	 for(let i=0;i<twords.length;i++){
	 	trendword.push(twords[i]);
	 	console.log(trendword)
	 }		
}if(stop2==6){            ////lev2
		for(let i=3;i<6;i++){
		var twords=allwords.filter(word=>word.length==i);	
		}
	trendword=[];	
	 for(let p=0;p<twords.length;p++){
	 	trendword.push(twords[p]);
	 	console.log(trendword)
	 }		
}if(stop3==4){            ///lev3
		for(let i=5;i<9;i++){
		var twords=allwords.filter(word=>word.length==i);
		trendword=[];
		}
	 for(let k=0;k<twords.length;k++){
	 	trendword.push(twords[k]);
	 	console.log(trendword)
	 }	
}


}


//////////fucking for hide and display navlinks
function displayANDhide(){

}

////fucntion to stop main function
function stopinterval(){
	clearInterval(int1);
	$(spans).remove();
}///end of this fun

var spans;////selectovanje spanova
var myinput;

var inscore=$('#score');

///////////moving spans
function movespans(){

var position=setInterval(()=>{
	$.each($(spans),(i,e)=>{
	$(e).css({left:'+='+1});
			
	var pos=$(e).position().left;
	if(pos>1100){
		clearInterval(position);
		setTimeout(stopinterval,3000);
		body.append('<div id="lose">YOU LOSE GAME </div>');
		var lose=$('#lose');
		setTimeout(over,5000);
		function over(){
			$(lose).remove();
		body.append('<div id="gameover">GAMMEE OVEER</div>');
		var gameover=$('#gameover');	
		}
		
	}if($(e).text()==$(input).val()){
		    $(input).val("");
			input.focus();
		$(e).css({width:200,height:70,transform:'rotateZ(360deg)',background:boje[Math.floor(Math.random()*boje.length)]}).fadeOut(1800,function(){
			$(e).remove();
			score++;
			inscore.text(' SCORE :'+'' +' '+-+' '+score+'');
			
		})
		console.log(trendword.length)
			}
	

})
	return;
},speed);

}




})////end of query