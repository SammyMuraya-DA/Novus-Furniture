
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Home, 
  Palette, 
  Ruler, 
  Truck, 
  Settings, 
  Phone, 
  CheckCircle,
  Star,
  Clock,
  Users
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Home,
      title: "Complete Interior Design",
      description: "Full-service interior design from concept to completion. We handle every detail to create your dream space.",
      features: [
        "Space planning and layout",
        "Color scheme selection",
        "Furniture and decor selection",
        "Project management",
        "3D visualization"
      ],
      price: "From KES 50,000",
      duration: "4-8 weeks"
    },
    {
      icon: Palette,
      title: "Design Consultation",
      description: "Expert advice and guidance for your DIY projects. Get professional insights without the full-service commitment.",
      features: [
        "2-hour consultation session",
        "Design recommendations",
        "Color and material guidance",
        "Shopping list creation",
        "Follow-up support"
      ],
      price: "KES 15,000",
      duration: "1 day"
    },
    {
      icon: Ruler,
      title: "Space Planning",
      description: "Optimize your space layout for maximum functionality and flow. Perfect for renovations and new constructions.",
      features: [
        "Detailed floor plans",
        "Furniture placement",
        "Traffic flow optimization",
        "Storage solutions",
        "Lighting placement"
      ],
      price: "From KES 25,000",
      duration: "1-2 weeks"
    },
    {
      icon: Settings,
      title: "Custom Furniture Design",
      description: "Bespoke furniture pieces designed specifically for your space and needs. From concept to craftsmanship.",
      features: [
        "Custom design creation",
        "Material selection",
        "Expert craftsmanship",
        "Quality finishing",
        "Installation service"
      ],
      price: "Quote on request",
      duration: "3-6 weeks"
    },
    {
      icon: Truck,
      title: "Delivery & Installation",
      description: "Professional delivery and installation services to ensure your furniture is set up perfectly.",
      features: [
        "Careful handling and transport",
        "Professional assembly",
        "Placement and arrangement",
        "Removal of packaging",
        "Quality check"
      ],
      price: "From KES 5,000",
      duration: "Same day"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Initial Consultation",
      description: "We discuss your vision, needs, and budget to understand your project requirements."
    },
    {
      step: "02",
      title: "Design Development",
      description: "Our team creates detailed designs and 3D visualizations of your space."
    },
    {
      step: "03",
      title: "Material Selection",
      description: "Choose from our curated selection of premium materials and finishes."
    },
    {
      step: "04",
      title: "Project Execution",
      description: "We handle all aspects of implementation, from procurement to installation."
    },
    {
      step: "05",
      title: "Final Walkthrough",
      description: "We ensure everything meets your expectations and provide care instructions."
    }
  ];

  const testimonials = [
    {
      name: "Grace Mwangi",
      role: "Homeowner",
      content: "ModernSpace transformed our living room into a stunning space that perfectly reflects our style. The team was professional and delivered exactly what they promised.",
      rating: 5
    },
    {
      name: "David Ochieng",
      role: "Business Owner",
      content: "Their commercial interior design service helped us create an office space that our employees love. Productivity has definitely increased since the renovation.",
      rating: 5
    },
    {
      name: "Maria Santos",
      role: "Architect",
      content: "I regularly recommend ModernSpace to my clients. Their attention to detail and quality of work is consistently excellent.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-amber-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-white text-amber-600">Our Services</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Complete Interior Design Solutions
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            From initial consultation to final installation, we offer comprehensive design services 
            to transform your space into something extraordinary.
          </p>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-amber-600"
            onClick={() => window.open('https://wa.me/254700000000?text=Hi, I would like to learn more about your interior design services', '_blank')}
          >
            <Phone className="mr-2 h-5 w-5" />
            Get Free Consultation
          </Button>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Service Offerings</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our range of professional services designed to meet your specific needs and budget
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <service.icon className="h-8 w-8 text-amber-600" />
                  </div>
                  <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                  <p className="text-gray-600">{service.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-amber-600">{service.price}</span>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        {service.duration}
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-amber-600 hover:bg-amber-700"
                      onClick={() => window.open(`https://wa.me/254700000000?text=Hi, I'm interested in your ${service.title} service`, '_blank')}
                    >
                      Get Quote
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Design Process</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A systematic approach that ensures your project is completed on time, within budget, and exceeds expectations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-amber-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Space?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and create a design solution that perfectly fits your needs and budget
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-amber-600 hover:bg-amber-700"
              onClick={() => window.open('https://wa.me/254700000000?text=Hi, I would like to schedule a free consultation for my project', '_blank')}
            >
              <Phone className="mr-2 h-5 w-5" />
              Schedule Free Consultation
            </Button>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                Contact Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
