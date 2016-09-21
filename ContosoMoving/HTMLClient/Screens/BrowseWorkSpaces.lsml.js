/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.BrowseWorkSpaces.RowTemplate_postRender = function (element, contentItem) {
    // Write code here.      
    $(element).closest("li").addClass("backcloth");
};
myapp.BrowseWorkSpaces.delete_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("delete");
};
myapp.BrowseWorkSpaces.delete_Tap_execute = function (screen) {
    // Write code here.
    var response = confirm("Confermi la cancellazione della registrazione selezionata?");
    if (response == true) {
        screen.WorkSpaces.deleteSelected();
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
myapp.BrowseWorkSpaces.Indietro_execute = function (screen) {
    // Write code here.
myapp.b
};