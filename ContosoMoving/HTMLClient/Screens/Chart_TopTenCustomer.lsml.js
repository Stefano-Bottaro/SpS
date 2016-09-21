/// <reference path="../GeneratedArtifacts/viewModel.js" />
myapp.Chart_TopTenCustomer.Customer_render = function (element, contentItem) {
    //var itemTemplate = $("<div></div>").attr('id', "container")
    //$(itemTemplate).width(1000);   
    //itemTemplate.appendTo($(element));
    //contentItem.value.oncollectionchange = function () {
    //    var first = contentItem.children[0];
    //    var xName = first.children[0].valueModel.name;
    //    var yName = first.children[1].valueModel.name;
    //    var yName1 = first.children[2].valueModel.name;
    //    if (itemTemplate.hasClass('e-chart')) {
    //        itemTemplate.ejChart('destroy');
    //    }
    //    //var dataManger = ej.DataManager({ json: contentItem.value.data, });
    //    var dataManger = contentItem.value.data;
    //    itemTemplate.ejChart(
    //          {
    //              series: [{
    //                  dataSource: contentItem.value.data,
    //                  xName: xName,
    //                  yName: yName
    //              }],
    //              enable3D: true,
    //              tooltip: { visible: true },
    //              zooming: { enable: true, enableMouseWheel: true },
    //              legend: { visible: true },
    //              title: { text: "Vendite", subTitle: { text: "nell'anno in corso" } },
    //              theme: 'gradientdark',
    //          });
    //};
    var title = "Vendite nell'anno";
    createChart(element, contentItem, title);
};