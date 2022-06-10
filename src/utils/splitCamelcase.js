import {CapitalizeFirstLetter} from './capitalizeString'

export const SplitCamelCase = (string) => {
    if (string) {
        return CapitalizeFirstLetter(string.replace(/([a-z])([A-Z])/g, "$1 $2"));
    } else return string;
};
