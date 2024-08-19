document.getElementById('spinButton').addEventListener('click', function() {
    const reels = document.querySelectorAll('.reel');
    let results = [];

    // Generar resultados aleatorios para cada reel
    reels.forEach(reel => {
        const images = reel.querySelectorAll('.slot-image');
        const randomIndex = Math.floor(Math.random() * images.length);
        const selectedImage = images[randomIndex].src;
        results.push(selectedImage);
    });

    updateReels(results);
    checkForWin();
});

function updateReels(results) {
    const reels = document.querySelectorAll('.reel');
    
    // Actualizar las imágenes de los reels
    reels.forEach((reel, index) => {
        const images = reel.querySelectorAll('.slot-image');
        images.forEach((image, i) => {
            image.src = results[index];
        });
    });
}

function checkForWin() {
    const resultText = document.getElementById('result');

    // Obtener imágenes de la fila del medio
    const middleReelImages = Array.from(document.querySelectorAll('.middle-reel .slot-image')).map(img => img.src);

    // Verificar si todas las imágenes en la fila del medio son iguales
    if (middleReelImages.every(src => src === middleReelImages[0])) {
        if (middleReelImages[0].includes('seven.png')) {
            // Verificar si la fila del medio tiene tres 'seven.png'
            resultText.innerText = '¡Felicidades! Ganaste el premio mayor!';
            playSound('ganar.mp3');
        } else {
            // Tres frutas iguales en la fila del medio sin 'seven.png'
            resultText.innerText = '¡Felicidades Ganaste!';
            // No reproducir sonido en este caso
        }
    } else {
        resultText.innerText = 'Inténtalo de nuevo.';
        playSound('perder.mp3');
    }
}

function playSound(filename) {
    const audio = new Audio('sounds/' + filename);
    audio.play();
}

