class GraphEditor {
    constructor(viewport, graph) {
        this.viewport = viewport;
        this.canvas = viewport.canvas;
        this.graph = graph;

        this.ctx = this.canvas.getContext("2d");

        this.selected = null;
        this.hovered = null;
        this.dragging = false;
        this.mouse = null;

        //event listeners
        // javascript private methods starts with hashtag
        this.#addEventListeners();
    }

    #addEventListeners() {
        // bind is important or else this in handleMouseDown / move derived methods will refer to the event on this.
        this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this))
        this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this))
        this.canvas.addEventListener("mouseup", () => this.dragging = false);
        // remove the right click context menu
        this.canvas.addEventListener("contextmenu", (evt) => evt.preventDefault());

    }

    #handleMouseDown(evt) {
        if (evt.button == 2) { // right click
            if (this.selected) {
                this.selected = null;
            } else if (this.hovered) {
                this.#removePoint(this.hovered);
            }
        }
        if (evt.button == 0) { // left click                
            if (this.hovered) {
                this.#select(this.hovered);
                this.dragging = true;
                return;
            }
            this.graph.addPoint(this.mouse);
            this.#select(this.mouse);
            this.hovered = this.mouse;
            this.selected = this.mouse;
        }
    }

    #handleMouseMove(evt) {
        this.mouse = this.viewport.getMouse(evt, true);
        this.hovered = getNearestPoint(this.mouse, this.graph.points, 20 * this.viewport.zoom); // add the threshold      
        if (this.dragging == true) {
            this.selected.x = this.mouse.x;
            this.selected.y = this.mouse.y;
        }
    }

    #select(point) {
        if (this.selected) {
            this.graph.tryAddSegment(new Segment(this.selected, point));
        }
        this.selected = point;
    }

    #removePoint(point) {
        this.graph.removePoint(point);
        this.hovered = null;
        if (this.selected == point) {
            this.selected = null;
        }
    }

    dispose() {
        this.graph.dispose();
        this.selected = null;
        this.hovered = null;
    }

    display() {
        this.graph.draw(this.ctx);
        if (this.hovered) {
            this.hovered.draw(this.ctx, { fill: true });
        }
        if (this.selected) {
            const intent = this.hovered ? this.hovered : this.mouse;
            new Segment(this.selected, intent).draw(ctx, { dash: [3, 3], color: "grey" });
            this.selected.draw(this.ctx, { outline: true });
        }
    }

}