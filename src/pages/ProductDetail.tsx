import { useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center mb-4">
            <span className="text-gray-400">Hình ảnh chính sản phẩm {id}</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`bg-gray-200 rounded h-20 flex items-center justify-center cursor-pointer ${
                  selectedImage === index ? "border-2 border-blue-600" : ""
                }`}
              >
                <span className="text-gray-400 text-xs">{index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Tên sản phẩm #{id}</h1>
          <div className="flex items-center mb-4">
            <span className="text-yellow-400 text-lg">★★★★☆</span>
            <span className="text-gray-600 ml-2">(156 đánh giá)</span>
          </div>

          <div className="mb-6">
            <span className="text-3xl font-bold text-blue-600">1.500.000đ</span>
            <span className="text-gray-500 line-through ml-3">2.000.000đ</span>
            <span className="bg-red-500 text-white px-2 py-1 rounded ml-3 text-sm">
              -25%
            </span>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Mô tả:</h3>
            <p className="text-gray-600">
              Đây là mô tả chi tiết về sản phẩm. Sản phẩm có chất lượng cao,
              được làm từ nguyên liệu tốt nhất, đảm bảo độ bền và tính thẩm mỹ.
              Phù hợp cho mọi đối tượng khách hàng.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Thông số kỹ thuật:</h3>
            <ul className="text-gray-600 space-y-1">
              <li>• Thương hiệu: ABC Brand</li>
              <li>• Xuất xứ: Việt Nam</li>
              <li>• Bảo hành: 12 tháng</li>
              <li>• Tình trạng: Còn hàng</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Số lượng:</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="border px-4 py-2 rounded hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-2 border rounded">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="border px-4 py-2 rounded hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Thêm vào giỏ hàng
            </button>
            <button className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
              Mua ngay
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Đánh giá sản phẩm</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((review) => (
            <div key={review} className="bg-white border rounded-lg p-4">
              <div className="flex items-center mb-2">
                <span className="font-semibold">Khách hàng {review}</span>
                <span className="text-yellow-400 ml-4">★★★★★</span>
              </div>
              <p className="text-gray-600">
                Sản phẩm rất tốt, đúng như mô tả. Giao hàng nhanh, đóng gói cẩn
                thận. Tôi rất hài lòng với sản phẩm này!
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
