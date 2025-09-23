export function buildQuery(params = {}) {
  const qp = new URLSearchParams();

  if (params.search) qp.set("search", params.search);
  if (params.industry) qp.set("industry", params.industry);
  if (params.city) qp.set("city", params.city);
  if (params.minEmployees != null) qp.set("minEmployees", params.minEmployees);
  if (params.maxEmployees != null) qp.set("maxEmployees", params.maxEmployees);
  if (params.page != null) qp.set("page", params.page);
  if (params.limit != null) qp.set("limit", params.limit);
  if (params.sort) qp.set("sort", params.sort);

  return qp.toString();
}
