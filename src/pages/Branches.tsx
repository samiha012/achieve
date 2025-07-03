import React from 'react';
import { ArrowLeft, MapPin, User, Mail, Phone, LocateFixed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface Branch {
  text: string;
  address: string;
  coach: string;
  tagline: string;
  instruction: string;
  photo: string;
  id: string;
  map?: string;
  email?: string;
  phone?: string;
}

const hardcodedBranches: Branch[] = [
  {
    text: "Motijheel Monarchs",
    address: "3rd Floor, 2/2/C, Sufia Mansion(Opposite side of NDC), Arambagh Motijheel, Dhaka - 1000",
    coach: "Md Nazmus Sakib",
    tagline: "",
    instruction: "",
    photo: "https://i.ibb.co/k6Wm31V/Motijheel.jpg",
    id: "661a5f4a4443e152fd4402a0",
    map: "https://acsfs.com/nwo3F",
    phone: "01332 552 510-14"
  },
  {
    text: "Chattogram Vikings - Chokbazar",
    address: "মতি টাওয়ার (৫ম তলা), গুলজার মোড়, চকবাজার।",
    coach: "Sanjoy Chakraborty",
    tagline: "",
    instruction: "",
    photo: "https://i.ibb.co/BytmZH7/Chattogram.jpg",
    id: "661ac6d3041d7b3383d93bce",
    map: "https://acsfs.com/0wprx",
    phone: "01332 552 536 & 38"
  },
  {
    text: "Mirpur Gladiators",
    address: "দেওয়ান ম্যানশান(৩য় তলা) মসজিদ গলি,রোড -০১,ব্লক -খ ,মিরপুর-১০ গোলচক্কর,মিরপুর।",
    coach: "Hemel Barua",
    tagline: "",
    instruction: "",
    photo: "https://i.ibb.co/9pHMvdW/IMG-1511.jpg",
    id: "661b9c857154d9d08df094b3",
    map: "https://acsfs.com/iwo21",
    phone: "01321 219 004-05"
  },
  {
    text: "Kushtia Kings",
    address: "৬৯/০১, ২য় তলা। বিচারপতি মাহবুব মুর্শেদ সড়ক, পেয়ারা তলা, কুষ্টিয়া।",
    coach: "M Mashrur Hussain ",
    tagline: "",
    instruction: "",
    photo: "https://i.ibb.co/DgZGhSL/Kushtia.jpg",
    id: "661e2d66bda95d7c80c29591",
    map: "https://acsfs.com/ywpqv",
    phone: "01332 552 533-34"
  },
  {
    text: "Mymensingh Warriors",
    address: "সাহেব আলী টাওয়ার (২য় তলা), সাহেব আলী রোড, নতুন বাজার, ময়মনসিংহ",
    coach: "Abhi Datta Tushar",
    tagline: "",
    instruction: "",
    photo: "https://i.ibb.co/CwnCt4p/Mymenshing.jpg",
    id: "661e2e08bda95d7c80c295b0",
    map: "https://acsfs.com/zwo4u",
    phone: "01332 552 521-22"
  },
  {
    text: "Rangpur Rangers",
    address: "বাংলাদেশ ব্যাংক মোড় পেট্রোল পাম্পের পাশে মেট্রো ডেন্টাল কেয়ার বিল্ডিং এর ৩য় তলা।",
    coach: "Razib Hossain Sarkar",
    tagline: "",
    instruction: "",
    photo: "https://i.ibb.co/k1vzdgZ/Screenshot-2024-05-06-at-4-02-08-PM.png",
    id: "661e2e43bda95d7c80c295b9",
    map: "https://acsfs.com/9wo8Q",
    phone: "01332 552 515-16"
  },
  {
    text: "Farmgate Falcons",
    address: "74/B/1, RH Home Centre ( 6th Floor ) ,  Green Road Dhaka-1215",
    coach: "Md Nazmus Sakib",
    tagline: "",
    instruction: "",
    photo: "https://i.ibb.co/zSh9KvD/Farmgate.jpg",
    id: "661e2e82bda95d7c80c295c6",
    map: "https://acsfs.com/Xwo0P",
    phone: "01332 552 501-03 & 25"
  },
  {
    text: "Uttara Raptors",
    address: "House-05, Line-12, Sector-06 NZ Center Lift-03,  Uttara model Town. ",
    coach: "Numeri Sattar Apar",
    tagline: "",
    instruction: "",
    photo: "https://i.ibb.co/5kfrrx2/uttara.jpg",
    id: "661e2ebfbda95d7c80c295cd",
    map: "https://acsfs.com/Ywo9k",
    phone: "01332 552 507-09"
  },
  {
    text: "Khulna Tigers",
    address: "১,টিবি বাউন্ডারি রোড,খুলনা সদর। কবির কমপ্লেক্স এর ২য় তলা ",
    coach: "",
    tagline: "",
    instruction: "",
    photo: "https://i.ibb.co/YQ0Qwbw/Khulna.jpg",
    id: "661e2ef3bda95d7c80c295d4",
    map: "https://acsfs.com/mwpwL",
    phone: "01332 552 530-32"
  },
  {
    text: "Barisal Predators",
    address: "Shranti,Ground Floor (Old Unilever Office) Adam Ali Haji Goli, Battala, Barishal.",
    coach: "Tofael Ahmed",
    tagline: "",
    instruction: "",
    photo: "https://i.ibb.co/ZBpfvqV/Barishal.jpg",
    id: "661e2f30bda95d7c80c295de",
    map: "https://acsfs.com/GwpeK", 
    phone: "01332 552 527-29"
  },
  {
    text: "Bogura Titans",
    address: "BCL BK Tower ( ৪র্থ তলা ), কালিমন্দিরের পিছনে, জলেশ্বরীতলা, বগুড়া।",
    coach: "Apurbo Opu",
    tagline: "",
    instruction: "",
    photo: "https://i.ibb.co/kKKQcRC/Bogura.jpg",
    id: "661f5ad2b3b706be5d643f1a",
    map: "https://acsfs.com/9wo64",
    phone: "01321 219 008"
  },
  {
    text: "Rajshahi Royals",
    address: "হোল্ডিং নং- ৭৯, সাং-কাদিরগঞ্জ, ডাকঘর: জিপিও-৬০০০, থানা- বোয়ালিয়া, জেলা- রাজশাহী",
    coach: "Apurbo Opu",
    tagline: "",
    instruction: "",
    photo: "https://i.ibb.co/bBmbxJs/Rajshahi.jpg",
    id: "661f5b87b3b706be5d644231",
    map: "https://acsfs.com/Wwo5T",
    phone: "01321219006-7"
  },
  {
    text: "Sylhet Sultans",
    address: "Sylhet ",
    coach: "Sharoare Hosan Emon",
    tagline: "",
    instruction: "",
    photo: "https://i.ibb.co/cJMKG7j/441460813-8127156693979339-7679962188145291627-n.jpg",
    id: "665aa0f1e1ee4b127b951db2",
    map: "https://acsfs.com/Awo7z",
    phone: "01321 219 002-03"
  },
  {
    text: "Cumilla Aces",
    address: "মিজান এম্পায়ার (৩য় তলা)  রাণীর বাজার, আশোকতলা,চৌমুহন, কুমিল্লা।",
    coach: "Md. Numeri Sattar Apar ",
    tagline: "",
    instruction: "",
    photo: "https://i.ibb.co/M6vnYtv/c442a911-8176-4979-b596-b14b23828824.jpg",
    id: "672dfdc53a6e7e4645fc649d",
    map: "https://acsfs.com/RwgdV",
     phone: "01332 552 537"
  },
  {
    text: "Chattogram Vikings - Halishohor",
    address: "মমতাজ হাইটস, ২য় তলা, (ncc bank এর পাশে), বড়পুল মোড়, হালিশহর",
    coach: "Sanjoy Chakraborty",
    tagline: "",
    instruction: "",
    photo: "https://i.ibb.co/4wSGTGgS/Chattogram.jpg",
    id: "685facdda52820bc527958d2",
    map: ""
  }
];

const Branches = () => {
  const branchList = hardcodedBranches;
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <Link to="/">
              <Button
                variant="outline"
                className="border-white hover:bg-white hover:text-blue-600 transition-colors duration-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-blue-600 text-white p-4 rounded-full shadow-lg">
                <MapPin className="h-6 w-6" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Our Branches</h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Find the nearest <span className="text-blue-600 font-semibold">Achieve</span> center to kickstart your academic or admission journey.
            </p>
          </div>
        </div>
      </div>
      
      {/* Branches Grid */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {branchList.map((branch) => (
              <Card
                key={branch.id}
                className="group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden rounded-xl"
              >
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-[160px_1fr] gap-0">
                    {/* Left side - Image */}
                    <div className="relative h-72 w-full md:h-auto rounded-xl overflow-hidden bg-white">
                      <div className="p-6 h-full w-full">
                        <img
                          src={branch.photo}
                          alt={branch.text}
                          className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.src =
                              'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
                          }}
                        />
                      </div>
                    </div>

                    {/* Right side - Details */}
                    <div className="p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{branch.text}</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start space-x-2">
                            <MapPin className="h-4 w-4 text-blue-600 mt-0.5" />
                            <p className="text-gray-700 leading-snug">{branch.address}</p>
                          </div>
                          {branch.map && (
                            <div className="flex items-start space-x-2">
                              <LocateFixed className="h-4 w-4 text-green-600 mt-0.5" />
                              <div>
                                <p className="text-gray-500">
                                  <Link to={branch.map}>
                                  Click to see map location
                                  </Link>
                                  
                                  </p>
                              </div>
                            </div>
                          )}
                          {branch.phone && (
                            <div className="flex items-start space-x-2">
                              <Phone className="h-4 w-4 text-orange-600 mt-0.5" />
                              <div>
                                <p className="text-gray-800 break-all">{branch.phone}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Branches;
