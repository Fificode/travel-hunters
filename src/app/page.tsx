"use client";
import SearchForm from "./components/searchForm";




export default function Home() {
  
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <SearchForm defaultTab="hotels"/>
    </div>
  );
}
