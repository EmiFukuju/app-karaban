'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'; // sonner import moved to top
import { Caravan } from '@/types';

export default function BookingCard({ caravan }: { caravan: Caravan }) {
    const router = useRouter();

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);

    const numberOfNights = useMemo(() => {
        if (!checkIn || !checkOut) return 0;
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const diff = end.getTime() - start.getTime();
        if (diff <= 0) return 0;
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }, [checkIn, checkOut]);

    const totalPrice = useMemo(() => {
        return caravan.pricePerDay * numberOfNights;
    }, [caravan.pricePerDay, numberOfNights]);

    const handleBooking = () => {
        if (!checkIn || !checkOut || numberOfNights <= 0) {
            toast.error('체크인 및 체크아웃 날짜를 올바르게 선택해주세요.');
            return;
        }
        toast.success(`예약이 확정되었습니다! (총 ${totalPrice.toLocaleString()}원) 🎉`);
        router.push('/');
    };

    return (
        <div className="sticky top-28 p-6 bg-gray-800 rounded-xl shadow-2xl text-white">
            <p className="text-2xl font-bold mb-4">
                ₩{caravan.pricePerDay.toLocaleString()} <span className="text-base font-normal text-gray-300">/ 박</span>
            </p>
            <div className="border border-gray-600 rounded-lg">
                <div className="grid grid-cols-2">
                    <div className="p-3">
                        <label htmlFor="checkIn" className="text-xs font-bold text-gray-400">체크인</label>
                        <input
                            id="checkIn"
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            className="w-full bg-transparent text-sm outline-none appearance-none"
                            style={{ colorScheme: 'dark' }}
                        />
                    </div>
                    <div className="p-3 border-l border-gray-600">
                        <label htmlFor="checkOut" className="text-xs font-bold text-gray-400">체크아웃</label>
                        <input
                            id="checkOut"
                            type="date"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            className="w-full bg-transparent text-sm outline-none appearance-none"
                            style={{ colorScheme: 'dark' }}
                        />
                    </div>
                </div>
                <div className="p-3 border-t border-gray-600">
                    <label htmlFor="guests" className="text-xs font-bold text-gray-400">인원</label>
                    <select
                        id="guests"
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value))}
                        className="w-full bg-gray-800 text-sm outline-none border-0"
                    >
                        {[...Array(10).keys()].map(i => (
                            <option key={i + 1} value={i + 1}>게스트 {i + 1}명</option>
                        ))}
                    </select>
                </div>
            </div>
            
            {numberOfNights > 0 && (
                <div className="py-4 space-y-2 border-b border-gray-700">
                    <div className="flex justify-between text-gray-300">
                        <span>₩{caravan.pricePerDay.toLocaleString()} x {numberOfNights}박</span>
                        <span>₩{totalPrice.toLocaleString()}</span>
                    </div>
                     <div className="flex justify-between text-gray-300">
                        <span>서비스 수수료</span>
                        <span>₩0</span>
                    </div>
                </div>
            )}
            
            <div className="flex justify-between font-bold text-lg pt-4">
                <span>총 합계</span>
                {numberOfNights > 0 ? (
                    <span>₩{totalPrice.toLocaleString()}</span>
                ) : (
                    <span className="text-sm text-gray-400">날짜를 선택해주세요</span>
                )}
            </div>

            <button 
                onClick={handleBooking}
                className="w-full bg-red-600 text-white font-bold py-3 rounded-lg mt-4 hover:bg-red-700 transition-transform transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed"
                disabled={numberOfNights <= 0}
            >
                예약하기
            </button>
        </div>
    );
}
