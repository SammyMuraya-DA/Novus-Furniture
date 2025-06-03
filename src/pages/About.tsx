
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Users, Award, Clock, Heart, Phone } from "lucide-react";

const About = () => {
  const stats = [
    { number: "15+", label: "Years Experience" },
    { number: "2000+", label: "Happy Customers" },
    { number: "5000+", label: "Projects Completed" },
    { number: "50+", label: "Expert Designers" },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Lead Interior Designer",
      image: "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29ufGVufDB8fDB8fHww",
      description: "15+ years of experience in luxury interior design"
    },
    {
      name: "Michael Chen",
      role: "Furniture Design Director",
      image: "https://plus.unsplash.com/premium_photo-1678197937465-bdbc4ed95815?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww",
      description: "Award-winning furniture designer with modern aesthetic"
    },
    {
      name: "Emily Rodriguez",
      role: "Project Manager",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
      description: "Ensures every project is delivered on time and budget"
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-100 text-amber-800">About Novus-Furnature</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Crafting Beautiful Spaces Since 2009
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are passionate about transforming ordinary spaces into extraordinary living environments 
              through thoughtful design and premium craftsmanship.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2009, Novus-Furniture began as a small workshop with a big dream: to make 
                  beautiful, high-quality furniture accessible to everyone. What started as a passion 
                  project has grown into Kenya's premier furniture and interior design company.
                </p>
                <p>
                  Our journey has been guided by three core principles: exceptional craftsmanship, 
                  innovative design, and customer satisfaction. We believe that every space has the 
                  potential to be extraordinary, and we're here to help you unlock that potential.
                </p>
                <p>
                  Today, we're proud to have helped over 2,000 families and businesses create spaces 
                  they love, and we're just getting started.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://media.istockphoto.com/id/2124498792/photo/furniture-store-with-many-sofas-armchairs-and-other-furniture-in-different-colors-and.webp?a=1&b=1&s=612x612&w=0&k=20&c=oRMTpgsaNo_a4rPcA028m_nk8VF1zWwxzQ7hlbaWGvA="
                alt="Our workshop"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-amber-600 text-white p-6 rounded-lg">
                <h3 className="text-2xl font-bold">15+</h3>
                <p className="text-sm">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                <p className="text-amber-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality First</h3>
              <p className="text-gray-600">
                We never compromise on quality. Every piece is crafted with premium materials and attention to detail.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Customer Focus</h3>
              <p className="text-gray-600">
                Your vision is our priority. We listen, understand, and deliver exactly what you need.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Timely Delivery</h3>
              <p className="text-gray-600">
                We respect your time and always deliver on our promises, meeting deadlines without fail.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Passion</h3>
              <p className="text-gray-600">
                We love what we do, and it shows in every piece we create and every space we design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The talented professionals behind every beautiful space
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-amber-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can transform your space into something extraordinary
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-amber-600 hover:bg-amber-700"
              onClick={() => window.open('https://wa.me/254708921377?text=Hi, I would like to discuss my project with your team', '_blank')}
            >
              <Phone className="mr-2 h-5 w-5" />
              Get Started Today
            </Button>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
