// var date = new Date();
// var month = date.getMonth();
// var today = date.getDate();

var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
// var monthNum = ["01", "02", "03", "04", "05", "06","07", "08", "09", "10", "11", "12"];
// var year = date.getFullYear();

function daysInMonth(month,year) {
  return new Date(year, month, 0).getDate();
}

var countData = document.getElementsByClassName("calendarValue").length;

for (var i=1;i<countData+1;i++){
	var text = document.getElementById("calendar_value["+i+"]").value;
	var json = JSON.parse(text);

	console.log(json);
	var monthNum =  json.monthYear.substring(0,2);
	var month = parseInt(monthNum);

	var year = json.monthYear.substring(2);

	var dayStart = new Date(monthNum+"/01/"+year);
	var totalDaysInMonth = daysInMonth(month, year);

	dayStart = dayStart.getDay();
	if(dayStart==0) dayStart=6;
	else dayStart-=1;

	// document.getElementById('calendar['+i+']').innerHTML = '<h1>'+monthNames[month-1]+' '+year+'</h1>';

	var div = '<div class="month"><ul><li class="prev">&#10094;</li><li class="next">&#10095;</li><li>'+monthNames[month-1]+'<br><span style="font-size:18px">'+year+'</span></li></ul></div>';

	document.getElementById('calendar['+i+']').innerHTML = div;

	document.getElementById('calendar['+i+']').innerHTML += '<ul class="weekdays"><li>Mo</li><li>Tu</li><li>We</li><li>Th</li><li>Fr</li><li>Sa</li><li>Su</li></ul>';

	var sunday = 6-dayStart+1;

	var dateLi = "";
	dateLi += '<ul class="days">';
	for(var j=0; j<dayStart;j++){ 
		dateLi+= '<li class="inactive"> </li>';
	}

	var counter = 0;
	var date;
	for(var j=1; j<totalDaysInMonth+1; j++){
		try{
			date = json.detail[counter].date;
		}catch{
			date = 99;
		}

		if(j-sunday==0 && j==date){
			dateLi+="<li class='sunday' style='background: linear-gradient( -45deg, "+json.detail[counter].color+" 49%, #ef9a9a 51% ); '>"+j+"</li>";
			sunday+=7;
			counter++;
		} else if(j-sunday==0){
			dateLi+="<li class='sunday'>"+j+"</li>";
			sunday+=7;
		} else if(j==date){
			dateLi+="<li class='"+ json.detail[counter].style +"' style='background-color: "+json.detail[counter].color +"'>"+j+"</li>";
			counter++;
		} 
		else dateLi+="<li class='inactive'>"+j+"</li>";
	}

	document.getElementById('calendar['+i+']').innerHTML += dateLi + '</ul>';
}
