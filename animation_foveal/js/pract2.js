window.onload = function() {

	/**
	 * Animate rElement(raphael object)
	 * on rTransformOption, where rTransformOption
	 * is on Object of the form
	 * {
	 * 	transform : transformString ie. t100,40 r90,
	 *  delay	  : animation delay,
	 *  tFunction : animation function
	 * }
	 */
	//var rsr = Raphael('rsr', '20', '30'); var group_a = rsr.set(); var path_b = rsr.path("M10.467,26.121c-1.469,0-2.663-1.197-2.663-2.667V7.729c0-1.47,1.194-2.665,2.663-2.665 c1.47,0,2.666,1.195,2.666,2.665v15.726C13.133,24.924,11.938,26.121,10.467,26.121z M10.467,5.34C9.15,5.34,8.08,6.411,8.08,7.729 v15.726c0,1.319,1.07,2.388,2.388,2.388c1.318,0,2.388-1.068,2.388-2.388V7.729C12.855,6.411,11.785,5.34,10.467,5.34z"); path_b.attr({fill: '#FFFFFF',parent: 'group_a','stroke-width': '0','stroke-opacity': '1'}).data('id', 'path_b'); var path_c = rsr.path("M12.994,12.688c0,0,1.424,0.092,1.424,1.057c0,0.964,0,3.721,0,3.721s-0.092,1.027-1.424,1.027V12.688z"); path_c.attr({fill: '#FFFFFF',parent: 'group_a','stroke-width': '0','stroke-opacity': '1'}).data('id', 'path_c'); var path_d = rsr.path("M7.94,18.493c0,0-1.423-0.091-1.423-1.056s0-3.721,0-3.721s0.09-1.028,1.423-1.028V18.493z"); path_d.attr({fill: '#FFFFFF',parent: 'group_a','stroke-width': '0','stroke-opacity': '1'}).data('id', 'path_d'); group_a.attr({'name': 'group_a'}); var rsrGroups = [group_a];

	/* for repeating svg*/
	var rTransform = function(rElement, rTransformOption) {
		var deferred = $.Deferred();
		rTransformOption = rTransformOption || {};
		rElement.animate({
			transform : rTransformOption.transform
		}, rTransformOption.delay, (rTransformOption.tFunction || 'linear'), function() {
			deferred.resolveWith(deferred, [rTransformOption]);
		}).attr({
			"src" : "img/fli.svg"
		});
		return deferred;
	}, transform = function(rElement, rTransformOptionArray, infinite) {
		if (!rElement || !rTransformOptionArray)
			return;

		var index = 0, process = function() {
			if (infinite) {
				rTransform(rElement, rTransformOptionArray[index++]).done(process);
				if (index >= rTransformOptionArray.length)
					index = 0;
			} else {
				if (rTransformOptionArray.length) {
					rTransform(rElement, rTransformOptionArray.splice(0,1)[0]).done(process);
				}
			}
		};
		process();
	};
	var fade_in = function() {
		uppercircle.hide();
		lowercircle.hide();
		funkyCircles();

	};
	var fade_off = function() {

	};
	var paper = new Raphael(document.getElementById('canvas_container'), 1024, 768);
	var uppercircle = paper.circle(470, 189, 118).hide().attr({
		"stroke" : "#f5ed57",
		"stroke-width" : 1
	});
	uppercircle.hover(fade_in, fade_off, uppercircle, uppercircle);

	var lowercircle = paper.circle(470, 411, 118).hide().attr({
		"stroke" : "#6ac9cd",
		"stroke-width" : 1
	});
	lowercircle.hover(fade_in, fade_off, lowercircle, lowercircle);
	var dr = function(i) {
		paper.image("img/fli.svg", i, 285, 20, 30);
	};
	var lefteye, sune, righteye, fli;
	$("#lefteye").mouseover(function() {
		lefteye = paper.text(280, 280, "OBSERVER");
	});
	$("#lefteye").mouseout(function() {
		lefteye.remove();
	});
	$("#righteye").mouseover(function() {
		lefteye = paper.text(680, 280, "REFLECTION");
	});
	$("#righteye").mouseout(function() {
		lefteye.remove();
	});
	$("#sun").mouseover(function() {
		sune = paper.text(500, 270, "ABSTRACT");
	});
	$("#sun").mouseout(function() {
		sune.remove();
	});
	$("#fli").mouseover(function() {
		lefteye = paper.text(280, 280, "hwsd");
	});

	/*var uppercircle, lowercircle;
	$("#uppercircle").mouseover(function() {
		uppercircle = paper.text(280, 280, "MEANING");
	});
	$("#lowercircle").mouseover(function() {
		lowercircle = paper.text(280, 280, "MEANING");
	});*/


	var delay = function(fun, duration) {
		var deferred = $.Deferred();
		setTimeout(function() {
			if ($.isFunction(fun)) {
				fun();
				deferred.resolve();
			}
		}, duration);
		return deferred;

	};
	//Draw fli
	var drawFli = function(startCoordinate, endCoordinate, interval, duration) {
		var startCoordinate = startCoordinate, //starting coordinate
		deferred = $.Deferred();
		fli = function() {//draw fli with delay
			delay(function() {
				dr(startCoordinate);
				// draw first fli
			}, duration).done(function() {
				if (startCoordinate > endCoordinate) {//if coordinate is greater than 300, draw again
					startCoordinate -= interval;
					fli(startCoordinate);
				} else {
					deferred.resolve();
				}
			});
		};
		fli();
		return deferred;
	};
	var showLeftCircles = function() {
		var leftinnercircle = paper.circle(300, 300, 0).animate({
			"stroke" : "#ffffff",
			cx : 300,
			cy : 300,
			r : 124
		}, 3000);
		var leftoutercircle = paper.circle(300, 300, 0).animate({
			cx : 300,
			cy : 300,
			r : 206,
			"stroke" : "#ffffff",
			"stroke-width" : 2
		}, 3000);
	};
	var showRightCircles = function() {
		var rightoutercircle = paper.circle(645, 300, 0).animate({
			cx : 645,
			cy : 300,
			r : 206,
			"stroke" : "#b2b2b2",
			"stroke-width" : 2
		}, 3000);
		var rightinnercircle = paper.circle(645, 300, 0).animate({
			cx : 645,
			cy : 300,
			r : 124,
			"stroke" : "#b2b2b2"
		}, 3000);
	};
	var moveArrowAlongPath = function() {
		var arrow = paper.path("M460 272 l 10 5 l  -10 5 Z").attr({
			fill : "#ffffff",
			"stroke" : "none"
		});
		transform(arrow, [{
			transform : 't45,0',
			delay : 1500
		}, {
			transform : 't45,0 r 90',
			delay : 50
		}, {
			transform : 't45,0 r 90',
			delay : 50
		}, {
			transform : 't48,20',
			delay : 2000
		}, {
			transform : 't150,20',
			delay : 2000
		}, {
			transform : 't152,20 r90',
			delay : 50
		}, {
			transform : 't152,40 r90',
			delay : 1000
		}, {
			transform : "t154,43 r180",
			delay : 50
		}, {
			transform : "t-33,43 r180",
			delay : 3500
		}, {
			transform : "t -33,43 r270",
			delay : 50
		}, {
			transform : "t-33,25 r270",
			delay : 1000
		}, {
			transform : "t-33,22 r180",
			delay : 50
		}, {
			transform : "t -33,22 r180",
			delay : 50
		}, {
			transform : "t -135,22 r 180",
			delay : 2000
		}, {
			transform : " t -135,22 r 270",
			delay : 50
		}, {
			transform : "t -135,0 r 270",
			delay : 2000
		}, {
			transform : "t -135,0 r 0",
			delay : 50
		}, {
			transform : "t 0,0 r 0",
			delay : 2000
		}], true);
	};
	! function() {
		$("#dottedpath, #righteye,#lefteye,#blacklefteye,#fli").hide();
		var dotline1 = paper.path("M 455 301").attr({
			stroke : "white"
		}).animate({
			path : "M 455 301 l -50 0",
			'stroke-dasharray' : "-",
			stroke : "white"
		}, 2000, function() {
			drawFli(400, 340, 10, 500).done(function() {
				var dotline2 = paper.path("M 350 300").attr({
					stroke : "white"
				}).animate({
					path : "M 350 300 l -20 0",
					'stroke-dasharray' : "-",
					stroke : "white"
				}, 1000);
				delay(function() {
					$("#lefteye").show();
				}, 1500);
				delay(function() {
					$("#lefteye").hide();
					$("#blacklefteye").show();
				}, 2000);
				delay(function() {
					$("#lefteye").show();
					$("#blacklefteye").hide();
				}, 2500);
				//show black eye
				delay(showLeftCircles, 3000).done(function() {
					delay(function() {
						$("#righteye").show();
					}, 4000);
					delay(moveArrowAlongPath, 7000).done(function() {
						delay(function() {
							uppercircle.show();
							lowercircle.show();

						}, 18000);
					});
					delay(function() {
						dotline1.remove();
						dotline2.remove();
						$("#dottedpath").show();
					}, 6000);
					delay(showRightCircles, 8500).done(function() {
					});
				});
			});
		});
	}();

};

