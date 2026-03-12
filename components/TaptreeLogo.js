export default function TaptreeLogo({ size = 40, showText = false, textClass = "" }) {
    // The new logo image already includes the wordmark "Taptree".
    // We render it directly, using `size` as its height.
    return (
        <span className="inline-flex items-center">
            <img
                src="/logo.png"
                alt="Taptree"
                style={{ height: size, width: 'auto', objectFit: 'contain' }}
            />
        </span>
    );
}
