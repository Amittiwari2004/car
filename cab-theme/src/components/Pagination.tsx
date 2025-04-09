"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  current: number;
  total: number;
};

export default function Pagination({ current, total }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/?${params.toString()}`);
  };

  if (total <= 1) return null;

  // Create array of page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (total <= maxPagesToShow) {
      // If we have less pages than max, show all
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // Otherwise, show strategic pages
      pages.push(1); // Always show first page
      
      // Show pages around current
      const leftBoundary = Math.max(2, current - 1);
      const rightBoundary = Math.min(total - 1, current + 1);
      
      // Add ellipse if needed
      if (leftBoundary > 2) {
        pages.push('...');
      }
      
      // Add pages around current
      for (let i = leftBoundary; i <= rightBoundary; i++) {
        pages.push(i);
      }
      
      // Add ellipse if needed
      if (rightBoundary < total - 1) {
        pages.push('...');
      }
      
      pages.push(total); // Always show last page
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-center mt-8 mb-4 ">
      <nav className="flex items-center gap-1">
        <button
          disabled={current <= 1}
          onClick={() => setPage(current - 1)}
          className="p-2 rounded-md border dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
        </button>
        
        {getPageNumbers().map((pageNum, index) => {
          if (pageNum === '...') {
            return <span key={`ellipsis-${index}`} className="px-2">...</span>;
          }
          
          return (
            <button
              key={`page-${pageNum}`}
              onClick={() => setPage(Number(pageNum))}
              className={`min-w-8 h-8 flex items-center justify-center rounded-md ${
                current === pageNum 
                  ? 'bg--600 text-white' 
                  : 'border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
              } transition-colors`}
            >
              {pageNum}
            </button>
          );
        })}
        
        <button
          disabled={current >= total}
          onClick={() => setPage(current + 1)}
          className="p-2 rounded-md border dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Next page"
        >
          <ChevronRight size={18} />
        </button>
      </nav>
    </div>
  );
}