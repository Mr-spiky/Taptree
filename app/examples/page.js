import Link from "next/link";
import Image from "next/image";

// Sample taptree examples to showcase
const exampleProfiles = [
  {
    handle: "creator",
    name: "Sarah Chen",
    bio: "Digital artist & content creator",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    links: ["Instagram", "YouTube", "Shop", "Portfolio"],
    gradient: "from-pink-500 to-rose-500",
  },
  {
    handle: "musician",
    name: "Alex Rivera",
    bio: "Indie musician | New album out now 🎵",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    links: ["Spotify", "Apple Music", "Tour Dates", "Merch"],
    gradient: "from-violet-500 to-purple-500",
  },
  {
    handle: "entrepreneur",
    name: "Jordan Lee",
    bio: "Founder @TechStartup | Speaker | Mentor",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    links: ["LinkedIn", "Newsletter", "Book a Call", "Podcast"],
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    handle: "fitness",
    name: "Maya Williams",
    bio: "Certified PT | Transform your life 💪",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    links: ["Programs", "Free Guide", "Instagram", "YouTube"],
    gradient: "from-amber-500 to-orange-500",
  },
  {
    handle: "photographer",
    name: "David Kim",
    bio: "Travel & portrait photographer 📸",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    links: ["Portfolio", "Prints", "Booking", "Presets"],
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    handle: "chef",
    name: "Emma Martinez",
    bio: "Home chef | Recipe creator | Food blogger",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    links: ["Recipes", "Cookbook", "TikTok", "Classes"],
    gradient: "from-red-500 to-pink-500",
  },
];

export default function ExamplesPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            See Taptree in action
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get inspired by how creators, entrepreneurs, and professionals use Taptree 
            to share everything they do in one simple link.
          </p>
        </div>

        {/* Examples Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {exampleProfiles.map((profile, index) => (
            <div
              key={profile.handle}
              className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient Header */}
              <div className={`h-24 bg-linear-to-r ${profile.gradient}`} />
              
              {/* Profile Info */}
              <div className="px-6 pb-6 -mt-10">
                <div className="relative w-20 h-20 mb-4">
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    width={80}
                    height={80}
                    className="rounded-full border-4 border-white shadow-md object-cover"
                  />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {profile.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  @{profile.handle}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  {profile.bio}
                </p>

                {/* Sample Links */}
                <div className="space-y-2">
                  {profile.links.map((link) => (
                    <div
                      key={link}
                      className="px-4 py-2.5 bg-gray-50 rounded-lg text-sm font-medium text-gray-700 text-center group-hover:bg-gray-100 transition-colors"
                    >
                      {link}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-linear-to-br from-emerald-600 to-teal-600 rounded-3xl p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to create yours?
          </h2>
          <p className="text-emerald-100 mb-8 max-w-lg mx-auto">
            Join thousands of creators who use Taptree to share everything they do. 
            It&apos;s free and takes less than 30 seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="px-8 py-3 bg-white text-emerald-700 font-semibold rounded-full hover:bg-emerald-50 transition-colors shadow-lg"
            >
              Get Started Free
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-3 bg-emerald-700/50 text-white font-medium rounded-full hover:bg-emerald-700/70 transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mt-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-12">
            Perfect for every creator
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🎨", title: "Artists", desc: "Showcase your portfolio and sell your work" },
              { icon: "🎵", title: "Musicians", desc: "Share your music across all platforms" },
              { icon: "📱", title: "Influencers", desc: "Connect your audience to all your content" },
              { icon: "💼", title: "Professionals", desc: "Build your personal brand online" },
            ].map((useCase) => (
              <div key={useCase.title} className="text-center p-6">
                <div className="text-4xl mb-4">{useCase.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                <p className="text-sm text-gray-600">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
