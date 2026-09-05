import type { PaginationMeta } from "../types/api.js";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

export interface PaginationOptions {
  page?: string | number;
  limit?: string | number;
}

export function parsePagination(
  options: PaginationOptions,
) {
  const rawPage = Number(options.page);
  const rawLimit = Number(options.limit);

  const page =
    Number.isInteger(rawPage) &&
    rawPage > 0
      ? rawPage
      : DEFAULT_PAGE;

  const limit =
    Number.isInteger(rawLimit) &&
    rawLimit > 0
      ? Math.min(rawLimit, MAX_LIMIT)
      : DEFAULT_LIMIT;

  return {
    page,
    limit,
    skip: (page - 1) * limit,
  };
}

export function createPaginationMeta(
  page: number,
  limit: number,
  total: number,
): PaginationMeta {
  const totalPages =
    total === 0
      ? 0
      : Math.ceil(total / limit);

  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage:
      totalPages > 0 && page < totalPages,
    hasPreviousPage: page > 1,
  };
}