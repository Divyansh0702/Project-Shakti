import { Link } from "react-router-dom";

export default function Home() {
    const bookHref = '/customer/auth'
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-800 via-purple-800 to-slate-900  text-white flex flex-col">

 
            <section className="relative w-full max-w-7xl mx-auto px-6 md:px-16 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">

                <div className="pointer-events-none absolute -z-10 right-0 top-10 w-64 h-64 md:w-80 md:h-80 bg-gradient-to-tr from-cyan-400/20 to-pink-600/20 blur-3xl rounded-full" />

                <div>
                    <h1 className="text-7xl md:text-8xl font-extrabold tracking-tight leading-none drop-shadow-lg font-merriweather bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-300 via-pink-300 to-indigo-300">
                        SHAKTI
                    </h1>


                    <p className="mt-4 text-2xl md:text-3xl font-semibold text-white/90 font-merriweather">
                        Women’s safety is our priority.
                    </p>

                    <p className="mt-6 text-white/70 max-w-xl leading-relaxed text-xl md:text-2xl font-merriweather">
                        A women-exclusive cab service built for safety, trust and reliability.
                        Verified female drivers, live tracking and a powerful support system.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row gap-4">

                        <Link
                            to="/driver/auth"
                            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden font-poppins font-bold rounded-xl group bg-gradient-to-br from-purple-500 to-pink-500 focus:ring-4 focus:outline-none focus:ring-purple-200 transition duration-200 hover:scale-105"
                        >
                            <span className="relative px-6 py-3 text-xl md:text-2xl leading-5 bg-white text-pink-700 rounded-[inherit] transition-all ease-in duration-75 group-hover:bg-transparent group-hover:text-white">
                                Be a Rider
                            </span>
                        </Link>

                        <Link
                            to={bookHref}
                            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden font-poppins font-bold rounded-xl group bg-gradient-to-br from-purple-500 to-pink-500 focus:ring-4 focus:outline-none focus:ring-purple-200 transition duration-200 hover:scale-105"
                        >
                            <span className="relative px-6 py-3 text-xl md:text-2xl leading-5 bg-white text-pink-700 rounded-[inherit] transition-all ease-in duration-75 group-hover:bg-transparent group-hover:text-white">
                                Book a Ride
                            </span>
                        </Link>

                    </div>
                </div>

                <div className="hidden md:flex justify-center flex-col relative">
                    <img
                        src="/car-hero.png"
                        alt="Shakti cab illustration"
                        className="select-none drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] transition duration-200"
                        onError={(e) => { e.currentTarget.src = '/vite.svg' }}
                    />
     
                    <div className="absolute -z-10 inset-0 m-auto w-72 h-72 bg-gradient-to-tr from-pink-400/40 via-fuchsia-300/30 to-indigo-400/40 blur-3xl rounded-full" />

                </div>

            </section>

    
            <section className="w-full bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 text-gray-900 py-16 font-poppins ">
                <div className="max-w-7xl mx-auto px-6 md:px-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-merriweather bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-900 to-pink-900 ">Our Services</h2>
                    <div className="h-1 w-20 bg-pink-500 mt-2 mb-8 rounded "></div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 ">
                        {[
                            { label: 'Bike', icon: '🏍️' },
                            { label: 'Auto', icon: '🛺' },
                            // { label: 'Auto Share', icon: '👥' },
                            // { label: 'Parcel', icon: '📦' },
                            { label: 'Shakti Go', icon: '🚕' },
                            { label: 'Shakti XL', icon: '✨🚖' },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-gray-200 hover:shadow-pink-100 hover:ring-pink-400 hover:shadow-lg hover:-translate-y-1 transition flex flex-col items-center"
                            >
                                <div className="text-5xl mb-4 select-none">{item.icon}</div>
                                <div className="text-gray-800 font-medium">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------------- QUICK RIDES SECTION ---------------- */}
            <section className="w-full bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 text-gray-900 py-16 font-poppins">
                <div className="max-w-7xl mx-auto px-6 md:px-16 grid md:grid-cols-2 gap-10 items-start">
                    {/* Left: Text */}
                    <div>
                        <h2 className="text-5xl md:text-6xl font-bold leading-tight font-merriweather bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                            Get Quick Rides,
                            <br />
                            Low Fares
                        </h2>
                        <div className="h-1 w-24 bg-pink-500 mt-2 mb-6 rounded"></div>
                        <p className="text-3xl md:text-3xl text-gray-700 max-w-2xl">
                            In Shakti we ensure our customers get rides quickly at the most
                            affordable prices.
                        </p>
                        <Link
                            to={bookHref}
                            className="inline-flex items-center px-6 py-3 mt-8 rounded-full bg-gray-900 text-white font-semibold shadow-md hover:opacity-90 transition text-2xl md:text-2xl"
                        >
                            Book a ride <span className="ml-2">→</span>
                        </Link>
                    </div>

                    {/* Right: Images grid */}
                    <div className="grid grid-cols-2 gap-6">
                        {[
                            'https://picsum.photos/seed/auto/360/360',
                            'https://picsum.photos/seed/delivery/360/360',
                            'https://picsum.photos/seed/bike/360/360',
                            'https://picsum.photos/seed/car/360/360',
                        ].map((src, idx) => (
                            <div key={idx} className="bg-white rounded-2xl p-2 shadow-sm ring-1 ring-gray-200 hover:ring-indigo-300 hover:shadow-lg hover:-translate-y-1 transition">
                                <img src={src} alt="service" className="w-full h-full object-cover rounded-xl" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------------- FLEXIBLE HOURS SECTION ---------------- */}
            <section className="w-full bg-gradient-to-r from-purple-100 via-indigo-100 to-pink-100 text-gray-900 py-16 font-poppins">
                <div className="max-w-7xl mx-auto px-6 md:px-16 grid md:grid-cols-2 gap-10 items-start">
                    {/* Left: Images grid */}
                    <div className="grid grid-cols-2 gap-6">
                        {[
                            'https://picsum.photos/seed/captain1/360/360',
                            'https://picsum.photos/seed/captain2/360/360',
                            'https://picsum.photos/seed/captain3/360/360',
                            'https://picsum.photos/seed/captain4/360/360',
                        ].map((src, idx) => (
                            <div key={idx} className="bg-white rounded-2xl p-2 shadow-sm ring-1 ring-gray-200 hover:ring-blue-300 hover:shadow-lg hover:-translate-y-1 transition">
                                <img src={src} alt="earning highlight" className="w-full h-full object-cover rounded-xl" />
                            </div>
                        ))}
                    </div>

                    {/* Right: Text */}
                    <div>
                        <h2 className="text-5xl md:text-6xl font-bold leading-tight font-merriweather bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                            Flexible Hours &
                            <br />
                            High Earnings
                        </h2>
                        <div className="h-1 w-24 bg-pink-500 mt-2 mb-6 rounded"></div>
                        <p className="text-3xl md:text-3xl text-gray-700 max-w-2xl font-poppins">
                            Join as a Shakti captain and earn <br/> on your own terms.
                            Driver <br/> whenever you want.
                        </p>
                        {/* Start Earning button removed per request */}
                        <Link
                            to="/driver/auth"
                            className="inline-flex items-center px-6 py-3 mt-8 rounded-full bg-gray-900 text-white font-semibold shadow-md hover:opacity-90 transition text-2xl md:text-2xl"
                        >
                            Start Earning <span className="ml-2">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ---------------- SAFETY FOR ALL SECTION ---------------- */}
            <section className="w-full bg-gradient-to-r from-rose-50 via-pink-50 to-indigo-50 text-gray-900 py-16 font-poppins">
                <div className="max-w-7xl mx-auto px-6 md:px-16 grid md:grid-cols-2 gap-10 items-center">
                    {/* Left: Text */}
                    <div>
                        <h2 className="text-5xl md:text-6xl font-bold leading-tight  font-merriweather bg-clip-text text-transparent bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-600">Safety for all</h2>
                        <div className="h-1 w-24 bg-pink-500 mt-2 mb-6 rounded"></div>
                        <p className="text-3xl md:text-3xl text-gray-700 max-w-2xl font-poppins">
                            At Shakti, your safety is our priority. We’re dedicated to making
                            <br/> every ride safe and <br/> comfortable.
                        </p>
                        {/* Know More link omitted per request */}
                        <Link
                            to="/safety"
                            className="inline-flex items-center px-6 py-3 mt-8 rounded-full bg-gray-900 text-white font-semibold shadow-md hover:opacity-90 transition text-2xl md:text-2xl"
                        >
                            Know more <span className="ml-2">→</span>
                        </Link>
                    </div>

                    {/* Right: Image */}
                    <div className="bg-white rounded-2xl p-2 shadow-sm ring-1 ring-gray-200">
                        <img
                            src="https://picsum.photos/seed/safety/900/600"
                            alt="Safety highlight"
                            className="w-full h-full object-cover rounded-xl"
                        />
                    </div>
                </div>
            </section>

        </div>
    );
}

