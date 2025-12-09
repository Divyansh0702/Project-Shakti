export default function Blog() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-700 via-fuchsia-800 to-indigo-900 text-white font-poppins">
      <section className="relative max-w-7xl mx-auto px-6 md:px-16 py-16">
        <div className="absolute -z-10 inset-0 overflow-hidden">
          <div className="absolute left-0 top-0 w-72 h-72 md:w-96 md:h-96 bg-pink-400/30 rounded-full blur-3xl" />
          <div className="absolute right-0 top-24 w-80 h-80 md:w-[460px] md:h-[460px] bg-indigo-400/30 rounded-full blur-3xl" />
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[520px] h-[520px] bg-fuchsia-400/25 rounded-full blur-3xl" />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl pb-4 font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-violet-300 font-merriweather">Shakti Blog</h1>
          <p className="mt-4 text-xl md:text-2xl text-white/85 max-w-3xl mx-auto">Insights, safety tips, community stories, and everything you need to know about women-first mobility.
            The Shakti Blog is where we share real experiences, expert guidance, platform updates, and inspiring stories from the people who make our community strong. Whether you're a rider looking to stay informed or a driver seeking guidance, this is your space to learn, grow, and stay connected.</p>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm">Safety</span>
          <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm">Community</span>
          <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm">Guides</span>
          <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm">Updates</span>
        </div>

        <div className="grid gap-6">
          <article className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
            <img src="https://picsum.photos/seed/safety-toolkit/800/500" alt="Safety toolkit" className="w-full h-44 object-cover" />
            <div className="p-6">
              <span className="px-2 py-1 rounded bg-white/10 border border-white/20 text-sm text-white/85">3 min read</span><br /><br />
              <h2 className="text-4xl font-semibold mb-2 font-merriweather">⭐ Safety Toolkit: Essentials for Every Ride</h2>
              <p className="text-white/85">Learn practical, easy-to-follow steps to stay safe, confident, and aware while commuting with Shakti.<br /><br />


                Every journey should begin with confidence—knowing you’re in control, aware, and protected. Whether you’re commuting for work, heading to class, or returning home late in the evening, adopting a few simple safety habits can make every ride smoother and more secure. This guide brings together practical tips, real-life scenarios, and expert-backed advice to help you travel smarter with Shakti or any ride service.
                <br /><br />

                <div className="text-yellow-300 font-bold text-lg mb-2 font-merriweather"> 1. Verify Before You Step In </div>

                Before entering the vehicle, always match the driver’s name, photo, and vehicle number with the details shown in the app.
                A quick 3–5 second check prevents impersonation risks and ensures you’re riding with the right person.<br /><br />

                Real Scenario:
                A rider once noticed a mismatch in the vehicle number and refused to board. Reporting it immediately prevented a potential misuse of our platform. These moments matter.<br /><br />

                <div className="text-yellow-300 font-bold text-lg mb-2 font-merriweather"> 2. Share Your Live Ride Status </div>

                Safety grows stronger when someone you trust knows your whereabouts.

                With Shakti’s live ride-sharing feature, you can send your trip link to a friend or family member with just one tap. They can follow your route in real time until you arrive safely.

                Tip: Keep 1–2 emergency contacts saved in your phone or in the app for faster sharing.<br /><br />

                <div className="text-yellow-300 font-bold text-lg mb-2 font-merriweather"> 3. Use In-App Call & Chat </div>

                To protect your privacy, communicate with the driver through the in-app call or chat option.
                Avoid giving personal numbers, home details, or daily travel patterns.

                Why it matters:
                A digital barrier ensures conversations stay strictly professional and temporary.<br /><br />

                <div className="text-yellow-300 font-bold text-lg mb-2 font-merriweather"> 4. Trust Your Instincts & Stay Alert </div>

                Even the safest systems rely on your presence of mind.

                • Sit in the back seat whenever possible<br />

                • Keep your phone charged above 20%<br />

                • Avoid wearing headphones on full volume<br />

                • Stay aware of the route being taken<br />

                If something feels off—ask questions, request a route correction, or end the ride from the app.<br /><br />

                <div className="text-yellow-300 font-bold text-lg mb-2 font-merriweather"> 5. Use the Emergency / Help Button When Needed </div>

                Shakti’s safety features include quick access to emergency help.
                In case of discomfort, unusual driver behavior, or route deviation:

                • Tap the Safety or Help option in the app<br />

                • Report the issue immediately<br />

                • Our safety team reviews and responds to all reports promptly<br />

                We take every concern seriously, no matter how small.<br /><br />

                <div className="text-yellow-300 font-bold text-lg mb-2 font-merriweather"> 6. Prepare Your Own Mini Safety Kit </div>

                You don’t need much—just a few essentials:

                • Fully charged phone<br />

                • Power bank<br />

                • Identity card<br />

                • Pepper spray (optional, based on comfort)<br />

                • Small hand torch if traveling late<br />

                Think of it as your personal confidence booster.<br /><br />

                <div className="text-yellow-300 font-bold text-lg mb-2 font-merriweather"> 7. Keep Your Circle Informed </div>

                If you're taking a late-night ride or traveling through a new area, inform someone close to you about:

                • Your pick-up point<br />

                • Your destination<br />

                • Estimated time of arrival<br />

                A small message can go a long way in making your ride safer.</p>
              <div className="mt-4 flex items-center justify-between text-sm">
              </div>
            </div>
          </article>

          {/* <article className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
            <img src="https://picsum.photos/seed/driver-vetting/800/500" alt="Driver vetting" className="w-full h-44 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">⭐ How We Vet Drivers</h2>
              <p className="text-white/85">A detailed look into Shakti’s rigorous verification system, professional training, and ongoing quality checks.

                Safety begins with trust—and trust begins with who’s behind the wheel. This blog uncovers Shakti’s step-by-step driver verification process: identity checks, document validation, background screening, orientation sessions, and regular safety audits. Learn how our women-first driver network is trained in customer care, navigation, emergency response, and community-driven values. We also highlight how continuous feedback and performance reviews help maintain high-quality ride experiences.</p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="px-2 py-1 rounded bg-white/10 border border-white/20">4 min read</span>
              </div>
            </div>
          </article> */}

          <article className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
            <img src="https://picsum.photos/seed/community-spotlight/800/500" alt="Community spotlight" className="w-full h-44 object-cover" />
            <div className="p-6">
               <span className="px-2 py-1 rounded bg-white/10 border border-white/20 text-sm text-white/85">5 min read</span><br /><br />
              <h2 className="text-4xl font-semibold mb-2 font-merriweather">⭐ Community Spotlight: Women on the Move</h2>
              <p className="text-white/85">Stories from inspiring riders and drivers shaping safer, more inclusive urban mobility. <br /><br />

              <div className="font-bold text-lg mb-2 text-yellow-300"> Mobility is more than just reaching a destination—it’s about independence, confidence, and opportunity. At Shakti, every ride carries a story, every driver carries a journey, and every passenger carries a dream. Women on the Move is our heartfelt series that celebrates the incredible women who shape safer, more inclusive urban mobility every single day.</div> <br />

                These stories are real. They’re powerful. And they showcase a movement that goes far beyond transportation.<br /><br />

                <div className="font-bold text-lg mb-2 text-yellow-300 font-merriweather"> 1. Breaking Barriers: The Drivers Who Became Trailblazers</div>

                For many women joining Shakti as drivers, the journey begins with a decision—to take control of their time, their income, and their freedom.

                Meera, 34, once worked long hours in a tailoring shop. With a young daughter to support, she looked for a way to earn more without compromising her safety. With Shakti’s women-first driver onboarding, safe environment, and flexible hours, she found a path that gave her not only financial stability but also the pride of serving other women in her community. <br /><br />

                <marquee behavior="scroll" direction="left" className="text-lg font-bold text-white font-merriweather"> “Every ride I take is meaningful,” Meera says. “I’m not just driving; I’m helping women travel safely—something I never had growing up.”</marquee>

                Stories like hers are the backbone of Shakti’s mission. <br /><br />

                <div className="font-bold text-lg mb-2 text-yellow-300 font-merriweather"> 2. Riding with Confidence: Passengers Finding Freedom</div>

                For many women, commuting isn’t just a routine—it’s a daily struggle with safety concerns. Shakti aims to change that.

                Pooja, a college student, shared how she used to feel anxious commuting early mornings for her coaching classes. After discovering Shakti, her rides became stress-free and predictable.<br /><br />

                <marquee behavior="scroll" direction="left" className="text-lg font-bold text-white font-merriweather"> “Knowing my driver is a trained woman gives me instant comfort,” she shares. “Now my parents are less worried, and I actually enjoy traveling.”</marquee>

                These stories reflect how access to safe mobility can transform daily life—especially for students, working professionals, and late-night workers.<br /><br />

                <div className="font-bold text-lg mb-2 text-yellow-300 font-merriweather">3.  A Community Rooted in Support</div>

                What sets Shakti apart is not just the platform—it’s the bond among women who empower each other.

                Drivers often describe how they exchange tips, share safety methods, and support newcomers. Riders appreciate how the app gives them peace of mind, with verification, tracking, and community-first features.

                <marquee behavior="scroll" direction="left" className="text-lg font-bold text-white font-merriweather"> “It feels like a sisterhood,” says Anjali, a driver of 18 months. “We uplift each other. It’s not competition—it’s community.”</marquee><br /><br />

                <div className="font-bold text-lg mb-2 text-yellow-300 font-merriweather"> 4. Turning Challenges Into Purpose</div>

                Many women join Shakti to rebuild their lives:

                • Divorced mothers seeking financial independence<br />

                • Students funding their education<br />

                • Women returning to the workforce<br />

                • Survivors of difficult circumstances finding new strength<br />

                For them, driving isn’t just a job—it’s empowerment in motion.

                Farah, who joined after losing her previous job during the pandemic, now earns steadily and has even inspired three more women from her neighborhood to join.

                <marquee behavior="scroll" direction="left" className="text-lg font-bold text-white font-merriweather"> “I used to depend on others,” she says. “Now, others depend on me.”</marquee>

               <div className="font-bold text-lg mb-2 text-yellow-300 font-merriweather">5. The Ripple Effect: Safer Cities Start With Women</div>

                Every time a woman drives through the city with confidence…<br />
                Every time a rider enters a cab without fear…<br />
                Every time a community feels safer because women are leading the change…<br />

                A new chapter in urban mobility is being written.

                Shakti’s work isn’t just transportation—it’s building a future where safety isn’t a luxury, but a given.<br /><br />

              <div className="font-bold text-lg mb-2 text-yellow-300 font-merriweather">6. A Movement Powered by Everyday Heroes</div>

                Women on the Move celebrates:

                • Drivers who show courage every day<br />

                • Riders who trust the platform<br />

                • Communities that support women’s independence<br />

                • The collective vision of safer, inclusive mobility<br />

                These women are not just part of the journey—they are the journey.</p>
              <div className="mt-4 flex items-center justify-between text-sm">
               </div>
            </div>
          </article>
        </div>

        <div className="mt-12 rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/20">
          <div className="md:flex items-center justify-between gap-6">
            <div>
              <h3 className="text-3xl font-bold font-merriweather">Subscribe for updates</h3>
              <p className="text-white/85 font-merriweather">Get new stories and safety guides delivered to your inbox.</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <input type="email" placeholder="you@example.com" className="rounded-xl bg-white/10 border border-white/20 px-4 py-2 text-white placeholder-white/60 outline-none" />
              <button className="px-4 py-2 rounded-xl bg-black text-white hover:shadow-sm hover:shadow-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300 ">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
