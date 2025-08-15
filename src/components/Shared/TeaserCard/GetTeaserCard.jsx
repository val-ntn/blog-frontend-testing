// src/components/Shared/GetTeaserCard.jsx

import React, { useEffect, useState } from "react";
import TeaserCard from "./TeaserCard";
import { API_BASE_URL } from "../../../utils/api";

export default function GetTeaserCard({
  type = "post",
  title,
  size = "small",
}) {
  const [item, setItem] = useState(null);

  useEffect(() => {
    let url = `${API_BASE_URL}/${type}s/latest`; // default fetch latest
    if (title) url += `?title=${encodeURIComponent(title)}`; // optional fetch by title

    fetch(url)
      .then((res) => res.json())
      .then(setItem)
      .catch((err) => console.error("Error fetching TeaserCard:", err));
  }, [type, title]);

  if (!item) return <p>Loading...</p>;

  return <TeaserCard data={item} size={size} type={type} />;
}
