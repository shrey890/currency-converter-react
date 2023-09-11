import { useEffect, useState } from "react";
export default function App() {
	const [amount, setAmount] = useState(1);
	const [cur, setCur] = useState("EUR");
	const [toCur, setToCur] = useState("USD");
	const [conv, setConv] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		async function convert() {
			setIsLoading(true);
			try {
				const res = await fetch(
					`https://api.frankfurter.app/latest?amount=${amount}&from=${cur}&to=${toCur}`
				);
				if (!res.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await res.json();
				setConv(data.rates[toCur]);
			} catch (error) {
				console.error("Error fetching data:", error);
				setConv("Error"); // Handle the error gracefully
			} finally {
				setIsLoading(false);
			}
		}

		if (cur === toCur) {
			setConv(amount);
		} else {
			convert(); // Call the function immediately after defining it.
		}
	}, [amount, cur, toCur]);

	return (
		<div>
			<input
				type="number"
				value={amount}
				onChange={(e) => setAmount(Number(e.target.value))}
				disabled={isLoading}
			/>
			<select
				value={cur}
				onChange={(e) => setCur(e.target.value)}
				disabled={isLoading}
			>
				<option value="USD">USD</option>
				<option value="EUR">EUR</option>
				<option value="CAD">CAD</option>
				<option value="INR">INR</option>
			</select>
			<select
				value={toCur}
				onChange={(e) => setToCur(e.target.value)}
				disabled={isLoading}
			>
				<option value="USD">USD</option>
				<option value="EUR">EUR</option>
				<option value="CAD">CAD</option>
				<option value="INR">INR</option>
			</select>
			<p className="amo">
				{isLoading ? "Loading..." : conv} {toCur}
			</p>
			<footer className="footer">
				<p>&copy; 2023 shrey</p>
			</footer>
			<main>
				<a
					href="https://github.com/shrey890/currency-converter-react"
					target="_blank"
					className="sc"
				>
					Source Code
				</a>
			</main>
			<p style={{ fontSize: "12px", color: "gray" }}>
        Note: The exchange rates provided may be inaccurate and are for
        demonstration purposes only.
      </p>
		</div>
	);
}
