let d = new Date('01-01-1939');
// d = d.toISOString().split('T')[0];

let now = new Date();
// now = now.toISOString().split('T')[0];

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
