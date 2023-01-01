export default {
    prettyTimespan: ( time, fromNow=true ) => {
        let startTime = fromNow ? Date.now() - time : time
        const secondSpan = Math.floor((startTime)/1000)
        const minuteSpan = Math.floor(secondSpan/60)
        const hourSpan = Math.floor(minuteSpan/60)
        const daySpan = Math.floor(hourSpan/24)
        const monthSpan = Math.floor(daySpan/30.5)
        const yearsSpan = Math.floor(monthSpan/12)

        let result = `${secondSpan} ${ minuteSpan == 1 ? 'sekund' : minuteSpan < 5 ? 'sekundy' : 'sekund' }`
        if ( minuteSpan > 0 ) 
            result = `${minuteSpan} ${ minuteSpan == 1 ? 'minuta' : minuteSpan < 5 ? 'minuty' : 'minut' }`
        if ( hourSpan > 0 ) 
            result = `${hourSpan} ${ hourSpan == 1 ? 'godzina' : hourSpan < 5 ? 'godziny' : 'godzin' }`
        if ( daySpan > 0 ) 
            result = `${daySpan} ${ daySpan == 1 ? 'dzień' : 'dni' }`
        if ( monthSpan > 0 ) 
            result = `${monthSpan} ${ monthSpan == 1 ? 'miesiąc' : monthSpan < 5 ? 'miesiące' : 'miesięcy' }`
        if ( yearsSpan > 0 )
            result = `${yearsSpan} ${ yearsSpan == 1 ? 'rok' : yearsSpan < 5 ? 'lata' : 'lat' }`

        return result
    }
}