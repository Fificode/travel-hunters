"use client";
import SearchForm from "./components/searchForm";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="flex justify-center items-center my-4">
        Travel Hunters Home Page
      </h1>
      <SearchForm defaultTab="hotels" />
    </div>
  );
}
