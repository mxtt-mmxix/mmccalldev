import InvHexColor from "./InvHexColor";

export default function InvHexShadow(hex: string) {
    return `0 0 2em ${InvHexColor(hex) === "#000000" ? "white" : "black"}`
}