/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.BrowseEmployees.Delete_postRender = function (element, contentItem) {
    // Write code here.
    var entity = contentItem.data;
    if (entity.Appointments.count == 0) {
        $(element).addClass("delete");
    };
};

myapp.BrowseEmployees.Delete_Tap_execute = function (screen) {
    // Write code here.
    var response = confirm("Confermi la cancellazione della scheda selezionata?");
    if (response == true) {
        //var product = screen.AutovettureByMarca.selectedItem.data;
        screen.Employees.deleteSelected();
        // Save changes
        myapp.commitChanges().then(function success() {
            // If success.
            msls.showMessageBox("Cancellazione effettuata", { title: "Cancella" });
        }, function fail(e) {
            // If error occurs,
            msls.showMessageBox(e.message, { title: e.title }).then(function () {
                // Cancel Changes
                myapp.cancelChanges();
            });
        });
    }
};

myapp.BrowseEmployees.RowTemplate_postRender = function (element, contentItem) {
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
   /* var entity = contentItem.value;
    if (entity.BarCode != undefined) {
        var codiceBarre = $('<div class=""msls-text"><span class="id-element">' + BarCodeDisplay(entity.BarCode) + '</span></div>');
        codiceBarre.appendTo($(element));
        //$element = $(element).append(BarCodeDisplay(entity.BarCode));
    }*/
};

myapp.BrowseEmployees.Employes_TimetablesTemplate_postRender = function (element, contentItem) {
    // Write code here.
    var entity = contentItem.data;
    function refresh() {
        var color = entity.Employee.Color;
        if (color == undefined && color == null) {
            color = "Color-Teal";
        };
        //alert(color);
        $(element).closest("li").addClass(color);        
    };
    refresh();
};
myapp.BrowseEmployees.TopTenEmployee_render = function (element, contentItem) {
    // Write code here.
    var title = "Migliori Collaboratori";
    createChart(element, contentItem, title);
};