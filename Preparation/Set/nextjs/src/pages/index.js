export default function Home() {
	return (
		<main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
			<h1>Welcome to the Next.Js Frotend</h1>
			<p>This is being served through Docker</p>
			{/* This is a standard html button */}
			<button onClick={() => alert("Hello World")}>
				Click on me
			</button>
		</main>
	);
}