// SearchPageClient.tsx
"use client"; // must be first line

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Property } from "../../types";
import Searchsection from "./Searchsection";
import VerifiedProperties from "./VerifiedProperties";
import { allProperties } from "./data/properties";

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const queryFromUrl = searchParams.get("query") || "";

  const [searchText, setSearchText] = useState(queryFromUrl);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(allProperties);

  useEffect(() => {
    setSearchText(queryFromUrl);
  }, [queryFromUrl]);

  useEffect(() => {
    const filtered = allProperties.filter(
      (p: Property) =>
        p.title.toLowerCase().includes(searchText.toLowerCase()) ||
        p.author.toLowerCase().includes(searchText.toLowerCase()) ||
        p.status.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProperties(filtered);
  }, [searchText]);

  return (
    <>
      <Searchsection
        onSearch={setFilteredProperties}
        initialValue={searchText}
        properties={allProperties}
      />
      <div className="pt-[80px]">
        <VerifiedProperties properties={filteredProperties} />
      </div>
    </>
  );
}
