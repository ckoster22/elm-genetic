


// Do yourself a favor and don't look at this file. Nothing good will come of it.



var _ckoster22$elm_genetic$Native_NativeModule = (function () {
    let originalPixels;

    function getPixels(context) {
        let pix = context.getImageData(0, 0, 555, 465).data;
        let retVal = [];

        for (var i = 0; i < pix.length; i += 4) {
            retVal.push({
                r: pix[i],
                g: pix[i + 1],
                b: pix[i + 2],
                alpha: pix[i + 3]
            })
        }

        return retVal;
    }

    function evaluate(circles) {

        // If you are reading this, turn back

        const flattenedCircles = flatten(circles);
        let originalCanvas = document.querySelector('#originalCanvas');
        let originalContext;
        if (!originalCanvas) {
            const c = document.createElement('canvas');
            c.width = 555;
            c.height = 465;
            c.id = 'originalCanvas';
            document.body.appendChild(c);
            originalCanvas = document.querySelector('#originalCanvas');
            originalContext = originalCanvas.getContext('2d');
            const img = document.getElementById('rabbit');
            originalContext.drawImage(img, 0, 0, 555, 465);

            originalPixels = getPixels(originalContext);
        }

        const jsCircles = flattenedCircles.map(circle => {
            return {
                x: circle.x,
                y: circle.y,
                radius: circle.radius,
                color: 'rgba(' + circle.color._0 + ',' + circle.color._1 + ',' + circle.color._2 + ',' + circle.color._3 + ')',
                borderColor: 'rgba(' + circle.borderColor._0 + ',' + circle.borderColor._1 + ',' + circle.borderColor._2 + ',' + circle.borderColor._3 + ')'
            }
        });

        let canvas = document.querySelector('#evalCanvas');
        if (!canvas) {
            const c = document.createElement('canvas');
            c.width = 555;
            c.height = 465;
            c.id = 'evalCanvas';
            document.body.appendChild(c);
            canvas = document.querySelector('#evalCanvas');
        }
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, 555, 465);

        for (let i = 0; i < jsCircles.length; ++i) {
            let circle = jsCircles[i];
            context.beginPath();
            context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
            context.fillStyle = circle.color;
            context.strokeStyle = circle.borderColor;
            context.lineWidth = 1;
            context.stroke();
            context.fill();
        }

        const newPixels = getPixels(context);
        let cost = 0;

        for (var i = 0; i < newPixels.length; ++i) {
            cost += Math.abs(newPixels[i].r - originalPixels[i].r);
            cost += Math.abs(newPixels[i].g - originalPixels[i].g);
            cost += Math.abs(newPixels[i].b - originalPixels[i].b);
            cost += Math.abs(newPixels[i].alpha - originalPixels[i].alpha);
        }

        return cost;
    }

    function flatten(circles) {
        if (circles.ctor === '_Array') { // .. and this is one reason why we don't write native code ..
            return circles.table.reduce((acc, curr) => {
                return acc.concat(flatten(curr));
            }, []);
        } else {
            return circles;
        }
    }

    return {
        evaluate: evaluate
    };
})();