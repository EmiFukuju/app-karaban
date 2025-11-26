'use client';

import { MapPin, Users, Star, Search } from 'lucide-react';
import { mockCaravans } from '../constants/mockData';
import { Caravan } from '../types';
import Link from 'next/link';
import { useState, useMemo, useEffect, Suspense } from 'react'; // Import Suspense
import { useSearchParams } from 'next/navigation';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';

registerLocale('ko', ko);

// Helper function to check for date overlap
const datesOverlap = (
  startDate1: Date,
  endDate1: Date,
  startDate2: Date,
  endDate2: Date
) => {
  return startDate1 < endDate2 && startDate2 < endDate1;
};

function HomeContent() { // Renamed from Home to HomeContent
  const searchParams = useSearchParams();
  const initialLocationSearch = searchParams.get('location') || '';

  const [searchTerm, setSearchTerm] = useState(initialLocationSearch);
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    setSearchTerm(initialLocationSearch);
  }, [initialLocationSearch]);

  const filteredCaravans = useMemo(() => {
    return mockCaravans.filter((caravan) => {
      const matchesSearchTerm =
        caravan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caravan.location.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearchTerm) return false;

      if (!checkInDate || !checkOutDate) {
        return true;
      }

      const hasOverlap = caravan.bookedDates?.some((booked) => {
        const bookedStart = new Date(booked.start);
        const bookedEnd = new Date(booked.end);
        return datesOverlap(checkInDate, checkOutDate, bookedStart, bookedEnd);
      });

      return !hasOverlap;
    });
  }, [searchTerm, checkInDate, checkOutDate]);

  const [recommendedCaravans, setRecommendedCaravans] = useState<Caravan[]>([]);

  useEffect(() => {
    if (filteredCaravans.length === 0) {
      const shuffled = [...mockCaravans].sort(() => 0.5 - Math.random());
      setRecommendedCaravans(shuffled.slice(0, 3));
    } else {
      setRecommendedCaravans([]);
    }
  }, [filteredCaravans]);


  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1510427906950-8b1a3e81a3b8?auto=format&fit=crop&w=1600&q=80')"}}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            잊지 못할 여행, CaravanShare와 함께
          </h1>
          <p className="text-lg md:text-xl">
            전국 각지의 특별한 카라반을 만나보세요.
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="absolute -bottom-16 md:-bottom-8 w-full px-4">
          <div className="bg-white rounded-full p-3 md:p-4 shadow-lg flex flex-col md:flex-row items-center md:space-x-4 max-w-4xl mx-auto">
            <div className="w-full md:flex-1 mb-2 md:mb-0">
              <label htmlFor="location" className="block text-xs font-bold text-gray-700 ml-2">지역</label>
              <div className="flex items-center space-x-2">
                <MapPin className="text-gray-400" />
                <input 
                  type="text" 
                  id="location" 
                  placeholder="어디로 떠나시나요?" 
                  className="w-full bg-white text-black focus:outline-none" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="hidden md:block h-8 border-l border-gray-200"></div>
            <div className="w-full md:flex-1 mb-2 md:mb-0">
              <label htmlFor="checkin" className="block text-xs font-bold text-gray-700 ml-2">체크인</label>
              <div className="flex items-center space-x-2">
                <DatePicker
                    id="checkin"
                    selected={checkInDate}
                    onChange={(date: Date | null) => setCheckInDate(date)}
                    selectsStart
                    startDate={checkInDate}
                    endDate={checkOutDate}
                    placeholderText="날짜 선택"
                    className="w-full bg-white text-black focus:outline-none"
                    dateFormat="yyyy/MM/dd"
                    locale="ko"
                    wrapperClassName="w-full"
                    calendarClassName="dark-theme-calendar"
                />
              </div>
            </div>
            <div className="hidden md:block h-8 border-l border-gray-200"></div>
            <div className="w-full md:flex-1 mb-2 md:mb-0">
              <label htmlFor="checkout" className="block text-xs font-bold text-gray-700 ml-2">체크아웃</label>
              <div className="flex items-center space-x-2">
                <DatePicker
                    id="checkout"
                    selected={checkOutDate}
                    onChange={(date: Date | null) => setCheckOutDate(date)}
                    selectsEnd
                    startDate={checkInDate}
                    endDate={checkOutDate}
                    minDate={checkInDate || undefined}
                    placeholderText="날짜 선택"
                    className="w-full bg-white text-black focus:outline-none"
                    dateFormat="yyyy/MM/dd"
                    locale="ko"
                    wrapperClassName="w-full"
                    calendarClassName="dark-theme-calendar"
                />
              </div>
            </div>
            <div className="hidden md:block h-8 border-l border-gray-200"></div>
            <div className="w-full md:flex-1 mb-2 md:mb-0">
              <label htmlFor="guests" className="block text-xs font-bold text-gray-700 ml-2">인원</label>
              <div className="flex items-center space-x-2">
                <Users className="text-gray-400" />
                <select 
                    id="guests"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full bg-white text-black focus:outline-none"
                >
                    {[...Array(10).keys()].map(i => (
                        <option key={i + 1} value={i + 1}>{i + 1}명</option>
                    ))}
                </select>
              </div>
            </div>
            <button className="bg-red-500 text-white rounded-full p-3 hover:bg-red-600 transition self-end md:self-center">
              <Search size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 mt-24 text-white">
        {/* Recommended Caravans Section */}
        <section className="my-16">
          <h2 className="text-3xl font-bold mb-8">
            {filteredCaravans.length > 0 ? "검색 결과" : "해당 기간에는 예약 가능한 숙소가 없습니다."}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCaravans.length > 0 ? (
              filteredCaravans.map((caravan: Caravan) => (
                <Link href={`/caravans/${caravan.id}`} key={caravan.id} className="group cursor-pointer">
                  <div className="relative w-full h-72 rounded-lg overflow-hidden">
                    <img src={caravan.images[0]} alt={caravan.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute top-0 right-0 p-2">
                      <span className="bg-black/60 text-white rounded-full px-2 py-1 text-sm font-semibold">{caravan.location}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg">{caravan.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="text-yellow-500" size={16} />
                        <span className="font-semibold">{caravan.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{caravan.description.substring(0, 50)}...</p>
                    <p className="mt-2 text-lg font-bold text-right">₩{caravan.pricePerDay.toLocaleString()} / 박</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-16 bg-gray-800 rounded-lg">
                <p className="text-xl text-gray-300 mb-4">선택하신 날짜에는 예약 가능한 숙소가 없습니다.</p>
                <h3 className="2xl font-bold mb-6">이런 곳은 어때요?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 px-4">
                  {recommendedCaravans.map((caravan: Caravan) => (
                    <Link href={`/caravans/${caravan.id}`} key={caravan.id} className="group cursor-pointer">
                      <div className="relative w-full h-56 rounded-lg overflow-hidden">
                        <img src={caravan.images[0]} alt={caravan.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300" />
                        <div className="absolute top-0 right-0 p-1">
                          <span className="bg-black/60 text-white rounded-full px-2 py-1 text-xs font-semibold">{caravan.location}</span>
                        </div>
                      </div>
                      <div className="p-2">
                        <h4 className="font-bold text-base">{caravan.name}</h4>
                        <p className="text-sm text-gray-400">₩{caravan.pricePerDay.toLocaleString()} / 박</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Popular Destinations Section */}
        <section className="my-16">
          <h2 className="text-3xl font-bold mb-8">인기 여행지</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[{name: '제주도'}, {name: '강원도'}, {name: '부산'}, {name: '경주'}].map((city) => (
              <Link href={`/?location=${city.name.split(' ')[0]}`} key={city.name} className="flex flex-col justify-center items-center h-24 p-3 border border-gray-700 rounded-lg bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all cursor-pointer hover:shadow-md">
                <h3 className="font-bold text-lg text-white">{city.name}</h3>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="text-white text-center py-20">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}