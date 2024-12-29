import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../components/ui/pagination";
import { motion } from "framer-motion";

const StorePagination: React.FC<{
  page: number;
  handlePage: (page: string, value: number) => void;
  totalPages: number;
}> = ({ page, handlePage, totalPages }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const handleNextPage = () => {
    if (page < totalPages) {
      handlePage("page", page + 1);
    }
  };
  const handlePrevPage = () => {
    if (page > 1) {
      handlePage("page", page - 1);
    }
  };
  return (
    <Pagination className="relative">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => handlePrevPage()} />
        </PaginationItem>
        {page > 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePage("page", page - 1)}>
              {page - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink
            className="text-primary-800"
            onClick={() => handlePage("page", page)}
            isActive
          >
            {page}
          </PaginationLink>
        </PaginationItem>
        {/* {page + 1 <= totalPages && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePage("page", page + 1)}>
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        )} */}
        <PaginationItem className="relative">
          <PaginationEllipsis
            className="cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            animate={menuOpen ? "visible" : "hidden"}
            className="top-100 absolute left-0 z-20 flex items-center justify-center bg-primary shadow-sm shadow-primary-800"
          >
            <ul>
              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i + 1}>
                  <PaginationLink
                    onClick={() => {
                      setMenuOpen(false);
                      handlePage("page", i + 1);
                    }}
                  >
                    {i + 1}
                  </PaginationLink>
                </li>
              ))}
            </ul>
          </motion.div>
          <div
            className={`fixed left-0 top-0 z-10 h-screen w-full bg-transparent ${!menuOpen ? "hidden" : ""}`}
            onClick={() => setMenuOpen(false)}
          />
        </PaginationItem>
        {page + 2 <= totalPages && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePage("page", totalPages)}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext onClick={() => handleNextPage()} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default StorePagination;
