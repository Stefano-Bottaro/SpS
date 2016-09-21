/// <reference path="~/GeneratedArtifacts/viewModel.js" />
var today = new Date();

myapp.BrowseAppointment1.created = function (screen) {
    // Write code here.
    today = new Date();
    screen.AppointmentDataStart=today;
};
myapp.BrowseAppointment1.Previous_Tap_execute = function (screen) {
    // Write code here.   
    alert("Previous_Tap_execute today = ");  
    screen.AppointmentDataStart = today.addDays(-1);
};
myapp.BrowseAppointment1.Forward_Tap_execute = function (screen) {
    // Write code here.
    //var tomorrow = today.addDays(+1);
    alert("Forward_Tap_execute today = ");
    screen.AppointmentDataStart = today.addDays(1);
};

myapp.BrowseAppointment1.rows_postRender = function (element, contentItem) {
    // Write code here. 
    var entity = contentItem.data;
    height = minuteDiff(entity.EndDate, entity.StartDate);
    //alert("height=" + height);
    position = ((entity.StartDate.getHours() -8)*30) + entity.StartDate.getMinutes();
    //alert("(position=" + position);   
    function repaint() {
        var color = entity.Employee.Color;;
        if (color == undefined && color == null) {
            color = "Color-Teal";
        };
        $(element).closest("li").addClass(color);
        $(element).closest("li").css("top", position);
        $(element).closest("li").css("height", height);
    };
    repaint();
};

myapp.BrowseAppointment1.StartDate_render = function (element, contentItem) {
    // Write code here.
    if (contentItem.value != undefined && contentItem.value != null) {
        var mese = getMonthName(contentItem.value);
        var giorno = getDayName(contentItem.value);
        var today = contentItem.value.getDate();
        var hour = contentItem.value.getHours() + ":" + contentItem.value.getMinutes();
        var txt = $('<div class="backColor_Red">' + mese + '<div class="backColor_white">' + giorno + ' - ' + today + '<div class="backColor_white">' + hour + '</div></div></div>');
        txt.appendTo($(element));
    }
};

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
myapp.BrowseAppointment1.Previous_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("previous");
};
myapp.BrowseAppointment1.Forward_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("next");
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
myapp.BrowseAppointment1.AppointmentDataStart_postRender = function (element, contentItem) {
    // Write code here.
    if (contentItem.value != undefined && contentItem.value != null) {
        var mese = getMonthName(contentItem.value);
        var giorno = getDayName(contentItem.value);
        var today = contentItem.value.getDate();
        var hour = contentItem.value.getHours() + ":" + contentItem.value.getMinutes();
        var txt = $('<div class="backColor_Red">' + mese + '<div class="backColor_white">' + giorno + '<div class="backColor_white">' + today +'</div></div></div>');
        txt.appendTo($(element));
    }
};
myapp.BrowseAppointment1.Previous_Tap_execute = function (screen) {
    // Write code here.   
    screen.AppointmentDataStart = today.addDays(-1);
};
myapp.BrowseAppointment1.Forward_Tap_execute = function (screen) {
    // Write code here.
    screen.AppointmentDataStart = today.addDays(+1);
};
myapp.BrowseAppointment1.Orario_postRender = function (element, contentItem) {
    // Write code here. backColor_gray
    //txt += '</tr></table>';
    //var txt = $('<table><tr><td><h1>08</h1></td><td><table><tr><td>20</td></tr><tr><td>40</td></tr><tr><td>60</td></tr></table></td></tr><tr><td><h1>09</h1></td><td><table><tr><td>20</td></tr><tr><td>40</td></tr><tr><td>60</td></tr></table></td></tr><tr><td><h1>10</h1></td><td><table><tr><td>20</td></tr><tr><td>40</td></tr><tr><td>60</td></tr></table></td></tr><tr><td><h1>11</h1></td><td><table><tr><td>20</td></tr><tr><td>40</td></tr><tr><td>60</td></tr></table></td></tr><tr><td><h1>12</h1></td><td><table><tr><td>20</td></tr><tr><td>40</td></tr><tr><td>60</td></tr></table></td></tr><tr><td><h1>13</h1></td><td><table><tr><td>20</td></tr><tr><td>40</td></tr><tr><td>60</td></tr></table></td></tr><tr><td><h1>14</h1></td><td><table><tr><td>20</td></tr><tr><td>40</td></tr><tr><td>60</td></tr></table></td></tr><tr><td><h1>15</h1></td><td><table><tr><td>20</td></tr><tr><td>40</td></tr><tr><td>60</td></tr></table></td></tr><tr><td><h1>16</h1></td><td><table><tr><td>20</td></tr><tr><td>40</td></tr><tr><td>60</td></tr></table></td></tr><tr><td><h1>17</h1></td><td><table><tr><td>20</td></tr><tr><td>40</td></tr><tr><td>60</td></tr></table></td></tr><tr><td><h1>18</h1></td><td><table><tr><td>20</td></tr><tr><td>40</td></tr><tr><td>60</td></tr></table></td></tr><tr><td><h1>19</h1></td><td><table><tr><td>20</td></tr><tr><td>40</td></tr><tr><td>60</td></tr></table></td></tr><tr><td><h1>20</h1></td><td><table><tr><td>20</td></tr><tr><td>40</td></tr><tr><td>60</td></tr></table></td></tr></table>');
    ////txt += '<td><h1>08</h1><tr><td>10</td></tr><tr><td>20</td></tr><tr><td>30</td></tr><tr><td>40</td></tr><tr><td>50</td></tr></td>';
    ////txt += '</tr></table>';
    ////var txt = $('<div class="backColor_gray"><h1>08</h1><div class="backColor_gray">10<div class="backColor_gray">20<div class="backColor_gray">30<div class="backColor_gray">40<div class="backColor_gray">50</div></div></div></div></div><div class="backColor_gray"><h1>09</h1><div class="backColor_gray">10<div class="backColor_gray">20<div class="backColor_gray">30<div class="backColor_gray">40<div class="backColor_gray">50</div></div></div></div></div><div class="backColor_gray"><h1>10</h1><div class="backColor_gray">10<div class="backColor_gray">20<div class="backColor_gray">30<div class="backColor_gray">40<div class="backColor_gray">50</div></div></div></div></div><div class="backColor_gray"><h1>11</h1><div class="backColor_gray"><h1>12</h1><div class="backColor_gray"><h1>13</h1><div class="backColor_gray"><h1>14</h1><div class="backColor_gray"><h1>15</h1><div class="backColor_gray"><h1>16</h1><div class="backColor_gray"><h1>17</h1><div class="backColor_gray"><h1>18</h1><div class="backColor_gray"><h1>19</h1><div class="backColor_gray"><h1>20</h1></div></div></div></div></div></div></div></div></div></div></div></div></div>');
    //txt.appendTo($(element));   
};