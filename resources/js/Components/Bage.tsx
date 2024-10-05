

export default function Bage({ text }: { text:string }) {
    return (
        <span
            className="/block bg-amber-200 text-amber-700 text-sm px-1 rounded-md shadow-md mx-1"
        >
            <small>{text}</small>
        </span>
    );
}
