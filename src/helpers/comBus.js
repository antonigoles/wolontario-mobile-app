class comBusMessage {
    constructor( from, to, content ) {
        this.from = from;
        this.to = to;
        this.content = content
    }
}

class communicationBus {
    #bus = []
    constructor() {
        this.#bus = []
    }

    pushMessage( msg ) {
        this.#bus.push( msg )
    }

    receiveMessages( to, from ) {
        for ( let i = this.#bus.length-1; i>=0; i-- ) {
            if ( this.#bus[i].from == from && this.#bus[i].to == to ) { 
                let respo = this.#bus[i];
                this.#bus = [ ...this.#bus.filter( (_,idx) => idx != i ) ]
                return respo;
            }
        }
        return undefined;
    }

}

export { communicationBus };
export { comBusMessage };