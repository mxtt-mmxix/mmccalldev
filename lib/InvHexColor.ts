function hex_to_rgb(hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? { 
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16) 
    } : null;
}

export default function hex_inverse_bw(hex: string) {
    const rgb = hex_to_rgb(hex);
    const luminance = (0.2126*rgb!.r + 0.7152*rgb!.g + 0.0722*rgb!.b);
    return (luminance < 140) ? "#ffffff": "#000000";
}