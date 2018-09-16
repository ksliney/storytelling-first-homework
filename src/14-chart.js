/* global d3 */
(function() {
  d3.csv("eating-data.csv")
    .then(ready)
    .catch(function(err) {
      console.log("Failed with", err);
    });

  var width = 600;
  var height = 700;

  var svg = d3
    .select("#chart14")
    .append("svg")
    .attr("height", height)
    .attr("width", width)
    .append("g")
    .attr("transform", "translate(25, 25)");

  const heightScale = d3
    .scaleLinear()
    .domain([0, 12])
    .range([600, 0]);

  const colorScale = d3
    .scaleOrdinal()
    .range(["blue", "red", "green", "purple", "pink"]);

  function ready(datapoints) {
    console.log("Data is", datapoints);

    var names = datapoints.map(function(d) {
      return d.name;
    });

    var xScale = d3
      .scaleBand()
      .domain(names)
      .range([0, 600]);

    svg
      .selectAll("rect")
      .data(datapoints)
      .enter()
      .append("rect")
      .attr("width", 50)
      .attr("height", function(d, i) {
        return height - heightScale(d.hamburgers);
      })
      .attr("fill", function(d) {
        return colorScale(d.animal);
      })
      .attr("x", function(d, i) {
        return xScale(d.name);
      })
      .attr("opacity", 0.5);
    // attr("y",600)

    svg
      .append("text")
      .attr("x", 250)
      .attr("y", -10)
      .text("animals");
  }
})();