//d3 circles
function funkyCircles() {
	function transition(circle, path) {
		circle.transition().duration(1000).ease(Math.sqrt).style("fill-opacity", 1e-6).attrTween("transform", translateAlong(path.node()));
		//.each("end");
	}

	// Returns an attrTween for translating along the specified path element.
	function translateAlong(path) {
		var l = path.getTotalLength();
		var last_time = 0;
		return function(d, i, a) {
			return function(t) {
				if (t >= 0.52) {
					return;
				}
				if (Math.abs(t - last_time) < 0.05) {
					return;
				}
				last_time = t;

				var p = path.getPointAtLength(t * l);
				var t1 = t + 0.5;
				if (t > 0.5) {
					t1 = t - 0.5;
				}
				var q = path.getPointAtLength(t1 * l)
				svg.append("svg:circle").attr("cx", p.x).attr("cy", p.y).attr("r", 118).style("stroke", "#6ac9cd").style("fill", "none").style("stroke-opacity", 1);

				svg.append("svg:circle").attr("cx", q.x).attr("cy", q.y).attr("r", 118).style("stroke", "#f5ed57").style("fill", "none").style("stroke-opacity", 1);
				// return "translate(" + p.x + "," + p.y + ")";
			};
		};
	}

	var points = getCirclePoints(471, 301, 118, 20);
	var svg = d3.select("svg")

	var path = svg.append("path").style("fill", "none").data([points]).attr("d", d3.svg.line().tension(0)// Catmull–Rom
	.interpolate("cardinal"));

	var circle = svg.append("circle").attr("r", 118).style("fill", "none").attr("transform", "translate(" + points[0] + ")");

	transition(circle, path);
}

function getCirclePoints(centerX, centerY, radius, segments) {
	var totalPoints = new Array();
	for (var i = 0; i < segments; i++) {
		x = centerX + radius * Math.sin(i * 2 * Math.PI / segments);
		y = centerY + radius * Math.cos(i * 2 * Math.PI / segments);
		totalPoints.push([x, y]);
	}
	return totalPoints;
}

