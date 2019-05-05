function main()
{
	/* Import */ intersections(processing);

	// Set canvas size
	size(800, 480);

	var keys = [];
	keyPressed = function()
	{
		keys[keyCode] = true;
		keys[key.toString()] = true;
	};
	keyReleased = function()
	{
		delete keys[keyCode];
		delete keys[key.toString()];
	};

	var points = [];
	var points2 = [];

	function drawPoints(points, $color)
	{
		stroke($color || color(175, 175, 175));
		strokeWeight(2);
		for(var i = 1; i < points.length; i++)
		{
			line(points[i].x, points[i].y, points[i - 1].x, points[i - 1].y);
		}
	}

	// Create points next to a existing set of points using an angle and length for direction
	function createPoints(points, angle, offset)
	{
		var newPoints = [];

		for(var i = 0; i < points.length; i++)
		{
			newPoints.push({
				x: points[i].x + cos(angle) * offset,
				y: points[i].y + sin(angle) * offset,
			});
		}

		return newPoints;
	}

    draw = function()
    {
    	background(255, 255, 255);

        drawPoints(points);
        drawPoints(points2, color(0, 70, 100));

        // When space is pressed
        if(keys[" "])
        {
        	points2 = createPoints(points, 90, 60);
        }

        if(keys["p"])
        {
        	fixIntersections(points, points2);
        }
    };

    mousePressed = function()
    {
    	// Add points
    	points.push({
    		x: mouseX,
    		y: mouseY
    	});
    };
}

createProcessing(main);