import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import aboutService from "../services/aboutService";

/**
 * Custom hook for managing accreditations data
 */
export const useAccreditations = (initialType = "all") => {
  const { i18n } = useTranslation();
  const [accreditations, setAccreditations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(initialType);
  const [types, setTypes] = useState([]);

  // Fetch accreditations data
  const fetchAccreditations = useCallback(
    async (type = filter) => {
      try {
        setLoading(true);
        setError(null);

        const data = await aboutService.getAccreditations(type, i18n.language);
        setAccreditations(data);
      } catch (err) {
        setError(err.message || "Failed to fetch accreditations");
        console.error("Error in useAccreditations:", err);
      } finally {
        setLoading(false);
      }
    },
    [filter]
  );

  const fetchTypes = useCallback(async () => {
    try {
      const typesList = await aboutService.getAccreditationTypes(i18n.language);
      setTypes(typesList);
    } catch (err) {
      console.error("Error fetching accreditation types:", err);
    }
  }, [i18n.language]);

  // Initial data fetch and refetch when language changes
  useEffect(() => {
    const loadData = async () => {
      await fetchAccreditations();
      await fetchTypes();
    };
    loadData();
  }, [fetchAccreditations, fetchTypes, i18n.language]);

  // Refetch when filter changes
  useEffect(() => {
    const loadData = async () => {
      await fetchAccreditations(filter);
    };
    loadData();
  }, [filter, fetchAccreditations]);

  // Methods to control the hook
  const changeFilter = (newType) => {
    setFilter(newType);
  };

  const refresh = () => {
    fetchAccreditations(filter);
  };

  // Get filtered accreditations by type
  const getFilteredAccreditations = (type) => {
    if (type === "all") return accreditations;
    return accreditations.filter((acc) => acc.type === type);
  };

  // Get accreditations count by type
  const getCountByType = (type) => {
    if (type === "all") return accreditations.length;
    return accreditations.filter((acc) => acc.type === type).length;
  };

  // Get statistics
  const getStatistics = () => {
    const stats = {};
    types.forEach((type) => {
      stats[type] = getCountByType(type);
    });
    stats.total = accreditations.length;
    return stats;
  };

  return {
    // Data
    accreditations,
    types,
    filter,

    // Status
    loading,
    error,

    // Methods
    changeFilter,
    refresh,
    getFilteredAccreditations,
    getCountByType,
    getStatistics,
  };
};

/**
 * Custom hook for managing single accreditation detail
 */
export const useAccreditationDetail = (id) => {
  const [accreditation, setAccreditation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAccreditation = async (accreditationId) => {
    if (!accreditationId) return;

    try {
      setLoading(true);
      setError(null);

      const data = await aboutService.getAccreditationDetail(
        accreditationId,
        i18n.language
      );
      setAccreditation(data);
    } catch (err) {
      setError(err.message || "Failed to fetch accreditation details");
      console.error("Error in useAccreditationDetail:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccreditation(id);
  }, [id]);

  const refresh = () => {
    fetchAccreditation(id);
  };

  return {
    accreditation,
    loading,
    error,
    refresh,
  };
};
