window.onload = function() {
	var paper = new Raphael(document.getElementById('canvas_container'), 1024, 768);
	var circle1 = paper.circle(390, 170, 5).attr({
		fill : "black",
		stroke : "black"
	});
	var circle2 = paper.circle(495, 210, 5).attr({
		fill : "black",
		stroke : "black",
		
	});
	var dotline=paper.path("M 330 330 l 100 0").attr({
		"stroke-dasharray":"-",
		"stroke-width":2
		});
	/*var line = paper.path("M114 253").animate({
		path : "M114 253 L 234 253"
	},2000,function(){
		path:"M234 253L 234 280"
	},2000);
	var line =paper.path("M300 300").animate({
		path : "M300 300 l 0 150 q 35 68 ",
		"stroke-width":1
	},2000);*/

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
	var rTransform = function(rElement, rTransformOption) {
		var deferred = $.Deferred();
		rTransformOption = rTransformOption || {};
		rElement.animate({
			transform : rTransformOption.transform
		}, rTransformOption.delay, (rTransformOption.tFunction || 'linear'), function() {
			deferred.resolveWith(deferred, [rTransformOption]);
		});
		return deferred;
	}, transform = function(rElement, rTransformOptionArray) {
		if (!rElement || !rTransformOptionArray)
			return;
		var deferred = $.Deferred(),
		process = function() {
			if (rTransformOptionArray.length) {
				rTransform(rElement, rTransformOptionArray.splice(0,1)[0]).done(process);
			} else{
				deferred.resolve();
			}
		};
		process();
		return deferred;
	};

	function animateCircles(){
		var count = 0;
		transform(circle1, [{
		transform : 't0,125',
		delay : 2000
	}, {
		transform : 't0,125',
		delay : 1000
	}, {
		transform : 't-20,125',
		delay : 500
	}, {
		transform : 't -60,100',
		delay : 1000
	}, {
		transform : 't -80,80',
		delay : 1000
	}, {
		transform : 't -90,60',
		delay : 1000
	}, {
		transform : 't-90,50',
		delay : 1000
	}, {
		transform : 't -90,12',
		delay : 1000
	}, {
		transform : 't-50,-40',
		delay : 1000
	}, {
		transform : 't -50,-40',
		delay : 500
	}, {
		transform : 't -15,-50',
		delay : 1000
	}, {
		transform : 't25,-50',
		delay : 1000
	}, {
		transform : 't80,-15',
		delay : 1000
	}, {
		transform : 't80,-15',
		delay : 500
	}, {
		transform : 't90,10',
		delay : 1000
	}, {
		transform : 't90,10',
		delay : 500
	}, {
		transform : 't90,50',
		delay : 1000
	}, {
		transform : 't90,50',
		delay : 500
	}, {
		transform : 't75,75',
		delay : 1000
	}, {
		transform : 't75,75',
		delay : 1000
	}, {
		transform : 't 90,50',
		delay : 1000
	}, {
		transform : 't90,20',
		delay : 1000
	}, {
		transform : 't80,15',
		delay : 2000
	},{
		transform : 't150,-40',
		delay :4000
	},{
		transform: 't160,-50',
		delay:2000
	},{
		transform:'t190,-50',
		delay:2000
	},{
		transform: 't220,-50',
		delay:1000
	},{
		transform: 't260,-25',
		delay:1000
	},{
		transform: 't270,10',
		delay:1000
	},{
		transform: 't275,40',
		delay:1000
	},{
		transform:'t105,40',
		delay:3000
	},]).done(function(){
		count++;
		onAnimationComplete();
	});

	/*second circle*/
	transform(circle2, [{
		transform : 't0,25',
		delay : 1000
	}, {
		transform : 't40,80',
		delay : 1000
	}, {
		transform : 't60,85',
		delay : 1000
	}, {
		transform : 't88,90',
		delay : 1000
	}, {
		transform : 't95,90',
		delay : 1000
	}, {
		transform : 't125,76',
		delay : 1000
	}, {
		transform : 't125,76',
		delay : 2000
	}, {
		transform : 't 95,90',
		delay : 1000
	}, {
		transform : 't88,90',
		delay : 1000
	}, {
		transform : 't60,85',
		delay : 1000
	}, {
		transform : 't40,80',
		delay : 1000
	}, {
		transform : 't0,25',
		delay : 1000
	},{
		transform : 't0,25',
		delay :4000
	},{
		transform: 't-10,0',
		delay:1000
	},{
		transform: 't-20,-20',
		delay:1000
	},{
		transform: 't-24,-50',
		delay:1000
	},{
		transform:'t-30,-50',
		delay:1000
	},{
		transform:'t-35,-50',
		delay:1000
	},{
		transform:'t-40,-65',
		delay:1000
	},{
		transform:'t-60,-75',
		delay:1000
	},{
		transform:'t-80,-90',
		delay:1000
	},{
		transform:'t-130,-90',
		delay:1000
	},{
		transform:'t-160,-70',
		delay:1000
	},{
		transform:'t-170,-60',
		delay:1000
	},{
		transform:'t-180,-60',
		delay:1000
	},{
		transform:'t-190,-50',
		delay:1000
	},{
		transform:'t-190,-20',
		delay:1000
	},{
		transform: 't-190,30',
		delay:1000
	},{
		transform: 't-170,50',
		delay:1000
	},{
		transform:'t-165,60',
		delay:1000
	},{
		transform:'t-135,85',
		delay:1000
	},{
		transform:'t-105,85',
		delay:1000
	},{
		transform:'t-105,-40',
		delay:1000
	},]).done(function(){
		count++;
		onAnimationComplete();
	});
	function onAnimationComplete(){
		if(count >= 2){
			animateCircles();
		}	
	}	
	};
	
	animateCircles();
		
};





























