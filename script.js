var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

var text = document.getElementById("calendar_value").value;
var json = JSON.parse(text);

//hitung rentang waktu dengan data tidak lebih dari 4 bulan
var monthFrom =  json.monthYear[0].substring(0,2);
var monthFromInt = parseInt(monthFrom);
var monthTo =  json.monthYear[1].substring(0,2);
var monthToInt = parseInt(monthTo);

var diffMonth;
if(monthToInt>monthFromInt) diffMonth = monthToInt-monthFromInt+1;
else 
	diffMonth = (12-monthFromInt)+monthToInt+1;

var year = parseInt(json.monthYear[0].substring(2));
var counterMonth = monthFrom;
var counterMonthInt = monthFromInt;
var startJson=0;

for (var i=1;i<diffMonth+1;i++, counterMonthInt++){
	if(counterMonthInt>12){
		counterMonth = "01";
		counterMonthInt = 1;
		year+=1;
	}

	//hitung mulai tanggal satu di hari apa
	var dayStart = new Date(counterMonth+"/01/"+year);
	dayStart = dayStart.getDay();
	if(dayStart==0) dayStart=6;
	else dayStart-=1;

	//hitung minggu mulai dari hari apa
	var sunday = 6-dayStart+1;

	//hitung bulan itu ada berapa hari
	var totalDaysInMonth = daysInMonth(counterMonthInt, year);

	//mulai buat tempat untuk kalender
	document.getElementById('wrap_calendar').innerHTML += '<span id="calendar['+i+']" class="calendar"></span>';

	document.getElementById('calendar['+i+']').innerHTML = '<div class="month"><ul><li>'+monthNames[counterMonthInt-1]+'<br><span style="font-size:18px">'+year+'</span></li></ul></div>';

	document.getElementById('calendar['+i+']').innerHTML += '<ul class="weekdays"><li>Mo</li><li>Tu</li><li>We</li><li>Th</li><li>Fr</li><li>Sa</li><li>Su</li></ul>';

	//kosongin tanggal yang sebelum tanggal 1
	var dateLi = "";
	dateLi += '<ul class="days">';
	for(var j=0; j<dayStart;j++){ 
		dateLi+= '<li class="inactive"> </li>';
	}

	//mulai isi kalender
	var counter = startJson;
	var dateNow;
	var monthNow;
	var yearNow;
	var isoff;
	for(var j=1; j<totalDaysInMonth+1; j++){
		try{
			dateNow = json.detail[counter].date;
			monthNow = json.detail[counter].month;
			yearNow = json.detail[counter].year;
			isoff = json.detail[counter].isoff;
		}catch{
			dateNow = 99;
			monthNow = 99;
			yearNow = 99;
			isoff = "0";
		}

		if(j-sunday==0 && j==dateNow && monthNow == counterMonth && parseInt(yearNow) == year){
			dateLi+="<li class='"+ json.detail[counter].style +"' style='font-weight: bold; color: red'>"+j+"</li>";
			sunday+=7;
			counter++;
		} else if(isoff=="1" && j==dateNow && monthNow == counterMonth && parseInt(yearNow) == year){
			dateLi+="<li class='"+ json.detail[counter].style +"' style='font-weight: bold; color: red'>"+j+"</li>";
			counter++;
		} else if(j-sunday==-1){ 
			dateLi+="<li class='isoff'>"+j+"</li>";
		} else if(j-sunday==0){
			dateLi+="<li class='isoff'>"+j+"</li>";
			sunday+=7;
		} else if(j==dateNow && monthNow == counterMonth && parseInt(yearNow) == year){
			dateLi+="<li class='"+ json.detail[counter].style +"' style='background-color: "+json.detail[counter].color +"'>"+j+"</li>";
			counter++;
		} else {
			dateLi+="<li class='inactive'>"+j+"</li>";
		}
	}

	document.getElementById('calendar['+i+']').innerHTML += dateLi + '</ul>';

	if(counterMonthInt+1 < 10)
		counterMonth = "0"+(counterMonthInt+1);
	else counterMonth = "" + counterMonthInt;

	startJson = counter;
}


function daysInMonth(month,year) {
  return new Date(year, month, 0).getDate();
}
