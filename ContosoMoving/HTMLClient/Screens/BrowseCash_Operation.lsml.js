
myapp.BrowseCash_Operation.created = function (screen) {
    // Write code here.
    today = new Date();
    screen.Account_ListData_Start = getDay(today, "", -1);
    screen.Account_ListData_End= new Date();
};
myapp.BrowseCash_Operation.RowTemplate_postRender = function (element, contentItem) {
    // Write code here.
    $(element).closest("li").addClass("Color-Orange");
};