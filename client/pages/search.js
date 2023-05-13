import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { fetchItemsByQuery } from "../utils/api";
import ProductCard from "../components/ProductCard";
import Wrapper from "@/components/Wrapper";

function SearchPage() {
  const router = useRouter();
  const { query } = router.query;
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchItemsByQuery(query);
      console.log(data)
      setItems(data);
      setLoading(false);
    }
    fetchData();
  }, [query]);

  useEffect(() => {
    const searchResults = items.filter((item) =>
      item.attributes.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems({data:searchResults});
  }, [items, query]);
 console.log("items", items)
 console.log("filteredItems", filteredItems)
  return (
    <div className="w-full md:py-20">
        <Wrapper>
      <div className="mt-4">
        Search results for
        <p className="text-3xl" >"{query}" </p>
      </div>
      {loading ? (
        <p className="mt-4 mb-4 text-center">Loading...</p>
      ) : filteredItems.length > 0 ? (
        <div>
          {filteredItems?.data?.map((product) => (

            <ProductCard key={product.id} data={product} />
          ))}
        </div>
      ) : (
        <p className="mt-4 mb-4 text-center">No items found.</p>
      )}
      </Wrapper>
    </div>
  );
}

export default SearchPage;
