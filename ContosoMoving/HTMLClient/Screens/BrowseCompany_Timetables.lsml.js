/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.BrowseCompany_Timetables.Delete_Tap_execute = function (screen) {
    // Write code here.
    var response = confirm("Confermi la cancellazione della registrazione selezionata?");
    if (response == true) {
        screen.Company_Timetables.deleteSelected(); 
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
myapp.BrowseCompany_Timetables.Delete_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("delete");
};

myapp.BrowseCompany_Timetables.RowTemplate_postRender = function (element, contentItem) {
    // Write code here.
    $(element).closest("li").addClass("backcloth");
};