
interface ProductFeaturesProps {
  features: string[];
  dimensions: string;
  material: string;
  color: string;
}

const ProductFeatures = ({ features, dimensions, material, color }: ProductFeaturesProps) => {
  return (
    <div className="space-y-6">
      {/* Product Features */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-gray-600">
              <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Product Specifications */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Specifications</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="font-medium text-gray-900">Dimensions:</span>
            <p className="text-gray-600">{dimensions}</p>
          </div>
          <div>
            <span className="font-medium text-gray-900">Material:</span>
            <p className="text-gray-600">{material}</p>
          </div>
          <div>
            <span className="font-medium text-gray-900">Color:</span>
            <p className="text-gray-600">{color}</p>
          </div>
          <div>
            <span className="font-medium text-gray-900">Warranty:</span>
            <p className="text-gray-600">5 Years</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFeatures;
