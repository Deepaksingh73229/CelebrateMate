import Image from "next/image";
import Link from "next/link";
import { CalendarHeart, Bell, Gift, CalendarCheck, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Never forget important dates again
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Automated birthday and anniversary reminders via SMS and email, keeping you connected with the people who matter most.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[500px] aspect-square">
                <Image
                  src="/hero-image.png"
                  alt="CelebrateMate app showcase"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground mb-2">
              Key Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Everything you need to stay connected
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              CelebrateMate makes remembering special occasions effortless and meaningful.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center bg-background rounded-lg p-6 shadow-sm border">
              <div className="p-3 rounded-full bg-primary/10 mb-4">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Automated Reminders</h3>
              <p className="text-muted-foreground">
                Receive timely notifications about upcoming birthdays and anniversaries via SMS and email.
              </p>
            </div>
            <div className="flex flex-col items-center text-center bg-background rounded-lg p-6 shadow-sm border">
              <div className="p-3 rounded-full bg-primary/10 mb-4">
                <Gift className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Gift Suggestions</h3>
              <p className="text-muted-foreground">
                Get personalized gift ideas based on your contacts' interests and previous celebrations.
              </p>
            </div>
            <div className="flex flex-col items-center text-center bg-background rounded-lg p-6 shadow-sm border">
              <div className="p-3 rounded-full bg-primary/10 mb-4">
                <CalendarCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Contact Management</h3>
              <p className="text-muted-foreground">
                Easily organize your contacts and their important dates in one convenient place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              How It Works
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-lg">
              Get started with CelebrateMate in just a few simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-xl font-bold text-white mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Create an Account</h3>
              <p className="text-muted-foreground">
                Sign up for free and set up your personal profile in minutes.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-xl font-bold text-white mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Add Your Contacts</h3>
              <p className="text-muted-foreground">
                Enter the important people in your life and their special dates.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-xl font-bold text-white mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Receive Reminders</h3>
              <p className="text-muted-foreground">
                Get notified before important dates so you can plan the perfect celebration.
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <Button asChild>
              <Link href="/register">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              What Our Users Say
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-lg">
              Join thousands of people who never miss an important date
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "CelebrateMate has transformed how I keep in touch with friends and family. I never forget a birthday anymore!",
                name: "Sarah Johnson",
                title: "Busy Parent"
              },
              {
                quote: "The SMS reminders are a game changer. Simple, effective, and exactly what I needed to stay on top of important dates.",
                name: "Michael Chen",
                title: "Small Business Owner"
              },
              {
                quote: "I love how easy it is to keep track of all my family birthdays in one place. The gift suggestions are spot on too!",
                name: "Emma Rodriguez",
                title: "Frequent Traveler"
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-background rounded-lg p-6 shadow-sm border">
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <p className="italic">"{testimonial.quote}"</p>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-lg">
              Choose the plan that's right for you
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Free",
                price: "$0",
                description: "Perfect for getting started",
                features: ["Up to 10 contacts", "Email reminders", "Basic calendar view"],
                buttonText: "Get Started",
                buttonVariant: "outline"
              },
              {
                name: "Premium",
                price: "$4.99",
                period: "/month",
                description: "Most popular choice",
                features: ["Unlimited contacts", "SMS & Email reminders", "Gift suggestions", "Calendar integration"],
                buttonText: "Subscribe Now",
                buttonVariant: "default",
                popular: true
              },
              {
                name: "Family",
                price: "$9.99",
                period: "/month",
                description: "Best for families",
                features: ["Up to 5 users", "Unlimited contacts", "Shared calendars", "Priority support"],
                buttonText: "Choose Family Plan",
                buttonVariant: "outline"
              }
            ].map((plan, i) => (
              <div key={i} className={`relative bg-background rounded-lg p-6 shadow-sm border ${plan.popular ? 'border-primary ring-2 ring-primary' : ''}`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 -mt-3 -mr-3 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                    Popular
                  </div>
                )}
                <div className="text-xl font-bold mb-2">{plan.name}</div>
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground ml-1">{plan.period}</span>}
                </div>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={plan.buttonVariant}>
                  {plan.buttonText}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <CalendarHeart className="h-12 w-12" />
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to never miss an important date?
            </h2>
            <p className="max-w-[700px] md:text-xl">
              Join thousands of users who stay connected with their loved ones.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/register">Sign Up Free</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}