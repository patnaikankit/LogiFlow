import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <header className="sticky top-0 z-50 w-full px-4 lg:px-8 py-4 backdrop-blur-lg bg-gray-900/80 border-b border-gray-800">
        <div className="container mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8 text-blue-500"
            >
              <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
              <line x1="6" y1="1" x2="6" y2="4" />
              <line x1="10" y1="1" x2="10" y2="4" />
              <line x1="14" y1="1" x2="14" y2="4" />
            </svg>
            <span className="text-xl font-bold text-blue-500">LogiFlow</span>
          </a>
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-sm font-medium hover:text-blue-400 transition-colors">Features</a>
            <a href="#testimonials" className="text-sm font-medium hover:text-blue-400 transition-colors">Testimonials</a>
            <a href="#pricing" className="text-sm font-medium hover:text-blue-400 transition-colors">Pricing</a>
            <a href="#contact" className="text-sm font-medium hover:text-blue-400 transition-colors">Contact</a>
          </nav>
          <div className="hidden md:block">
            <button onClick={() => {navigate('/auth')}} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
              Sign Up/Login
            </button>
          </div>
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 py-4">
          <nav className="container mx-auto flex flex-col space-y-4">
            <a href="#features" className="text-sm font-medium hover:text-blue-400 transition-colors">Features</a>
            <a href="#testimonials" className="text-sm font-medium hover:text-blue-400 transition-colors">Testimonials</a>
            <a href="#pricing" className="text-sm font-medium hover:text-blue-400 transition-colors">Pricing</a>
            <a href="#contact" className="text-sm font-medium hover:text-blue-400 transition-colors">Contact</a>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors w-full">
              Sign Up
            </button>
          </nav>
        </div>
      )}

      <main className="flex-grow">
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 animate-fade-in-up">
                Revolutionize Your Logistics
              </h1>
              <p className="text-xl text-gray-300 mb-8 animate-fade-in-up animation-delay-200">
                Streamline operations, optimize routes, and deliver with precision using our cutting-edge platform.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up animation-delay-400">
                <button onClick={() => {navigate('/auth')}} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md transition-colors">
                  Get Started
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-md transition-colors">
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-gray-900 z-0"></div>
        </section>

        <section id="features" className="py-20 bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in-up">Powerful Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Real-time Tracking",
                  description: "Monitor your shipments with pinpoint accuracy and real-time updates.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-blue-500">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  ),
                },
                {
                  title: "Route Optimization",
                  description: "Maximize efficiency with AI-powered route planning and optimization.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-blue-500">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  ),
                },
                {
                  title: "Analytics Dashboard",
                  description: "Gain valuable insights with our comprehensive analytics dashboard.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-blue-500">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  ),
                },
              ].map((feature, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="flex items-center mb-4">
                    {feature.icon}
                    <h3 className="text-xl font-semibold ml-3">{feature.title}</h3>
                  </div>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-20 bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in-up">What Our Clients Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  quote: "LogiFlow has transformed our supply chain. We've seen a 30% increase in efficiency since implementation.",
                  author: "Sarah Johnson",
                  company: "TechCorp CEO",
                },
                {
                  quote: "The real-time tracking feature has dramatically improved our customer satisfaction rates.",
                  author: "Michael Chen",
                  company: "GlobalTrade Logistics Manager",
                },
                {
                  quote: "LogiFlow's analytics have given us insights that have revolutionized our decision-making process.",
                  author: "Emma Rodriguez",
                  company: "FastFreight Operations Director",
                },
              ].map((testimonial, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                  <p className="text-gray-300 mb-4">{testimonial.quote}</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.author[0]}
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-gray-400">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20 bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in-up">Flexible Pricing Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Starter",
                  price: "$99",
                  features: ["Real-time Tracking", "Basic Analytics", "Email Support"],
                },
                {
                  name: "Professional",
                  price: "$299",
                  features: ["Advanced Route Optimization", "Full Analytics Suite", "24/7 Phone Support"],
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  features: ["Custom Integration", "Dedicated Account Manager", "SLA Guarantee"],
                },
              ].map((plan, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <p className="text-4xl font-bold mb-6">{plan.price}<span className="text-xl font-normal">/month</span></p>
                  <ul className="mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center mb-2">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
                    Choose Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8 animate-fade-in-up">Ready to Get Started?</h2>
              <p className="text-xl text-gray-300 mb-8 animate-fade-in-up animation-delay-200">
                Join thousands of businesses optimizing  their logistics with LogiFlow.
              </p>
              <form className="space-y-4 animate-fade-in-up animation-delay-400">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
                >
                  Get Started
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <a href="#" className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8 text-blue-500"
                >
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                  <line x1="6" y1="1" x2="6" y2="4" />
                  <line x1="10" y1="1" x2="10" y2="4" />
                  <line x1="14" y1="1" x2="14" y2="4" />
                </svg>
                <span className="text-xl font-bold text-blue-500">LogiFlow</span>
              </a>
            </div>
            <nav className="flex space-x-4 mb-4 md:mb-0">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Contact Us</a>
            </nav>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400 text-sm">
            © 2024 LogiFlow. All rights reserved.
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </div>
  );
};

export default HomePage;