import CookieUsage from "./CookieUsage";

export default function Footer() {
    return (
        <>
            <p><a href='github.com/mxtt-mmxix/mmccalldev' className='text-decoration-none'><i className='bi-github' /> View on GitHub</a></p>
            <CookieUsage />
            <p>Copyright &copy; 2022 Matthew McCall.</p>
        </>
    )
}