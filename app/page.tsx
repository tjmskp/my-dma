import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center space-x-2 hover-lift">
              <Icons.rocket className="h-6 w-6 animate-bounce" />
              <span className="font-bold">DMA Platform</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              {["Features", "Pricing", "About"].map((item, i) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-muted-foreground hover:text-foreground hover-lift animate-fade-in stagger-${i + 1}`}
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="hover-lift animate-fade-in stagger-1">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button className="hover-lift animate-fade-in stagger-2">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section with Enhanced Animation */}
      <section className="container relative flex flex-col items-center justify-center gap-4 py-24 text-center md:py-32">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-70 animate-fade-in" />
        <h1 className="animate-fade-up text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Digital Marketing Assistant
        </h1>
        <p className="animate-fade-up max-w-[700px] text-lg text-muted-foreground sm:text-xl stagger-2">
          Automate your marketing campaigns, analyze performance, and grow your business with AI-powered insights
        </p>
        <div className="animate-fade-up flex gap-4 stagger-3">
          <Link href="/register">
            <Button size="lg" className="group hover-lift hover-glow">
              Start Free Trial
              <Icons.arrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
            </Button>
          </Link>
          <Link href="#demo">
            <Button variant="outline" size="lg" className="group hover-lift">
              <Icons.play className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Watch Demo
            </Button>
          </Link>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="container py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold">See How It Works</h2>
          <div className="aspect-video overflow-hidden rounded-lg border bg-muted">
            <video
              className="h-full w-full"
              poster="/demo-poster.jpg"
              controls
            >
              <source src="/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Features Section with Enhanced Animations */}
      <section id="features" className="container py-20">
        <h2 className="mb-12 text-center text-3xl font-bold animate-fade-up">Key Features</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: Icons.target,
              title: "Campaign Management",
              description: "Create and manage marketing campaigns across multiple platforms"
            },
            {
              icon: Icons.barChart,
              title: "Analytics & Insights",
              description: "Track performance and get AI-powered recommendations"
            },
            {
              icon: Icons.bot,
              title: "AI Automation",
              description: "Automate content creation and campaign optimization"
            }
          ].map((feature, i) => (
            <div
              key={feature.title}
              className={`group rounded-lg border p-6 transition-all hover:border-primary hover:shadow-lg hover-lift animate-scale-up stagger-${i + 1}`}
            >
              <feature.icon className="mb-4 h-12 w-12 transition-transform group-hover:scale-110" />
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section with Animations */}
      <section className="bg-slate-50 py-20">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold animate-fade-up">What Our Clients Say</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Sarah Johnson",
                role: "Marketing Director",
                gradient: "from-blue-400 to-purple-500",
                quote: "This platform has transformed how we manage our marketing campaigns. The AI insights are incredibly valuable."
              },
              {
                name: "Michael Chen",
                role: "E-commerce Owner",
                gradient: "from-green-400 to-blue-500",
                quote: "The automation features have saved us countless hours. Our ROI has improved significantly."
              },
              {
                name: "Emily Rodriguez",
                role: "Agency Founder",
                gradient: "from-purple-400 to-pink-500",
                quote: "Perfect for agencies. We can manage multiple client campaigns efficiently with detailed analytics."
              }
            ].map((testimonial, i) => (
              <div
                key={testimonial.name}
                className={`rounded-lg bg-white p-6 shadow-sm hover-lift animate-slide-in stagger-${i + 1}`}
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${testimonial.gradient}`} />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground">{testimonial.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section with Interactive Cards */}
      <section id="pricing" className="container py-20">
        <h2 className="mb-12 text-center text-3xl font-bold animate-fade-up">Simple Pricing</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Starter",
              price: "$29/mo",
              features: ["5 Active Campaigns", "Basic Analytics", "Email Support"]
            },
            {
              title: "Professional",
              price: "$99/mo",
              features: ["Unlimited Campaigns", "Advanced Analytics", "Priority Support"],
              popular: true
            },
            {
              title: "Enterprise",
              price: "Custom",
              features: ["Custom Solutions", "Dedicated Support", "SLA Agreement"]
            }
          ].map((plan, i) => (
            <div
              key={plan.title}
              className={`group relative rounded-lg border bg-background p-8 transition-all hover:shadow-lg hover-lift animate-scale-up stagger-${i + 1} ${
                plan.popular ? "shadow-lg" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-1 text-sm font-medium text-white animate-bounce">
                  Popular
                </div>
              )}
              <div className="absolute -inset-px rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 blur transition-opacity group-hover:opacity-20" />
              <h3 className="mb-2 text-xl font-semibold">{plan.title}</h3>
              <p className="mb-4 text-3xl font-bold">{plan.price}</p>
              <ul className="mb-8 space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Icons.check className="mr-2 h-4 w-4" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href={plan.title === "Enterprise" ? "/contact" : "/register"}>
                <Button className="w-full hover-lift hover-glow">
                  {plan.title === "Enterprise" ? "Contact Sales" : "Get Started"}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section with Animation */}
      <section className="relative py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-purple-50 animate-fade-in" />
        <div className="container text-center">
          <h2 className="mb-4 text-3xl font-bold animate-fade-up">Ready to Get Started?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground animate-fade-up stagger-1">
            Join thousands of marketers who are already using our platform to grow their business
          </p>
          <div className="flex justify-center gap-4 animate-fade-up stagger-2">
            <Link href="/register">
              <Button size="lg" className="group hover-lift hover-glow">
                Start Free Trial
                <Icons.arrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="hover-lift">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer with Interactive Links */}
      <footer className="border-t py-12">
        <div className="container grid gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-4 animate-fade-up">
            <Link href="/" className="flex items-center gap-2 hover-lift">
              <Icons.rocket className="h-6 w-6" />
              <span className="font-bold">DMA Platform</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Empowering businesses with AI-driven marketing solutions
            </p>
          </div>
          {[
            {
              title: "Product",
              links: [
                { href: "#features", label: "Features" },
                { href: "#pricing", label: "Pricing" },
                { href: "/docs", label: "Documentation" }
              ]
            },
            {
              title: "Company",
              links: [
                { href: "/about", label: "About" },
                { href: "/blog", label: "Blog" },
                { href: "/careers", label: "Careers" }
              ]
            },
            {
              title: "Legal",
              links: [
                { href: "/privacy", label: "Privacy" },
                { href: "/terms", label: "Terms" },
                { href: "/contact", label: "Contact" }
              ]
            }
          ].map((section, i) => (
            <div key={section.title} className={`animate-fade-up stagger-${i + 1}`}>
              <h4 className="mb-4 font-semibold">{section.title}</h4>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground hover-lift inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="container mt-8 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground animate-fade-in">
            © 2024 DMA Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
