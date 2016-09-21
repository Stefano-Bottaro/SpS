/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.ViewAppointment.created = function (screen) {
    // Write code here.   
    screen.details.displayName = screen.Appointment.Customer_Name;
};
myapp.ViewAppointment.dayString_postRender = function (element, contentItem) {
    // Write code here.
    var entity = contentItem.data;
    var d = new Date(entity.StartDate);
    var text = $("<p align='center'>" + getDayName(d) + " " + d.getDate() + "</p>");
    $(element).css("font-size", "large");
    var color = entity.Employee.Color;
    $(element).addClass(color);
    //$(element).css("background-color", "#094AB2");
    $(element).css("color", "white");
    text.appendTo($(element));
};

myapp.ViewAppointment.Month_postRender = function (element, contentItem) {
    // Write code here.
    var entity = contentItem.data;
    var d = new Date(entity.StartDate);
    var text = $("<p align='center'>" + getMonthName(d) + "</p>");
    //$(element).css("<input data-role='none'/>");
    $(element).css("font-size", "large");    
    var color = entity.Employee.Color;
    $(element).addClass(color);
    //$(element).css("background-color", "#094AB2");
    $(element).css("color", "white");
    // Append the text element to screen 
    text.appendTo($(element));
};
myapp.ViewAppointment.Hour_postRender = function (element, contentItem) {
    // Write code here.
    var entity = contentItem.data;
    var d = new Date(entity.StartDate);
    //alert("Hour_render=" + getHms(d));
    var text = $("<p align='center'>" + getHms(d) + "</p>");     
    $(element).css("font-size", "large");
    var color = entity.Employee.Color;
    $(element).addClass(color);   
    //$(element).css("background-color", "#094AB2");
    $(element).css("color", "white");
    text.appendTo($(element));
};


myapp.ViewAppointment.StartDate_render = function (element, contentItem) {
    // Write code here.
    if (contentItem.value !== undefined && contentItem.value !== null) {
        var entity = contentItem.data;
        var d = new Date(entity.StartDate);
        var mese = getMonthName(d);
        var giorno = getDayName(d);
        var today = d.getDate();
        var hh = getHms(d);
        var txt = $('<div class="backColor_Red">' + mese + '<div class="backColor_white">' + today + ' ' + giorno + '<div class="backColor_white">' + hh + '</div></div></div>');
        txt.appendTo($(element));
    }
};