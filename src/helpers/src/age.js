/*
The purpose of these functions are to calculate the
age of something (post, comment, etc.)
*/

const ageInYears = (birthDate) => {
    var today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// Calculate the time since a post was uploaded in miliseconds
const calculateAge = (dateOfUpload) => {
    const today = new Date();
    const postDate = new Date(dateOfUpload);
    const millisecondsDiff = Math.abs(postDate - today);
    return formatAge(millisecondsDiff);
}

const plural = (amount) => {
    return amount !== 1 ? "s" : "";
}

// Format the time since the post was uploaded (given miliseconds)
const formatAge = (milliseconds) => {
    // Calculate all the different time units
    const secondsDiff = Math.floor(milliseconds / 1000);
    const minutesDiff = Math.floor(secondsDiff / 60);
    const hoursDiff = Math.floor(minutesDiff / 60);
    const daysDiff = Math.floor(hoursDiff / 24);
    const weeksDiff = Math.floor(daysDiff / 7);
    const monthsDiff = Math.floor(weeksDiff / 4);
    const yearsDiff = Math.floor(monthsDiff / 12);

    // Return the correct time unit
    if(minutesDiff < 1) return `${secondsDiff} second${plural(secondsDiff)}`;
    if(hoursDiff < 1) return `${minutesDiff} minute${plural(minutesDiff)}`;
    if(daysDiff < 1) return `${hoursDiff} hour${plural(hoursDiff)}`;
    if(weeksDiff < 1) return `${daysDiff} day${plural(daysDiff)}`;
    if(monthsDiff < 1) return `${weeksDiff} week${plural(weeksDiff)}`;
    if(yearsDiff < 1) return `${monthsDiff} month${plural(monthsDiff)}`;
    return `${yearsDiff} years`;
}

module.exports =  {
    calculateAge,
    ageInYears
};
