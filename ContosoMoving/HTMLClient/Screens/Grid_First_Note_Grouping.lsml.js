/// <reference path="../GeneratedArtifacts/viewModel.js" />
myapp.Grid_First_Note_Grouping.Account_List_render = function (element, contentItem) {
    // Write code here.
   
    createGrid(element, contentItem);
};
myapp.Grid_First_Note_Grouping.created = function (screen) {
    // Write code here.
    d1 = new Date();
    d2 = new Date();
    screen.Account_ListDataStart = firstDay(d1);
    screen.Account_ListDataEnd = d2;
};