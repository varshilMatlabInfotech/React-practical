import { navLinks } from "@/constans/Index";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-gray-100 py-5">
      <div className="container mx-auto">
        <div className="grid grid-cols-12">
          {navLinks?.map((item, idx) => (
            <Link
              key={`${item?.label}-${idx}`}
              className="font-semibold text-lg cursor-pointer"
              to={item?.link}
            >
              {item?.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
