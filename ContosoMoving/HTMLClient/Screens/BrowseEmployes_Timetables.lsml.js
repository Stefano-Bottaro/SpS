/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.BrowseEmployes_Timetables.Print_execute = function (screen) {
    // Write code here.
    window.print();
};
myapp.BrowseEmployes_Timetables.RowTemplate_postRender = function (element, contentItem) {
    // Write code here. Employes_Timetables(item).Employee.Color
    var entity = contentItem.data;
    function refresh() {
        var color = entity.Employee.Color;
        if (color == undefined && color == null) {
            color = "Color-Red";
        };        
        $(element).closest("li").addClass(color);       
    };
    refresh();    
};
myapp.BrowseEmployes_Timetables.Delete_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("delete");
};
myapp.BrowseEmployes_Timetables.Delete_Tap_execute = function (screen) {
    // Write code here. 
    var response = confirm("Confermi la cancellazione della registrazione selezionata?");
    if (response == true) {
        screen.Employes_Timetables.deleteSelected();
        // Save changes
        myapp.commitChanges().then(function success() {
            // If success.
            msls.showMessageBox("Cancellazione effettuata con successo", { title: "Cancella" });
        }, function fail(e) {
            // If error occurs,
            msls.showMessageBox(e.message, { title: e.title }).then(function () {
                // Cancel Changes
                myapp.cancelChanges();
            });
        });
    }
};
