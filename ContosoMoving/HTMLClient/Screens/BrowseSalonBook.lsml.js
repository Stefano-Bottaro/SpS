/// <reference path="../GeneratedArtifacts/viewModel.js" />
myapp.BrowseSalonBook.ProductsTemplate_postRender = function (element, contentItem) {
    // Write code here.
    var entity = contentItem.value;
    var color = "";    
    function refresh() {        
        if (entity.Tipology != undefined && entity.Tipology != null) {           
            switch (entity.Tipology) {
                case "Prodotto":
                    color = "Color-Teal"                    
                    break;
                case "Trattamento":
                    color = "Color-SkyBlue";
                    break;
                case "Kit":
                    color = "Color-Green";                    
                    break;
            }
        }
        $(element).closest("li").addClass(color);
    };
    refresh();
};

myapp.BrowseSalonBook.Stampa_execute = function (screen) {
    // Write code here.
    window.print();
};
