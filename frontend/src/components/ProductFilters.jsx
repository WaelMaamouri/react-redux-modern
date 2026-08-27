import styles from "./ProductFilters.module.css";

function ProductFilters({
  search,
  setSearch,
  sort,
  setSort,
  category,
  setCategory,
}) {
  return (
    <div className={styles.filters}>
      <input
        type="text"
        placeholder="Rechercher un produit"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="">Trier par</option>
        <option value="price-asc">Prix: Croissant</option>
        <option value="price-desc">Prix: Décroissant</option>
        <option value="name-asc">Nom: A-Z</option>
        <option value="name-desc">Nom: Z-A</option>
      </select>

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Toutes les catégories</option>
        <option value="Smartphone">Smartphone</option>
        <option value="Ordinateur">Ordinateur</option>
        <option value="Audio">Audio</option>
      </select>
    </div>
  );
}

export default ProductFilters;
