import InvHexColor from "./InvHexColor";

export default function InvHexShadow(hex: string) {
    return `0 0 4em ${InvHexColor(hex) === "#000000" ? "white" : "black"}`
}