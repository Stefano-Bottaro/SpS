
myapp.BrowseEventByDate.created = function (screen) {
    // Write code here. ComunicationData_Start
    today = new Date();   
    today.setDate(1);
    screen.ComunicationData_Start = today;
    screen.ComunicationData_End = new Date();
};

myapp.BrowseEventByDate.RowTemplate_postRender = function (element, contentItem) {
    // Write code here.
    $(element).closest("li").addClass("Color-Purple");
};