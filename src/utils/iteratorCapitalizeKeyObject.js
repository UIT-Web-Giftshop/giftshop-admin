export const CapitalizeKeyObject = (object) => {
    console.log(object)
    var result = {};
    if (object) {
        for (const key in object) {
            var newKey = capitalizeFirstLetter(key);
            result[newKey] = object[key];
        }
        return result;
    }
    return object;
};

function capitalizeFirstLetter(string) {
    if (string) return string.charAt(0).toUpperCase() + string.slice(1);
    else return string;
}
