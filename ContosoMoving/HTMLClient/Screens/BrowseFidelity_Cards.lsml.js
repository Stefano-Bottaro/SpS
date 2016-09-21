/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.BrowseFidelity_Cards.Image_postRender = function (element, contentItem) {
    // Write code here.
    $(element).addClass("fidelity");
};
myapp.BrowseFidelity_Cards.RowTemplate_postRender = function (element, contentItem) {
    // Write code here.
    $(element).closest("li").addClass("Color-SkyBlue");
};
myapp.BrowseFidelity_Cards.delete_postRender = function (element, contentItem) {
    // Write code here.    
    $(element).addClass("delete");   
};
myapp.BrowseFidelity_Cards.delete_Tap_execute = function (screen) {
    // Write code here.Fidelity_Cards(item).WeekDay
    var response = confirm("Confermi la cancellazione della scheda selezionata?");
    if (response == true) {
        //var product = screen.AutovettureByMarca.selectedItem.data;
        screen.Fidelity_Cards.deleteSelected();
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