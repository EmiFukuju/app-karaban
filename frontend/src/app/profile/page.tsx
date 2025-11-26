import { mockCaravans } from '../../constants/mockData';
import Image from 'next/image';

// Mock user data
const mockUser = {
  name: '김한준',
  email: 'hanjun.kim@example.com',
  profileImageUrl: 'https://images.unsplash.com/photo-1507003211169-e695c6add565?auto=format&fit=crop&w=200&q=80',
};

// Mock bookings data, using caravans from mockData
const mockBookings = [
  {
    bookingId: 'booking-1',
    caravan: mockCaravans[1], // 해변의 로맨틱 카라반
    checkIn: '2024.12.24',
    checkOut: '2024.12.26',
    totalPrice: 320000,
  },
  {
    bookingId: 'booking-2',
    caravan: mockCaravans[0], // 고요한 숲속의 쉼터
    checkIn: '2025.01.10',
    checkOut: '2025.01.12',
    totalPrice: 220000,
  },
];

const ProfilePage = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto px-4 py-12">
        <main className="w-full max-w-4xl mx-auto">
          {/* --- Profile Section --- */}
          <section className="flex items-center space-x-6 bg-gray-800 p-8 rounded-2xl mb-12">
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
                <Image
                    src={mockUser.profileImageUrl}
                    alt={mockUser.name}
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{mockUser.name}</h1>
              <p className="text-gray-400 mt-1">{mockUser.email}</p>
            </div>
          </section>

          {/* --- My Bookings Section --- */}
          <section>
            <h2 className="text-3xl font-bold mb-8">내 예약 내역</h2>
            <div className="space-y-8">
              {mockBookings.map((booking) => (
                <div key={booking.bookingId} className="bg-gray-800 rounded-2xl overflow-hidden md:flex md:space-x-6 p-4">
                  <div className="md:w-1/3 relative h-48 md:h-auto rounded-lg overflow-hidden">
                     <Image
                        src={booking.caravan.images[0]}
                        alt={booking.caravan.name}
                        layout="fill"
                        objectFit="cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-4 flex flex-col justify-between">
                    <div>
                        <h3 className="text-2xl font-bold">{booking.caravan.name}</h3>
                        <p className="text-gray-400 mt-1">{booking.caravan.location}</p>
                        <p className="text-gray-300 font-semibold mt-4">
                            {booking.checkIn} ~ {booking.checkOut}
                        </p>
                    </div>
                    <div className="mt-6 flex justify-between items-end">
                      <div>
                        <p className="text-gray-400 text-sm">총 결제 금액</p>
                        <p className="text-xl font-bold">₩{booking.totalPrice.toLocaleString()}</p>
                      </div>
                      <button className="bg-red-600/80 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm">
                        예약 취소
                      </button>
                    </div>
                  </div>
                </div>
              ))}
               {mockBookings.length === 0 && (
                 <div className="text-center py-16 bg-gray-800 rounded-2xl">
                    <p className="text-gray-400">예약 내역이 없습니다.</p>
                 </div>
                )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
