export const CapitalizeFirstLetter = (string) => {
    if (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } else return string;
};
