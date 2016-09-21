/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.BrowseSectors.RowTemplate_postRender = function (element, contentItem) {
    // Write code here.
    $(element).closest("li").addClass("backcloth");
};

myapp.BrowseSectors.Delete_postRender = function (element, contentItem) {
    // Write code here.
    //var entity = contentItem.data;
    //if (entity.Appointments.count == 0) {
    //    $(element).addClass("delete");
    //};
    $(element).addClass("delete");
};
myapp.BrowseSectors.Delete_Tap_execute = function (screen) {
    // Write code here.
    var response = confirm("Confermi la cancellazione della registrazione selezionata?");
    if (response == true) {
        screen.Sectors.deleteSelected();
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
    };
};