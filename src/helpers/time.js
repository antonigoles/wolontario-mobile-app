export default class {
    static prettyTimespan( time, fromNow=true )  {
        let startTime = fromNow ? Date.now() - time : time
        const secondSpan = Math.floor((startTime)/1000)
        const minuteSpan = Math.floor(secondSpan/60)
        const hourSpan = Math.floor(minuteSpan/60)
        const daySpan = Math.floor(hourSpan/24)
        const monthSpan = Math.floor(daySpan/30.5)
        const yearsSpan = Math.floor(monthSpan/12)

        let tsString = secondSpan.toString()
        let lastChar = Number(tsString[ tsString.length - 1 ])
        let result = `${secondSpan} ${ lastChar == 1 ? 'sekund' : lastChar < 5 ? 'sekundy' : 'sekund' }`
        if ( minuteSpan > 0 ) {
            tsString = minuteSpan.toString()
            lastChar = Number(tsString[ tsString.length - 1 ])
            result = `${minuteSpan} ${ lastChar == 1 ? 'minuta' : lastChar < 5 ? 'minuty' : 'minut' }`
        }
        if ( hourSpan > 0 ) {
            tsString = hourSpan.toString()
            lastChar = Number(tsString[ tsString.length - 1 ])
            result = `${hourSpan} ${ lastChar == 1 ? 'godzina' : lastChar < 5 ? 'godziny' : 'godzin' }`
        }
        if ( daySpan > 0 ) {
            tsString = daySpan.toString()
            lastChar = Number(tsString[ tsString.length - 1 ])
            result = `${daySpan} ${ lastChar == 1 ? 'dzień' : 'dni' }`
        }
        if ( monthSpan > 0 ) {
            tsString = monthSpan.toString()
            lastChar = Number(tsString[ tsString.length - 1 ])
            result = `${monthSpan} ${ lastChar == 1 ? 'miesiąc' : lastChar < 5 ? 'miesiące' : 'miesięcy' }`
        }
        if ( yearsSpan > 0 ) {
            tsString = yearsSpan.toString()
            lastChar = Number(tsString[ tsString.length - 1 ])
            result = `${yearsSpan} ${ lastChar == 1 ? 'rok' : lastChar < 5 ? 'lata' : 'lat' }`
        }

        return result
    }

    // static prettyHowLongAgo( time ) {
    //     const now = Date.now();
    //     const diffrence = Date.now() - now;
    //     const minute = 1000*60;
    //     const hour = minute * 60;
    //     const day = hour * 24;
    //     const week = day * 7;
    //     const month = day * 30.5;
    //     const year = month * 12;

    //     if ( diffrence <= minute ) {

    //     }
    // }

    static fillZero( num ) {
        let casted = num.toString()
        return casted.length == 1 ? '0'+casted : casted; 
    }
    
    static dateToString(date) {
        let dd = this.fillZero(date.getDate());
        let mm = this.fillZero(date.getMonth()+1);
        let yyyy = date.getFullYear();
        return `${dd}/${mm}/${yyyy}`
    }
}