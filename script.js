<!DOCTYPE html>
<html>
<head>
    <title>Celestial Scatter Plot</title>
    <script src="https://aframe.io/releases/1.4.2/aframe.min.js"></script>
    <!-- Remove sprite-particles component as it's causing shader issues -->
</head>
<body>
    <a-scene>
        <a-entity id="starfield"></a-entity>
        <a-sky color="#000000"></a-sky>
        <a-entity camera look-controls orbit-controls="target: 0 0 0; minDistance: 0.5; maxDistance: 180; initialPosition: 0 5 15"></a-entity>
    </a-scene>
    <script>
        AFRAME.registerComponent('star', {
            schema: {
                name: {type: 'string', default: ''},
                magnitude: {type: 'number', default: 1},
                color: {type: 'color', default: '#FFFFFF'}
            },
            init: function() {
                const geometry = new THREE.SphereGeometry(0.02, 8, 8);
                const material = new THREE.MeshBasicMaterial({
                    color: this.data.color,
                    transparent: true,
                    opacity: 0.8
                });
                this.mesh = new THREE.Mesh(geometry, material);
                this.el.setObject3D('mesh', this.mesh);
                
                // Add twinkling effect
                this.tick = AFRAME.utils.throttleTick(this.tick.bind(this), 1000);
            },
            tick: function() {
                if (this.mesh) {
                    this.mesh.material.opacity = 0.5 + Math.random() * 0.5;
                }
            }
        });

        document.addEventListener('DOMContentLoaded', function() {
            const starfield = document.getElementById('starfield');
            
            fetch('https://dieghernan.github.io/celestial_data/data/stars.6.geojson')
                .then(response => response.json())
                .then(data => {
                    let stars = data.features;
                    stars.sort((a, b) => a.properties.mag - b.properties.mag);
                    let selectedStars = stars.slice(0, 200);
                    
                    selectedStars.forEach(star => {
                        const starEntity = document.createElement('a-entity');
                        const [x, y, z] = star.geometry.coordinates;
                        starEntity.setAttribute('position', `${x} ${y} ${z}`);
                        starEntity.setAttribute('star', {
                            name: star.properties.name || 'Unnamed Star',
                            magnitude: star.properties.mag,
                            color: '#FFFFFF'
                        });
                        
                        // Add label entity as child
                        const labelEntity = document.createElement('a-text');
                        labelEntity.setAttribute('value', star.properties.name || 'Unnamed Star');
                        labelEntity.setAttribute('align', 'center');
                        labelEntity.setAttribute('position', '0 0.1 0');
                        labelEntity.setAttribute('scale', '0.5 0.5 0.5');
                        labelEntity.setAttribute('visible', false);
                        
                        starEntity.appendChild(labelEntity);
                        
                        // Add hover events
                        starEntity.addEventListener('mouseenter', function() {
                            labelEntity.setAttribute('visible', true);
                        });
                        
                        starEntity.addEventListener('mouseleave', function() {
                            labelEntity.setAttribute('visible', false);
                        });
                        
                        starfield.appendChild(starEntity);
                    });
                });
        });
    </script>
</body>
</html>
