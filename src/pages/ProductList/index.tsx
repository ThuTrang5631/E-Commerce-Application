import { Col, Row, Spin } from "antd";
import { getlistProducts } from "./service";
import { useProducts } from "../../store/useProducts";
import { useCallback, useEffect, useRef, useState } from "react";
import CardItem from "../../components/CardItem";

const LIMIT = 20;

const ProductList = () => {
  const productList = useProducts((state: any) => state.products);
  const saveProducts = useProducts((state: any) => state.setProducts);
  const isSearch = useProducts((state: any) => state.isSearch);
  const [hasMore, setHasMore] = useState(true);
  const observeProducts = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const loadingRef = useRef(false);
  const skipRef = useRef(0);

  const handleGetProducts = async (initalProduct = false) => {
    if (loadingRef.current) {
      return;
    }

    loadingRef.current = true;
    setLoading(true);

    const currentSkip = initalProduct ? 0 : skipRef.current;

    const params = {
      limit: LIMIT,
      skip: currentSkip,
    };

    try {
      const res = await getlistProducts(params);

      if (res?.data) {
        const newProducts = res.data.products || [];

        if (initalProduct) {
          saveProducts(newProducts);
          skipRef.current = LIMIT;
        } else {
          const merged = [...productList, ...newProducts];

          saveProducts(merged);
          skipRef.current += LIMIT;
        }

        if (newProducts.length < LIMIT) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };

  const loadMoreProducts = useCallback(() => {
    if (hasMore && !loadingRef.current && !isSearch) {
      handleGetProducts(false);
    }
  }, [hasMore, loadingRef.current, isSearch]);

  useEffect(() => {
    if (!isSearch) {
      handleGetProducts(true);
    }
  }, []);

  useEffect(() => {
    const observe = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreProducts();
        }
      },
      {
        threshold: 0.1,
      }
    );

    const currentElement = observeProducts.current;
    if (currentElement) {
      observe.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observe.unobserve(currentElement);
      }
    };
  }, [loadMoreProducts]);

  return (
    <div className="products">
      <Row gutter={[24, 16]}>
        {Array.isArray(productList) &&
          productList.map((product: any) => {
            return (
              <Col span={6} key={product?.id}>
                <CardItem product={product} />
              </Col>
            );
          })}
      </Row>
      <div ref={observeProducts} style={{ height: "20px" }} />
      {loading && (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Spin />
        </div>
      )}
    </div>
  );
};

export default ProductList;
