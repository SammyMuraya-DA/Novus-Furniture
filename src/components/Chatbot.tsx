
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Phone, Mail } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! Welcome to Novus Furniture. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const quickResponses = [
    "What furniture do you have?",
    "I need a consultation",
    "What are your prices?",
    "Do you deliver?",
    "Contact information",
  ];

  const handleSendMessage = (message?: string) => {
    const messageText = message || inputMessage.trim();
    if (!messageText) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: messageText,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    // Generate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(messageText);
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const generateBotResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("furniture") || lowerMessage.includes("product")) {
      return "We have a wide range of furniture including sofas, chairs, tables, beds, and storage solutions. You can browse our products page or contact us for specific items. Would you like me to connect you with our sales team?";
    }
    
    if (lowerMessage.includes("consultation") || lowerMessage.includes("design")) {
      return "We offer free design consultations! Our interior design experts can help you create the perfect space. Would you like to schedule a consultation? I can connect you via WhatsApp or email.";
    }
    
    if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
      return "Our prices vary depending on the product and customization options. We offer competitive rates and flexible payment plans. For specific pricing, please contact us at +254 708 921 377 or novusfurniture254@gmail.com.";
    }
    
    if (lowerMessage.includes("deliver") || lowerMessage.includes("shipping")) {
      return "Yes! We offer free delivery within Nairobi and surrounding areas. For other locations, delivery charges may apply. We also provide setup services. Contact us for delivery details.";
    }
    
    if (lowerMessage.includes("contact") || lowerMessage.includes("phone") || lowerMessage.includes("email")) {
      return "You can reach us at:\n📞 Phone: +254 708 921 377\n📧 Email: novusfurniture254@gmail.com\n📍 Address: 123 Design Street, Nairobi\n\nWould you like me to connect you directly?";
    }

    return "Thank you for your message! For detailed assistance, please contact us at +254 708 921 377 or novusfurniture254@gmail.com. Our team is ready to help you find the perfect furniture solution.";
  };

  const handleQuickResponse = (response: string) => {
    handleSendMessage(response);
  };

  const connectToWhatsApp = () => {
    window.open('https://wa.me/254708921377?text=Hi, I was chatting with your bot and need assistance', '_blank');
  };

  const connectToEmail = () => {
    window.open('mailto:novusfurniture254@gmail.com?subject=Inquiry from Website Chat', '_blank');
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 bg-amber-600 hover:bg-amber-700 shadow-lg"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-50 w-80 h-96 shadow-xl">
          <CardHeader className="bg-amber-600 text-white rounded-t-lg py-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Novus Furniture Chat
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex flex-col h-full p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.isBot
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-amber-600 text-white'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Responses */}
            <div className="px-4 py-2 border-t">
              <div className="flex flex-wrap gap-1 mb-2">
                {quickResponses.map((response, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs h-8"
                    onClick={() => handleQuickResponse(response)}
                  >
                    {response}
                  </Button>
                ))}
              </div>
            </div>

            {/* Contact Buttons */}
            <div className="px-4 py-2 border-t">
              <div className="flex gap-2 mb-2">
                <Button
                  size="sm"
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={connectToWhatsApp}
                >
                  <Phone className="h-3 w-3 mr-1" />
                  WhatsApp
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={connectToEmail}
                >
                  <Mail className="h-3 w-3 mr-1" />
                  Email
                </Button>
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  size="sm"
                  onClick={() => handleSendMessage()}
                  className="bg-amber-600 hover:bg-amber-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Chatbot;
