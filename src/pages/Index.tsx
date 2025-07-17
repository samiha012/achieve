import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle, Users, Target, Zap, Award, Star, Phone, Mail, MapPin, Menu, X, NotebookPen, Headset, Gift, Contact } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ContactForm from '@/components/ContactForm';
import Testimonials from '@/components/Testimonial';

const Index = () => {
  const [popularCourses, setPopularCourses] = useState([]);

  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (searchQuery.trim()) {
  //     // Open Apars Classroom search results in new tab
  //     window.open(`https://aparsclassroom.com/shop/achieve/HSC_25/?search=${encodeURIComponent(searchQuery)}`, '_blank');
  //   }
  // };

  // Counter animation hook with viewport detection
  const useCounter = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const fetchFeatured = async () => {
        try {
          const baseURL = import.meta.env.VITE_API_URL || '';
          const res = await axios.get(`${baseURL}/api/courses/featured`);
          setPopularCourses(res.data);
        } catch (error) {
          console.error('Error fetching featured courses:', error);
        }
      };

      fetchFeatured();
    }, []);

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

  const studentsCounter = useCounter(12000);
  const coursesCounter = useCounter(12);
  const branchesCounter = useCounter(15);

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-200 opacity-30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-200 opacity-20 rounded-full blur-2xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-20">
            <div className="space-y-10 text-center md:text-left">
              <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                Excel in Your
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mx-2">Exams</span>
                <br className="hidden md:block" />
                <span className="text-gray-800">with Achieve Exam Batches</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto md:mx-0">
                Join thousands of students in our offline exam centers across Bangladesh. Enroll in the best HSC and admission exam batch courses designed for students.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/branches">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-7 h-12 text-base font-semibold rounded-lg shadow-md transition-all duration-200"
                  >
                    Explore Branches
                  </Button>
                </Link>
                <Link to="/courses" target="_blank">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="border border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white px-7 h-12 text-base font-semibold rounded-lg shadow-md transition-all duration-200"
                  >
                    Visit On-going Courses
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            {/* Right Column - Image */}
            <div className="flex justify-center md:justify-end">
              <div className="relative">
                <img
                  src="https://i.postimg.cc/zvp4RbX9/513670571-650677781349136-8449086125678648735-n.jpg"
                  alt="Hero Illustration"
                  className="w-full max-w-md object-contain rounded-2xl shadow-2xl border-4 border-white/80 hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute -bottom-6 -right-6 bg-white/80 rounded-2xl p-3 shadow-lg backdrop-blur-md hidden md:block">
                  <span className="text-blue-600 font-bold text-lg">Exam Center</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 hidden md:block">
          <div className="flex flex-col items-center space-y-2 animate-bounce">
            {/* <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
            </div> */}

            <svg
              className="w-8 h-8 drop-shadow-lg animate-bounce"
              fill="none"
              stroke="purple"
              viewBox="0 0 24 24"
              style={{ filter: 'drop-shadow(0 0 8px rgba(255, 205, 255, 0.6))' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
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

          <div className="flex flex-wrap justify-center gap-8">
            {popularCourses.map((course, index) => (
              <Card key={course.productId || index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden w-full max-w-sm bg-gray-50">
                <div className="relative">
                  <img
                    src={course.ProductImage}
                    alt={course.productName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="px-6 py-2">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{course.productFullName}</h3>

                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">(5)</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-blue-600">৳{course.currency_amount}</div>
                    <div className="text-sm text-gray-500 line-through">
                      ৳{parseInt(course.currency_amount) + 500}
                    </div>
                  </div>

                  <a href={course.Permalink} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 group">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </a>
                </CardContent>
                <br />
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
                  ACHIEVE অফলাইন এক্সাম ব্যাচ এমনভাবে সাজানো হয়েছে যেনো একজন স্টুডেন্ট ACS সাথে অনলাইনে পড়াশোনা করে সেই অনুযায়ী অফলাইনে পর্যাপ্ত সংখ্যক পরীক্ষা দিয়ে নিজেকে প্রস্তুত করতে পারে
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

      {/* Statistics Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div ref={studentsCounter.elementRef} className="space-y-2 flex flex-col items-center bg-white rounded-xl shadow-md border border-blue-100 p-8">
              <Users className="h-9 w-9 text-blue-500 mb-2" />
              <div className="text-4xl font-extrabold text-blue-700">{studentsCounter.count.toLocaleString()}+</div>
              <div className="text-base text-gray-600">Students Enrolled</div>
            </div>
            <div ref={coursesCounter.elementRef} className="space-y-2 flex flex-col items-center bg-white rounded-xl shadow-md border border-purple-100 p-8">
              <Award className="h-9 w-9 text-purple-500 mb-2" />
              <div className="text-4xl font-extrabold text-purple-700">{coursesCounter.count}+</div>
              <div className="text-base text-gray-600">Different Courses</div>
            </div>
            <div ref={branchesCounter.elementRef} className="space-y-2 flex flex-col items-center bg-white rounded-xl shadow-md border border-orange-100 p-8">
              <MapPin className="h-9 w-9 text-orange-500 mb-2" />
              <div className="text-4xl font-extrabold text-orange-600">{branchesCounter.count}</div>
              <div className="text-base text-gray-600">Branches Nationwide</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Commitment</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer comprehensive exam routines and guidelines to ensure you are fully prepared for your exams
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white rounded-2xl border border-gray-100">
              <CardContent className="p-8 flex flex-col items-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <Zap className="h-8 w-8 text-blue-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Extensive exams</h3>
                <p className="text-gray-600 mb-6 text-center">
                  Daily Exams, weekly exams, paper final, subject final, model test and  home practice Exams to keep you on track and assess your progress of preparation.
                </p>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white rounded-2xl border border-gray-100">
              <CardContent className="p-8 flex flex-col items-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors">
                  <Target className="h-8 w-8 text-green-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Study Material</h3>
                <p className="text-gray-600 mb-6 text-center">
                  Study materials including question bank, compact information and practice questions to aid your preparation.
                </p>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white rounded-2xl border border-gray-100">
              <CardContent className="p-8 flex flex-col items-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
                  <Users className="h-8 w-8 text-purple-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Guideline session</h3>
                <p className="text-gray-600 mb-6 text-center">
                  Sessions from teachers and top students to guide you through the exam process and strategies for success.
                </p>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white rounded-2xl border border-gray-100">
              <CardContent className="p-8 flex flex-col items-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-colors">
                  <NotebookPen className="h-8 w-8 text-orange-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Solve Class</h3>
                <p className="text-gray-600 mb-6 text-center">
                  Online solve class and solve sheet will be provided to help you understand you lackings when participating in the exams.
                </p>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white rounded-2xl border border-gray-100">
              <CardContent className="p-8 flex flex-col items-center">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors">
                  <Headset className="h-8 w-8 text-red-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">24/7 QnA Service</h3>
                <p className="text-gray-600 mb-6 text-center">
                  Our dedicated support team is available 24/7 to answer your questions and provide helpful solutions to your every query.
                </p>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white rounded-2xl border border-gray-100">
              <CardContent className="p-8 flex flex-col items-center">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
                  <Gift className="h-8 w-8 text-indigo-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Gifts and Scholarships</h3>
                <p className="text-gray-600 mb-6 text-center">
                  Get a free premium t-shirt when you buy a course from us. Various Scholarships are available for top performers in our exams.
                </p>
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
      <Testimonials />

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
              <div className="flex items-start space-x-4 bg-gray-50 rounded-xl p-4 shadow-sm">
                <div className="bg-green-100 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">+09639-102552</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 bg-gray-50 rounded-xl p-4 shadow-sm">
                <div className="bg-blue-100 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook-icon lucide-facebook h-6 w-6 text-blue-600"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Page</h3>
                  <p className="text-gray-600"><Link to="https://www.facebook.com/ACSAchieveCentre" target="_blank">Achieve Exam Centre </Link></p>
                </div>
              </div>
              <div className="flex items-start space-x-4 bg-gray-50 rounded-xl p-4 shadow-sm">
                <div className="bg-orange-100 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Branches</h3>
                  <p className="text-gray-600"><Link to="/branches" target="_blank">View Branches across Bangladesh</Link></p>
                </div>
              </div>
            </div>
            <Card className="p-8 bg-gray-50 rounded-2xl shadow-lg">
              <ContactForm />
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-white py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
            <div>
              <div className="text-2xl font-bold text-blue-500 mb-4">Achieve</div>
              <p className="text-gray-400">
                A sister concern of ACS for offline exam centres.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-700">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-blue-600 transition-colors">About Us</a></li>
                <li><a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-700">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="https://www.facebook.com/ACSAchieveCentre" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">Facebook</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-700">Location</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Bangladesh</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-300 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Achieve. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
