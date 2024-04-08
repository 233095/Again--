

var used= [];
makeList();

var birth ={
   name: getColumn("birthdays",'Name')
  ,day:getColumn("birthdays",'Day')
  ,month:getColumn("birthdays",'Month')
  ,year:getColumn("birthdays",'Year')
};

//hate OOP but a class would be good here
//sad that in es5 there is no classes 
function persona(name,day,month,year){
    console.log(name+'|'+day+'|'+month+'|'+year);
    var regex = new RegExp(name,'gi');
    var index;
    
    for(var i = 0 ; i < 33; i++)
    {
      if(day=='INPUT YEAR AND MONTH FIRST' || day=='Day' || month=='Month' || year == 'Year')
      {
        setText("errors","PLEASE INPUT A DAY, MONTH AND YEAR");
        return;
      }
      if(regex.test(birth.name[i]))
      {
        index = i;
        break;
      }
      if(i==33 && typeof(day) == 'number' && typeof(month) == 'number' && typeof(year) == 'number')
      {
        this.name = name;
        this.day = day;
        this.month = month;
        this.year = year;
        return;
      }
      else if(i == 33){setText("errors","AN ERROR HAS OCCURED PLEASE TRY AGAIN"); return;}
    }
    this.name = birth.name[index];
    this.index = index;
    this.day = birth.day[index];
    this.month = birth.month[index];
    this.year = birth.year[index];
}


function makeList(){
  used=[];
  for (var i=0; i< 32; i++)
  {
    used.push(i);
  }
}
//to make random selection easier
function permutation(){
  var random = randomNumber(0,used.length-1);
  for(var i = 0; i< used.lenght; i++){
    if(i != makeList[random]){used=i;}
  }
  return random;
}

// the types can be either "basic", "random", "farthest" or "nearest"
// the time can be either "before", "after" or "none"
function search(personal,type,time){
  if(personal.name==undefined){return;}
  var person = personal;
  if(typeof(personal) == "string"){ person = new persona(personal)}
  
  var timeTestAfter = /after/gi.test(time);
  var timeTestBefore = /before/gi.test(time);
  
  if(timeTestAfter && timeTestBefore){throw new Error ("please test only one time or none");}
  //month, day
  var difference=100000000;
  var tempdifferential=0;
  var turner = 'none';
  var day = new Date(person.month+'/'+person.day+'/'+person.year);
  
  var condition_1 = (/basic/gi.test(type) || /random/gi.test(type));
  var condition_2 = /random/gi.test(type);
  var condition_3 = /closest/gi.test(type);

  if(!(condition_1 || condition_2 || condition_3)){throw new Error ("please input a valid type")}

  for(var j = 0; j< 32; j++)
  {
    var i =(condition_2)? permutation():j;
    var constant =[birth.year[i] == person.year,birth.month[i] == person.month];
    
    var condition = 
    (timeTestBefore)
    ?/*start array*/[birth.year[i] > person.year,
    constant[0] && birth.month[i] > person.month,
    constant[0] && constant[1] && birth.day[i] > person.day]/*end array*/:
    
    (timeTestAfter)
    ?/*start*/[birth.year[i] < person.year,
    constant[0] && birth.month[i] < person.month,
    constant[0] && constant[1] && birth.day[i] < person.day]/*end*/
  :[false,false,false];
  var bool = true;
    if(person.name == birth.name[i]){bool = false;}
  
    if(condition[0] || condition[1] || condition[2])
    {bool = false;}
    
    if(condition_1 && bool)
    { 
      //makeList();
      return birth.name[i];
      
    }
    
    var testDate = new Date(birth.month[i]+'/'+birth.day[i]+'/'+birth.year[i]);
    tempdifferential = Math.ceil(Math.abs(day-testDate)/(1000*60*60*24));
    if ( condition_3 && (tempdifferential < difference)  && bool)
    {
      difference = tempdifferential;
      turner = birth.name[i];
    }
  }
  if(condition_3)
  {return turner;}
  
  return 'none';
}
function setDays(){
  var t = [getText("month_input"),getText("year_input")];
  var maxDay = new Date(t[1],t[0],0).getDate();
  var text=1;
  if(getText("month_input")=='Month' || getText("year_input")=='Year')
  {
    text='INPUT YEAR AND MONTH FIRST';
  }
  setProperty("day_slider","max",maxDay);
  setText("day_no",text);
  setProperty("day_slider","value",1);
}
onEvent("month_input","change",setDays);
onEvent("year_input","change",setDays);
var changer = false;
//front end
var iterator = 0;
onEvent("change_Method","click",function(){
  if(changer == true){
    //bs
  hideElement("name_Input");
  changer = false;
  setText("change_Method","Birthdays Search");
  
    showElement("day_slider");
    
    showElement("day_no");
    
    showElement("month_input");
  
    showElement("year_input");
  }
  else{
  hideElement("day_slider");
  
    hideElement("day_no");
  
    hideElement("month_input");
  
    hideElement("year_input");
  
    changer = true;
  
  setText("change_Method","Students Search");  
  showElement("name_Input");
  }
});
onEvent("day_slider","change",function(){
  setText("day_no",getProperty('day_slider','value'));
});
onEvent("find","click",function(){
  var personalr = (changer)?new persona(getText("name_Input"))
    : 
    new persona(iterator ,getProperty("day_slider",'value') , getText("month_input") , getText("year_input") ));
  console.log(getText("year_input"));  
  console.log(personalr.name+'|'+personalr.day+ '|' + personalr.month+ '|' + personalr.year);
  
  var typer = getText("type");
  var timer= getText("time");
  var turner = search(personalr,typer,timer);
  console.log(turner);
});