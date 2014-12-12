window.onload = function() {
	d3.selectAll("div").data([200, 300, 400, 500, 600]).transition().duration(2000).style("width", function(d) {
		return d + "px";
	});
	
	d3.selectAll("circle").attr("r", function(d,i){return (i+1)*10});
	d3.selectAll("circle").style("fill", "blue");
	d3.select("circle").style("fill","red");
};
