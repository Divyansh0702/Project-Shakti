export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-700 via-fuchsia-800 to-indigo-900 text-white font-poppins">
      <section className="relative max-w-7xl mx-auto px-6 md:px-16 py-16">
        <div className="absolute -z-10 inset-0 overflow-hidden">
          <div className="absolute left-0 top-0 w-72 h-72 md:w-96 md:h-96 bg-pink-400/30 rounded-full blur-3xl" />
          <div className="absolute right-0 top-24 w-80 h-80 md:w-[460px] md:h-[460px] bg-indigo-400/30 rounded-full blur-3xl" />
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[520px] h-[520px] bg-fuchsia-400/25 rounded-full blur-3xl" />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-violet-300 font-merriweather">About Shakti</h1>
          <p className="mt-4 text-xl md:text-2xl text-white/85 max-w-3xl mx-auto font-poppins">Shakti is more than a ride service — it is a movement built around safety, trust, and dignity for women.
            Our mission is to redefine urban mobility by creating a space where women can travel confidently and drivers can work with respect, stability, and pride.
            We believe every woman deserves a journey that feels safe, supportive, and empowering.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
            <h2 className="text-2xl font-semibold mb-2 text-yellow-300">Women-Led Network</h2>
            <p className="text-white/85">Shakti operates through a strong and growing network of trained and verified women drivers.<br />
              Each captain goes through background checks, orientation sessions, and safety-focused training to ensure that every ride is smooth, professional, and secure. <br />

              • Fully verified drivers<br />

              • Friendly, respectful, and trained in customer care<br />

              • Focused on punctuality and comfort<br /><br />

              This women-driven ecosystem enhances trust while building opportunities for financial independence.</p>
          </div>
          <div className="glass rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
            <h2 className="text-2xl font-semibold mb-2 text-yellow-300">Safety Built-In</h2>
            <p className="text-white/85">Safety is not a feature — it’s the foundation of Shakti.
              We combine technology, verification systems, and real-time tracking to ensure every ride meets the highest standards of care.<br /><br />

              Key safety elements include:<br />

              • Live ride tracking with trusted contacts<br />

              • Verified profiles for drivers and riders<br />

              • SOS alerts and instant support<br />

              • Privacy-focused ride experience<br />

              • Continuous monitoring of service quality<br /><br />

              Every decision we make places safety above everything else.</p>
          </div>
          <div className="glass rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
            <h2 className="text-2xl font-semibold mb-2 text-yellow-300">Community Impact</h2>
            <p className="text-white/85">Shakti is committed to creating real change in society.
              By providing flexible work and a reliable income source, we help women become financially independent while contributing to safer transportation for others.<br /><br />

              Our impact:<br />

              • Generating employment for women<br />

              • Enabling mobility for working professionals, students, and homemakers<br />

              • Supporting suburban and urban communities<br />

              • Promoting gender-inclusive mobility solutions<br /><br />

              We are building a platform that grows with the community, for the community.</p>
          </div>
        </div>

        {/* <div className="mt-10 grid sm:grid-cols-3 gap-4">
          <div className="rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/20 text-center">
            <div className="text-4xl font-extrabold">10k+</div>
            <div className="text-white/80">Rides completed</div>
          </div>
          <div className="rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/20 text-center">
            <div className="text-4xl font-extrabold">2k+</div>
            <div className="text-white/80">Verified drivers</div>
          </div>
          <div className="rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/20 text-center">
            <div className="text-4xl font-extrabold">4.9</div>
            <div className="text-white/80">Average rating</div>
          </div>
        </div> */}

        <div className="mt-10 gap-6 grid md:grid-cols-2">
          <div className="rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/20">
            <h3 className="text-4xl font-bold mb-3 text-2xl font-merriweather">Our Values</h3>
            <ul className="space-y-2 text-white/85 text-xl">
              We stand on principles that guide every ride, every interaction, and every decision:<br />

              <li className="text-xl font-bold text-yellow-300">⭐ Safety Over Speed</li> 

              Your well-being comes before everything else. Every route, every feature, and every service is designed with your safety in mind.

              <li className="text-xl font-bold text-yellow-300">⭐ Respect & Inclusion</li>

              Every rider and driver deserves equal respect, compassion, and fairness. Shakti is a space where dignity is valued above all.

              <li className="text-xl font-bold text-yellow-300">⭐ Transparent Communication</li>

              From pricing to policies, we believe in clarity. No hidden charges. No confusion. Just honest and open communication.

              <li className="text-xl font-bold text-yellow-300">⭐ Continuous Improvement</li>

              We evolve with your needs. As we grow, we constantly refine our technology, training, and services to deliver a seamless, world-class experience.
            </ul>
          </div>
          <div className="rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/20">
            <h3 className="text-3xl font-bold mb-3 font-merriweather">The Future</h3>
            <p className="text-white/85 text-xl">Shakti envisions a future where women can<br /> travel anytime, anywhere, with <br />complete peace of mind.<br /><br />
              We aim to expand our driver community, enhance safety technology, and build a trusted transportation ecosystem led by women, for women.<br /><br />

              Together, we’re creating safer roads, stronger communities, and more empowered lives.</p>
            <div className="mt-4">
              <a href="/customer/auth" className="inline-flex items-center px-6 py-3 rounded-xl bg-black text-white font-semibold hover:shadow-sm hover:shadow-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300 ">Get a ride</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

