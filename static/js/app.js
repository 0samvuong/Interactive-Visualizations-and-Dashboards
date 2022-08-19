// On change to the dropdown, build the table
// d3.selectAll("#selDataset").on("change", getData);

function buildHozBar(){

};

function buildPlot() {
    //load json data 
    d3.json("samples.json").then(function(data) {
        
        // VARIABLES

        // FOR THE bar chart, they want the top 10 values of samples
        // lucky for us, it is ordered in asc order
        // so in array, values 0-9 are the top 10! 
        // so that means we only need to slice the top 10 values 

        var sample_id_list = data.names;
        var sampleMetadata = data.metadata;
        var sampleSamples = data.samples;

        // get id of 1 sample as test
        var sample940 = sampleSamples.filter(data => data.id == 940);

        // define the HOZ Bar plot data
        // NEEDED to flip the x and y values as it's horizontal - meaning x which usually is the independant value (OTU) is now the dependant value (value/count...)
        // need to also reverse the chart to match the picture...
        var hozBarData = [{
            // x is OTU ID of the top 10 samples
            y: sample940[0].otu_ids.slice(0,10).map(data => `OTU ${data}`).reverse(),
            // y is OTU sample values ( it is in the same order as the id)
            x: sample940[0].sample_values.slice(0,10).reverse(),
            type: "bar",
            orientation: "h",
        }];

        // define bar layout
        var hozBarLayout = {

            title:"Fuck you",
            xaxis: { title: "Values/Count" },
            yaxis: { title: "OTU ID" }
        };

        Plotly.newPlot('bar', hozBarData, hozBarLayout)

        console.log(sample940)
    

    });

};

buildPlot();