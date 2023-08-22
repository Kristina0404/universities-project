/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { selectFiltered } from './selectors';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { loadUniversityByWordGer } from './universitiesSliceGer';
import { useEffect, useState } from 'react';
import styles from './UniversitiesListGer.module.css';
import { Link, useNavigate } from 'react-router-dom';
import University from '../types/University';
import { chooseFavoriteUniversity } from '../universitiesUk/universitiesSliceUk';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import Pagination from '../pagination/Pagination';

export default function UniversitiesListGer(): JSX.Element {
	const universities = useAppSelector(selectFiltered);
	const dispatch = useAppDispatch();
	const [word, setWord] = useState('');
	const [selectedUniversity, setSelectedUniversity] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(loadUniversityByWordGer(word));
	}, [dispatch, word]);
	const handleIconClick = (university: University) => {
		dispatch(chooseFavoriteUniversity(university));
		setSelectedUniversity(university.name);
		navigate('/favoriteList');
	};

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const universitiesToDisplay = universities.slice(startIndex, endIndex);

	return (
		<div className={styles.container}>
			<div>
				<Link to="/" className={styles.link_home}>
					Home
				</Link>
				<Link to="/favoriteList" className={styles.link_home}>
					Favorite List
				</Link>
			</div>
			<h1 className={styles.title}>Universities of Germany </h1>
			<div>
				<input
					className={styles.searchWord}
					type="text"
					value={word}
					onChange={(e) => setWord(e.target.value)}
					placeholder="search by word"
				/>
			</div>
			<Pagination
				currentPage={currentPage}
				totalPages={Math.ceil(universities.length / itemsPerPage)}
				onPageChange={(page: number) => setCurrentPage(page)}
				itemsPerPage={0}
			/>

			<div>
				{universitiesToDisplay.map((university) => (
					// eslint-disable-next-line react/jsx-key
					<li className={styles.card}>
						<p>{university.name}</p>
						<ThumbUpAltOutlinedIcon
							onClick={() => handleIconClick(university)}
						/>
						<p>{university.domains}</p>
						<a href={university.web_pages[0]} target="_blank" rel="noreferrer">
							Home Page of University
						</a>
						<p>{university.country}</p>
					</li>
				))}
			</div>
			<Pagination
				currentPage={currentPage}
				totalPages={Math.ceil(universities.length / itemsPerPage)}
				onPageChange={(page: number) => setCurrentPage(page)}
				itemsPerPage={0}
			/>
		</div>
	);
}
