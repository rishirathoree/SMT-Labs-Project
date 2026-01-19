import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import { useMemo } from "react"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"

type PaginationProps = {
  currentPage: number
  totalPages: number
  total: number
  limit: number
  onPageChange: (page: number) => void
}

export default function PaginationComponent({
  currentPage,
  totalPages,
  total,
  limit,
  onPageChange,
}: PaginationProps) {
  const hasPrev = currentPage > 1
  const hasNext = currentPage < totalPages

  const { start, end } = useMemo(() => {
    const start = (currentPage - 1) * limit + 1
    const end = Math.min(currentPage * limit, total)
    return { start, end }
  }, [currentPage, limit, total])

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-between gap-8">
      {/* Page info */}
      <div className="flex grow gap-1 justify-end whitespace-nowrap text-sm text-muted-foreground">
        <span className="text-foreground">
          {start}-{end}
        </span>{" "}
        of <span className="text-foreground">{total}</span>
      </div>

      <Pagination className="!justify-end">
        <PaginationContent>
          {/* First */}
          <PaginationItem>
            <PaginationLink
              aria-disabled={!hasPrev}
              className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
              onClick={() => onPageChange(1)}
            >
              <ChevronFirstIcon size={16} />
            </PaginationLink>
          </PaginationItem>

          {/* Previous */}
          <PaginationItem>
            <PaginationLink
              aria-disabled={!hasPrev}
              className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
              onClick={() => onPageChange(currentPage - 1)}
            >
              <ChevronLeftIcon size={16} />
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink isActive>{currentPage}</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              aria-disabled={!hasNext}
              className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
              onClick={() => onPageChange(currentPage + 1)}
            >
              <ChevronRightIcon size={16} />
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              aria-disabled={!hasNext}
              className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
              onClick={() => onPageChange(totalPages)}
            >
              <ChevronLastIcon size={16} />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
