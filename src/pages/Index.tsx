
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle, Users, Target, Zap, Award, Star, Phone, Mail, MapPin, Search, Play, Menu, X  } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Open Apars Classroom search results in new tab
      window.open(`https://aparsclassroom.com/shop/achieve/HSC_25/?search=${encodeURIComponent(searchQuery)}`, '_blank');
    }
  };

  // Counter animation hook with viewport detection
  const useCounter = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
            let startTime: number;
            const animate = (currentTime: number) => {
              if (!startTime) startTime = currentTime;
              const progress = Math.min((currentTime - startTime) / duration, 1);
              setCount(Math.floor(progress * end));
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            requestAnimationFrame(animate);
          }
        },
        { threshold: 0.5 }
      );

      if (elementRef.current) {
        observer.observe(elementRef.current);
      }

      return () => observer.disconnect();
    }, [end, duration, hasStarted]);

    return { count, elementRef };
  };

  // Popular courses data
  const popularCourses = [
    {
      id: 1,
      title: 'ACS Achieve Varsity Exam Batch 2025',
      thumbnail: 'https://i.postimg.cc/ZKbmMHG1/UNI-1.png',
      price: '৳12,000',
      rating: 5
    },
    {
      id: 2,
      title: 'Achieve Engineering Exam Batch Exam 2025',
      thumbnail: 'https://i.postimg.cc/d1rtm0bv/ENGR-1.png',
      price: '৳12,00',
      rating: 5
    },
    {
      id: 3,
      title: 'ACS Achieve Medical Exam Batch 2025',
      thumbnail: 'https://i.postimg.cc/C1cN4k1P/496514187-24080256401613260-5656178353673933252-n.jpg',
      price: '৳10,000',
      rating: 5
    },
    {
      id: 4,
      title: 'Achieve Varsity 2nd Time Exam Batch 25',
      thumbnail: 'https://i.postimg.cc/mDVzc3kk/Achieve-Varsity-2nd-Time-Exam-Batch-25-YT-Thumbnail-1-1.png',
      price: '৳6,000',
      rating: 5
    },
    {
      id: 5,
      title: 'Achieve Medical 2nd Time Exam Batch 25',
      thumbnail: 'https://i.postimg.cc/Jnxbmx3Z/506706083-719667327340461-6689527597213006455-n.jpg',
      price: '৳9,000',
      rating: 5
    }
  ];

  const studentsCounter = useCounter(10000);
  const coursesCounter = useCounter(8);
  const branchesCounter = useCounter(14);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600">Etreeks</div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
              <a href="#courses" className="text-gray-700 hover:text-blue-600 transition-colors">Courses</a>
              <a href="#branches" className="text-gray-700 hover:text-blue-600 transition-colors">Branches</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
              <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-blue-600 transition-colors p-2"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
                <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">Home</a>
                <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">About</a>
                <a href="#courses" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">Courses</a>
                <a href="#branches" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">Branches</a>
                <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
                <div className="px-3 py-2">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Get Started</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>


      {/* Hero Section with Slider */}
      <section id="home" className="pt-16 relative min-h-screen flex items-center bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-20">
            {/* Left Column - Text & Search */}
            <div className="space-y-8 text-center md:text-left">
              <h1 className="text-5xl lg:text-5xl font-bold leading-tight">
                Excel in Your
                <span className="text-blue-400"> Exams </span>
                with Expert Guidance
              </h1>
              <p className="text-sm text-gray-600 leading-relaxed">
                Join thousands of students in our offline exam centers across Bangladesh. Search and enroll in the best HSC courses designed for success.
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search for HSC courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-14 text-lg bg-white/95 backdrop-blur-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 w-full"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 px-8 h-14 text-lg w-full sm:w-auto"
                >
                  Search Courses
                </Button>
              </form>
            </div>

            {/* Right Column - Image */}
            <div className="flex justify-center md:justify-end">
              <img
                src="https://i.postimg.cc/zvp4RbX9/513670571-650677781349136-8449086125678648735-n.jpg"
                alt="Hero Illustration"
                className="w-full max-w-md object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div ref={studentsCounter.elementRef} className="space-y-2">
              <div className="text-5xl font-bold">{studentsCounter.count.toLocaleString()}+</div>
              <div className="text-xl text-blue-100">Students Enrolled</div>
            </div>
            <div ref={coursesCounter.elementRef} className="space-y-2">
              <div className="text-5xl font-bold">{coursesCounter.count}+</div>
              <div className="text-xl text-blue-100">Different Courses</div>
            </div>
            <div ref={branchesCounter.elementRef} className="space-y-2">
              <div className="text-5xl font-bold">{branchesCounter.count}</div>
              <div className="text-xl text-blue-100">Branches Nationwide</div>
            </div>
          </div>
        </div>
      </section>

      {/* Most Popular Courses */}
      <section id="courses" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Most Popular Courses</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of students who have achieved success with our top-rated HSC courses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {popularCourses.map((course) => (
              <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden  w-full max-w-sm">
                <div className="relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <Play className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{course.title}</h3>

                  <div className="flex items-center mb-4">
                    {[...Array(course.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">(5)</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-blue-600">{course.price}</div>
                    <div className="text-sm text-gray-500 line-through">৳{parseInt(course.price.replace('৳', '')) + 500}</div>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 group">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://i.postimg.cc/MKGQ4dF1/508305375-3100296120130494-8979962659710976395-n.jpg"
                alt="About us"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl">
                <div className="text-3xl font-bold text-blue-600">2+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-gray-900">
                  About Us
                </h2>
                <p className="text-lg text-gray-600">
                  Apars Classroom (ASG Shop) is an online education center based in Dhaka, Bangladesh, specializing in providing high-quality educational resources to students across the country. Established in 2018, the platform has quickly gained popularity among Bangladeshi students, with over 900,000 students actively learning and developing their skills through its diverse range of courses.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Variety of Courses</h3>
                    <p className="text-gray-600">HSC | Admission level courses to help you achieve your dreams</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Quality Books</h3>
                    <p className="text-gray-600">We ensure access to the best study materials</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Student portal</h3>
                    <p className="text-gray-600">See leaderboard and track your progress</p>
                  </div>
                </div>
              </div>
              {/* <Button className="bg-blue-600 hover:bg-blue-700 mt-6">
                Learn More About Us
              </Button> */}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer comprehensive digital solutions to help your business thrive in the digital landscape
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <Zap className="h-8 w-8 text-blue-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Web Development</h3>
                <p className="text-gray-600 mb-6">
                  Custom web solutions built with modern technologies and best practices for optimal performance.
                </p>
                <Button variant="outline" size="sm">Learn More</Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors">
                  <Target className="h-8 w-8 text-green-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Digital Marketing</h3>
                <p className="text-gray-600 mb-6">
                  Strategic marketing campaigns that drive traffic, engagement, and conversions for your business.
                </p>
                <Button variant="outline" size="sm">Learn More</Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
                  <Users className="h-8 w-8 text-purple-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">UI/UX Design</h3>
                <p className="text-gray-600 mb-6">
                  Beautiful, intuitive designs that provide exceptional user experiences across all devices.
                </p>
                <Button variant="outline" size="sm">Learn More</Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-colors">
                  <Award className="h-8 w-8 text-orange-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Branding</h3>
                <p className="text-gray-600 mb-6">
                  Complete branding solutions that create memorable and impactful brand identities.
                </p>
                <Button variant="outline" size="sm">Learn More</Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors">
                  <Zap className="h-8 w-8 text-red-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">SEO Optimization</h3>
                <p className="text-gray-600 mb-6">
                  Improve your search engine rankings and drive organic traffic to your website.
                </p>
                <Button variant="outline" size="sm">Learn More</Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
                  <Target className="h-8 w-8 text-indigo-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Consulting</h3>
                <p className="text-gray-600 mb-6">
                  Strategic consulting to help you make informed decisions about your digital transformation.
                </p>
                <Button variant="outline" size="sm">Learn More</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      {/* <section id="portfolio" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Latest Work</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take a look at some of our recent projects and see how we've helped businesses achieve their goals
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="group relative overflow-hidden rounded-xl">
                <img
                  src={`https://images.unsplash.com/photo-157111629${item}000-f628ca6c8fc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80`}
                  alt={`Portfolio item ${item}`}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold">Project {item}</h3>
                    <p className="text-sm text-gray-200">Web Development</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Don't just take our word for it</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO, TechStart",
                content: "Etreeks transformed our digital presence completely. Their attention to detail and professional approach exceeded our expectations."
              },
              {
                name: "Michael Chen",
                role: "Marketing Director, GrowthCo",
                content: "Working with Etreeks was a game-changer for our business. They delivered results that drove real growth and engagement."
              },
              {
                name: "Emily Davis",
                role: "Founder, InnovateLab",
                content: "The team at Etreeks is incredibly talented and professional. They brought our vision to life better than we imagined."
              }
            ].map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="space-y-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let's work together to create something amazing that drives real results for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4">
              Get Started Today
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4">
              Schedule a Call
            </Button>
          </div>
        </div>
      </section> */}

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">hello@etreeks.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Office</h3>
                  <p className="text-gray-600">123 Business St, City, State 12345</p>
                </div>
              </div>
            </div>
            <Card className="p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Send Message</Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-blue-400 mb-4">Etreeks</div>
              <p className="text-gray-400">
                Creating exceptional digital experiences that drive business growth and success.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Web Development</li>
                <li>Digital Marketing</li>
                <li>UI/UX Design</li>
                <li>Branding</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Our Team</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                <li>LinkedIn</li>
                <li>Twitter</li>
                <li>Facebook</li>
                <li>Instagram</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Etreeks. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
