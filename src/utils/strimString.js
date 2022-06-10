export const StrimString = (string, numberOfWords) => {
    if (string && string.length >= numberOfWords) {
        return string.slice(0, numberOfWords) + "..."
    } else return string
}