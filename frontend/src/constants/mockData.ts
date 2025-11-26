import { Caravan, User } from '../types';

// User 데이터
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: '한준',
    email: 'host1@test.com',
    profileImage: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
  },
  {
    id: 'user-2',
    name: '지민',
    email: 'host2@test.com',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
];

// Caravan 데이터 (에메랄드 삭제됨, 총 5개)
export const mockCaravans: Caravan[] = [
  {
    id: 'c-1',
    name: '아늑한 숲속 카라반',
    location: '강원도 평창',
    pricePerDay: 120000,
    rating: 4.8,
    owner: mockUsers[0],
    description: '조용한 숲속에서 즐기는 완벽한 휴식. 피톤치드 가득한 힐링 공간입니다.',
    amenities: ['wifi', 'bbq', 'parking'],
    bookedDates: [],
    images: [
      'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?auto=format&fit=crop&w=1600&q=80'
    ]
  },
  {
    id: 'c-3',
    name: '패밀리 럭셔리 캠핑',
    location: '경기도 가평',
    pricePerDay: 180000,
    rating: 4.7,
    owner: mockUsers[0],
    description: '가족과 함께하기 좋은 넓은 공간과 아이들을 위한 시설이 준비되어 있습니다.',
    amenities: ['wifi', 'tv', 'bbq', 'parking'],
    bookedDates: [],
    images: [
      'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1504280390367-361c6d96fd0b?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1529385101599-7d9df9733740?auto=format&fit=crop&w=1600&q=80'
    ]
  },
  {
    id: 'c-4',
    name: '도심 속 루프탑 캠핑',
    location: '서울 근교',
    pricePerDay: 130000,
    rating: 4.5,
    owner: mockUsers[1],
    description: '멀리 가지 않아도 즐길 수 있는 캠핑. 아름다운 야경을 감상하세요.',
    amenities: ['wifi', 'ac', 'parking'],
    bookedDates: [],
    images: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1519782155700-11239a5c88b9?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1532339142463-fd0a8979791a?auto=format&fit=crop&w=1600&q=80'
    ]
  },
  {
    id: 'c-5',
    name: '별빛 쏟아지는 밤',
    location: '강원도 영월',
    pricePerDay: 140000,
    rating: 4.9,
    owner: mockUsers[0],
    description: '천체 관측이 가능한 낭만적인 카라반. 잊지 못할 밤하늘을 선물합니다.',
    amenities: ['wifi', 'heating', 'bbq'],
    bookedDates: [],
    images: [
      'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1506443432602-ac2493e8705f?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1600&q=80'
    ]
  },
  {
    id: 'c-6',
    name: '호수 뷰 감성 카라반',
    location: '충청북도 제천',
    pricePerDay: 135000,
    rating: 4.8,
    owner: mockUsers[1],
    description: '잔잔한 호수를 바라보며 물멍 때리기 좋은 감성 숙소입니다.',
    amenities: ['wifi', 'kitchen', 'parking'],
    bookedDates: [],
    images: [
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1506748689369-c081e7d9b936?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80'
    ]
  }
];