new Chart(document.getElementById("bubble-chart"), {
    type: 'bubble',
    data: {
      datasets: [{
          backgroundColor: "rgba(193,46,12,0.2)",
          borderColor: "rgba(193,46,12,1)",
          data: [{
            x: 200,
            y: 4,
            r: 15
          }]
        }
      ]
    },
    options: {
     scales: {
        yAxes: [{ 
          scaleLabel: {
            labelString: "Минуты",
            min : 200,
            max : 1000,
          }
        }],
        xAxes: [{ 
          scaleLabel: {
            labelString: "Интернет",
            min : 4,
            max : 40,
          }
        }]
      }
    }
});