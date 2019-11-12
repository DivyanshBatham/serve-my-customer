export default (curTheme, newTheme) => {
    let combinedTheme = { ...curTheme };
    for (var key in newTheme) {
        if (newTheme.hasOwnProperty(key)) {
            combinedTheme[key] = {
                ...curTheme[key],
                ...newTheme[key],
            }
        }
    }
    return combinedTheme;
}