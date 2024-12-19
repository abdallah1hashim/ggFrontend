import { CreditCard, Package, Rocket, Section } from "lucide-react";

const CardBenifit: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <div className="rounded-xl bg-primary-50 p-6 text-center text-primary-800 shadow-md">
      {icon}
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

function ShopWithUs() {
  return (
    <Section>
      <div>
        {/* Benefits Section */}
        <h2 className="mb-8 text-center text-3xl font-bold">
          Why Shop With Us
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <CardBenifit
            icon={<Rocket className="mx-auto mb-4 text-blue-500" size={48} />}
            title="Fast Shipping"
            description="Get your products delivered quickly and efficiently."
          />
          <CardBenifit
            icon={<Package className="mx-auto mb-4 text-green-500" size={48} />}
            title="Quality Guarantee"
            description="Premium products with 30-day satisfaction guarantee."
          />
          <CardBenifit
            icon={
              <CreditCard className="mx-auto mb-4 text-purple-500" size={48} />
            }
            title="Secure Payments"
            description="Multiple payment options with top-tier security."
          />
        </div>
      </div>
    </Section>
  );
}

export default ShopWithUs;
