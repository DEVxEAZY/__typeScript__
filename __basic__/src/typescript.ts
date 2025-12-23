interface ShowInfoOptions {
    displayDay?: boolean;
    displayMonth?: boolean;
    displayYear?: boolean;
}


function showInfo(date: Date, options: ShowInfoOptions = {}) {
    
}

showInfo(new Date(), {displayMonth: true, displayYear: true, displayDay: true});

