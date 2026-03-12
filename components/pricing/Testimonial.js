import { testimonial } from "./data";

export default function Testimonial() {
  return (
    <section className="bg-linear-to-br from-violet-700 to-violet-900 py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {/* Big quote */}
        <svg
          className="mx-auto mb-6 h-10 w-10 text-violet-300/50"
          fill="currentColor"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>

        <blockquote>
          <p className="text-2xl font-bold leading-relaxed text-white sm:text-3xl lg:text-4xl">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
        </blockquote>

        <div className="mt-8 flex items-center justify-center gap-4">
          {/* Avatar placeholder */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-500/40 text-lg font-bold text-white">
            {testimonial.author.charAt(0)}
          </div>
          <div className="text-left">
            <p className="font-semibold text-white">{testimonial.author}</p>
            <p className="text-sm text-violet-200">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
