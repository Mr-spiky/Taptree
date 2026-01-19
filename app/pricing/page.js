import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Simple, transparent pricing
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Free forever. Really.
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Taptree is completely free to use. Create unlimited links, 
            customize your page, and share with the world — no credit card required.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* Free Plan */}
          <div className="bg-white rounded-3xl shadow-sm border-2 border-emerald-500 p-8 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="px-4 py-1.5 bg-emerald-500 text-white text-sm font-semibold rounded-full">
                Most Popular
              </span>
            </div>
            
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Free</h2>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold text-gray-900">$0</span>
                <span className="text-gray-500">/forever</span>
              </div>
              <p className="text-gray-600 mt-2">Everything you need to get started</p>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "Unlimited links",
                "Custom handle (taptree.com/you)",
                "Mobile-optimized page",
                "Basic analytics (coming soon)",
                "Profile customization",
                "Social media icons",
                "Email support",
              ].map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/signup"
              className="block w-full py-3 px-6 text-center text-white bg-emerald-600 hover:bg-emerald-700 font-semibold rounded-xl transition-colors"
            >
              Get Started Free
            </Link>
          </div>

          {/* Pro Plan (Coming Soon) */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 relative opacity-75">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="px-4 py-1.5 bg-gray-200 text-gray-600 text-sm font-semibold rounded-full">
                Coming Soon
              </span>
            </div>
            
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Pro</h2>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold text-gray-400">$5</span>
                <span className="text-gray-400">/month</span>
              </div>
              <p className="text-gray-500 mt-2">For power users and creators</p>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "Everything in Free",
                "Custom domain support",
                "Advanced analytics",
                "Remove Taptree branding",
                "Priority support",
                "Custom themes",
                "Scheduled links",
                "Link thumbnails",
              ].map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-500">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              disabled
              className="block w-full py-3 px-6 text-center text-gray-500 bg-gray-100 font-semibold rounded-xl cursor-not-allowed"
            >
              Coming Soon
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Frequently asked questions
          </h2>
          
          <div className="space-y-4">
            {[
              {
                q: "Is Taptree really free?",
                a: "Yes! Taptree is completely free to use. You can create unlimited links, customize your page, and share it with your audience without paying anything.",
              },
              {
                q: "Do I need a credit card to sign up?",
                a: "No credit card required. Just sign up with your email and you're ready to go.",
              },
              {
                q: "Can I use my own domain?",
                a: "Custom domains will be available with our Pro plan, which is coming soon. For now, you get a free taptree.com/yourhandle URL.",
              },
              {
                q: "How many links can I add?",
                a: "Unlimited! Add as many links as you want to your Taptree page.",
              },
              {
                q: "Can I customize my page?",
                a: "Yes, you can add a profile picture, bio, and customize your links. More customization options are coming with the Pro plan.",
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="font-medium text-gray-900">{faq.q}</span>
                  <svg
                    className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-4 text-gray-600">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Ready to get started?
          </h3>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full transition-colors"
          >
            Create Your Free Taptree
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
