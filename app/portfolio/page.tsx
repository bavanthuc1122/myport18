"use client"

import HeaderPortfolio from "@/components/header-portfolio"
import Footer from "@/components/footer"
import { useEffect, useState } from "react"
import MasonryGrid from "../components/MasonryGrid"
import { batchFetchSanityData, getPortfolioItemsByCategory } from "@/lib/sanity"

export default function Portfolio() {
  // State cho danh mục và mục portfolio
  const [categories, setCategories] = useState<Array<{_id: string, title: string}>>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Tải dữ liệu từ Sanity
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Sử dụng batch fetch để giảm số lượng request
        const data = await batchFetchSanityData({
          categories: { query: '*[_type == "category"] | order(title asc)' },
          portfolioItems: { query: '*[_type == "portfolioItem"] { _id, title, imageSource, coverImage, imageUrl, behanceLink, category->{ _id, title } } | order(publishedAt desc)' }
        });

        // Xử lý dữ liệu trả về
        const categoriesData = data.categories || [];
        const portfolioData = data.portfolioItems || [];

        setCategories([{ _id: 'all', title: 'All' }, ...categoriesData]);
        setItems(portfolioData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Lọc theo danh mục
  const handleCategoryChange = async (categoryId: string) => {
    try {
      setLoading(true);
      setSelectedCategory(categoryId);

      if (categoryId === 'all') {
        // Nếu chọn "All", lấy tất cả mục portfolio
        const data = await batchFetchSanityData({
          portfolioItems: {
            query: '*[_type == "portfolioItem"] { _id, title, imageSource, coverImage, imageUrl, behanceLink, category->{ _id, title } } | order(publishedAt desc)'
          }
        });
        setItems(data.portfolioItems || []);
      } else {
        // Nếu chọn danh mục cụ thể, lọc theo danh mục đó
        const filteredData = await getPortfolioItemsByCategory(categoryId);
        setItems(filteredData);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error filtering by category:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <HeaderPortfolio />

      <main className="mx-auto px-8 sm:px-16 lg:px-24">
        <div className="pt-32 pb-16 fade-in">
          <h1 className="text-6xl font-bold mb-2 slide-up">WORK IMAGE</h1>
          <p className="text-gray-400 text-lg slide-up delay-200">Darkness is core of light</p>
        </div>

        <div className="flex justify-center gap-12 mb-16 slide-up delay-300">
          {categories.map((category, index) => (
            <button
              key={category._id}
              className={`text-base transition-colors duration-300 ${selectedCategory === category._id ? 'text-white' : 'text-gray-400 hover:text-gray-300'} hover-scale`}
              onClick={() => handleCategoryChange(category._id)}
              style={{ animationDelay: `${300 + (index * 100)}ms` }}
            >
              {category.title}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 fade-in">Loading...</div>
        ) : (
          <div className="fade-in">
            <MasonryGrid items={items} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
