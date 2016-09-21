/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.BrowseSchedule_by_date.created = function (screen) {
    // Write code here.
    d1 = new Date();
    d2 = new Date();    
    screen.ScheduleDataStart = firstDay(d1);
    screen.ScheduleDataEnd = lastDay(d2);
};

myapp.BrowseSchedule_by_date.RowTemplate_postRender = function (element, contentItem) {
    // Write code here. Schedule_by_date(item).Settlement
    var entity = contentItem.value;
    function refresh() {
        var color = "Color-Red";  //debito= #FFB6C1  debito pagato= #F8E0EC    credito= #A9F5BC   credito pagato= #E6F8E0
        if (entity.Credit != undefined && entity.Credit != 0) {
            color = "Color-Green"; 
            if (entity.Settlement) {
                color = "Color-Teal";
            };
        } else {
            color = "Color-Red";
            if (entity.Settlement) {
                color = "Color-Orange";
            };
        }
        $(element).closest("li").addClass(color);
    };
    refresh();
    //Add a change event listener to IsAvailable property   ScadenzarioSaldato
    entity.addChangeListener("Settlement", refresh);
    entity.addChangeListener("Credit", refresh);
    entity.addChangeListener("Debit", refresh);
   
};

myapp.BrowseSchedule_by_date.Delete_postRender = function (element, contentItem) {
    // Write code here.
    var entity = contentItem.data;
    $(element).addClass("delete");
};

myapp.BrowseSchedule_by_date.Pagato_postRender = function (element, contentItem) {
    // Write code here.
    var entity = contentItem.data;
    //alert(entity.Settlement);
    if (entity.Settlement == null) {
        $(element).addClass("payment");
    }
};

myapp.BrowseSchedule_by_date.Delete_Tap_execute = function (screen) {
    // Write code here.
    msls.showMessageBox("Sei sicuro di volere proseguire con la cancellazione della Scadenza?", {
        title: "Cancellazione scadenza",
        buttons: msls.MessageBoxButtons.yesNo
    }).then(function (val) {
        if (val == msls.MessageBoxResult.yes) {            
            screen.Schedule_by_date.deleteSelected();
            myapp.commitChanges().then(null, function fail(e) {
                var errmsg = screen.Schedule_by_date.Name + e.message;
                myapp.cancelChanges().then(function () {
                    var resp = msls.showMessageBox(errmsg, {
                        title: "ERRORE",
                        buttons: msls.MessageBoxButtons.ok
                    });
                    throw e;
                });
            });
        }
    });
};

myapp.BrowseSchedule_by_date.Pagato_Tap_execute = function (screen) {
    // Write code here.
    msls.showMessageBox("Sei sicuro di volere proseguire con il pagamento della Scadenza?", {
        title: "Pagamento scadenza",
        buttons: msls.MessageBoxButtons.yesNo
    }).then(function (val) {
        if (val == msls.MessageBoxResult.yes) {
        var entity = screen.Schedule_by_date.selectedItem;      
        if (entity.Credit == null) {
            entity.Credit = 0;
        };
        if (entity.Debit == null) {
            entity.Debit = 0;
        };
        entity.Settlement = Math.abs((entity.Credit * 1) - (entity.Debit * 1));
            // Save changes
        myapp.commitChanges().then(null, function fail(e) {
            var errmsg = screen.Schedule_by_date.Name + e.message;
            myapp.cancelChanges().then(function () {
                var resp = msls.showMessageBox(errmsg, {
                    title: "ERRORE",
                    buttons: msls.MessageBoxButtons.ok
                });
                throw e;
            });

        });
        //alert("EsseBi inserire registrazione in contabilità");
    }
    });    
};

myapp.BrowseSchedule_by_date.PagatoOLD_Tap_execute = function (screen) {
    // Write code here.
    var response = true;
    if (response == true) {
        var entity = screen.Schedule_by_date.selectedItem;
        if (entity.Credit == null) {
            entity.Credit = 0;
        };
        if (entity.Debit == null) {
            entity.Debit = 0;
        };
        entity.Settlement = entity.Credit + entity.Debit;
        // Save changes
        myapp.commitChanges().then(function success() {
            // If success.
            //msls.showMessageBox("Operazione effettuata con successo", { title: "Ordinato" });
        }, function fail(e) {
            // If error occurs,
            msls.showMessageBox(e.message, { title: e.title }).then(function () {
                // Cancel Changes
                myapp.cancelChanges();
            });
        });
    }
};

