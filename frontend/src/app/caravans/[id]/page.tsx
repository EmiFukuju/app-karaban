import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { mockCaravans } from '../../../constants/mockData';
import { Star, MapPin, Wifi, Utensils, Car, Snowflake, Tv, Wind, PawPrint, Sun, Building, Tent, Trees } from 'lucide-react';
import BookingCard from '../../../components/domain/BookingCard';
import ReviewSection from '../../../components/domain/ReviewSection';
import { Caravan } from '@/types';

// A more robust amenity icon mapping
const amenityIcons: { [key: string]: React.ReactNode } = {
  wifi: <Wifi />,
  kitchen: <Utensils />,
  parking: <Car />,
  bbq: <Wind />,
  ac: <Snowflake />,
  tv: <Tv />,
  'pet-friendly': <PawPrint />,
  heating: <Sun />,
  'swimming-pool': <Building />,
  fireplace: <Trees />,
  'hot-tub': <Tent />,
  telescope: <Star />,
  fishing: <MapPin/>
};

const ImageGallery = ({ images, name }: { images: string[], name: string }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-2 h-[500px] rounded-2xl overflow-hidden">
    <div className="col-span-2 row-span-2">
      <div className="relative w-full h-full">
        <Image src={images[0]} alt={`${name} main`} layout="fill" objectFit="cover" className="hover:scale-105 transition-transform duration-300" />
      </div>
    </div>
    {images.slice(1, 5).map((src, index) => (
      <div key={index} className="hidden md:block">
        <div className="relative w-full h-full">
            <Image src={src} alt={`${name} ${index + 2}`} layout="fill" objectFit="cover" className="hover:scale-105 transition-transform duration-300" />
        </div>
      </div>
    ))}
  </div>
);

export async function generateStaticParams() {
  return mockCaravans.map((caravan) => ({
    id: caravan.id,
  }));
}

export default async function CaravanDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const caravan = mockCaravans.find((c: Caravan) => c.id === id);

  if (!caravan) {
    notFound();
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-4">
          <h1 className="text-4xl font-bold mb-2">{caravan.name}</h1>
          <div className="flex items-center space-x-4 text-gray-300">
            <div className="flex items-center space-x-1">
              <Star size={16} className="text-yellow-400" />
              <span>{caravan.rating.toFixed(1)}</span>
            </div>
            <span>·</span>
            <Link href="#" className="underline hover:text-white">{caravan.location}</Link>
          </div>
        </header>

        <ImageGallery images={caravan.images} name={caravan.name} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mt-12">
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center pb-6 border-b border-gray-700">
              <div>
                <h2 className="text-2xl font-semibold">호스트: {caravan.owner.name}님</h2>
                <p className="text-gray-400">최대 인원 {caravan.amenities?.length || 4}명 · 편의시설 {caravan.amenities?.length || 4}개</p>
              </div>
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-red-500">
                <Image src={caravan.owner.profileImage || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80'} alt={caravan.owner.name} layout="fill" objectFit="cover" />
              </div>
            </div>

            <div className="py-8 border-b border-gray-700">
              <h3 className="text-xl font-semibold mb-4">카라반 소개</h3>
              <p className="text-gray-300 whitespace-pre-line leading-relaxed">{caravan.description}</p>
            </div>

            <div className="py-8 border-b border-gray-700">
              <h3 className="text-xl font-semibold mb-6">편의시설</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                {caravan.amenities?.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-4 text-lg">
                    <div className="text-gray-400">{amenityIcons[amenity] || <Star />}</div>
                    <span className="capitalize">{amenity.replace(/-/g, ' ')}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <ReviewSection />
          </div>

          <div className="order-first lg:order-last">
            <BookingCard caravan={caravan} />
          </div>
        </div>
         <div className="text-center mt-16">
          <Link href="/" className="bg-gray-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-700 transition">
              모든 카라반 보기
          </Link>
        </div>
      </div>
    </div>
  );
}