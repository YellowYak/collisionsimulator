class StatusBoard {
    constructor(parent) {
        this.parent = parent;

        this.table = null;
        this.tbody = null;
    }

    create() {
        if (this.table === null) {
            // Create table
            this.table = document.createElement('table');
            this.parent.appendChild(this.table);

            const thead = document.createElement('thead');
            this.table.appendChild(thead);

            const theadTr = document.createElement('tr');
            thead.appendChild(theadTr);

            let th = document.createElement('th');
            th.innerText = 'Particle';
            theadTr.appendChild(th);

            th = document.createElement('th');
            th.innerText = 'Mass';
            theadTr.appendChild(th);

            th = document.createElement('th');
            th.innerText = 'Position';
            theadTr.appendChild(th);

            th = document.createElement('th');
            th.innerText = 'Speed';
            theadTr.appendChild(th);

            th = document.createElement('th');
            th.innerText = 'Direction';
            theadTr.appendChild(th);

            this.tbody = document.createElement('tbody');
            this.table.appendChild(this.tbody);
        }
    }
    
    update(particles) {
        this.tbody.replaceChildren();

        particles.forEach(p => {
            const tr = document.createElement('tr');
            this.tbody.appendChild(tr);

            let td = document.createElement('td');
            td.innerText = p.name;
            tr.appendChild(td);

            td = document.createElement('td');
            td.innerText = p.mass;
            tr.appendChild(td);

            td = document.createElement('td');
            td.innerText = `(${p.x.toFixed(0)}, ${p.y.toFixed(0)})`;
            tr.appendChild(td);

            td = document.createElement('td');
            td.innerText = p.speed.toFixed(1);
            tr.appendChild(td);

            td = document.createElement('td');
            td.textContent = `${p.direction.toFixed(0)}°`;
            tr.appendChild(td);
        });
    }
}


export { StatusBoard };