import React from 'react';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const ContactPage: React.FC = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Message Sent',
      description: 'Thank you for your message. We will get back to you shortly.',
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Section */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold text-teal-700 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 mb-8">
          We're here to help you with your sustainability reporting needs. Get in touch with our team.
        </p>
      </section>

      {/* Contact Information and Form */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="rounded-full bg-teal-100 w-12 h-12 flex items-center justify-center mr-4 shrink-0">
                  <span className="material-icons text-teal-600">email</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email Us</h3>
                  <p className="text-gray-600 mb-1">For general inquiries:</p>
                  <a href="mailto:naeem.ayesha512@gmail.com" className="text-teal-600 hover:underline">naeem.ayesha512@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="rounded-full bg-teal-100 w-12 h-12 flex items-center justify-center mr-4 shrink-0">
                  <span className="material-icons text-teal-600">location_on</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Visit Us</h3>
                  <p className="text-gray-600">
                    49-C, Commercial Area<br />
                    Cavalry Ground<br />
                    Lahore, Punjab<br />
                    Pakistan
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="rounded-full bg-teal-100 w-12 h-12 flex items-center justify-center mr-4 shrink-0">
                  <span className="material-icons text-teal-600">schedule</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Book a Call</h3>
                  <p className="text-gray-600 mb-3">Schedule a 30-minute call with one of our sustainability experts.</p>
                  <a 
                    href="https://calendly.com/naeem-ayesha512/30min" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-block bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors"
                  >
                    Book a Call
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send a Message</h2>

            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="Enter your first name" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Enter your last name" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter your email address" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" placeholder="Enter your company name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inquiry-type">Inquiry Type</Label>
                    <Select>
                      <SelectTrigger id="inquiry-type">
                        <SelectValue placeholder="Select an inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                        <SelectItem value="demo">Request a Demo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="How can we help you?" 
                      className="min-h-[150px]" 
                      required 
                    />
                  </div>

                  <div className="pt-2">
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Frequently Asked Questions</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-2">What types of businesses do you work with?</h3>
            <p className="text-gray-600">
              We work with organizations of all sizes across diverse industries. Whether you're a small business just starting your sustainability journey or a large corporation looking to enhance your reporting capabilities, our platform can be tailored to your needs.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-2">Do you offer custom report templates?</h3>
            <p className="text-gray-600">
              Yes, we provide a range of standard templates for major frameworks like GRI, SASB, and TCFD, but we can also create custom templates tailored to your specific reporting needs and brand guidelines.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-2">How quickly can I generate a report?</h3>
            <p className="text-gray-600">
              With data already in the system, you can generate a professional report in minutes. The initial data setup depends on your data availability and complexity but is designed to be as streamlined as possible.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-2">Is my data secure?</h3>
            <p className="text-gray-600">
              Absolutely. We implement enterprise-grade security measures including encryption, access controls, and regular security audits. Your sustainability data is valuable and sensitive, and we treat it with the utmost care.
            </p>
          </div>
        </div>
      </section>

      {/* Global Presence Map or Office Locations */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Global Presence</h2>
        <p className="text-gray-600 mb-8">
          With team members and clients across the globe, we provide 24/5 support for all your sustainability reporting needs.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="material-icons text-blue-600">public</span>
              </div>
              <h3 className="font-semibold mb-2">Asia Pacific</h3>
              <p className="text-sm text-gray-600">
                Lahore (HQ)<br />
                Pakistan
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-8">
        <div className="bg-gradient-to-r from-teal-600 to-teal-800 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to transform your sustainability reporting?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Book a call with our experts to discuss how our platform can help you achieve your sustainability reporting goals.
          </p>
          <a 
            href="https://calendly.com/naeem-ayesha512/30min" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block bg-white text-teal-700 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
          >
            Book a Call
          </a>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;