import { Mail, Instagram, Linkedin, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative py-16 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-2xl font-bold gradient-text">AMIT GARG</div>
            <p className="text-foreground/70 text-sm leading-relaxed">
              Elite fitness coaching for IT professionals. Transform your body, elevate your life
              with science-based training and personalized nutrition.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {["About", "Transformations", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(" ", "-")}`}
                  className="text-foreground/70 hover:text-primary transition-colors text-sm"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold">Get In Touch</h4>
            <div className="space-y-3">
              <a
                href="mailto:sculptbyag@gmail.com"
                className="flex items-center gap-3 text-foreground/70 hover:text-primary transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                sculptbyag@gmail.com
              </a>
              <a
                href="tel:+919599500350"
                className="flex items-center gap-3 text-foreground/70 hover:text-primary transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                +91 9599500350
              </a>
              <div className="flex gap-4 pt-2">
                {[
                  {
                    icon: Instagram,
                    href: "https://www.instagram.com/getfitwithamit?utm_source=ig_web_button_share_sheet&igsh=YWE1ejFwdjhpYjV0",
                  },
                  { icon: Linkedin, href: "#" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass p-3 rounded-full hover:glass-intense transition-all hover:scale-110 glow-gold"
                  >
                    <social.icon className="w-5 h-5 text-primary" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/60">
          <p>© 2025 Amit Garg Fitness. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
