import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useCouncils } from "../../hooks/useCouncils";

const Advices = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  
  // Use custom hook for councils
  const {
    sectionsData,
    sectionsList,
    activeSection,
    loading,
    error,
    changeActiveSection,
    getCurrentSectionData,
    sectionHasMembers,
    sectionHasDocuments,
  } = useCouncils();

  // Get current section data
  const currentSectionData = getCurrentSectionData();

  // If we have sections but no current section data, and there's an active section set
  useEffect(() => {
    if (!loading && !error && sectionsList.length > 0 && !activeSection) {
      changeActiveSection(sectionsList[0].id);
    }
  }, [loading, error, sectionsList, activeSection, changeActiveSection]);

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Safe checks for content
  const hasMembers = sectionHasMembers() && 
    Array.isArray(currentSectionData.members) && 
    currentSectionData.members.length > 0;

  const hasDocuments = sectionHasDocuments() && 
    Array.isArray(currentSectionData.documents) && 
    currentSectionData.documents.length > 0;

  // Format member initials safely
  const getMemberInitials = (name) => {
    if (!name || typeof name !== 'string') return '??';
    const initials = name
      .split(" ")
      .filter(n => n && n.length > 0)
      .map(n => n[0])
      .join("")
      .toUpperCase();
    return initials || '??';
  };

  // Safe member data getter
  const getSafeMemberData = (member, index) => {
    return {
      id: member?.id || `member-${index}`,
      name: member?.name || t("hsm.councils.unnamed_member", "Участник совета"),
      position: member?.position || "",
      department: member?.department || "",
      bio: member?.bio || "",
      email: member?.email || "",
      phone: member?.phone || "",
      photo: member?.photo || null
    };
  };

  // Safe document data getter
  const getSafeDocumentData = (doc, index) => {
    return {
      id: doc?.id || `doc-${index}`,
      title: doc?.title || t("hsm.councils.unnamed_document", "Документ"),
      date: doc?.date || "",
      description: doc?.description || "",
      size: doc?.size || "",
      file_url: doc?.file_url || ""
    };
  };

  // Loading state
  if (loading) {
    return (
      <div
        className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="text-red-600 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t("hsm.councils.loading_error") || "Loading Error"}
              </h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t("hsm.councils.refresh_page") || "Refresh Page"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("hsm.councils.title") || "Councils"}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t("hsm.councils.subtitle") || "Expert councils and committees"}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white font-bold text-lg">
                {t("hsm.councils.sections") || "Sections"}
              </div>
              <nav className="p-2">
                {sectionsList && sectionsList.length > 0 ? (
                  <ul className="space-y-1">
                    {sectionsList.map((section) => (
                      <li key={section.id}>
                        <button
                          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${activeSection === section.id
                              ? "bg-blue-100 text-blue-700 font-medium shadow-sm"
                              : "text-gray-700 hover:bg-gray-100"
                            }`}
                          onClick={() => changeActiveSection(section.id)}
                        >
                          {section.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    {t("hsm.councils.no_sections")}
                  </div>
                )}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-xl p-6 transition-all duration-500">
              {/* Заголовок раздела */}
              {currentSectionData && (
                <div className="mb-6 pb-4 border-b border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                    {currentSectionData.title}
                  </h2>
                  {currentSectionData.description && (
                    <p className="text-gray-600 text-base leading-relaxed">
                      {currentSectionData.description}
                    </p>
                  )}
                </div>
              )}

              {/* Контент раздела - члены */}
              {currentSectionData && sectionHasMembers() && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800">
                    {t("hsm.councils.composition") || "Composition"}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentSectionData.members.map((member, index) => {
                      const safeMember = getSafeMemberData(member, index);
                      return (
                        <div
                          key={safeMember.id}
                          className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-md overflow-hidden border border-blue-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                        >
                          <div className="p-6">
                            <div className="flex items-center mb-4">
                              {safeMember.photo ? (
                                <img
                                  src={safeMember.photo}
                                  alt={safeMember.name}
                                  className="w-16 h-16 rounded-full object-cover mr-4"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                  }}
                                />
                              ) : null}
                              <div 
                                className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold text-xl mr-4"
                              >
                                {getMemberInitials(safeMember.name)}
                              </div>
                              <div>
                                <h3 className="font-bold text-lg text-gray-900">
                                  {safeMember.name}
                                </h3>
                                {safeMember.position && (
                                  <p className="text-blue-600 text-sm">
                                    {safeMember.position}
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            {safeMember.department && (
                              <div className="mb-3">
                                <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                  {safeMember.department}
                                </span>
                              </div>
                            )}
                            
                            {safeMember.bio && (
                              <p className="text-gray-700 text-sm">{safeMember.bio}</p>
                            )}

                            {/* Contact Information */}
                            {(safeMember.email || safeMember.phone) && (
                              <div className="mt-3 pt-3 border-t border-gray-100">
                                {safeMember.email && (
                                  <p className="text-xs text-gray-600 mb-1">
                                    <strong>{t("hsm.councils.email") || "Email"}:</strong>{" "}
                                    <a 
                                      href={`mailto:${safeMember.email}`} 
                                      className="text-blue-600 hover:text-blue-800"
                                    >
                                      {safeMember.email}
                                    </a>
                                  </p>
                                )}
                                {safeMember.phone && (
                                  <p className="text-xs text-gray-600">
                                    <strong>{t("hsm.councils.phone") || "Phone"}:</strong>{" "}
                                    <a 
                                      href={`tel:${safeMember.phone}`} 
                                      className="text-blue-600 hover:text-blue-800"
                                    >
                                      {safeMember.phone}
                                    </a>
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Контент раздела - документы */}
              {currentSectionData && sectionHasDocuments() && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800">
                    {t("hsm.councils.documents") || "Documents"}
                  </h3>

                  <div className="space-y-4">
                    {currentSectionData.documents.map((doc, index) => {
                      const safeDoc = getSafeDocumentData(doc, index);
                      return (
                        <div
                          key={safeDoc.id}
                          className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors duration-300"
                        >
                          <div className="mb-2 md:mb-0">
                            <h4 className="font-medium text-gray-900">
                              {safeDoc.title}
                            </h4>
                            {safeDoc.date && (
                              <p className="text-sm text-gray-600">
                                {t("hsm.councils.publish_date") || "Published"}: {safeDoc.date}
                              </p>
                            )}
                            {safeDoc.description && (
                              <p className="text-sm text-gray-500 mt-1">
                                {safeDoc.description}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center space-x-4">
                            {safeDoc.size && (
                              <span className="text-sm text-gray-500">
                                {safeDoc.size}
                              </span>
                            )}
                            <button
                              className="flex items-center text-blue-600 hover:text-blue-800 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                              onClick={() => {
                                if (safeDoc.file_url) {
                                  window.open(safeDoc.file_url, "_blank");
                                }
                              }}
                              disabled={!safeDoc.file_url}
                              title={safeDoc.file_url ? 
                                (t("hsm.councils.download") || "Download") : 
                                (t("hsm.councils.no_file") || "File not available")
                              }
                            >
                              <svg
                                className="w-5 h-5 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                              {t("hsm.councils.download") || "Download"}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Сообщение, если в разделе нет контента */}
              {!currentSectionData && (
                <div className="text-center py-10">
                  <svg
                    className="mx-auto h-16 w-16 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    {t("hsm.councils.no_data")}
                  </h3>
                  <p className="mt-2 text-gray-500">
                    {t("hsm.councils.no_section_selected")}
                  </p>
                </div>
              )}

              {/* Сообщение, если раздел выбран но нет контента */}
              {currentSectionData && !sectionHasMembers() && !sectionHasDocuments() && (
                <div className="text-center py-10">
                  <svg
                    className="mx-auto h-16 w-16 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    {t("hsm.councils.preparing_info") || "Information in Preparation"}
                  </h3>
                  <p className="mt-2 text-gray-500">
                    {t("hsm.councils.content_in_progress") || "Content for this section is currently being prepared."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advices;