import type { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'NovaBook Pro 14',
    price: 34990000,
    originalPrice: 39990000,
    description: 'Laptop đỉnh cao dành cho nhà sáng tạo và chuyên nghiệp. Trang bị chip Nova M3 cực kỳ tiết kiệm năng lượng, màn hình Liquid Retina XDR siêu sáng sắc nét và vỏ nhôm nguyên khối sang trọng.',
    category: 'Laptops',
    rating: 4.8,
    reviewsCount: 124,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      'Vi xử lý Nova M3 thế hệ mới (10 nhân CPU, 16 nhân GPU)',
      'Màn hình Liquid Retina XDR 14.2 inch với độ sáng tối đa 1600 nits',
      'Thời lượng pin lên tới 18 giờ cùng hệ thống tản nhiệt tiên tiến',
      'Thiết kế siêu mỏng 15.5mm, chất liệu nhôm nguyên khối, trọng lượng chỉ 1.4 kg'
    ],
    colors: ['Silver', 'Space Gray'],
    tags: ['Bán chạy', '-12%'],
    inStock: true,
    stockPercentage: 85,
    specs: {
      'Vi xử lý': 'Nova M3 Octa-Core Ultra',
      'Bộ nhớ RAM': '16GB Unified LPDDR5X RAM',
      'Ổ cứng SSD': '512GB NVMe Siêu tốc',
      'Màn hình': '14.2" Liquid Retina (3024 x 1964), 120Hz ProMotion',
      'Hệ điều hành': 'NovaOS Monterey Edition',
      'Trọng lượng': '1.4 kg (3.1 lbs)'
    },
    reviews: [
      { id: 'r1_1', author: 'Alex Minh', rating: 5, comment: 'Máy chạy cực kỳ mượt mà, màn hình sáng nét dã man! Rất đáng tiền.', date: '2026-05-12' },
      { id: 'r1_2', author: 'Thảo Phương', rating: 4, comment: 'Thiết kế sang trọng, pin dùng cả ngày không cần sạc. Tuy nhiên loa hơi nhỏ so với kỳ vọng.', date: '2026-05-18' }
    ]
  },
  {
    id: 'p2',
    name: 'AeroBuds Studio',
    price: 6990000,
    originalPrice: 7990000,
    description: 'Đắm chìm vào âm thanh chất lượng phòng thu chuyên nghiệp. Sở hữu công nghệ Chống ồn chủ động lai (ANC) tiên tiến, âm thanh vòm không gian cá nhân hóa và đệm tai bọt biển êm ái cực kỳ dễ chịu.',
    category: 'Audio',
    rating: 4.9,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      'Chống ồn chủ động lai hàng đầu (giảm thiểu tiếng ồn lên tới 45dB)',
      'Màng loa động high-fidelity tùy chỉnh độ méo tiếng siêu thấp',
      'Âm thanh không gian thông minh theo dõi chuyển động đầu cho hiệu ứng 3D',
      'Thời gian phát nhạc 40 giờ khi bật ANC, hỗ trợ sạc nhanh cổng USB-C'
    ],
    colors: ['Chalk White', 'Slate Black', 'Royal Blue'],
    tags: ['Mới', 'Phổ biến'],
    inStock: true,
    stockPercentage: 62,
    specs: {
      'Kích thước Driver': '40mm Custom Dynamic',
      'Kết nối': 'Bluetooth 5.3 & LE Audio Độ trễ siêu thấp',
      'Thời lượng pin': '40 giờ (bật ANC) / 50 giờ (tắt ANC)',
      'Kháng nước': 'IPX4 kháng mồ hôi và nước',
      'Sạc': 'Sạc nhanh USB-C (5 phút sạc = 5 giờ nghe)'
    },
    reviews: [
      { id: 'r2_1', author: 'Quang Huy', rating: 5, comment: 'Chống ồn đỉnh thực sự, đeo êm tai không bị bí. Màu trắng rất sang trọng.', date: '2026-04-30' },
      { id: 'r2_2', author: 'Ngọc Mai', rating: 5, comment: 'Spatial Audio nghe nhạc xem phim cực phê như ở rạp! Sẽ giới thiệu cho bạn bè.', date: '2026-05-20' }
    ]
  },
  {
    id: 'p3',
    name: 'TitanSmart Watch V2',
    price: 5890000,
    description: 'Người bạn đồng hành hoàn hảo cho sức khỏe và năng suất trên cổ tay bạn. Theo dõi nồng độ oxy trong máu, chỉ số chạy bộ, chất lượng giấc ngủ và giúp bạn luôn kết nối với màn hình AMOLED cực sáng rõ.',
    category: 'Wearables',
    rating: 4.6,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      'Màn hình Always-on AMOLED 1.43 inch kính sapphire chống xước',
      'Đo nhịp tim 24/7, cảm biến SpO2 và theo dõi giấc ngủ chuyên sâu',
      'Hơn 120 chế độ tập luyện thể thao tích hợp GPS băng tần kép siêu chính xác',
      'Thân vỏ kim loại cao cấp với cơ chế tháo lắp dây đeo nhanh chóng'
    ],
    colors: ['Arctic White', 'Vibrant Gold', 'Deep Slate'],
    tags: ['Hot'],
    inStock: true,
    stockPercentage: 45,
    specs: {
      'Màn hình': '1.43\" AMOLED, 466x466 pixels, độ sáng 1000 nits',
      'Cảm biến': 'Đo nhịp tim quang học, Gia tốc kế, Con quay hồi chuyển, SpO2, Áp kế',
      'Pin': 'Lên đến 10 ngày ở chế độ thông minh, 14 ngày tiết kiệm pin',
      'Tương thích': 'iOS 13+ & Android 8.0+',
      'Kháng nước': '5ATM (chống nước độ sâu lên tới 50 mét)'
    },
    reviews: [
      { id: 'r3_1', author: 'Tuấn Anh', rating: 4, comment: 'Đồng hồ đẹp, nhẹ, đo nhịp tim khá chính xác. Màn hình ngoài nắng hiển thị rõ nét.', date: '2026-05-02' }
    ]
  },
  {
    id: 'p4',
    name: 'NovaPhone 15 Pro',
    price: 24990000,
    description: 'Được chế tác từ titan chuẩn hàng không vũ trụ cao cấp, trang bị cảm biến camera A17 Fusion tiên tiến và tần số quét màn hình siêu nhanh giúp định nghĩa lại hiệu suất di động và trải nghiệm nhiếp ảnh của bạn.',
    category: 'Phones',
    rating: 4.9,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1565849906660-af34a415583b?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      'Thiết kế Titan: cực kỳ chắc chắn, siêu nhẹ và cảm giác cầm nắm cao cấp',
      'Hệ thống 3 camera 48MP đỉnh cao với khả năng lấy nét điện ảnh và zoom quang học 5x',
      'Thanh thông báo Dynamic Island và màn hình 120Hz ProMotion thích ứng',
      'Thời lượng pin cả ngày cùng tốc độ truyền dữ liệu USB-C siêu tốc'
    ],
    colors: ['Titanium Silver', 'Deep Blue', 'Sleek Gold'],
    tags: ['Bán chạy', 'Cao cấp'],
    inStock: true,
    stockPercentage: 92,
    specs: {
      'Vi xử lý': 'Chip A17 Fusion Bionic tiến trình 3nm',
      'Camera': '48MP Chính + 12MP Siêu rộng + 12MP Viễn kính 5x',
      'Màn hình': '6.7\" Super Retina XDR OLED, 120Hz',
      'Trọng lượng': '187g (Titanium Siêu nhẹ)',
      'Bảo mật': 'Xác thực khuôn mặt FaceID nâng cao'
    },
    reviews: [
      { id: 'r4_1', author: 'Hoàng Long', rating: 5, comment: 'Chụp ảnh đêm xuất sắc! Cầm máy nhẹ hơn hẳn các đời trước nhờ khung Titan.', date: '2026-05-15' },
      { id: 'r4_2', author: 'Thùy Chi', rating: 5, comment: 'Màu Titan bạc siêu đẹp, viền siêu mỏng, cực kỳ sang xịn mịn.', date: '2026-05-24' }
    ]
  },
  {
    id: 'p5',
    name: 'Apex Mechanical Keyboard',
    price: 3690000,
    originalPrice: 4390000,
    description: 'Nâng tầm góc làm việc và chơi game của bạn. Tích hợp switch cơ học linear có thể tháo nóng (hot-swap), LED RGB từng phím tuyệt đẹp và 2 lớp foam tiêu âm giúp tạo ra âm thanh gõ phím cực kỳ êm ái, trầm ấm.',
    category: 'Accessories',
    rating: 4.7,
    reviewsCount: 75,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      'Layout 75% gọn gàng với khung nhôm CNC anode cao cấp',
      'Switch cơ học linear silent được lót sẵn mỡ từ nhà máy (lực nhấn 50g)',
      'Hệ thống LED RGB 16.8 triệu màu sống động với nhiều chế độ tùy biến',
      '3 chế độ kết nối tiện lợi: không dây 2.4GHz, Bluetooth 5.1 và dây cáp USB-C'
    ],
    colors: ['Classic Black', 'Arctic White'],
    tags: ['-15%'],
    inStock: true,
    stockPercentage: 30,
    specs: {
      'Bố cục phím': 'Layout 75% Gọn nhẹ (82 phím)',
      'Loại Switch': 'Nova Linear (Đã lube sẵn, hỗ trợ Hot-swappable)',
      'Keycaps': 'Double-shot PBT Cherry Profile siêu bền',
      'Dung lượng pin': '4000mAh (Lên đến 200 giờ khi tắt LED)',
      'Kiểu Gasket': 'Gasket mount cho cảm giác gõ đàn hồi êm ái'
    },
    reviews: [
      { id: 'r5_1', author: 'Duy Khánh', rating: 5, comment: 'Phím gõ cực kỳ êm, âm thanh thocky trầm ấm rất đã tai. LED RGB sáng đẹp.', date: '2026-05-10' }
    ]
  },
  {
    id: 'p6',
    name: 'Orbit Wireless Speaker',
    price: 2990000,
    originalPrice: 3490000,
    description: 'Lấp đầy mọi không gian với âm thanh 360 độ trung thực cao sâu lắng, sống động. Thiết kế kháng nước hoàn hảo và lớp vỏ vải siêu bền giúp loa sẵn sàng đồng hành cùng bạn trong mọi bữa tiệc bãi biển hay cắm trại dã ngoại.',
    category: 'Audio',
    rating: 4.5,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80',
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1529251346356-278c9df41f51?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      'Bộ phát âm thanh đa hướng 360 độ hiệu suất cao',
      'Kháng bụi và nước tiêu chuẩn IP67: có thể ngâm nước ở độ sâu 1m trong 30 phút',
      'Công nghệ PartySync Link: kết nối tối đa 50 loa Orbit cùng một lúc',
      'Thời gian phát nhạc liên tục lên tới 15 giờ với âm trầm mạnh mẽ'
    ],
    colors: ['Silver Mist', 'Charcoal Black'],
    tags: ['Kháng nước'],
    inStock: true,
    stockPercentage: 50,
    specs: {
      'Công suất phát': '30W RMS Âm thanh chất lượng cao',
      'Tiêu chuẩn kháng nước': 'IP67 chống bụi và nước hoàn hảo',
      'Phạm vi Bluetooth': '30m không vật cản',
      'Dung lượng pin': '5200mAh lithium-ion có thể sạc lại'
    },
    reviews: [
      { id: 'r6_1', author: 'Nguyên Khang', rating: 4, comment: 'Bass đập rất lực, thích hợp nghe nhạc trẻ hoặc mang đi dã ngoại. Chống nước tốt.', date: '2026-04-15' }
    ]
  },
  {
    id: 'p7',
    name: 'ZenStream Curved Monitor',
    price: 10490000,
    originalPrice: 11490000,
    description: 'Đắm chìm hoàn toàn vào thế giới game hoặc công việc. Màn hình cong siêu rộng 34 inch ôm trọn tầm nhìn tự nhiên của bạn, giúp tối ưu khả năng đa nhiệm và giảm thiểu mỏi mắt khi sử dụng lâu dài.',
    category: 'Accessories',
    rating: 4.8,
    reviewsCount: 96,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551645121-d1034da75057?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      'Màn hình 34" Ultrawide WQHD (3440 x 1440) tỉ lệ 21:9 hiển thị rộng lớn',
      'Đo cong 1500R hoàn hảo ôm trọn thị trường mắt người',
      'Tần số quét nhanh 165Hz tích hợp công nghệ chống xé hình AMD FreeSync Premium',
      'Màu sắc HDR400 rực rỡ với độ phủ màu 99% sRGB'
    ],
    colors: ['Platinum Silver'],
    tags: ['Cao cấp', 'Mới'],
    inStock: true,
    stockPercentage: 73,
    specs: {
      'Kích thước màn hình': '34 inch Cong siêu rộng (Curved Ultrawide)',
      'Độ phân giải': '3440 x 1440 WQHD',
      'Tần số quét': '165Hz',
      'Tỉ lệ khung hình': '21:9 Panorama',
      'Cổng kết nối': '2x DisplayPort 1.4, 2x HDMI 2.0, Cổng chia USB'
    },
    reviews: [
      { id: 'r7_1', author: 'Trung Kiên', rating: 5, comment: 'Màn hình quá tuyệt vời để làm việc đa nhiệm. Curve rất dễ nhìn, màu sắc tươi tắn.', date: '2026-05-14' },
      { id: 'r7_2', author: 'Vân Anh', rating: 4, comment: 'Màn hình to gánh game siêu mượt. Chân đế to chiếm diện tích bàn một chút.', date: '2026-05-19' }
    ]
  },
  {
    id: 'p8',
    name: 'AuraFit Smart Band',
    price: 1990000,
    description: 'Theo dõi lối sống năng động của bạn với chiếc vòng đeo tay siêu nhẹ, thời trang. Trang bị cảm biến sức khỏe thông minh, bộ đếm calo tiêu thụ và màn hình cảm ứng OLED hiển thị rõ nét ngay dưới ánh nắng.',
    category: 'Wearables',
    rating: 4.4,
    reviewsCount: 110,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=800&q=80',
    images: [
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1557180295-76eee20ae8aa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      'Màn hình cảm ứng AMOLED 1.62\" sắc nét cùng nhiều mặt đồng hồ cá tính',
      'Đo nhịp tim liên tục, đo nồng độ SpO2 và mức độ căng thẳng',
      'Trọng lượng siêu nhẹ (chỉ 13g) mang lại cảm giác đeo cực kỳ thoải mái',
      'Thời lượng pin lên tới 14 ngày chỉ với một lần sạc từ tính nhanh'
    ],
    colors: ['Neon Pink', 'Mint Green', 'Active Black'],
    tags: ['Giá tốt'],
    inStock: false,
    stockPercentage: 0,
    specs: {
      'Màn hình': '1.62\" AMOLED Touch, độ phân giải 192 x 490',
      'Trọng lượng': '13.5g (không kèm dây)',
      'Kháng nước': 'Chuẩn kháng nước 5ATM',
      'Cảm biến': 'Gia tốc kế 3 trục tiết kiệm pin, cảm biến nhịp tim PPG',
      'Dung lượng pin': '190mAh, thời gian sử dụng lên đến 14 ngày'
    },
    reviews: [
      { id: 'r8_1', author: 'Bích Ngọc', rating: 5, comment: 'Nhỏ gọn, đeo nhẹ như không đeo. Đo bước chân và giấc ngủ khá tốt.', date: '2026-05-08' }
    ]
  }
];

export const CATEGORIES = ['Tất cả', 'Laptops', 'Phones', 'Audio', 'Wearables', 'Accessories'];
export const SORT_OPTIONS = [
  { value: 'featured', label: 'Sản phẩm nổi bật' },
  { value: 'price-low', label: 'Giá: Thấp đến Cao' },
  { value: 'price-high', label: 'Giá: Cao đến Thấp' },
  { value: 'rating', label: 'Đánh giá khách hàng' }
];

export const HERO_PRODUCTS = PRODUCTS.filter(p => p.id === 'p1' || p.id === 'p4' || p.id === 'p2');
