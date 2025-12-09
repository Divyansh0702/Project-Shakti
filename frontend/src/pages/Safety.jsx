export default function Safety() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-700 via-fuchsia-800 to-indigo-900 text-white">
      <section className="relative max-w-7xl mx-auto px-6 md:px-16 py-16">
        <div className="absolute -z-10 inset-0 overflow-hidden">
          <div className="absolute left-0 top-0 w-72 h-72 md:w-96 md:h-96 bg-pink-400/30 rounded-full blur-3xl" />
          <div className="absolute right-0 top-24 w-80 h-80 md:w-[460px] md:h-[460px] bg-indigo-400/30 rounded-full blur-3xl" />
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[520px] h-[520px] bg-fuchsia-400/25 rounded-full blur-3xl" />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-violet-300">Safety For All</h1>
          <p className="mt-4 text-xl md:text-2xl text-white/85 max-w-3xl mx-auto">Your safety is our top priority. At Shakti, every feature, policy, and process is designed with one mission—to create a travel experience where every woman feels protected, supported, and confident on the road.
            We constantly upgrade our safety ecosystem to ensure every Shakti ride is smooth, secure, and stress-free. From onboarding drivers to monitoring trips, safety is woven into every layer of our platform.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
            <h2 className="text-2xl font-semibold mb-2">🔐 Background-Verified Drivers</h2>
            <p className="text-white/85">Your journey begins with trust.
              All Shakti captains go through a strict verification protocol that includes:

              • Government ID authentication

              • Driving license validation

              • Police/background verification

              • Profile screening & in-person interviews

              Only after clearing every step can a driver officially join the Shakti fleet.</p>
          </div>
          <div className="rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
            <h2 className="text-2xl font-semibold mb-2">👩‍🦰 Women-First Fleet</h2>
            <p className="text-white/85">Our driver network is built to empower and protect.
              Shakti encourages and trains women drivers, creating a comfortable environment for female riders who prefer travelling with women captains.

              • Community-led driving and safety training

              • Soft-skills & communication guidance

              • Continuous support and performance improvement

              • A respectful ecosystem where drivers feel valued

              This ensures riders meet drivers who understand their comfort and safety needs.</p>
          </div>
          <div className="rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
            <h2 className="text-2xl font-semibold mb-2">⭐ Rating & Feedback</h2>
            <p className="text-white/85">Your voice shapes Shakti.
              Every trip ends with a simple rating and feedback mechanism that helps us:

              • Monitor driver performance

              • Improve our safety standards

              • Resolve issues quickly

              • Reward consistently high-rated captains

              We actively review all feedback to make your next ride better.</p>
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/20">
            <h3 className="text-3xl font-bold mb-3">Travel Smart</h3>
            <ul className="space-y-2 text-white/85">
              Here are simple but essential practices to enhance your ride safety:

              ✔ Verify Driver Details

              Match the driver’s name, vehicle number, and profile photo with the app before boarding.

              ✔ Share Live Location

              Use our in-app Share Trip feature to update a trusted contact about your ride in real time.

              ✔ Protect Your Privacy

              Use in-app chat and call features to communicate securely without revealing your personal number.

              ✔ Immediate Help Support

              Found something uncomfortable or unsafe?
              Report instantly through our Help & Support section—our safety team responds quickly and takes necessary action.
            </ul>
          </div>
          <div className="rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/20">
            <h3 className="text-3xl font-bold mb-3">🛡 Our Promise</h3>
            <p className="text-white/85">With advanced safety tech, trained drivers, and a committed support system, Shakti aims to build the safest mobility network for women in India.
              Every ride with us is a step towards safer cities and empowered travel.</p>
            <div className="mt-4">
              <a href="/customer/auth" className="inline-flex items-center px-6 py-3 rounded-xl bg-black text-white font-semibold hover:shadow-sm hover:shadow-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300 ">Book a safe ride</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
