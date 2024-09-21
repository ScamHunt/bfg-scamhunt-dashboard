const FeatureCard = ({ title, description }: { title: string; description: string }) => {
    return ( 
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm sm:text-base text-gray-600">{description}</p>
    </div>
     );
}
 
export default FeatureCard;