$(function() {
		$("#dottedpath, #righteye").hide();
		var dotline = paper.path("M 455 301").attr({
			stroke : "white"
		}).animate({
			path : "M 455 301 l -50 0",
			'stroke-dasharray' : "100 20 0 20",
			stroke : "white"
		}, 2000);
		$("#lefteye").hide();
		$("#leftbar").animate({
			width : "318px"
		}, 2500, function() {
			$("#lefteye").show();
			var leftinnercircle = paper.circle(300, 300, 0).animate({
				"stroke" : "#ffffff",
				cx : 300,
				cy : 300,
				r : 124
			}, 3000);
			$("#rightbar").animate({
				height : "238px"
			}, 2000, function() {
				var leftoutercircle = paper.circle(300, 300, 0).animate({
					cx : 300,
					cy : 300,
					r : 206,
					"stroke" : "#ffffff",
					"stroke-width" : 2
				}, 3000);
				$("#bottombar").animate({
					width : "318px"
				}, 3500, function() {
					$("#righteye").show();
					$("#leftbar").animate({
						height : "238px"
					}, 1000, function() {
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
						$("#topbar").animate({
							width : "300px"
						}, 4000, function() {
							$("#dottedpath").show();
							var arrow = paper.path("M460 272 l 10 5 l  -10 5 Z").attr({
								fill : "#ffffff",
								"stroke" : "none"
							});
							transform(arrow, [{
								transform : 't45,0',
								delay : 2000
							}, {
								transform : 't45,0 r 90',
								delay : 500
							}, {
								transform : 't45,0 r 90',
								delay : 500
							}, {
								transform : 't48,20',
								delay : 2000
							}, {
								transform : 't150,20',
								delay : 2000
							}, {
								transform : 't152,20 r90',
								delay : 500
							}, {
								transform : 't152,40 r90',
								delay : 2000
							}, {
								transform : "t154,43 r180",
								delay : 500
							}, {
								transform : "t-33,43 r180",
								delay : 2000
							}, {
								transform : "t -33,43 r270",
								delay : 2000
							}, {
								transform : "t-33,25 r270",
								delay : 2000
							}, {
								transform : "t-33,22 r180",
								delay : 500
							}, {
								transform : "t -33,22 r180",
								delay : 500
							}, {
								transform : "t -135,22 r 180",
								delay : 2000
							}, {
								transform : " t -135,22 r 270",
								delay : 500
							}, {
								transform : "t -135,0 r 270",
								delay : 2000
							}, {
								transform : "t -135,0 r 360",
								delay : 500
							}, {
								transform : "t 0,0 r 360",
								delay : 2000
							}]);
						});
					});
				});
			});
		});
	});
};