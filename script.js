var date = new Date();
var month = date.getMonth();
var today = date.getDate();
var totalDaysInMonth = daysInMonth(month + 1, date.getFullYear());
var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
var monthNum = ["01", "02", "03", "04", "05", "06","07", "08", "09", "10", "11", "12"];
var dayStart = new Date("01/"+monthNum[month]+"/"+date.getFullYear());

dayStart = dayStart.getDay();
if(dayStart==0) dayStart=6;
else dayStart-=1;

function daysInMonth(month,year) {
  return new Date(year, month, 0).getDate();
}

document.getElementById('calendar').innerHTML = '<h1>'+monthNames[month]+'</h1>';

document.getElementById('calendar').innerHTML += '<ul class="weekdays"><li>Mo</li><li>Tu</li><li>We</li><li>Th</li><li>Fr</li><li>Sa</li><li>Su</li></ul>';


var dateLi = "";
dateLi += '<ul class="days">';
for(var i=0; i<dayStart;i++){ 
	dateLi+= '<li> </li>';
}

for(var i=0; i<totalDaysInMonth; i++){
	if((i+1)==today) dateLi+="<li><span class='active'>"+(i+1)+"</span></li>";
	else dateLi+="<li>"+(i+1)+"</li>";
}

document.getElementById('calendar').innerHTML += dateLi + '</ul>';
