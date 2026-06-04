import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import hsmService from '../../services/hsmService';
import SafeImage from '../common/SafeImage';

const FacultyCard = ({ faculty, language }) => {
	const { t } = useTranslation();

	const getName = () => {
		switch (language) {
			case 'kg':
				return `${faculty.last_name_kg || faculty.last_name || ''} ${faculty.first_name_kg || faculty.first_name || ''} ${faculty.middle_name_kg || faculty.middle_name || ''}`.trim();
			case 'en':
				return `${faculty.first_name_en || faculty.first_name || ''} ${faculty.last_name_en || faculty.last_name || ''}`.trim();
			default:
				return faculty.full_name || `${faculty.last_name || ''} ${faculty.first_name || ''} ${faculty.middle_name || ''}`.trim();
		}
	};

	const getPosition = () => {
		switch (language) {
			case 'kg':
				return faculty.position_kg || faculty.position_display || faculty.position;
			case 'en':
				return faculty.position_en || faculty.position_display || faculty.position;
			default:
				return faculty.position_display || faculty.position;
		}
	};

	const getAcademicDegree = () => {
		switch (language) {
			case 'kg':
				return faculty.academic_degree_kg || faculty.academic_degree_display || faculty.academic_degree;
			case 'en':
				return faculty.academic_degree_en || faculty.academic_degree_display || faculty.academic_degree;
			default:
				return faculty.academic_degree_display || faculty.academic_degree;
		}
	};

	return (
		<motion.div className="bg-white rounded-lg shadow-lg overflow-hidden" whileHover={{ y: -6 }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
			<div className="relative">
				<SafeImage src={faculty.photo} alt={getName()} className="w-full h-64 object-cover" fallback={<div className="w-full h-64 bg-gray-100 flex items-center justify-center"><div className="w-20 h-20 bg-gray-300 rounded-full"/></div>} />
			</div>
			<div className="p-5">
				<h3 className="text-lg font-semibold text-gray-900 mb-1">{getName()}</h3>
				<p className="text-blue-600 text-sm mb-2">{getPosition()}</p>
				{getAcademicDegree() && <p className="text-gray-700 text-sm mb-2"><strong>{t('hsm.academic_degree', 'Ученая степень')}: </strong>{getAcademicDegree()}</p>}
				<div className="text-sm text-gray-600 space-y-1 mt-2">
					{faculty.email && <div><a className="text-blue-600" href={`mailto:${faculty.email}`}>{faculty.email}</a></div>}
					{faculty.office && <div>{t('hsm.office', 'Кабинет')}: {faculty.office}</div>}
				</div>
			</div>
		</motion.div>
	);
};

const  HSMAcademicStuff = () => {
	const { t, i18n } = useTranslation();
	const [facultyByPosition, setFacultyByPosition] = useState({});
	const [allFaculty, setAllFaculty] = useState([]);
	const [search, setSearch] = useState('');
	const [filtered, setFiltered] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const [byPosition, list] = await Promise.all([hsmService.getFacultyByPosition(), hsmService.getFaculty()]);
				setFacultyByPosition(byPosition || {});
				setAllFaculty(list || []);
				setFiltered(list || []);
			} catch (err) {
				console.error('Error fetching faculty:', err);
				setError(err.message || String(err));
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (!search) return setFiltered(allFaculty || []);
		const q = search.toLowerCase();
		const res = (allFaculty || []).filter(f => {
			const name = (f.full_name || `${f.first_name || ''} ${f.last_name || ''}`).toLowerCase();
			const pos = (f.position_display || f.position || '').toLowerCase();
			const deg = (f.academic_degree_display || f.academic_degree || '').toLowerCase();
			return name.includes(q) || pos.includes(q) || deg.includes(q);
		});
		setFiltered(res);
	}, [search, allFaculty]);

	if (loading) return <div className="min-h-screen pt-24 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"/></div>;
	if (error) return <div className="min-h-screen pt-24"><div className="container mx-auto p-8"><h2 className="text-xl font-bold">{t('hsm.error', 'Ошибка')}</h2><p className="text-gray-600">{error}</p></div></div>;

	return (
		<div className="min-h-screen bg-gray-50 pt-24">
			<div className="container mx-auto px-4 py-8">
				<motion.div className="text-center mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
					<h1 className="text-4xl font-bold text-gray-900 mb-2">{t('hsm.faculty_title', 'Профессорско-преподавательский состав')}</h1>
					<p className="text-lg text-gray-600 max-w-3xl mx-auto">{t('hsm.faculty_description', 'Высококвалифицированные преподаватели и исследователи Высшей медицинской школы')}</p>
				</motion.div>

				<div className="max-w-md mx-auto mb-8">
					<input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t('hsm.search_faculty', 'Поиск преподавателей...')} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200" />
				</div>

				{search ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{filtered.map(f => <FacultyCard key={f.id} faculty={f} language={i18n.language} />)}
					</div>
				) : (
					Object.keys(facultyByPosition).length > 0 ? (
						Object.entries(facultyByPosition).map(([code, group]) => (
							<div key={code} className="mb-12">
								<h2 className="text-2xl font-semibold text-gray-900 mb-4">{group.name}</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
									{group.faculty.map(f => <FacultyCard key={f.id} faculty={f} language={i18n.language} />)}
								</div>
							</div>
						))
					) : (
						<div className="text-center py-12">
							<div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
								<h3 className="text-lg font-medium text-gray-900 mb-2">{t('hsm.no_faculty', 'Преподаватели не найдены')}</h3>
								<p className="text-gray-600">{t('hsm.no_faculty_description', 'Информация о преподавателях скоро появится на сайте')}</p>
							</div>
						</div>
					)
				)}

				{allFaculty.length > 0 && (
					<div className="mt-12">
						<div className="bg-white rounded-lg shadow p-6">
							<h3 className="text-xl font-semibold mb-4">{t('hsm.faculty_statistics', 'Статистика ППС')}</h3>
							<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
								<div>
									<div className="text-2xl font-bold text-[#0A2647]">{allFaculty.length}</div>
									<div className="text-sm text-gray-600">{t('hsm.total_faculty', 'Всего преподавателей')}</div>
								</div>
								<div>
									<div className="text-2xl font-bold text-[#144272]">{allFaculty.filter(f => f.position === 'professor' || (f.position_display || '').toLowerCase().includes('профессор')).length}</div>
									<div className="text-sm text-gray-600">{t('hsm.professors', 'Профессоров')}</div>
								</div>
								<div>
									<div className="text-2xl font-bold text-[#205295]">{allFaculty.filter(f => f.position === 'associate_professor' || (f.position_display || '').toLowerCase().includes('доцент')).length}</div>
									<div className="text-sm text-gray-600">{t('hsm.associate_professors', 'Доцентов')}</div>
								</div>
								<div>
									<div className="text-2xl font-bold text-[#2C7865]">{allFaculty.filter(f => (f.academic_degree_display || '').toLowerCase().includes('доктор')).length}</div>
									<div className="text-sm text-gray-600">{t('hsm.doctors', 'Докторов наук')}</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default HSMAcademicStuff;
