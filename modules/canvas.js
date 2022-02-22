class Canvas {
    constructor(id, parent, width, height) {
        this.id = id;
        this.parent = parent;
        this.width = width;
        this.height = height;

        this.ctx = null;
    }

    create() {
        if (this.ctx === null) {
            // Create canvas and context
            let divWrapper = document.createElement('div');
            let canvasElem = document.createElement('canvas');

            this.parent.appendChild(divWrapper);
            divWrapper.appendChild(canvasElem);

            divWrapper.id = this.id;
            canvasElem.width = this.width;
            canvasElem.height = this.height;

            this.ctx = canvasElem.getContext('2d');

            console.log(`Created context in <div> ${this.id} with width ${this.width} and height ${this.height}.`)
        }
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
}


export { Canvas };