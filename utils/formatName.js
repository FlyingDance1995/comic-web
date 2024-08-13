export const formattedNameChaper  = (value) => {
    if (!value) return "";
    if (value === 'extra_story') return "Ngoại Truyện";
    return "Chương";
};

export const getMax250Chars = (text) => {
    if (text.length > 250) {
        return text.slice(0, 250) + '...';
    } else {
        return text;
    }
}
