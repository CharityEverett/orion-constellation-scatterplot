<!DOCTYPE html>
<html>
<head>
    <title>Celestial Scatter Plot</title>
    <script src="https://aframe.io/releases/1.4.2/aframe.min.js"></script>
</head>
<body>
    <a-scene>
        <a-entity id="starfield"></a-entity>
        <a-sky color="#000000"></a-sky>
        <a-entity position="0 1.6 5">
            <a-camera look-controls wasd-controls></a-camera>
        </a-entity>
    </a-scene>

    <script>
        // Register a simple star component
        AFRAME.registerComponent('twinkling-star', {
            schema: {
                name: {type: 'string', default: ''},
                magnitude: {type: 'number', default: 1.0}
            },

            init: function() {
                // Create the star sphere
                const size = Math.max(0.01, 0.05 / this.data.magnitude);
                this.el.setAttribute('geometry', {
                    primitive: 'sphere',
                    radius: size
                });
                
                this.el.setAttribute('material', {
                    color: '#FFFFFF',
                    emissive: '#FFFFFF',
                    emissiveIntensity: 1,
                    transparent: true,
                    opacity: 0.8
                });

                // Create text label
                const text = document.createElement('a-text');
                text.setAttribute('value', this.data.name);
                text.setAttribute('align', 'center');
                text.setAttribute('position', '0 ' + (size + 0.1) + ' 0');
                text.setAttribute('scale', '0.5 0.5 0.5');
                text.setAttribute('visible', false);
                this.el.appendChild(text);

                // Add interactivity
                this.el.addEventListener('mouseenter', () => {
                    text.setAttribute('visible', true);
                });
                this.el.addEventListener('mouseleave', () => {
                    text.setAttribute('visible', false);
                });

                // Setup twinkling
                this.twinkleTime = Math.random() * 1000;
            },

            tick: function(time) {
                // Simple twinkling effect
                if (time - this.twinkleTime > 1000) {
                    const opacity = 0.5 + Math.random() * 0.5;
                    this.el.setAttribute('material', 'opacity', opacity);
                    this.twinkleTime = time;
                }
            }
        });

        // Load and create stars
        document.addEventListener('DOMContentLoaded', function() {
            const starfield = document.getElementById('starfield');
            
            fetch('https://dieghernan.github.io/celestial_data/data/stars.6.geojson')
                .then(response => response.json())
                .then(data => {
                    // Filter and sort stars
                    const stars = data.features
                        .sort((a, b) => a.properties.mag - b.properties.mag)
                        .slice(0, 200);

                    stars.forEach(star => {
                        const [x, y, z] = star.geometry.coordinates;
                        const starEntity = document.createElement('a-entity');
                        
                        starEntity.setAttribute('position', `${x} ${y} ${z}`);
                        starEntity.setAttribute('twinkling-star', {
                            name: star.properties.name || 'Unnamed Star',
                            magnitude: star.properties.mag
                        });

                        starfield.appendChild(starEntity);
                    });
                });
        });
    </script>
</body>
</html>
