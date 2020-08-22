var myChart = new Chart (document.getElementById("ctx"), {
    type: 'bubble',
    data: {
      datasets: [
        {
         
        }]
    },
    options: {
        scales: {
        yAxes: [{ 

        ticks: {
            min: 200,
            max:1000
        },
        afterBuildTicks: function(Chart) {    
            Chart.ticks = [];
            Chart.ticks.push(200);
            Chart.ticks.push(500);
            Chart.ticks.push(800);   
            Chart.ticks.push(1000);   
        },
        scaleLabel: {
            display: true,
            labelString: "Минуты"
        }
        }],
        xAxes: [{ 

        ticks: {
            min: 4,
            max:40
        },
        afterBuildTicks: function(Chart) {    
            Chart.ticks = [];
            Chart.ticks.push(4);
            Chart.ticks.push(15);
            Chart.ticks.push(30);   
            Chart.ticks.push(40);   
        },
        scaleLabel: {
            display: true,
            labelString: "Интернет"
        }
        
        }]
      }
    }

})


$("#ctx").mousemove(function(evt) {
    //console.log(evt.offsetX + "," + evt.offsetY);
    var ytop = myChart.chartArea.top;
    var ybottom = myChart.chartArea.bottom;
    var ymin = myChart.scales['y-axis-0'].min;
    var ymax = myChart.scales['y-axis-0'].max;
    var newy = '';
    var showstuff = 0;
    if (evt.offsetY <= ybottom && evt.offsetY >= ytop) {
      newy = Math.abs((evt.offsetY - ytop) / (ybottom - ytop));
      newy = (newy - 1) * -1;
      newy = newy * (Math.abs(ymax - ymin)) + ymin;
      showstuff = 1;
    }
    var xtop = myChart.chartArea.left;
    var xbottom = myChart.chartArea.right;
    var xmin = myChart.scales['x-axis-0'].min;
    var xmax = myChart.scales['x-axis-0'].max;
    var newx = '';
    if (evt.offsetX <= xbottom && evt.offsetX >= xtop && showstuff == 1) {
      newx = Math.abs((evt.offsetX - xtop) / (xbottom - xtop));
      newx = newx * (Math.abs(xmax - xmin)) + xmin;
    }
    
    if (newy != '' && newx != '') {
        checkRange(newx,newy);
      //console.log(newx + ',' + newy);
      $("#graph_coords").html('Mouse Coordinates: ' + newx.toFixed(2) + ',' + newy.toFixed(2));
    }
    
    
  });

// $(document).ready(function(){
// 	// Координаты курсора относительно отдельного блока
// 	$('.hover').mousemove(function(event){
// 		var pos = $(this).offset();
// 		var elem_left = pos.left.toFixed(0);
// 		var elem_top = pos.top.toFixed(0);
// 		var x = event.pageX - elem_left;
// 		var y = event.pageY - elem_top;
// 		$('#coords2').html( 'Координаты курсора: (' + x + '; ' + y + ')' );
// 	});
// });
function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}
function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
}
//console.log
var minx = '';
var miny = '';
var arr = [[4,15,30,40] ,[200,500,800,1000]]
function checkRange(x,y){
    console.log(x,y);

    var min = 9999;
    var bufx = minx;
    var bufy = miny;
    for(let i = 0;i<4;i++){
        for(let k = 0;k<4;k++){
            if(  Math.sqrt( Math.pow(x - arr[0][i],2 ) + Math.pow(y - arr[1][k],2) )  < min)
               {
                   minx = arr[0][i];
                   miny = arr[1][k];
                   min = Math.sqrt(Math.pow(x - arr[0][i],2 ) + Math.pow(y - arr[1][k],2));

               }
        }
    }

    if( minx != bufx && miny != bufy){
        removeData(myChart);
        addData(myChart,'A',{x: minx,y: miny,r: 5});
        minx = 0;
        miny = 0;
    }
    else{
        
    }
  
}