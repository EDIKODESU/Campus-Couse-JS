let d = new Date('01-01-1939');

let now = new Date();

exports.calculateTime = () =>{
    let result = {};
    result.years = () => {
        return now.getFullYear() - d.getFullYear();
    }
    result.months = () => {
        return now.getMonth() - d.getMonth();
    }
    result.days = () => {
        return now.getDate() - d.getDate();
    }
    return result;
    
} 
