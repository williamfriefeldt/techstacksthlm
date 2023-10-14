import { Company } from './entities';

export function sortCompanies(companies: Company[]): void {
  companies.sort(({ name: nameA }: Company, { name: nameB }: Company) =>
    nameA.toLowerCase() > nameB.toLowerCase() ? 1 : -1
  );
}
