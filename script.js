const orionStars = [
    {name: "Rigel", mag: 0.13, x: -1, y: -1, z: 0},
    {name: "Betelgeuse", mag: 0.5, x: 1, y: 1, z: 0},
    {name: "Bellatrix", mag: 1.64, x: -0.5, y: 0.5, z: 0},
    {name: "Alnilam", mag: 1.7, x: 0, y: 0, z: 0},
    {name: "Alnitak", mag: 1.77, x: 0.5, y: 0, z: 0},
    {name: "Saiph", mag: 2.06, x: -0.5, y: -1, z: 0},
    // Add more stars from the Orion constellation...
];

document.addEventListener('DOMContentLoaded', function() {
    const starfield = document.getElementById('starfield');
    
    starfield.setAttribute('sprite-particles', {
        texture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==',
        color: '#FFFFFF, #FFFF00, #87CEFA',
        size: '0.01..0.03',
        randomize: 'size, color',
        opacity: '0.7..1',
        blending: 'additive',
        maxParticleCount: orionStars.length
    });

    orionStars.forEach(star => {
        const entity = document.createElement('a-entity');
        entity.setAttribute('position', `${star.x} ${star.y} ${star.z}`);
        entity.setAttribute('text', `value: ${star.name}; align: center; width: 2; color: white;`);
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
