

function buildSampleInfo(airline) {
    d3.json(`/profile/${airline}`).then((data) => {
        // use d3 to select the panel to append information 
        var panel = d3.select("#sample-metadata");
        panel.html("");

        // Add each key and value pair to the panel
        Object.entries(data).forEach(([key, value]) => {
            panel.append("h6").text(`${key}: ${value}`);
          });
    });
}

function buildDotplot() {
    d3.json("/airlinetotal").then((data) => {
        var airline = data.map(d => d.AIRLINE);
        var total = data.map(d => d.TOTAL);

        var trace = {
            type: 'scatter',
            x: total,
            y: airline,
            mode: 'markers',
            name: 'Total of delayed flights',
            marker: {
                color: 'rgba(156, 165, 196, 0.95)',
                line: {
                    color: 'rgba(156, 165, 196, 1.0)',
                    width: 1,
                  },
                  symbol: 'circle',
                  size: 16
            }
        };

        var data = [trace];
        var layout = {
            title: 'Total count of delayed flights by airline ',
        
            xaxis: {
                tickmode: "linear", //  If "linear", the placement of the ticks is determined by a starting position `tick0` and a tick step `dtick`
                tick0: 1000,
                dtick: 10000
              },
              width: 600,
              height: 450,
              margin: {
                l: 150,
                r: 150,
                b: 50,
                t: 50,
                pad: 10
              },
              paper_bgcolor: 'AliceBlue',
              plot_bgcolor: 'Ivory',
              hovermode: 'closest'
            };
            
            Plotly.newPlot("dotplot", data, layout);
    });
}


function buildBarChart() {
    d3.json("/weekly").then((data) => {
        console.log("WEEK DATA: ",data);

        var day = data.map(d => d.DAY_OF_WEEK);
        var total = data.map(d => d.TOTAL);
 

        var trace = {
            x:total,
            y:day,
            name: 'Total count by day of week',
            orientation: 'h',
            marker: {
                color: 'rgba(55,128,191,0.6)',
                width: 1
              },
            type: 'bar'
        };

        var data = [trace];
        var layout = {
            title: 'Total count of delayed flights by day of week',
            paper_bgcolor: 'AliceBlue',
            plot_bgcolor: 'Ivory',
        };
        Plotly.newPlot("barchart",data,layout);

    })

}


function buildMaps() {
    d3.json("/state").then((data) => {
      
        var total = data.map(d => d.TOTAL);
        var state = data.map(d => d.STATE);

        var data = [{
            type: 'choropleth',
            locationmode: 'USA-states',
            locations: state,
            z: total,
            text: state,
            zmin: 0,
            zmax: 16000,
            colorscale: [
                [0, 'rgb(242,240,247)'], [0.2, 'rgb(162, 180, 224)'],
                [0.4, 'rgb(135, 158, 214)'], [0.6, 'rgb(88, 120, 196)'],
                [0.8, 'rgb(65, 100, 186)'], [1, 'rgb(45, 72, 140)']
            ],
            colorbar: {
                title: 'total count',
                thickness: 0.2
            },
            marker: {
                line:{
                    color: 'rgb(255,255,255)',
                    width: 2
                }
            }
        }];

        var layout = {
            title: '2015 US Airline Delayed flights by State',
            geo:{
                scope: 'usa',
                showlakes: true,
                lakecolor: 'rgb(255,255,255)'
            },
            paper_bgcolor: 'AliceBlue',
            plot_bgcolor: 'Ivory',
        };
        Plotly.newPlot("map",data,layout,{showLink: false});
    });
}


function buildTimeSeries(){
    d3.json("/date").then((data) => {
       console.log("date data is here: ",data);

        function formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
        
            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
        
            return [year, month, day].join('-');
        }

        var date = data.map(d => formatDate(d.DATE));
        var total = data.map(d => d.TOTAL);
        var cancelled = data.map(d => d.CANC_TOTAL);
      

        var trace1 = {
            type: "scatter",
            mode: "lines",
            x: date,
            y: total,
            line: {color: '#6495ED'},
            name: "Delayed Flights"
        }
          
        var trace2 = {
            type: "scatter",
            mode: "lines",
            x: date,
            y: cancelled,
            line: {color: '#D2691E'},
            name: "Cancelled flights"
        }
        var data = [trace1,trace2];

        var layout = {
            title: '2015 December',
            xaxis: {
              range: ['2015-11-30', '2015-12-31'],
              type: 'date'
            },
            yaxis: {
              autorange: true,
              range: [0, 6000],
              type: 'linear'
            },
            paper_bgcolor: 'AliceBlue',
            plot_bgcolor: 'Ivory',
            width: 600,
            height: 450,
            margin: {
              l: 150,
              r: 150,
              b: 50,
              t: 50,
              pad: 10
            },
        };
        Plotly.newPlot('gauge', data, layout);
    })
}

function buildTable(airline) {
    d3.json(`/tweets/${airline}`).then((data) => {
        console.log(data);

        var tbody = d3.select("tbody");
        tbody.html("");

        data.forEach((dataRow) => {
            var row = tbody.append("tr");
            Object.values(dataRow).forEach((val) => {
                var cell = row.append("td");
                cell.text(val);
            });
        });

    })
}



function optionChanged(newAirline){
    buildSampleInfo(newAirline);
    buildTable(newAirline);
}

function init(){
    // First dropdown menu for airlines
    var dropDownAirline = d3.select("#selAirline");
    d3.json("/airlinetotal").then((data) => {
        var options = data.map(d => d.AIRLINE);
        options.forEach(d => dropDownAirline.append("option")
                                        .text(d)
                                        .property("value",d)
                                        .classed("text-truncate",true));
   
        var defaultAirline = "American Airlines Inc.";

    buildDotplot();
    buildBarChart();
    buildMaps();
    buildTimeSeries();

    buildSampleInfo("American Airlines Inc.");
    buildTable("American Airlines Inc.");
    });  
}
init();

