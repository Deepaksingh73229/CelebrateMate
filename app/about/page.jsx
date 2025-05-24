"use client";

import { useState } from "react";
import { CalendarHeart, Clock, CloudLightning, Gift, Heart, Mail, MessageSquare, Phone, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function About() {
  const [failedImages, setFailedImages] = useState({});

  const handleImageError = (id) => {
    setFailedImages(prev => ({
      ...prev,
      [id]: true
    }));
  };
  
  const teamMembers = [
    {
      id: "alex",
      name: "Alex Morgan",
      role: "Founder & CEO",
      bio: "Alex founded CelebrateMate after repeatedly forgetting his mother's birthday. He's passionate about helping people maintain meaningful connections.",
      image: "/team/alex.jpg",
      initial: "AM"
    },
    {
      id: "samantha",
      name: "Samantha Lee",
      role: "Head of Product",
      bio: "Samantha brings over a decade of experience in product management. She ensures CelebrateMate delivers features that truly matter to users.",
      image: "/team/samantha.jpg",
      initial: "SL"
    },
    {
      id: "marcus",
      name: "Marcus Johnson",
      role: "Chief Technology Officer",
      bio: "Marcus leads our development team, bringing years of experience in building scalable and reliable software solutions.",
      image: "/team/marcus.jpg",
      initial: "MJ"
    },
    {
      id: "elena",
      name: "Elena Rodriguez",
      role: "Customer Success",
      bio: "Elena is devoted to making sure every CelebrateMate user has an amazing experience with our platform.",
      image: "/team/elena.jpg",
      initial: "ER"
    }
  ];

  const faqs = [
    {
      q: "Is CelebrateMate free to use?",
      a: "CelebrateMate offers a free plan with basic features. We also offer premium plans with additional features such as SMS reminders, unlimited contacts, and more."
    },
    {
      q: "How far in advance will I be reminded?",
      a: "You can customize your reminder schedule. By default, we send reminders 7 days, 3 days, and 1 day before an event, but you can adjust this to your preference."
    },
    {
      q: "Can I import contacts from my phone?",
      a: "Yes, CelebrateMate allows you to import contacts from your phone, Google contacts, or other platforms to make getting started quick and easy."
    },
    {
      q: "What types of events does CelebrateMate support?",
      a: "We support birthdays, anniversaries, graduations, holidays, and custom events. You can create any type of event you want to remember."
    },
    {
      q: "Is my data secure with CelebrateMate?",
      a: "Absolutely. We employ industry-standard security measures to protect your data, and we never sell your information to third parties."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About CelebrateMate</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Our mission is to help you create meaningful connections with the people who matter most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">Our Story</h2>
              <p className="text-muted-foreground">
                CelebrateMate was born from a simple observation: in our increasingly busy lives, we often struggle to remember and properly celebrate the special moments of our loved ones.
              </p>
              <p className="text-muted-foreground">
                Our founder missed his mother's birthday two years in a row due to work commitments and tight deadlines. The disappointment on her face was the catalyst for creating a solution that ensures no one has to experience that feeling again.
              </p>
              <p className="text-muted-foreground">
                Founded in 2023, CelebrateMate has quickly grown from a simple reminder app to a comprehensive platform that helps thousands of users stay connected with their friends and family through life's most important celebrations.
              </p>
            </div>
            <div className="flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px] aspect-square">
                {failedImages.story ? (
                  <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg text-xl font-medium">
                    Our Story
                  </div>
                ) : (
                  <Image
                    src="/about-story.jpg"
                    alt="CelebrateMate founding team"
                    fill
                    className="object-cover rounded-lg"
                    onError={() => handleImageError('story')}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="order-2 lg:order-1 flex items-center justify-center">
              <div className="relative w-full max-w-[500px] aspect-square">
                {failedImages.mission ? (
                  <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg text-xl font-medium">
                    Our Mission
                  </div>
                ) : (
                  <Image
                    src="/about-mission.jpg"
                    alt="CelebrateMate mission"
                    fill
                    className="object-cover rounded-lg"
                    onError={() => handleImageError('mission')}
                  />
                )}
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">Our Mission & Values</h2>
              <p className="text-muted-foreground">
                At CelebrateMate, we believe that meaningful connections are the foundation of a fulfilled life. Our mission is to strengthen these connections by ensuring you never miss an opportunity to celebrate the special moments of your loved ones.
              </p>
              <div className="grid gap-4 pt-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Connection</h3>
                    <p className="text-muted-foreground">We're passionate about helping people maintain and strengthen their relationships.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Trust & Privacy</h3>
                    <p className="text-muted-foreground">We handle your data with the utmost respect and transparency.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <CloudLightning className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Innovation</h3>
                    <p className="text-muted-foreground">We continuously improve our platform to deliver the best possible experience.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter">How CelebrateMate Works</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              A simple and effective way to remember and celebrate important dates
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center text-center p-4">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <CalendarHeart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Store Important Dates</h3>
              <p className="text-muted-foreground">
                Add all your important contacts and their special occasions in our easy-to-use platform.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Set Custom Reminders</h3>
              <p className="text-muted-foreground">
                Choose when and how you want to be reminded, whether it's days or weeks in advance.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <Gift className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Celebrate Meaningfully</h3>
              <p className="text-muted-foreground">
                Receive timely notifications and personalized suggestions for making each occasion special.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter">Meet Our Team</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              The passionate people behind CelebrateMate
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="mb-4 relative w-32 h-32 rounded-full overflow-hidden">
                  {failedImages[member.id] ? (
                    <div className="absolute inset-0 bg-primary/10 flex items-center justify-center text-2xl font-bold">
                      {member.initial}
                    </div>
                  ) : (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      onError={() => handleImageError(member.id)}
                    />
                  )}
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Common questions about CelebrateMate
            </p>
          </div>
          <div className="grid gap-6 md:gap-8 max-w-[800px] mx-auto">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-muted/50 p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">Get in Touch</h2>
              <p className="text-muted-foreground">
                Have questions or feedback? We'd love to hear from you.
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-primary" />
                  <span>support@celebratemate.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-primary" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-3 text-primary" />
                  <span>Live chat available Mon-Fri, 9am-5pm EST</span>
                </div>
              </div>
              <div className="pt-4">
                <Button asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="p-6 bg-background rounded-lg shadow-sm border w-full max-w-md">
                <h3 className="text-xl font-bold mb-4">Subscribe to Our Newsletter</h3>
                <p className="text-muted-foreground mb-4">
                  Stay updated with the latest features, tips, and celebration ideas.
                </p>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="w-full p-2 rounded-md border border-input bg-background"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full p-2 rounded-md border border-input bg-background"
                      placeholder="your@email.com"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to start remembering every special date?
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Join thousands of users who never miss an important moment with their loved ones.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button size="lg" asChild>
                <Link href="/register">Sign Up Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#">See Plans & Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}