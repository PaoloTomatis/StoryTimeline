// Importing modules
import { useState, useMemo } from 'react';
import type { dateType, parsedDateType } from './types';

// App component
function App() {
	// Defining dates state
	const [dates, setDates] = useState<dateType[]>([
		{
			date: 1957,
			text: 'The Soviet Union launches Sputnik 1, the first artificial satellite to orbit Earth.',
			img: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2',
		},
		{
			date: 1958,
			text: "The United States establishes NASA to coordinate the country's civilian space program.",
		},
		{
			date: 1959,
			text: 'Soviet probe Luna 2 becomes the first spacecraft to impact the lunar surface.',
		},
		{
			date: 1961,
			text: 'Soviet cosmonaut Yuri Gagarin becomes the first human to journey into outer space.',
		},
		{
			date: 1962,
			text: 'John Glenn orbits the Earth three times aboard Friendship 7, becoming the first American to do so.',
		},
		{
			date: 1963,
			text: 'Valentina Tereshkova becomes the first woman in space aboard Vostok 6.',
		},
		{
			date: 1965,
			text: 'Soviet cosmonaut Alexei Leonov performs the first-ever spacewalk (EVA).',
		},
		{
			date: 1967,
			text: 'The Apollo 1 fire claims the lives of three astronauts during a launch pad test, prompting major safety overhauls.',
		},
		{
			date: 1969,
			text: 'Apollo 11 successfully lands Neil Armstrong and Buzz Aldrin on the Moon.',
			img: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9',
		},
		{
			date: 1968,
			text: 'Apollo 8 becomes the first manned mission to leave Earth orbit, reach the Moon, and orbit it.',
		},
	]);
	const [hoveredId, setHoveredId] = useState<string | null>(null);
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const parsedDates = useMemo<parsedDateType[]>(() => {
		// Checking dates
		if (!dates || dates.length === 0) return [];

		// Sorting dates
		const sorted = [...dates]
			.sort((a, b) => a.date - b.date)
			.map((dateItem) => {
				return { ...dateItem, id: crypto.randomUUID() };
			});

		// Defining variables for the algorithm
		const minDate = sorted[0].date;
		const maxDate = sorted[sorted.length - 1].date;
		const timeSpan = maxDate - minDate;

		// Calculating x coordinate
		return sorted.map((dateItem) => {
			const x = timeSpan === 0 ? 720 : 180 + ((dateItem?.date - minDate) / timeSpan) * 1200;
			return { ...dateItem, x };
		});
	}, [dates]);

	// Returning the component
	return (
		<div id="page" className="w-screen h-screen flex items-center justify-center pt-[35vh]">
			{/* Main title */}
			<h1 id="title" className="fixed top-[3vh] left-[10vh] font-bold ">
				StoryTimeline
			</h1>
			{/* Timeline container */}
			<svg
				className="w-screen h-auto block transition-all ease-out duration-200"
				viewBox="0 0 1440 320"
				style={selectedId ? { transform: 'translateY(-35vh)' } : {}}
			>
				{/* Timeline */}
				<path stroke="#17191C" strokeWidth="7" d="M0 160 H1440" />
				{/* Dates line */}
				{parsedDates.map((dateItem, idx) => {
					// Defining color
					const color =
						idx === 0 || idx === parsedDates.length - 1 ? '#F5A742' : '#17191C';
					return (
						<g
							key={dateItem.id}
							className="cursor-pointer"
							onMouseEnter={() => setHoveredId(dateItem.id || null)}
							onMouseLeave={() => setHoveredId(null)}
							onClick={() =>
								selectedId == dateItem.id
									? setSelectedId(null)
									: setSelectedId(dateItem.id || null)
							}
						>
							<rect
								x={dateItem.x - 15}
								y={135}
								width={30}
								height={50}
								fill="transparent"
							/>
							<path
								stroke={color}
								strokeLinecap="round"
								strokeWidth="6"
								d={`M${dateItem.x} 180 V140`}
							/>
							{(hoveredId == dateItem.id || selectedId == dateItem.id) && (
								<circle
									className='transition-all ease-out duration-200 origin-center"'
									fill="#fff"
									cx={dateItem.x}
									cy={160}
									r={selectedId == dateItem.id ? 8 : 6}
									stroke={color}
									strokeWidth={selectedId == dateItem.id ? 5 : 4}
								/>
							)}
						</g>
					);
				})}
				{/* Dates text */}
				{parsedDates.map((dateItem, idx) => {
					return (
						<text
							key={dateItem.id}
							textAnchor="middle"
							dominantBaseline="central"
							fill={idx == 0 || idx == parsedDates.length - 1 ? '#F5A742' : '#17191C'}
							fontSize={22}
							fontWeight={600}
							x={dateItem.x}
							y={120}
						>
							{dateItem.date}
						</text>
					);
				})}
			</svg>
			{/* Cards */}
			{parsedDates.map((dateItem) => {
				return (
					selectedId == dateItem.id && (
						<div className="absolute bg-white w-125 h-[55vh] flex flex-col items-center justify-center rounded-md pl-12 pr-12">
							{dateItem.img && (
								<img
									className="max-h-[20vh] h-auto rounded-2xl"
									src={dateItem.img}
									alt="Image not found"
								/>
							)}
							<h2 className="font-bold">{dateItem.date}</h2>
							<p className="font-semibold text-center">{dateItem.text}</p>
						</div>
					)
				);
			})}
		</div>
	);
}

// Exporting component
export default App;
