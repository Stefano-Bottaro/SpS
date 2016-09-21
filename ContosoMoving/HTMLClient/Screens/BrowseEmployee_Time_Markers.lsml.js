
myapp.BrowseEmployee_Time_Markers.RowTemplate_postRender = function (element, contentItem) {
    // Write code here.
    $(element).closest("li").addClass("Color-Red");
};
myapp.BrowseEmployee_Time_Markers.delete_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("delete");
};
myapp.BrowseEmployee_Time_Markers.delete_Tap_execute = function (screen) {
    // Write code here.
    var response = confirm("Confermi la cancellazione della registrazione selezionata?");
    if (response == true) {
        screen.Employee_Time_Markers.deleteSelected();
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