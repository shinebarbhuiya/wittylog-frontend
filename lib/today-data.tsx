import React from 'react';

const formatDate = (date : Date) => {
    const options = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);

    // Replace day with ordinal suffix
    return formattedDate.replace(/(\d)(?=(\d{2})+\b)/g, '$1').replace(/\b(\d{1,2})\b/g, (_, day) => {
        const suffixes = ['th', 'st', 'nd', 'rd'];
        const v = day % 100;
        return `${day}${suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]}`;
    });
};


const TodayDate = () => {
    const currentDate = new Date();

    return (
        <div>
            <p>{formatDate(currentDate)}</p>
        </div>
    );
};

export default TodayDate;
