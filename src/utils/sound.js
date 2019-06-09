
// If we have sounds we can use this class in this file to make and run them. If not, we can delete this file.

class Sound{
    constructor(source){
        this.sound = document.createElement('audio');
        this.sound.src = source;
        this.sound.setAttribute('preload', 'auto');
        this.sound.setAttribute('controls', 'none');
        this.sound.style.display = 'none';
        document.body.appendChild(this.sound);
    }
    play() {
        this.sound.play().catch(error => {});
    }
    stop() {
        this.sound.pause().catch(error => {});
    }
}