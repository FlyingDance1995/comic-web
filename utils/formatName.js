export const formattedNameChaper  = (value) => {
    if (!value) return ""
    if (value == 'extra_story') return "Ngoại Truyện"
    return "Chương"
};