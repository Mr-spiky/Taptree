// Server Component - no "use client" needed!
// URL normalization happens at render time, no interactivity required

export default function LinkButton({ href, children, index }) {
  // Ensure URL has protocol (computed once at render)
  const normalizedUrl = href.startsWith('http://') || href.startsWith('https://') 
    ? href 
    : `https://${href}`;

  return (
    <a
      href={normalizedUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="link-button bg-linear-to-r from-violet-500 to-purple-600 text-white py-3.5 px-6 rounded-xl text-center font-medium hover:from-violet-600 hover:to-purple-700 animate-fade-in-up animate-hidden"
      style={{ animationDelay: `${(index + 3) * 100}ms`, animationFillMode: 'forwards' }}
    >
      {children}
    </a>
  );
}
