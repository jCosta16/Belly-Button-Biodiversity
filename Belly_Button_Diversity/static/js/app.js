


function buildMetadata(sample) {
  // @TODO: Complete the following function that builds the metadata panel
  d3.json("samples.json").then(function(data) {
    var data = data.metadata
    for (var i=0, len = data.length; i < len; i++) {
      if (data[i].id == sample) {
        var sampleMeta = d3.select("#sample-metadata").html("")
        for (let [key, value] of Object.entries(data[i])) {
          sampleMeta.append("p").text(`${key}: ${value}`)
        };
      };
    };
    
    var data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: 270,
        title: { text: "Speed" },
        type: "indicator",
        mode: "gauge+number"
      }
    ];
    
    var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', data, layout);
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
  });
}

function buildCharts(sample) {
  d3.json("samples.json").then(function(data) {
    var data = data.samples;
    var len = data.length
    for (var i=0; i < len; i++) {
      if (data[i].id == sample) {
        var id = data[i].id;
        var sample_values = (data[i].sample_values).slice(0,10);
        var otu_ids = (data[i].otu_ids).slice(0,10);
        var otu_labels = (data[i].otu_labels).slice(0,10);
      
        // bar chart
        var dataBar = [{
          type: 'bar',
          x: sample_values,
          y: otu_ids.map(x => `OTU ${x}`),
          text: otu_labels.map(l => `OTU ${l}`),
          orientation: 'h'
        }];
        
        Plotly.newPlot('bar', dataBar);
        
        //bubble chart
        var dataBubble = [{
          y: data[i].sample_values,
          x: data[i].otu_ids,
          mode: 'markers',
          text: data[i].otu_labels.map(l => `OTU ${l}`),
          marker: {
            size: data[i].sample_values.map(b => b)
          }
        }];
        
        Plotly.newPlot('bubble', dataBubble);
      
      







      }
      else{

      }
    }
    // @TODO: Use `d3.json` to fetch the sample data for the plots
    
    // @TODO: Build a Bubble Chart using the sample data



    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    
  });  

};

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    data.names.forEach((name) => {
      selector
        .append("option")
        .text(name)
        .property("value", name);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = data.names[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
