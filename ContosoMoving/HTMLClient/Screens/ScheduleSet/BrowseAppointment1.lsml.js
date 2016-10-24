/// <reference path="~/GeneratedArtifacts/viewModel.js" />
var today = new Date();
var contatore = 0;
var temp = 1;
var myMap = new Map();

myapp.BrowseAppointment1.created = function (screen) {
    // Write code here.   
    screen.AppointmentDataStart = today;
    var i = 0;     
    var datatype = ":String";      
    filter = "Status eq " + msls._toODataString("Si", datatype);   
    myapp.activeDataWorkspace.ApplicationData
    .Employees   
    .filter(filter)
    .orderBy("Summary")
    .execute()
   .then(function (result) {
       //alert("elementi risultato ricerca=" + result.results.length);
       if (result.results.length > 0) {
           for (i = 0; i < result.results.length; i++) {               
                item = result.results[i];               
                myMap.set(item.Summary, i+1);
                //alert(item.Summary + " Employee =" + (i + 1));
            }
       }
   }, function (error) {
   });
};

myapp.BrowseAppointment1.EmployeesTemplate_postRender = function (element, contentItem) {
    // Write code here.
    var entity = contentItem.data;   
    function refresh() {
        var color = entity.Color;
        if (color == undefined && color == null) {
            color = "Color-Teal";
        };
        $(element).closest("li").addClass(color);
    };
    refresh();
};

//myapp.BrowseAppointment1.OldDate_render = function (element, contentItem) {
//    // Write code here.
//    if (contentItem.value != undefined && contentItem.value != null) {
//        var mese = getMonthName(contentItem.value);
//        var giorno = getDayName(contentItem.value);
//        var today = contentItem.value.getDate();
//        var hour = contentItem.value.getHours() + ":" + contentItem.value.getMinutes();
//        var txt = $('<div class="backColor_Red">' + mese + '<div class="backColor_white">' + giorno + ' - ' + today + '<div class="backColor_white">' + hour + '</div></div></div>');
//        txt.appendTo($(element));
//    }
//};

myapp.BrowseAppointment1.Day_postRender = function (element, contentItem) {
    // Write code here.
    var BtnEsseBi = $(element).children();
    BtnEsseBi.addClass("day-button");
    var txt = $('giorno');
    txt.appendTo($(element));
 
};

myapp.BrowseAppointment1.Week_postRender = function (element, contentItem) {
    // Write code here.
    var BtnEsseBi = $(element).children();
    BtnEsseBi.addClass("day-button");
};

myapp.BrowseAppointment1.Month_postRender = function (element, contentItem) {
    // Write code here.
    var BtnEsseBi = $(element).children();
    BtnEsseBi.addClass("day-button");
};



//myapp.BrowseAppointment1.AppointmentDataStart_postRender = function (element, contentItem) {
//    // Write code here.
//    if (contentItem.value != undefined && contentItem.value != null) {
//        var mese = getMonthName(contentItem.value);
//        var giorno = getDayName(contentItem.value);
//        var today = contentItem.value.getDate();
//        var hour = contentItem.value.getHours() + ":" + contentItem.value.getMinutes();
//        var txt = $('<div class="backColor_Red">' + mese + '<div class="backColor_white">' + giorno + '<div class="backColor_white">' + today +'</div></div></div>');
//        txt.appendTo($(element));
//    }
//};

