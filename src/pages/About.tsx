import { PencilLine } from "lucide-react";
import React from "react";

const features = [
  {
    title: "Know your mistakes instantly",
    description:
      "Instantly see which questions you answered incorrectly and learn from your mistakes. You can see a preview of your answered MCQ paper with correct and your answers highlighted.",
    image: "../../mcq.png",
  },
  {
    title: "See all your answers",
    description:
      "Review all your answers in one place. You can see your answers, correct answers, and the solutions for every question.",
    image: "../../correct.png",
  },
  {
    title: "Growth charts",
    description:
      "Track your progress with personalized growth charts. See your score and accuracy to know how you improved over time and identify areas for further improvement.",
    image: "../../charts.png",
  },
  {
    title: "Exam Results",
    description:
      "See all the exam results in one place. You can view your exam results, see branch merit and central merit position of yourself, and compare your performance with others.",
    image: "../../merit.png",
  },
  {
    title: "Solve class for every exam",
    description:
      "Get detailed solutions and explanations for every question after the exam, right on the portal. You can also view the class lecture sheet and solve sheet for the corresponding exam.",
    image: "../../solve-class.png",
  },
  {
    title: "Gifts & Scholarships",
    description:
      "Top performers are rewarded with exciting gifts like t-shirt and cap and exclusive scholarships. We reward your hard work and dedication with real-world benefits.",
    image: "../../gift.png",
  }
];

const values = [
  "Student-first design: Everything we build is for your success.",
  "Transparency: See your results, mistakes, and solutions instantly.",
  "Recognition: Top performers are celebrated and rewarded.",
  "Continuous improvement: We listen, learn, and evolve for you.",
];

const About: React.FC = () => {
  return (
    <article className="">
       
       {/* Header */}
      <div className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-blue-600 text-white p-4 rounded-full shadow-lg">
                <PencilLine className="h-6 w-6" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Our Features</h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
               Get to know the features and values that make our exam portal the best choice for students. We are dedicated to transforming the exam experience into a journey of growth, learning, and achievement.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      {/* <section className="max-w-2xl mx-auto mb-24">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">Our Story</h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-2">
          We began with a simple question: <span className="italic">What if exams could help you grow, not just grade you?</span> Frustrated by slow, outdated systems and a lack of meaningful feedback, we set out to build a platform where every student could see their progress, understand their mistakes, and be celebrated for their achievements.
        </p>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          Today, our portal empowers thousands of students to learn smarter, track their growth, and earn real rewards for their dedication. This is more than an exam system—it's your partner in success.
        </p>
      </section> */}

      {/* Features */}
      <section className="max-w-6xl mx-auto mt-10 px-4 sm:px-8 lg:px-16">
        <div className="grid gap-16 md:grid-cols-2">
          {features.map((feature) => (
            <figure key={feature.title} className="flex flex-col items-center text-center space-y-6">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full max-w-md h-64 rounded-lg object-contain "
              />
              <figcaption>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">{feature.title}</h3>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">{feature.description}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <footer className="max-w-2xl mx-auto text-center my-10 md:mt-40">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">Ready to see your progress in a whole new way?</h2>
        <p className="text-lg text-gray-700 mb-8">
          Join thousands of students who are transforming their exam experience. Discover your strengths, learn from your mistakes, and get the best support from us to achieve your dreams.
        </p>
        <a
          href="/courses"
          className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300"
        >
          Explore Courses
        </a>
      </footer>
    </article>
  );
};

export default About; 