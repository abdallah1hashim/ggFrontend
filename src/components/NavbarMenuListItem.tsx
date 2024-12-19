import { useState } from "react";
import { CategoryWithChildren } from "../types/categories";
import { Link } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
// Example icons

function NavbarMenuListItem({
  category,
  setMenuOpen,
}: {
  category: CategoryWithChildren;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [open, setOpen] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents closing other menus
    setOpen(!open);
  };

  return (
    <li key={category.id} className="flex flex-col">
      <div className="flex items-center justify-between">
        <Link
          to={`/store/${category.name}`}
          onClick={() => setMenuOpen(false)}
          className="text-lg font-semibold text-primary-50 hover:text-primary-300"
        >
          {category.name}
        </Link>
        {category.children.length > 0 && (
          <button
            onClick={handleToggle}
            className="text-primary-600 hover:text-primary-800"
          >
            {open ? (
              <ChevronUpIcon className="h-5 w-5" />
            ) : (
              <ChevronDownIcon className="h-5 w-5" />
            )}
          </button>
        )}
      </div>

      {/* Animation for the child menu */}
      {open && (
        <ul className="mt-2 space-y-2 pl-4 transition-all duration-200 ease-in-out">
          {category.children.map((child) => (
            <NavbarMenuListItem
              key={child.id}
              category={child}
              setMenuOpen={setMenuOpen}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default NavbarMenuListItem;
