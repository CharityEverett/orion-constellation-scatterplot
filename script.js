AFRAME.registerComponent('star', {
    schema: {
        name: {type: 'string', default: ''},
        magnitude: {type: 'number', default: 1.0}
    },

    init: function() {
        const size = Math.max(0.01, 0.05 / this.data.magnitude);
        this.el.setAttribute('geometry', {
            primitive: 'sphere',
            radius: size
        });
        
        this.el.setAttribute('material', {
            shader: 'standard',
            emissive: '#FFFFFF',
            emissiveIntensity: 1,
            metalness: 0,
            roughness: 1
        });

        // Add text label
        const text = document.createElement('a-entity');
        text.setAttribute('text', {
            value: this.data.name,
            align: 'center',
            width: 2
        });
        text.setAttribute('position', `0 ${size + 0.1} 0`);
        text.setAttribute('visible', false);
        this.el.appendChild(text);

        // Add interactivity
        this.el.addEventListener('mouseenter', () => {
            text.setAttribute('visible', true);
        });
        this.el.addEventListener('mouseleave', () => {
            text.setAttribute('visible', false);
        });
    }
});

// Load stars when scene is ready
document.querySelector('a-scene').addEventListener('loaded', function() {
    const starfield = document.getElementById('starfield');
    
    fetch('https://dieghernan.github.io/celestial_data/data/stars.6.geojson')
        .then(response => response.json())
        .then(data => {
            const stars = data.features
                .sort((a, b) => a.properties.mag - b.properties.mag)
                .slice(0, 200);

            stars.forEach(star => {
                const [x, y, z] = star.geometry.coordinates;
                const starEntity = document.createElement('a-entity');
                
                starEntity.setAttribute('position', `${x} ${y} ${z}`);
                starEntity.setAttribute('star', {
                    name: star.properties.name || 'Unnamed Star',
                    magnitude: star.properties.mag
                });

                starfield.appendChild(starEntity);
            });
        });
});
