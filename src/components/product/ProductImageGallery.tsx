
interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  selectedImage: number;
  onImageSelect: (index: number) => void;
}

const ProductImageGallery = ({ images, productName, selectedImage, onImageSelect }: ProductImageGalleryProps) => {
  return (
    <div className="space-y-4">
      <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
        <img
          src={images[selectedImage]}
          alt={productName}
          className="w-full h-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => onImageSelect(index)}
              className={`aspect-square rounded-lg overflow-hidden border-2 ${
                selectedImage === index ? "border-amber-600" : "border-gray-200"
              }`}
            >
              <img
                src={image}
                alt={`${productName} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
