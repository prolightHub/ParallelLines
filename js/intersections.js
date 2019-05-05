function intersections(processing)
{	
	/* Export */
	processing.fixIntersections = fixIntersections;
	function fixIntersections(points, points2)
	{
		var intersections = getIntersectionsIndexes(points, points2);

		var ps = intersections.points;
		var ps2 = intersections.points2;

		for(var i = 0; i < ps.length; i++)
		{

		}

		for(var i = 0; i < ps2.length; i++)
		{
			points2.splice(ps2[i].index, 0, points[ps2[i].indexTo - 1]);
		}

		console.log(intersections);
	}
	
	/* Private */

	// https://stackoverflow.com/questions/9043805/test-if-two-lines-intersect-javascript-function
	function intersects(a, b, c, d, p, q, r, s) 
	{
		var det, gamma, lambda;
		det = (c - a) * (s - q) - (r - p) * (d - b);
		if(det === 0) 
		{
			return false;
		}else{
			lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
			gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
			return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
		}
	}

	/* Private */
	function getIntersectionsIndexes(points, points2)
	{
		var results = {
			points: [],
			points2: []
		};

		var point, lastPoint, point2, lastPoint2, i, j;

		// Check for all possible intersections between 2 arrays of lines
		for(i = 1; i < points.length; i++)
		{
			point = points[i];
			lastPoint = points[i - 1];

			for(j = 1; j < points2.length; j++)
			{
				point2 = points2[j];
				lastPoint2 = points2[j - 1];

				if(intersects(point.x, point.y, lastPoint.x, lastPoint.y, 
						      point2.x, point2.y, lastPoint2.x, lastPoint2.y))
				{
					results.points.push({
						index: i, // Index of nextPoint
						point: lastPoint,
						nextPoint: point,
						indexTo: j
					});
					results.points2.push({
						index: j, // Index of nextPoint
						point: lastPoint2,
						nextPoint: point2,
						indexTo: i
					});
				}
			}
		}

		return results;
	}
}