myapp.BrowseAppointment1.Orario_postRender = function (element, contentItem) {
    // Write code here. backColor_gray
    txt += '</tr></table>';
    var txt = $('<table><tr><td><h2>08</h2></td><td><table><tr><td>20</td></tr><tr><td>40</td></tr><tr><td>60</td></tr></table></td ><td width="100%"></td></tr><tr><td><h2>09</h2></td><td><table><tr><td>20</td></tr><tr><td>40</td></tr><tr><td>60</td></tr></table></td><td width="100%"></td></tr><tr><td><h2>10</h2></td><td><table><tr><td>20</td></tr><tr><td>40</td></tr><tr><td>60</td></tr></h5></table></td><td width="100%"></td></tr><tr><td><h2>11</h2></td><td><table><tr><td>20</td></tr><tr><td>40</td></tr><tr><td>60</td></tr></table></td><td width="100%"></td></tr><tr><td><h2>12</h2></td><td><table><tr><td>20</td></tr><tr><td>40</td></tr><tr><td>60</td></tr></table></td><td width="100%"></td></tr><tr><td><h2>13</h2></td><td><table><tr><td>20</td></tr><tr><td>40</td></tr><tr><td>60</td></tr></table></td><td width="100%"></td></tr><tr><td><h2>14</h2></td><td><table><tr><td>20</td></tr><tr><td>40</td></tr><tr><td>60</td></tr></table></td><td width="100%"></td></tr><tr><td><h2>15</h2></td><td><table><tr><td>20</td></tr><tr><td>40</td></tr><tr><td>60</td></tr></table></td><td width="100%"></td></tr><tr><td><h2>16</h2></td><td><table><tr><td>20</td></tr><tr><td>40</td></tr><tr><td>60</td></tr></table></td><td width="100%"></td></tr><tr><td><h2>17</h2></td><td><table><tr><td>20</td></tr><tr><td>40</td></tr><tr><td>60</td></tr></table></td><td width="100%"></td></tr><tr><td><h2>18</h2></td><td><table><tr><td>20</td></tr><tr><td>40</td></tr><tr><td>60</td></tr></table></td><td width="100%"></td></tr><tr><td><h2>19</h2></td><td><table><tr><td>20</td></tr><tr><td>40</td></tr><tr><td>60</td></tr></table></td><td width="100%"></td></tr><tr><td><h2>20</h2></td><td><table><tr><td>20</td></tr><tr><td>40</td></tr><tr><td>60</td></tr></table></td><td width="100%"></td></tr></table>');
    //txt += '<td><h1>08</h1><tr><td>10</td></tr><tr><td>20</td></tr><tr><td>30</td></tr><tr><td>40</td></tr><tr><td>50</td></tr></td>';
    //txt += '</tr></table>';
    //var txt = $('<div class="backColor_gray"><h1>08</h1><div class="backColor_gray">10<div class="backColor_gray">20<div class="backColor_gray">30<div class="backColor_gray">40<div class="backColor_gray">50</div></div></div></div></div><div class="backColor_gray"><h1>09</h1><div class="backColor_gray">10<div class="backColor_gray">20<div class="backColor_gray">30<div class="backColor_gray">40<div class="backColor_gray">50</div></div></div></div></div><div class="backColor_gray"><h1>10</h1><div class="backColor_gray">10<div class="backColor_gray">20<div class="backColor_gray">30<div class="backColor_gray">40<div class="backColor_gray">50</div></div></div></div></div><div class="backColor_gray"><h1>11</h1><div class="backColor_gray"><h1>12</h1><div class="backColor_gray"><h1>13</h1><div class="backColor_gray"><h1>14</h1><div class="backColor_gray"><h1>15</h1><div class="backColor_gray"><h1>16</h1><div class="backColor_gray"><h1>17</h1><div class="backColor_gray"><h1>18</h1><div class="backColor_gray"><h1>19</h1><div class="backColor_gray"><h1>20</h1></div></div></div></div></div></div></div></div></div></div></div></div></div>');
    txt.appendTo($(element));   
};



myapp.BrowseAppointment1.Appointment_By_DateTemplate_postRender = function (element, contentItem) {
    // Write code here.
    var entity = contentItem.data;
    function repaint() {
        //position:absolute; cursor: pointer;width:auto;height:auto;top: 15px;left: 8px; z-index:1000;  
        height = parseInt(minuteDiff(entity.EndDate, entity.StartDate) * 1.30, 0);
        y = (((entity.StartDate.getHours() - 8) * 75) + entity.StartDate.getMinutes());
        x = myMap.get(entity.Employee_Name);       
        height += "px";
        y += "px";               
        x = (x * 152)-18 ;
        x += "px";
        //alert("StartDate=" + entity.StartDate + "\nEndDate=" + entity.EndDate + "\nheight=" + height + "\nposition=" + y);
        color = "Color-Orange";
        $(element).closest("li").addClass(color);
        $(element).closest("li").css("position", "absolute");
        $(element).closest("li").css("top", y);
        $(element).closest("li").css("left", x);
        $(element).closest("li").css("height", height);
        $(element).closest("li").css("z-index", 1000);
    };
    repaint();
};

myapp.BrowseAppointment1.Important_postRender = function (element, contentItem) {
    // Write code here.  background-image:url('Images/important.png')sector
    if (contentItem.data.Important) {
        $(element).addClass("important");
    } else {
        $(element).addClass("sector");
    }
};
myapp.BrowseAppointment1.User_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("user");
};
myapp.BrowseAppointment1.HourGlass_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("hourglass");
};
myapp.BrowseAppointment1.Work_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("wrench");
};
myapp.BrowseAppointment1.Phone_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("phone");
};
myapp.BrowseAppointment1.HourGlass1_postRender = function (element, contentItem) {
    // Write code here.
    var entity = contentItem.data;  
    var $element = $(element);
    var txt = minuteDiff(entity.EndDate, entity.StartDate)+" min.";
    $element.append(txt);
};

myapp.BrowseAppointment1.StartDate_render = function (element, contentItem) {
    // Write code here.
    createDatePicker(element, contentItem);

};