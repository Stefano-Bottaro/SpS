/// <reference path="../GeneratedArtifacts/viewModel.js" />

myapp.AddEditCustomer_Subscription.created = function (screen) {
    // Write code here. Customer_Subscription.Description Customer_Subscription.Product   
    var today = new Date();
    screen.Customer_Subscription.created = today;
    if (screen.Customer_Subscription.Description == null) {
        screen.Customer_Subscription.Description = "Scheda Prepagata " + getMonthName(today) + " " + today.getFullYear();
    }
};

myapp.AddEditCustomer_Subscription.Balance_postRender = function (element, contentItem) {
    // Write code here.
    contentItem.dataBind("screen.Customer_Subscription_Item", function (newValue) {       
        if (newValue != null) {
            //alert("prepagata fase 1");
            var entity = newValue
            var debit = 0, credit = 0;
            if (entity.count > 0) {
                alert("prepagata fase 2");
                var detail = entity.data; // Get the data for the collection passed    
                detail.forEach(function (items) {// Add each row to debit & credit 
                    debit += items.Debit;
                    credit += items.Credit;
                });
            };
            contentItem.screen.Customer_Subscription.Debit = debit;
            contentItem.screen.Customer_Subscription.Credit = credit
            contentItem.screen.Customer_Subscription.Balance = credit - debit;
        }
    });
};