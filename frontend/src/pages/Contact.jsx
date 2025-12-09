export default function Contact() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-700 via-fuchsia-800 to-indigo-900 text-white font-poppins">
      <section className="relative max-w-7xl mx-auto px-6 md:px-16 py-16">
        <div className="absolute -z-10 inset-0 overflow-hidden">
          <div className="absolute left-0 top-0 w-72 h-72 md:w-96 md:h-96 bg-pink-400/30 rounded-full blur-3xl" />
          <div className="absolute right-0 top-24 w-80 h-80 md:w-[460px] md:h-[460px] bg-indigo-400/30 rounded-full blur-3xl" />
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[520px] h-[520px] bg-fuchsia-400/25 rounded-full blur-3xl" />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-violet-300 font-merriweather">Contact Us</h1>
          <p className="mt-4 text-xl md:text-2xl text-white/85 max-w-3xl mx-auto">We’re here to help with support, feedback and partnerships.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
            <h2 className="text-2xl font-semibold mb-2">Support</h2>
            <div className="space-y-2 text-white/85">
              <p>✉️ shaktidev@gmail.com</p>
              <p>📞 +91-7042465121</p>
              <p>🕘 24/7 Support</p>
            </div>
            <a href="mailto:support@shakti.example" className="mt-4 inline-flex items-center px-6 py-3 rounded-xl bg-black text-white hover:shadow-sm hover:shadow-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300 ">Email us</a>
          </div>

          <form className="rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">Send a message</h2>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm text-white/80 mb-1">Name</label>
                <input className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-2 text-white placeholder-white/60 outline-none" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Email</label>
                <input type="email" className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-2 text-white placeholder-white/60 outline-none" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Message</label>
                <textarea rows={4} className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-2 text-white placeholder-white/60 outline-none" placeholder="How can we help?" />
              </div>
              <button type="button" className="px-4 py-2 rounded-xl bg-black text-white hover:shadow-sm hover:shadow-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300 ">Submit</button>
            </div>
          </form>
        </div>

        {/* <div className="mt-12 grid sm:grid-cols-3 gap-4">
          <div className="rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/20 text-center">
            <div className="text-4xl font-extrabold">24/7</div>
            <div className="text-white/80">Help center</div>
          </div>
          <div className="rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/20 text-center">
            <div className="text-4xl font-extrabold">4.9</div>
            <div className="text-white/80">Avg. driver rating</div>
          </div>
          <div className="rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/20 text-center">
            <div className="text-4xl font-extrabold">10k+</div>
            <div className="text-white/80">Community members</div>
          </div>
        </div> */}
      </section>
    </main>
  )
}
