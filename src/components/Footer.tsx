import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const footerSections = [
    {
      title: "About NAL India",
      links: [
        "About Us",
        "Our Story",
        "Leadership Team",
        "Careers",
        "Press & Media",
        "Investor Relations",
        "Awards & Recognition",
      ],
    },
    {
      title: "Services",
      links: [
        "Buy Property",
        "Rent Property",
        "Sell Property",
        "Commercial Real Estate",
        "Property Valuation",
        "Home Loans",
        "Legal Services",
        "Interior Design",
      ],
    },
    {
      title: "Tools & Resources",
      links: [
        "EMI Calculator",
        "Property Search",
        "Market Insights",
        "RIBL Scorecard",
        "Document Verification",
        "Virtual Tours",
        "Mobile App",
        "API Documentation",
      ],
    },
    {
      title: "Support",
      links: [
        "Help Center",
        "Contact Us",
        "Customer Support",
        "Report an Issue",
        "Feedback",
        "Terms of Service",
        "Privacy Policy",
        "Cookie Policy",
      ],
    },
  ];

  const cities = [
    "Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune", "Kolkata", "Ahmedabad",
    "Gurgaon", "Noida", "Thane", "Navi Mumbai", "Faridabad", "Ghaziabad", "Greater Noida",
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", name: "Facebook" },
    { icon: Twitter, href: "#", name: "Twitter" },
    { icon: Instagram, href: "#", name: "Instagram" },
    { icon: Linkedin, href: "#", name: "LinkedIn" },
    { icon: Youtube, href: "#", name: "YouTube" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Cities Section */}
        <div className="mt-12">
          <h3 className="font-semibold text-lg mb-4">Popular Cities</h3>
          <div className="flex flex-wrap gap-2">
            {cities.map((city, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-400 hover:text-white hover:border-white"
              >
                {city}
              </Button>
            ))}
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Contact Info & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#00BFA6]" />
                <span className="text-gray-400">+91 1800-XXX-XXXX (Toll Free)</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#00BFA6]" />
                <span className="text-gray-400">support@nalindia.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-[#00BFA6]" />
                <span className="text-gray-400">
                  Corporate Office: Mumbai, Maharashtra, India
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Stay Connected</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to get the latest property updates and market insights
            </p>
            <div className="flex space-x-2 mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#0056D2]"
              />
              <Button className="bg-[#0056D2] hover:bg-[#0056D2]/90">
                Subscribe
              </Button>
            </div>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#0056D2] transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* App Download & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Download NAL India App</h3>
            <div className="flex space-x-4">
              <Button variant="outline" className="border-gray-600 text-gray-400 hover:text-white hover:border-white">
                Download for iOS
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-400 hover:text-white hover:border-white">
                Download for Android
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Certifications & Partnerships</h3>
            <div className="flex flex-wrap gap-4">
              <div className="bg-gray-800 px-3 py-2 rounded text-xs">ISO 27001 Certified</div>
              <div className="bg-gray-800 px-3 py-2 rounded text-xs">RERA Approved</div>
              <div className="bg-gray-800 px-3 py-2 rounded text-xs">PCI DSS Compliant</div>
              <div className="bg-gray-800 px-3 py-2 rounded text-xs">RBI Approved</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-[#0056D2] rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold">N</span>
                </div>
                <span className="font-bold text-lg">NAL India</span>
              </div>
              <span className="text-gray-400 text-sm">
                Verified, Trusted, Transparent Real Estate
              </span>
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <span>© 2024 NAL India. All rights reserved.</span>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}