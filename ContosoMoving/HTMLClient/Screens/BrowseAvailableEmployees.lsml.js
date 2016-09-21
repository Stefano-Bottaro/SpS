/// <reference path="../GeneratedArtifacts/viewModel.js" />
myapp.BrowseAvailableEmployees.created = function (screen) {
    // Write code here. getDay(startDate, month, day, hour) 
    d = new Date();
    d1 = new Date();
    screen.EmployeeStartTime = getDay(d, null, 1, null);
    screen.EmployeeEndTime = getDay(d1, null, null, 1);
};
myapp.BrowseAvailableEmployees.RowTemplate_postRender = function (element, contentItem) {
    // Write code here.
    var entity = contentItem.data;
    function refresh() {
        var color = entity.Color;
        if (color == undefined && color == null) {
            color = "Color-Teal";
        };
        //alert(color);
        $(element).closest("li").addClass(color);
        //$(element).addClass((parseInt(contentItem.value.Color.replace("#", ""), 16) > 0xffffff / 2) ? 'darkForeground':'lightForeground');
    };
    refresh();
};
