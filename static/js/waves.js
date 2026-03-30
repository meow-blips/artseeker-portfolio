(function () {
    var canvas = document.createElement("canvas");
    canvas.id = "wave-canvas";
    document.body.prepend(canvas);

    var ctx = canvas.getContext("2d");
    var width, height;
    var time = 0;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    var waves = [
        { amp: 50, length: 0.008, speed: 0.015, yOff: 0.35, phase: 0 },
        { amp: 40, length: 0.012, speed: 0.020, yOff: 0.50, phase: 2 },
        { amp: 60, length: 0.006, speed: 0.010, yOff: 0.65, phase: 4 },
        { amp: 35, length: 0.010, speed: 0.025, yOff: 0.80, phase: 1 },
    ];

    function getColors() {
        var dark = document.documentElement.classList.contains("dark");
        if (dark) {
            return [
                "rgba(224, 122, 95, 0.25)",
                "rgba(129, 178, 154, 0.20)",
                "rgba(184, 169, 201, 0.18)",
                "rgba(201, 112, 93, 0.15)",
            ];
        }
        return [
            "rgba(201, 112, 93, 0.12)",
            "rgba(129, 178, 154, 0.10)",
            "rgba(184, 169, 201, 0.08)",
            "rgba(201, 112, 93, 0.06)",
        ];
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        var colors = getColors();

        for (var i = 0; i < waves.length; i++) {
            var w = waves[i];
            var color = colors[i];

            ctx.beginPath();
            ctx.moveTo(0, height);

            for (var x = 0; x <= width; x += 3) {
                var y = height * w.yOff +
                    Math.sin(x * w.length + time * w.speed + w.phase) * w.amp +
                    Math.sin(x * w.length * 0.5 + time * w.speed * 1.3 + w.phase * 0.7) * w.amp * 0.4;
                ctx.lineTo(x, y);
            }

            ctx.lineTo(width, height);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();
        }

        time++;
        requestAnimationFrame(draw);
    }

    draw();
})();
