// FlowerDescription.tsx
interface FlowerDescriptionProps {
    flowerName: string | null;
  }
  
  const flowerDescriptions: { [key: string]: string } = {
    "Bromelia": "DESCRIPTION",
    "Mallow": "DESCRIPTION",
    "Purplecone flower": "DESCRIPTION",
    "Hard Leaved pocket orchid": "DESCRIPTION",
    "Gaura": "DESCRIPTION",
    "Thornapple": "DESCRIPTION", 
    "Pelargonium": "DESCRIPTION",
    "Mexican aster": "DESCRIPTION",
    "Ballmoss": "DESCRIPTION",
    "Water lily": "Đẹp: 7/10. \nVietnamese: bông súng. \nHoa súng được trồng tạo cảnh quan cho sân vườn, tạo tiểu cảnh nước tĩnh, trồng trong các hồ cá nhân tạo hay được trồng trong các chậu để trang trí ngoại thất, giếng trời, quán cafe sân vườn…",
    "Bolero deep blue": "Đẹp: 9/10. \nVietnamese: hoa Bolero xanh đậm. \nHoa này thường được sử dụng để trang trí bàn tiệc và mang lại cảm giác sang trọng.",
    "Treemallow": "Đẹp: 8/10. \nVietnamese: cẩm cù. \nHoa cẩm cù thường được dùng làm cây cảnh leo, thích hợp trồng ở ban công hoặc ngoài trời.",
    "Globe thistle": "Đẹp: 7/10. \nVietnamese: hoa cúc gai. \nLoại hoa này phù hợp cho trang trí sân vườn với kiểu dáng độc đáo và bền vững.",
    "Carnation": "Đẹp: 9/10. \nVietnamese: hoa cẩm chướng. \nHoa cẩm chướng thường được dùng trong bó hoa cưới và cắm hoa trang trí nội thất.",
    "Spring crocus": "Đẹp: 9/10. \nVietnamese: hoa nghệ tây xuân. \nLoài hoa này thường nở vào mùa xuân và tượng trưng cho sự tái sinh và sức sống mới.",
    "Sunflower": "Đẹp: 7/10. \nVietnamese: hoa hướng dương. \nHoa hướng dương tượng trưng cho sự lạc quan và thường được trồng ở các trang trại hoa và vườn cảnh.",
    "Pink primrose": "Đẹp: 8/10. \nVietnamese: hoa anh thảo hồng. \nLoại hoa này thường được trồng làm cảnh quan do màu sắc nổi bật và dễ trồng.",
    "Azalea": "Đẹp: 10/10. \nVietnamese: hoa đỗ quyên. \nĐỗ quyên thường được trồng trong các khu vườn và sân vườn, đặc biệt vào mùa xuân.",
    "Common dandelion": "Đẹp: 6/10. \nVietnamese: bồ công anh. \nLoại hoa này mọc hoang và thường được trẻ em thổi bay để cầu nguyện.",
    "Oxeye daisy": `Đẹp: 9/10. \nVietnamese: cúc mắt bò. \nHoa cúc mắt bò phổ biến ở các khu vực đồng cỏ và thường được sử dụng để trang trí các cảnh quan tự nhiên do vẻ đẹp giản dị của nó.`,
    "Moonorchid": "Đẹp: 10/10.\nVietnamese: lan mặt trăng.\nLan mặt trăng là biểu tượng của sự quý phái và thường được trồng trong các khu vườn nhiệt đới hoặc sử dụng để trang trí nội thất nhờ vẻ đẹp thanh lịch và độc đáo.",
    // Add more flowers with similar descriptions here
  };
  
  export function FlowerDescription({ flowerName }: FlowerDescriptionProps) {
    const description = flowerDescriptions[flowerName || ""] || "No description available.";
  
    return (
        <div className="mt-4 p-4 border-4 border-purple-600 rounded-lg shadow-xl max-w-xs bg-gradient-to-r from-pink-400 text-yellow-900 to-purple-500 animate-gradient-slide transition-all duration-700 ease-in-out hover:scale-105">
          <p className="font-bold text-xl mb-2 text-white animate-bounce-slow">
            🌻🌞 This must be: <span className="animate-spin-slow inline-block">🌺🌹</span>
          </p>
          <p className="text-3xl font-extrabold text-white mt-4 animate-fade-slow">{flowerName}</p>
          <p className="mt-4 text-lg text-white whitespace-pre-line animate-fade-slow">{description}</p>
        </div>
      );
      
  }
  