let d = new Date('01-01-1939');
let now = new Date();

exports.calculateTime = () => {
    let result = [];
    now = new Date(Math.round((now.getTime() - d.getTime()) / 7 + d.getTime()));
    result.push(now.getFullYear() - d.getFullYear());
    result.push(now.getMonth() - d.getMonth());
    result.push(now.getDate() - d.getDate());
    return result;
}
