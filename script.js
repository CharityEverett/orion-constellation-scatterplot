document.addEventListener('DOMContentLoaded', function() {
    const starfield = document.getElementById('starfield');

    fetch('https://dieghernan.github.io/celestial_data/data/stars.6.geojson')
        .then(response => response.json())
        .then(data => {
            let stars = data.features;
            
            // Sort by magnitude (brightness)
            stars.sort((a, b) => a.properties.mag - b.properties.mag);
            
            // Select top 200 stars
            let selectedStars = stars.slice(0, 200);
            
            // Optionally, filter for named stars
            selectedStars = selectedStars.filter(star => star.properties.name);
            
            // If we need exactly 100-200 stars, we can adjust here
            if (selectedStars.length > 200) {
                selectedStars = selectedStars.slice(0, 200);
            } else if (selectedStars.length < 100) {
                // If we have fewer than 100 named stars, add more from the original sorted list
                const additionalStars = stars.slice(selectedStars.length, 100);
                selectedStars = selectedStars.concat(additionalStars);
            }

     starfield.setAttribute('sprite-particles', {
    texture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==',
    color: '#FFFFFF',  // Simplify color initially
    size: '0.02',     // Use single value first
    opacity: '1',     // Start with full opacity
    blending: 'additive',
    maxParticleCount: selectedStars.length,
    randomize: false  // Disable randomization initially
});

            selectedStars.forEach(star => {
                const entity = document.createElement('a-entity');
                const [x, y, z] = star.geometry.coordinates;
                entity.setAttribute('position', `${x} ${y} ${z}`);
                entity.setAttribute('text', `value: ${star.properties.name || 'Unnamed Star'}; align: center; width: 2; color: white;`);
                entity.setAttribute('visible', false);
                
                entity.addEventListener('mouseenter', function() {
                    this.setAttribute('visible', true);
                });
                entity.addEventListener('mouseleave', function() {
                    this.setAttribute('visible', false);
                });

                starfield.appendChild(entity);
            });

            function twinkle() {
                const currentOpacity = starfield.getAttribute('sprite-particles').opacity;
                const newOpacity = currentOpacity === '0.7..1' ? '0.3..0.7' : '0.7..1';
                starfield.setAttribute('sprite-particles', 'opacity', newOpacity);
            }

            setInterval(twinkle, 1000);
        });
});
