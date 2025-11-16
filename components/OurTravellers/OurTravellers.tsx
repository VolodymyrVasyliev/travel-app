"use client";

import css from "@/styles/travellers/OurTravellers.module.css";
import { useState } from "react";
import { useEffect } from "react";
import TravellersList from "@/components/OurTravellers/TravellersList";
import type { Traveller } from "@/types/traveller";
import { fetchTravellers } from "@/services/travellerService";
import { RotatingTriangles } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";

interface OurTravellersProps {
  perPage: number;
}

export default function OurTravellers({ perPage }: OurTravellersProps) {
  const [travellers, setTravellers] = useState<Traveller[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadTravellers = async () => {
      try {
        setIsLoading(true);

        const result = await fetchTravellers(1, perPage);

        setTravellers(result.data);
        setTotalPages(result.totalPages);
        setPage(2);
      } catch {
        toast.error("Не вдалося завантажити дані!");
      } finally {
        setIsLoading(false);
      }
    };

    loadTravellers();
  }, [perPage]);

  const handleClick = async () => {
    try {
      setIsLoading(true);

      if (totalPages !== null && page > totalPages) return;

      const result = await fetchTravellers(page, perPage);

      setTravellers((prev) => [...prev, ...result.data]);
      setTotalPages(result.totalPages);

      setPage((prev) => prev + 1);
    } catch {
      toast.error("Не вдалося завантажити дані!");
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled = totalPages !== null && page > totalPages;

  return (
    <>
      <div className={css.container}>
        <Toaster position="top-right" />
        {travellers.length > 0 && <TravellersList items={travellers} />}
        {isLoading && (
          <div className={css.loaderContainer}>
            <RotatingTriangles
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="rotating-triangles-loading"
            />
          </div>
        )}
        <button
          className={css.btnTraveller}
          onClick={handleClick}
          disabled={isDisabled}
        >
          Переглянути ще
        </button>
      </div>
    </>
  );
}
