'use client';

import { Star } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner'; // sonner import moved to top

const mockReviews = [
    {
        id: 'rev-1',
        author: {
            name: '김여행',
            avatarUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=100&h=100&q=80',
        },
        rating: 5,
        date: '2024년 10월',
        comment: '사진보다 훨씬 더 아늑하고 좋았습니다! 숲속에서 제대로 힐링하고 가요. 호스트님도 정말 친절하셨습니다. 재방문 의사 100%입니다!',
    },
    {
        id: 'rev-2',
        author: {
            name: '박캠퍼',
            avatarUrl: 'https://images.unsplash.com/photo-1531123414780-f74242c2b052?auto=format&fit=crop&w=100&h=100&q=80',
        },
        rating: 4,
        date: '2024년 9월',
        comment: '위치도 좋고 카라반도 깨끗했습니다. 다만, 저녁에 벌레가 조금 있어서 그 점은 아쉬웠어요. 그래도 전반적으로 만족스러운 여행이었습니다.',
    },
    {
        id: 'rev-3',
        author: {
            name: '최가족',
            avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80',
        },
        rating: 5,
        date: '2024년 8월',
        comment: '아이들과 함께 방문했는데, 아이들이 정말 좋아했어요. 편의시설도 잘 갖춰져 있어서 불편함 없이 지냈습니다. 좋은 추억 만들어주셔서 감사합니다!',
    },
];

const renderStars = (rating: number) => {
    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    size={16}
                    className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                />
            ))}
        </div>
    );
};

export default function ReviewSection() {

    const averageRating = (mockReviews.reduce((acc, review) => acc + review.rating, 0) / mockReviews.length).toFixed(2);

    const handleWriteReviewClick = () => {
        toast.error('예약한 사용자만 작성할 수 있습니다.');
    };

    return (
        <div className="py-8 border-t border-gray-700 mt-8">
            <h2 className="text-2xl font-bold flex items-center mb-6">
                <Star size={24} className="mr-3 text-yellow-400 fill-yellow-400" />
                {averageRating} · 후기 {mockReviews.length}개
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-8">
                {mockReviews.map((review) => (
                    <div key={review.id}>
                        <div className="flex items-center space-x-4 mb-3">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                <Image src={review.author.avatarUrl} alt={review.author.name} layout="fill" objectFit="cover" />
                            </div>
                            <div>
                                <p className="font-semibold">{review.author.name}</p>
                                <p className="text-sm text-gray-400">{review.date}</p>
                            </div>
                        </div>
                        {renderStars(review.rating)}
                        <p className="mt-3 text-gray-300 leading-relaxed">
                            {review.comment}
                        </p>
                    </div>
                ))}
            </div>
            <button
                onClick={handleWriteReviewClick}
                className="font-semibold border-2 border-gray-300 rounded-lg px-6 py-3 hover:bg-gray-700 transition-colors"
            >
                후기 작성하기
            </button>
        </div>
    );
}
