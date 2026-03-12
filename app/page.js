import HeroForm, { BottomCTA } from "@/components/HeroForm";
import ScrollReveal from "@/components/ScrollReveal";
import TypeWriter from "@/components/TypeWriter";
import AnimatedCounter from "@/components/AnimatedCounter";
import Marquee from "@/components/Marquee";

export default function Home() {
  return (
    <main className="overflow-hidden relative">
      {/* ============ HERO ============ */}
      <section className="relative px-6 md:px-12 lg:px-16 pt-16 pb-20">
        {/* Abstract/Absolute Images */}
        <div className="absolute top-20 left-[-40px] md:left-10 lg:left-24 z-0 animate-hero-float">
          <img src="/img/1.png" alt="" className="w-48 h-auto md:w-64 lg:w-80 object-contain drop-shadow-xl -rotate-6" />
        </div>
        <div className="absolute top-32 right-[-40px] md:right-10 lg:right-24 z-0 animate-hero-float" style={{ animationDelay: '1s' }}>
          <img src="/img/11.png" alt="" className="w-56 h-auto md:w-72 lg:w-96 object-contain drop-shadow-xl rotate-3" />
        </div>

        {/* Background Grid */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-block brutal-badge mb-8 animate-fade-in bg-brutal-yellow text-brutal-black border-[3px] shadow-[4px_4px_0px_0px_#1a1a1a]">
            🔗 #1 LINK IN BIO PLATFORM
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-brutal-black mb-6 animate-fade-in-up">
            Everything you are.
            <br />
            <span className="relative inline-block">
              In one
              <span className="relative inline-block mx-3 px-4 py-1 bg-brutal-yellow border-[4px] border-brutal-border shadow-[5px_5px_0px_0px_#1a1a1a] rounded-lg -rotate-2">
                simple
              </span>
              link.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-brutal-gray max-w-2xl mx-auto mb-8 animate-fade-in animate-delay-200">
            Share your content, social profiles, and more — all from a single,
            <br className="hidden md:block" /> beautiful page built for{" "}
            <TypeWriter words={["creators", "artists", "developers", "musicians", "writers"]} />
          </p>

          {/* CTA */}
          <div className="flex justify-center mt-8 animate-fade-in-up animate-delay-300">
            <HeroForm />
          </div>

          {/* Social proof */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm font-bold text-brutal-gray animate-fade-in animate-delay-400">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-brutal-green rounded-full"></span>
              Free forever
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-brutal-blue rounded-full"></span>
              No credit card
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-brutal-purple rounded-full"></span>
              Setup in 30 seconds
            </span>
          </div>

          {/* Bottom Image */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-16 w-full flex justify-center animate-fade-in animate-delay-500">
            <img src="/img/4.png" alt="10,000+ links created today" className="h-12 object-contain drop-shadow-sm" />
          </div>
        </div>
      </section>

      {/* ============ MARQUEE ============ */}
      <Marquee texts={["SHARE", "CONNECT", "GROW", "CREATE", "BUILD", "SHIP"]} />

      {/* ============ FEATURES ============ */}
      <section id="features" className="relative px-6 md:px-12 lg:px-16 py-20 overflow-hidden">
        {/* Abstract/Absolute Images */}
        <div className="absolute top-32 left-[-20px] md:left-10 lg:left-32 z-0 animate-hero-float opacity-90 hidden md:block">
          <img src="/img/2.png" alt="New Feature Badge" className="w-24 h-auto md:w-32 object-contain drop-shadow-lg -rotate-12" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <ScrollReveal>
              <span className="brutal-badge mb-4 inline-block">✨ Features</span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-brutal-black mt-4">
                Everything you need
              </h2>
              <p className="text-brutal-gray mt-3 max-w-lg mx-auto">
                Powerful tools to make your online presence stand out.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {[
              {
                strip: "strip-yellow",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                ),
                title: "Unlimited Links",
                desc: "Add as many links as you want. No limits, no paywalls, no restrictions.",
              },
              {
                strip: "strip-blue",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
                ),
                title: "Custom Themes",
                desc: "Make your page truly yours with customizable colors, layouts, and styles.",
              },
              {
                strip: "strip-green",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                ),
                title: "Analytics",
                desc: "Track every click and view. Know what your audience loves most.",
              },
            ].map((feature, i) => (
              <ScrollReveal key={i} delay={i * 150}>
                <div className="brutal-card-static overflow-hidden h-full hover-bg-shift group">
                  <div className={`${feature.strip} h-2 rounded-t-[9px]`} />
                  <div className="p-6">
                    <div className="w-12 h-12 bg-brutal-bg border-2 border-brutal-border rounded-lg flex items-center justify-center mb-4 shadow-[2px_2px_0px_0px_#1a1a1a] transition-transform group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-brutal-white">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-black text-brutal-black mb-2">{feature.title}</h3>
                    <p className="text-sm text-brutal-gray leading-relaxed group-hover:text-brutal-black/80">{feature.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ABOUT / STATS ============ */}
      <section id="about" className="relative px-6 md:px-12 lg:px-16 py-20 bg-white overflow-hidden" style={{ borderTopWidth: "3px", borderTopColor: "#1a1a1a", borderTopStyle: "solid", borderBottomWidth: "3px", borderBottomColor: "#1a1a1a", borderBottomStyle: "solid" }}>
        {/* Abstract/Absolute Images */}
        <div className="absolute top-[30%] left-[-20px] md:left-10 lg:left-20 z-0 animate-hero-float opacity-80 hidden md:block" style={{ animationDelay: '0.5s' }}>
          <img src="/img/6.png" alt="Lightning Bolt" className="w-20 h-auto md:w-32 object-contain drop-shadow-md -rotate-12" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <ScrollReveal direction="left">
              <div>
                <span className="brutal-badge mb-4 inline-block">🚀 Why Taptree</span>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-brutal-black mt-4 mb-6">
                  Built for modern creators
                </h2>
                <div className="space-y-4">
                  {["One link for all your content", "Real-time click analytics", "Lightning-fast load times", "Works on every platform"].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 group">
                      <div className="w-6 h-6 bg-brutal-green border-2 border-brutal-border rounded flex items-center justify-center flex-shrink-0 mt-0.5 shadow-[2px_2px_0px_0px_#1a1a1a] transition-all group-hover:scale-125 group-hover:rotate-12 group-hover:bg-brutal-yellow">
                        <svg className="w-3.5 h-3.5 group-hover:text-brutal-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-brutal-black font-medium group-hover:font-black transition-all">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Right — Stats */}
            <ScrollReveal direction="right">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: 10, suffix: "M+", label: "Creators", color: "strip-yellow" },
                  { value: 1, suffix: "B+", label: "Monthly Clicks", color: "strip-blue" },
                  { value: 50, suffix: "+", label: "Countries", color: "strip-green" },
                  { value: 99, suffix: "%", label: "Uptime", color: "strip-purple" },
                ].map((stat, i) => (
                  <div key={i} className="brutal-card-static overflow-hidden text-center hover-wobble">
                    <div className={`${stat.color} h-2 rounded-t-[9px]`} />
                    <div className="p-5">
                      <div className="text-3xl font-black text-brutal-black">
                        <AnimatedCounter target={stat.value} />{stat.suffix}
                      </div>
                      <div className="label-upper mt-1.5">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section id="contact" className="relative px-6 md:px-12 lg:px-16 py-20 overflow-hidden">
        {/* Abstract/Absolute Images */}
        <div className="absolute top-16 right-[-10px] md:right-16 lg:right-32 z-0 animate-hero-float opacity-90 hidden md:block" style={{ animationDelay: '0.8s' }}>
          <img src="/img/9.png" alt="Help Chat Bubble" className="w-40 h-auto md:w-56 object-contain drop-shadow-lg -rotate-6" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ScrollReveal>
            <span className="brutal-badge mb-4 inline-block">📬 Get in Touch</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-brutal-black mt-4 mb-10">
              We&apos;d love to hear from you
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "✉️", title: "Email", info: "hello@taptree.io", strip: "strip-yellow" },
              { icon: "🐦", title: "Twitter", info: "@taptree", strip: "strip-blue" },
              { icon: "💻", title: "GitHub", info: "taptree", strip: "strip-purple" },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 120}>
                <div className="brutal-card-static overflow-hidden hover-bg-shift group cursor-pointer">
                  <div className={`${item.strip} h-2 rounded-t-[9px]`} />
                  <div className="p-6 text-center">
                    <div className="text-3xl mb-3 transition-transform group-hover:scale-150 group-hover:-rotate-12 group-hover:translate-y-[-10px] inline-block">{item.icon}</div>
                    <h3 className="font-black text-brutal-black text-lg mb-1">{item.title}</h3>
                    <p className="text-sm text-brutal-gray font-medium group-hover:text-brutal-black/80">{item.info}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BOTTOM CTA ============ */}
      <section className="bg-brutal-yellow py-16 px-6 md:px-12 lg:px-16" style={{ borderTopWidth: "3px", borderTopColor: "#1a1a1a", borderTopStyle: "solid" }}>
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-brutal-black mb-4">
              Ready to get started?
            </h2>
            <p className="text-brutal-black/70 font-medium mb-8 max-w-md mx-auto">
              Create your free Taptree page in seconds. No credit card required.
            </p>
            <BottomCTA />
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
