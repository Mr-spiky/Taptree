// Server Component - most of the page is static!
import Image from "next/image";
import HeroForm, { BottomCTA } from "@/components/HeroForm";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen px-6 md:px-12 lg:px-20 pt-24 pb-12 bg-emerald-950 overflow-hidden">
        {/* Background Image with blur */}
        <Image
          src="/img/bg.jpg"
          alt=""
          fill
          priority
          quality={85}
          className="object-cover object-center blur-sm opacity-80"
          style={{ zIndex: 0 }}
          sizes="100vw"
          aria-hidden="true"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-emerald-950/40" style={{ zIndex: 1 }} aria-hidden="true" />
          
        
        <div className="relative max-w-7xl mx-auto min-h-[calc(100vh-6rem)] flex flex-col lg:flex-row items-center gap-12 lg:gap-16" style={{ zIndex: 2 }}>
          
          {/* Left Content */}
          <div className="flex-1  flex flex-col justify-center text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl  lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight">
              Everything you are.
              <span className="block mt-2 text-amber-300">In one, simple link.</span>
            </h1>
            
            <p className="mt-6 text-lg sm:text-xl text-emerald-100/80 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Join millions of creators sharing their content, social profiles, and more — all from a single, customizable link in bio.
            </p>

            {/* Client Component - only interactive part */}
            <HeroForm />

            {/* Social Proof - Static */}
            <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-emerald-100/70">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-medium">Trusted by 10M+ creators</span>
              </div>
              <div className="hidden sm:block w-px h-5 bg-emerald-600" aria-hidden="true" />
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium">Setup in 30 seconds</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="flex-1 flex justify-center items-center w-full max-w-lg lg:max-w-none">
            <div className="relative">
              {/* Decorative glow */}
              <div className="absolute -inset-4 bg-linear-to-r from-amber-400/20 to-emerald-400/20 rounded-3xl blur-2xl" aria-hidden="true" />
              <Image
                src="/img/home.jpg"
                alt="Taptree profile example showing a creator's link in bio page"
                width={500}
                height={600}
                className="relative rounded-3xl shadow-2xl shadow-black/30"
                priority
                placeholder="empty"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-emerald-50 py-20 px-6 md:px-12 lg:px-20  scroll-mt-20">
        <div className=" max-w-7xl mx-auto">
          <div className=" text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 ">
              One link to rule them all
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Share everything you create, curate, and sell from your Instagram, TikTok, Twitter, and other bios.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-white border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Unlimited Links</h3>
              <p className="text-gray-600">Add as many links as you want. Social profiles, websites, videos, music — everything in one place.</p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-white border border-amber-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Custom Themes</h3>
              <p className="text-gray-600">Make it yours with beautiful themes, custom colors, fonts, and backgrounds that match your brand.</p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics</h3>
              <p className="text-gray-600">Track clicks, views, and engagement. Understand your audience and grow your presence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 px-6 md:px-12 lg:px-20 scroll-mt-20 overflow-hidden">
        {/* Background Image */}
        <Image
          src="/img/bg2.jpg"
          alt=""
          fill
          quality={85}
          className="object-cover object-center blur-sm opacity-90"
          style={{ zIndex: 0 }}
          sizes="100vw"
          aria-hidden="true"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-emerald-950/50" style={{ zIndex: 1 }} aria-hidden="true" />
        
        <div className="relative max-w-5xl mx-auto" style={{ zIndex: 2 }}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Why Taptree?
              </h2>
              <p className="text-emerald-100/90 text-lg mb-6">
                In a world where your online presence is scattered across dozens of platforms, 
                Taptree brings everything together. One link, infinite possibilities.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white/90">Built for creators, by creators</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white/90">Lightning fast and mobile-optimized</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white/90">Free forever with no hidden fees</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-white/10 rounded-3xl -rotate-3"></div>
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20">
                <div className="text-center">
                  <div className="text-5xl font-bold text-amber-300 mb-2">10M+</div>
                  <div className="text-white/80">Creators trust Taptree</div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="text-center p-4 bg-white/10 rounded-xl">
                    <div className="text-2xl font-bold text-white">50M+</div>
                    <div className="text-sm text-white/60">Links created</div>
                  </div>
                  <div className="text-center p-4 bg-white/10 rounded-xl">
                    <div className="text-2xl font-bold text-white">1B+</div>
                    <div className="text-sm text-white/60">Monthly clicks</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-emerald-50 px-6 md:px-12 lg:px-20  scroll-mt-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Get in touch
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
          
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <a 
              href="mailto:hello@taptree.com" 
              className="flex flex-col items-center p-6 bg-white rounded-2xl hover:bg-emerald-100 transition-colors group shadow-sm hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-3 group-hover:bg-emerald-200 transition-colors">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-medium text-gray-900">Email</span>
              <span className="text-sm text-gray-500">hello@taptree.com</span>
            </a>
            
            <a 
              href="https://twitter.com/taptree" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-white rounded-2xl hover:bg-emerald-100 transition-colors group shadow-sm hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <span className="font-medium text-gray-900">Twitter</span>
              <span className="text-sm text-gray-500">@taptree</span>
            </a>
            
            <a 
              href="https://github.com/taptree" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-white rounded-2xl hover:bg-emerald-100 transition-colors group shadow-sm hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-3 group-hover:bg-gray-300 transition-colors">
                <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </div>
              <span className="font-medium text-gray-900">GitHub</span>
              <span className="text-sm text-gray-500">Open Source</span>
            </a>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-linear-to-br from-emerald-900 to-teal-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to simplify your online presence?
          </h2>
          <p className="text-emerald-100/80 text-lg mb-8">
            Join millions of creators and businesses using Taptree to share what matters most.
          </p>
          {/* Client Component - minimal JS for scroll behavior */}
          <BottomCTA />
        </div>
      </section>
    </main>
  );
}
