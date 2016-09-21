
myapp.BrowseProduct_Category.RowTemplate_postRender = function (element, contentItem) {
    // Write code here.
    var entity = contentItem.data;
    function refresh() {
        var color = entity.Color;
        if (color == undefined && color == null) {
            color = "Color-Teal";
        };
        $(element).closest("li").addClass(color);
    };
    refresh();
};
myapp.BrowseProduct_Category.delete_postRender = function (element, contentItem) {
    // Write code here.
    //var entity = contentItem.data;
    //if (entity.Product.count == 0) {
    //    $(element).addClass("delete");
    //};
    $(element).addClass("delete");
};
myapp.BrowseProduct_Category.delete_Tap_execute = function (screen) {
    // Write code here.
    var response = confirm("Confermi la cancellazione della registrazione selezionata?");
    if (response == true) {
        screen.Category.deleteSelected();
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
