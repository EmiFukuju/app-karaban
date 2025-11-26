'use client';

import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { UploadCloud, Wifi, Utensils, Car, Snowflake, Tv, Wind, PawPrint } from 'lucide-react';
import { toast } from 'sonner';

const amenitiesList = [
  { id: 'wifi', label: 'Wi-Fi', icon: <Wifi size={24} /> },
  { id: 'kitchen', label: '주방', icon: <Utensils size={24} /> },
  { id: 'parking', label: '주차', icon: <Car size={24} /> },
  { id: 'ac', label: '에어컨', icon: <Snowflake size={24} /> },
  { id: 'tv', label: 'TV', icon: <Tv size={24} /> },
  { id: 'bbq', label: 'BBQ 그릴', icon: <Wind size={24} /> },
  { id: 'pet-friendly', label: '반려동물 동반 가능', icon: <PawPrint size={24} /> },
];

type FormData = {
  name: string;
  description: string;
  address: string;
  maxGuests: number;
  bedrooms: number;
  amenities: string[];
  price: number;
};

export default function RegisterCaravanPage() {
  const router = useRouter();
  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: '',
      description: '',
      address: '',
      maxGuests: 2,
      bedrooms: 1,
      amenities: [],
      price: 100000,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log('New Caravan Data:', data);
    toast.success('카라반이 등록되었습니다!');
    router.push('/');
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">당신의 카라반을 등록하세요</h1>
          <p className="text-gray-400 text-center mb-12">몇 가지 간단한 단계만으로 새로운 여정을 시작할 수 있습니다.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">

            {/* --- 기본 정보 섹션 --- */}
            <section className="bg-gray-800 p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">기본 정보</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">카라반 이름</label>
                  <input {...register('name', { required: '카라반 이름은 필수입니다.' })} id="name" className="w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white focus:ring-red-500 focus:border-red-500" />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">한 줄 소개</label>
                  <input {...register('description', { required: '한 줄 소개를 입력해주세요.' })} id="description" className="w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white focus:ring-red-500 focus:border-red-500" />
                  {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>}
                </div>
              </div>
            </section>
            
            {/* --- 위치 및 상세 정보 섹션 --- */}
            <section className="bg-gray-800 p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold mb-6">위치 및 상세 정보</h2>
                <div className="space-y-6">
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-2">위치 (주소)</label>
                        <input {...register('address', { required: '주소는 필수입니다.' })} id="address" className="w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white focus:ring-red-500 focus:border-red-500" />
                        {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address.message}</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="maxGuests" className="block text-sm font-medium text-gray-300 mb-2">수용 인원</label>
                            <input type="number" {...register('maxGuests', { valueAsNumber: true, min: { value: 1, message: "최소 1명 이상이어야 합니다."} })} id="maxGuests" min="1" className="w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white focus:ring-red-500 focus:border-red-500" />
                             {errors.maxGuests && <p className="text-red-400 text-sm mt-1">{errors.maxGuests.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-300 mb-2">침실 수</label>
                            <input type="number" {...register('bedrooms', { valueAsNumber: true, min: { value: 0, message: "0 이상의 값을 입력해주세요." }})} id="bedrooms" min="0" className="w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white focus:ring-red-500 focus:border-red-500" />
                            {errors.bedrooms && <p className="text-red-400 text-sm mt-1">{errors.bedrooms.message}</p>}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 편의시설 섹션 --- */}
            <section className="bg-gray-800 p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">편의시설</h2>
              <Controller
                name="amenities"
                control={control}
                render={({ field }) => (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {amenitiesList.map(amenity => (
                      <label key={amenity.id} className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition ${field.value.includes(amenity.id) ? 'bg-red-900/50 border-red-500 text-white' : 'border-gray-700 hover:border-gray-600'}`}>
                        <input type="checkbox" className="sr-only" value={amenity.id} onChange={(e) => field.onChange( e.target.checked ? [...field.value, amenity.id] : field.value.filter(id => id !== amenity.id) )} checked={field.value.includes(amenity.id)} />
                        {amenity.icon}
                        <span className="mt-2 text-sm font-medium text-center">{amenity.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              />
            </section>

            {/* --- 요금 섹션 --- */}
            <section className="bg-gray-800 p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">1박 요금</h2>
              <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-2">요금 (원)</label>
                  <input type="number" {...register('price', { required: "가격을 입력해주세요.", valueAsNumber: true, min: { value: 1, message: "가격은 0보다 커야 합니다." } })} id="price" min="0" step="1000" className="w-full md:w-1/2 bg-gray-700 border-gray-600 rounded-md shadow-sm text-white focus:ring-red-500 focus:border-red-500" />
                  {errors.price && <p className="text-red-400 text-sm mt-1">{errors.price.message}</p>}
                </div>
            </section>

            {/* --- 사진 섹션 --- */}
            <section className="bg-gray-800 p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">사진</h2>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-12 text-center cursor-pointer hover:border-red-500 transition-colors">
                <UploadCloud className="mx-auto h-12 w-12 text-gray-500" />
                <p className="mt-4 text-sm text-gray-400">클릭하거나 파일을 드래그하여 업로드하세요</p>
                <p className="mt-1 text-xs text-gray-500">실제 파일 업로드는 구현되지 않습니다.</p>
              </div>
            </section>

            {/* --- 제출 버튼 --- */}
            <div className="pt-6">
              <button type="submit" className="w-full bg-red-600 text-white font-bold py-4 px-4 rounded-lg hover:bg-red-700 transition-colors text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500">
                등록하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
