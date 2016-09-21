/// <reference path="../GeneratedArtifacts/viewModel.js" />
myapp.VW_SellByPassagesChartTemplate.VW_SellByPassages_render = function (element, contentItem) {
    var itemTemplate = $("<div></div>").attr('id', contentItem.name)
    $(itemTemplate).width(1000);
    itemTemplate.appendTo($(element));
    contentItem.value.oncollectionchange = function () {   
       var first = contentItem.children[0];
        var xName=first.children[0].valueModel.name; 
        var yName = first.children[1].valueModel.name;
        var yName1 = first.children[2].valueModel.name;
        if (itemTemplate.hasClass('e-chart')) {     
            itemTemplate.ejChart('destroy');
        }
        itemTemplate.ejChart(
              {
                  series: [{
                        dataSource: contentItem.value.data,
                        xName: xName,
                        yName: yName,
                        type: 'pie',
                        tooltip: { visible: true },
                        name: contentItem.name,
                        explodeIndex: 0,
                        border: { width: 2, color: 'white' },                       
                        labelPosition: 'outside',
                        startAngle: 145
                  }],
    });
}};
myapp.VW_SellByPassagesChartTemplate.created = function (screen) {
    // Write code here.
    var today = new Date;
    screen.Year = today.getFullYear;
};